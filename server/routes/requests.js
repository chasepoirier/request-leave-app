import express from 'express'
import { db } from '../firebase'
import * as Arrays from '../utils/arrays'
// import Queries from '../utils/Queries'

const router = express.Router()

router.post('/add_new_request', (req, res) => {
  const {
    user: { id, team, status },
    request
  } = req.body

  if (status.admin) {
    request.approval.admin.pending = false
    request.approval.admin.approved = true
  }
  db.collection('users')
    .doc(id)
    .get()
    .then(ref => {
      const amounts = ref.data().typeAmounts
      const newAmounts = Arrays.updateValueInArray(request.types, amounts)
      db.collection('users')
        .doc(id)
        .update({ typeAmounts: newAmounts })
    })

  const logsRef = db
    .collection('users')
    .doc(id)
    .collection('logs')

  const teamUsersRef = db
    .collection('teams')
    .doc(team)
    .collection('users')

  db.collection('users')
    .doc(id)
    .collection('requests')
    .add(request)
    .then(ref => {
      logsRef.add({
        ...request,
        logType: `ADD_REQUEST: User created new leave request, types: ${request.types.map(
          t => `${t.type}: ${t.amount}hrs `
        )}. Total time: ${request.totalTime}hrs`,
        timestamp: Date.now()
      })
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
            .set(request)
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
      snap.forEach(request =>
        requests.push({ ...request.data(), id: request.id })
      )
      res.json({ requests })
    })
})

router.post('/delete_request', (req, res) => {
  const teamRef = db
    .collection('teams')
    .doc(req.body.teamID)
    .collection('users')

  const userRef = db.collection('users').doc(req.body.userID)

  const { request } = req.body
  db.collection('users')
    .doc(req.body.userID)
    .collection('logs')
    .add({
      logType: `DELETE_REQUEST: User deleted leave request, types: ${request.types.map(
        t => `${t.type}: ${t.amount}hrs `
      )}. Total time: ${request.totalTime}hrs`,
      timestamp: Date.now()
    })

  userRef
    .collection('requests')
    .doc(req.body.requestID)
    .delete()

  userRef
    .get()
    .then(user => {
      const newAmounts = user.data().typeAmounts
      request.types.forEach(type => {
        const index = newAmounts.map(a => a.id).indexOf(type.type)
        newAmounts[index].amount += parseFloat(type.amount)
      })
      return newAmounts
    })
    .then(amounts => {
      userRef.update({ typeAmounts: amounts })
    })

  teamRef
    .where('id', '==', req.body.userID)
    .get()
    .then(ref => {
      const user = []
      ref.forEach(el => user.push(el.id))
      teamRef
        .doc(user[0])
        .collection('requests')
        .doc(req.body.requestID)
        .delete()
        .then(() => res.json({ success: true }))
        .catch(() => res.json({ success: false }))
    })
})

router.get('/get_all_leave_types', (req, res) => {
  db.collection('leaveTypes')
    .get()
    .then(snaps => {
      const types = []
      snaps.forEach(snap => types.push(snap.data()))
      return types
    })
    .then(types => res.json({ types }))
})

module.exports = router
