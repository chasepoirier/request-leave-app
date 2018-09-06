import express from 'express'
import { toAuthJSON, Queries } from '../utils'
import { db, auth } from '../firebase'

const router = express.Router()

router.post('/add_user', (req, res) => {
  const {
    email,
    fname,
    lname,
    status,
    team,
    typeAmounts,
    additionalService,
    startDate
  } = req.body.user
  const password = 'test1234'
  Queries.user
    .getOneUser('email', email)
    .then(() => res.json({ user: null }))
    .catch(() => {
      Queries.user
        .signUserIn({ email, password })
        .then(ref => {
          Queries.user
            .createNewUser({
              email,
              name: {
                fname,
                lname
              },
              team,
              status,
              typeAmounts,
              additionalService,
              startDate,
              uid: ref.user.uid
            })
            .then(user => {
              Queries.team.addUserToTeam(user.team, user)
              res.json({ user: toAuthJSON(user) })
            })
        })
        .catch(err => {
          res.json({ errors: { code: err.code, message: err.message } })
        })
    })
})

router.post('/delete_user', (req, res) => {
  db.collection('users')
    .doc(req.body.id)
    .get()
    .then(user => {
      // delete logs sub collection
      user.ref
        .collection('logs')
        .get()
        .then(logRef => logRef.forEach(log => log.ref.delete()))
      // delete requests sub collection
      user.ref
        .collection('requests')
        .get()
        .then(requests => requests.forEach(request => request.ref.delete()))
      user.ref.delete()
      return user.data()
    })
    .then(user => {
      auth.deleteUser(user.uid)
      // delete user from their team
      db.collection('teams')
        .doc(user.team)
        .collection('users')
        .where('id', '==', req.body.id)
        .get()
        .then(snap =>
          snap.forEach(ref => {
            // delete requests from user ref on team
            db.collection('teams')
              .doc(user.team)
              .collection('users')
              .doc(ref.id)
              .collection('requests')
              .get()
              .then(reqRef => reqRef.forEach(request => request.ref.delete()))
            ref.ref.delete()
          })
        )
        .then(() => res.json({ success: true }))
    })
})

router.get('/get_pending_approvals', (req, res) => {
  const teams = db.collection('teams')

  teams.get().then(teamRefs => {
    const pendingApprovals = []

    teamRefs.forEach(team => {
      pendingApprovals.push(
        Queries.supervisor.findPendingApprovals(teams, team)
      )
    })

    Promise.all(pendingApprovals).then(requests => {
      const flatRequests = requests.reduce((prev, curr) => prev.concat(curr))
      const flatTeams = flatRequests.reduce((prev, curr) => prev.concat(curr))
      res.json({ requests: flatTeams })
    })
  })
})

router.post('/set_approval_status', (req, res) => {
  const {
    ids: { userUid, teamUid, id, teamID },
    approved
  } = req.body

  console.log(req.body.ids)

  db.collection('teams')
    .doc(teamID)
    .collection('users')
    .doc(teamUid)
    .collection('requests')
    .doc(id)
    .update({
      'approval.supervisor.pending': false,
      'approval.supervisor.approved': approved,
      'approval.supervisor.timestamp': Date.now()
    })
    .then(() => {
      db.collection('users')
        .doc(userUid)
        .collection('requests')
        .doc(id)
        .update({
          'approval.supervisor.pending': false,
          'approval.supervisor.approved': approved,
          'approval.supervisor.timestamp': Date.now()
        })
        .then(() => res.json({ success: true }))
        .catch(err => console.log(err))

      db.collection('users')
        .doc(userUid)
        .collection('logs')
        .add({
          logType: `SUPERVISOR_APPROVE_REQUEST: Supervisor ${
            approved ? 'approved' : 'denied'
          } request ID#: ${id}`,
          timestamp: Date.now()
        })
    })
    .catch(err => console.log(err))
})

router.post('/update_user', (req, res) => {
  const {
    updates: { team, status, typeAmounts },
    user
  } = req.body
  const { supervisor } = Queries

  const promises = []
  if (team.updated) {
    db.collection('users')
      .doc(user.id)
      .collection('logs')
      .add({
        logType: `USER_CHANGE_TEAMS: User moved to team ID#${user.team.id}`,
        timestamp: Date.now()
      })

    promises.push(
      supervisor
        .updateTeamInUserRef(user)
        .then(() => {
          supervisor
            .migrateUserToNewTeam(user, team)
            .then(() => true)
            .catch(() => new Error())
        })
        .catch(err => err)
    )
  }

  if (typeAmounts.updated) {
    const lowerCaseIds = user.typeAmounts.map(t => ({
      ...t,
      id: t.id.toLowerCase()
    }))

    db.collection('users')
      .doc(user.id)
      .collection('logs')
      .add({
        logType: `TIME_ADDED_TO_AMOUNTS: User type amounts updated: ${lowerCaseIds.map(
          t => `${t.id}: ${t.amount} `
        )}`,
        timestamp: Date.now()
      })

    promises.push(
      db
        .collection('users')
        .doc(user.id)
        .update({ typeAmounts: lowerCaseIds })
    )
  }

  if (status.updated) {
    db.collection('users')
      .doc(user.id)
      .collection('logs')
      .add({
        logType: `USER_PERMISSIONS_CHANGED: User permissions now: admin: ${
          user.status.admin
        }, supevisor: ${user.status.supervisor}`,
        timestamp: Date.now()
      })

    promises.push(
      db
        .collection('users')
        .doc(user.id)
        .update({ status: user.status })
        .then(() => {
          db.collection('teams')
            .doc(team.updated ? team.oldTeam : user.team.id)
            .collection('users')
            .where('id', '==', user.id)
            .get()
            .then(userRef => {
              userRef.forEach(ref => {
                db.collection('teams')
                  .doc(team.updated ? team.oldTeam : user.team.id)
                  .collection('users')
                  .doc(ref.id)
                  .update({ status: user.status })
              })
            })
        })
    )
  }

  Promise.all(promises)
    .then(() => res.json({ success: true }))
    .catch(() => res.json({ success: false }))
})

module.exports = router
