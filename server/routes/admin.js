import express from 'express'
import { Queries } from '../utils'
import { db } from '../firebase'

const router = express.Router()

router.post('/get_pending_approvals', (req, res) => {
  const teamRef = db
    .collection('teams')
    .doc(req.body.team)
    .collection('users')

  Queries.admin
    .getPendingApprovalsByteam(teamRef)
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

module.exports = router
