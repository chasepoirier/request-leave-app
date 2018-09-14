import express from 'express'
import { toAuthJSON, Queries } from '../utils'
import { firebase, db } from '../firebase'

const router = express.Router()

router.post('/login', (req, res) => {
  const { email, password } = req.body
  firebase
    .auth()
    .signInWithEmailAndPassword(email, password)
    .then(ref => {
      Queries.user
        .getOneUser('uid', ref.user.uid)
        .then(user => res.json({ user: toAuthJSON(user) }))
        .catch(() => {
          res.json({ error: { message: 'User not correct' } })
        })
    })
    .catch(err => {
      res.json({ errors: { message: err.message, code: err.code } })
    })
})

router.post('/get_user_by_email', (req, res) => {
  Queries.user
    .getOneUser('email', req.body.email)
    .then(user => res.json({ user }))
    .catch(() => res.json({ user: null }))
})

router.post('/get_user_by_uid', (req, res) => {
  Queries.user
    .getOneUser('uid', req.body.uid)
    .then(user => res.json({ user: toAuthJSON(user) }))
    .catch(() => res.json({ user: null }))
})

router.post('/get_user_by_id', (req, res) => {
  const userRef = db.collection('users').doc(req.body.id)
  userRef
    .get()
    .then(user => {
      db.collection('teams')
        .doc(user.data().team)
        .get()
        .then(team => {
          userRef
            .collection('requests')
            .get()
            .then(snaps => {
              const requests = []
              snaps.forEach(snap => requests.push({ ...snap.data() }))
              res.json({
                user: {
                  requests,
                  ...user.data(),
                  id: user.id,
                  team: { name: team.data().name, id: team.id }
                }
              })
            })
        })
    })
    .catch(() => res.json({ error: true }))
})

router.post('/get_user_logs', (req, res) => {
  db.collection('users')
    .doc(req.body.id)
    .collection('logs')
    .get()
    .then(snaps => {
      const logs = []
      snaps.forEach(snap => logs.push({ ...snap.data() }))

      res.json({ logs })
    })
})

router.get('/get_all_users', (req, res) => {
  db.collection('users')
    .get()
    .then(snaps => {
      const users = []
      snaps.forEach(snap => users.push({ ...snap.data(), id: snap.id }))
      res.json({ users })
    })
})

module.exports = router
