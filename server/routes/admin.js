import express from 'express'
import { admin, report } from '../utils/Queries'
import { db } from '../firebase'

const router = express.Router()

router.post('/get_pending_approvals', (req, res) => {
  const teamRef = db
    .collection('teams')
    .doc(req.body.team)
    .collection('users')

  admin
    .getPendingApprovalsByteam(teamRef, req.body.team)
    .then(requests => res.json({ requests }))
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
      'approval.admin.pending': false,
      'approval.admin.approved': approved,
      'approval.admin.timestamp': Date.now()
    })
    .then(() => {
      db.collection('users')
        .doc(userUid)
        .collection('requests')
        .doc(id)
        .update({
          'approval.admin.pending': false,
          'approval.admin.approved': approved,
          'approval.admin.timestamp': Date.now()
        })
        .then(() => res.json({ success: true }))
        .catch(err => console.log(err))

      db.collection('users')
        .doc(userUid)
        .collection('logs')
        .add({
          logType: `ADMIN_APPROVE_REQUEST: Admin ${
            approved ? 'approved' : 'denied'
          } request ID#: ${id}`,
          timestamp: Date.now()
        })
    })
    .catch(err => console.log(err))
})

router.post('/get_requests', (req, res) => {
  db.collection('users')
    .get()
    .then(userRefs => {
      const promises = []
      userRefs.forEach(user => {
        promises.push(
          db
            .collection('users')
            .doc(user.id)
            .collection('requests')
            .get()
            .then(requests => {
              const data = []
              requests.forEach(request =>
                data.push({
                  ...request.data(),
                  name: user.data().name,
                  email: user.data().email,
                  userID: user.id,
                  teamID: user.data().team
                })
              )
              return data
            })
        )
      })
      Promise.all(promises).then(requests => {
        const { users, types, teams, startDate, endDate } = req.body.data

        const flattenDeep = reqs =>
          reqs.reduce(
            (acc, val) =>
              Array.isArray(val)
                ? acc.concat(flattenDeep(val))
                : acc.concat(val),
            []
          )
        flattenDeep(requests)

        const merged = [].concat(...requests)
        let filtered = merged
        if (users.length !== 0) {
          filtered = report.filterBySelectedUsers(merged, users)
        }
        if (types.length !== 0) {
          filtered = report.filterBySelectedTypes(filtered, types)
        }
        if (teams.length !== 0) {
          filtered = report.filterByTeam(filtered, teams)
        }
        if (startDate && endDate) {
          filtered = report.filterByDateRange(filtered, startDate, endDate)
        }
        res.json({ requests: filtered })
      })
    })
})

module.exports = router
