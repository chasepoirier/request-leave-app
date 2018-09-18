import cron from 'node-cron'
import { google } from 'googleapis'
import { calendar } from '../utils/Queries'
import authorize from '../gcalendar'

export const dailyTasks = cron.schedule('0 1 * * *', () => {
  calendar.getAllApprovedRequests().then(requests => {
    authorize().then(auth => {
      const gCal = google.calendar({ version: 'v3', auth })
      gCal.events.list({ calendarId: 'primary' }, (err, response) => {
        const { items } = response.data
        const newEvents = calendar.returnListOfNewEvents(items, requests)
        newEvents.forEach(event => calendar.createNewEvent(gCal, event))
      })
    })
  })
})
