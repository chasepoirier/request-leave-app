import express from 'express'
import { google } from 'googleapis'
import { calendar } from '../utils/Queries'
import authorize from '../gcalendar'

const router = express.Router()

router.get('/get_all_approved_requests', (req, res) => {
  calendar.getAllApprovedRequests().then(requests => res.json({ requests }))
})

router.get('/sync_requests_to_calendar', (req, res) => {
  calendar.getAllApprovedRequests().then(requests => {
    authorize().then(auth => {
      const gCal = google.calendar({ version: 'v3', auth })
      gCal.events.list({ calendarId: 'primary' }, (err, response) => {
        const { items } = response.data
        const newEvents = calendar.returnListOfNewEvents(items, requests)

        const promises = []

        newEvents.forEach(event =>
          promises.push(calendar.createNewEvent(gCal, event))
        )
        Promise.all(promises).then(refs => {
          res.json({ eventsAdded: refs.length })
        })
      })
    })
  })
})

module.exports = router
