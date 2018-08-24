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

module.exports = router
