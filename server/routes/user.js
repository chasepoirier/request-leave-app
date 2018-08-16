import express from 'express'
import { toAuthJSON, Queries } from '../utils'
import { firebase } from '../firebase'

const router = express.Router()

router.post('/login', (req, res) => {
  const { email, password } = req.body
  firebase
    .auth()
    .signInWithEmailAndPassword(email, password)
    .then(ref => {
      Queries.User.getOneUser('uid', ref.user.uid)
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
  Queries.User.getOneUser('email', req.body.email)
    .then(user => res.json({ user }))
    .catch(() => res.json({ user: null }))
})

router.post('/get_user_by_uid', (req, res) => {
  Queries.User.getOneUser('uid', req.body.uid)
    .then(user => res.json({ user: toAuthJSON(user) }))
    .catch(() => res.json({ user: null }))
})

router.post('/create_user', (req, res) => {
  const { email, fname, lname } = req.body
  const password = 'test1234'
  firebase
    .auth()
    .createUserWithEmailAndPassword(email, password)
    .then(ref => {
      Queries.User.createNewUser({
        email,
        fname,
        lname,
        uid: ref.user.uid
      }).then(user => {
        res.json({ user: toAuthJSON(user) })
      })
    })
    .catch(err => {
      res.json({ errors: { code: err.code, message: err.message } })
    })
})

module.exports = router
