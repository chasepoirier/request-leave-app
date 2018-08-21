import express from 'express'
import { toAuthJSON, Queries } from '../utils'
import { db, auth } from '../firebase'

const router = express.Router()

router.post('/get_user_by_uid', (req, res) => {
  Queries.user
    .getOneUser('uid', req.body.uid)
    .then(user => res.json({ user: toAuthJSON(user) }))
    .catch(() => res.json({ user: null }))
})

router.post('/add_user', (req, res) => {
  const { email, fname, lname, status, team } = req.body.user
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
      user.ref.delete()
      return user.data()
    })
    .then(user => {
      auth.deleteUser(user.uid)
      db.collection('teams')
        .doc(user.team)
        .collection('users')
        .where('id', '==', req.body.id)
        .get()
        .then(snap => snap.forEach(ref => ref.ref.delete()))
        .then(() => res.json({ success: true }))
    })
})

module.exports = router
