import express from 'express'
import { google } from 'googleapis'
import { calendar } from '../utils/Queries'
import authorize from '../gcalendar'
import { db } from '../firebase'

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

router.get('/get_excluded_dates', (req, res) => {
  db.collection('excludedDates')
    .get()
    .then(snaps => {
      const dates = []
      snaps.forEach(snap => dates.push({ ...snap.data(), id: snap.id }))
      res.json({ dates })
    })
    .catch(error => res.json({ error }))
})

router.post('/add_excluded_date', (req, res) => {
  db.collection('excludedDates')
    .add({ date: req.body.date })
    .then(() => res.json({ success: true }))
    .catch(() => res.json({ success: false }))
})

router.post('/delete_excluded_date', (req, res) => {
  db.collection('excludedDates')
    .doc(req.body.id)
    .delete()
    .then(() => res.json({ success: true }))
    .catch(() => res.json({ success: false }))
})

module.exports = router
