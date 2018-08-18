import express from 'express'
import { toAuthJSON, Queries } from '../utils'

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

module.exports = router
