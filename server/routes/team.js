import express from 'express'
import { Queries } from '../utils'

const router = express.Router()

router.get('/get_all_teams', (req, res) => {
  Queries.team
    .getAllTeams()
    .then(teams => res.json({ teams }))
    .catch(error => res.json({ error }))
})

module.exports = router
