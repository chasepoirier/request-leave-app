import express from 'express'
import { db } from '../firebase'
// import Queries from '../utils/Queries'

const router = express.Router()

router.post('/add_new_request', (req, res) => {
  const { id, team } = req.body.user

  const requestsRef = db
    .collection('users')
    .doc(id)
    .collection('requests')

  const teamUsersRef = db
    .collection('teams')
    .doc(team)
    .collection('users')

  requestsRef.add(req.body.request).then(ref => {
    teamUsersRef
      .where('id', '==', id)
      .get()
      .then(snap => {
        const ids = []
        snap.forEach(doc => ids.push(doc.id))
        teamUsersRef
          .doc(ids[0])
          .collection('requests')
          .doc(ref.id)
          .set(req.body.request)
          .then(() => res.json({ success: true }))
      })
  })
})

router.post('/fetch_all_requests', (req, res) => {
  db.collection('users')
    .doc(req.body.id)
    .collection('requests')
    .get()
    .then(snap => {
      const requests = []
      snap.forEach(request => requests.push(request.data()))
      res.json({ requests })
    })
})

module.exports = router
