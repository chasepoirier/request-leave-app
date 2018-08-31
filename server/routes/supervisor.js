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
        teams
          .doc(team.id)
          .collection('users')
          .get()
          .then(userRefs => {
            const allUsers = []
            userRefs.forEach(user => {
              allUsers.push(
                teams
                  .doc(team.id)
                  .collection('users')
                  .doc(user.id)
                  .collection('requests')
                  .where('approval.supervisor.pending', '==', true)
                  .get()
                  .then(requests => {
                    const allRequests = []
                    requests.forEach(request => {
                      allRequests.push({
                        ...request.data(),
                        teamUid: user.id,
                        userUid: user.data().id,
                        name: user.data().name,
                        id: request.id,
                        team: team.data().name
                      })
                    })
                    return allRequests
                  })
              )
            })
            return Promise.all(allUsers).then(refs => refs)
          })
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
    })
    .catch(err => console.log(err))
})

module.exports = router
