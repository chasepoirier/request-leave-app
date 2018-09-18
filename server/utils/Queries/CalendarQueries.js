import moment from 'moment'
import md5 from 'md5'
import { db } from '../../firebase'

export const renderTypes = types => types.map(t => `${t.type.toUpperCase()} `)

export const formatEvent = event => {
  const encoded = md5(event.requestId)
  return {
    id: encoded,
    summary: `${event.name.lname}, ${event.name.fname}`,
    description: `${renderTypes(event.types)}- ${event.reason}`,
    start: {
      dateTime: event.startDate,
      timeZone: 'America/New_York'
    },
    end: {
      dateTime: event.endDate,
      timeZone: 'America/New_York'
    }
  }
}

export const createNewEvent = (gCal, event) =>
  new Promise(resolve => {
    gCal.events.insert(
      {
        calendarId: 'primary',
        resource: formatEvent(event)
      },
      (err, response) => resolve(response.data)
    )
  })

export const formatDates = req => {
  const { startDate, endDate, startTime, endTime } = req
  if (startTime) {
    return {
      ...req,
      startDate: moment(startTime)
        .set({ s: 0 })
        .toDate(),
      endDate: moment(endTime)
        .set({ s: 0 })
        .toDate()
    }
  }
  return {
    ...req,
    startDate: moment(startDate)
      .set({ h: 9, m: 0, s: 0 })
      .toDate(),
    endDate: moment(endDate)
      .set({ h: 17, m: 0, s: 0 })
      .toDate()
  }
}

/* eslint no-param-reassign: off */
export const checkIfSameEvent = (req, calEvents) =>
  calEvents.reduce((prev, curr) => {
    if (curr.id === md5(req.requestId)) {
      prev = true
    }
    return prev
  }, false)

export const returnListOfNewEvents = (calEvents, requests) => {
  const newRequests = requests.filter(req => {
    const isSame = checkIfSameEvent(req, calEvents)
    if (!isSame) {
      return true
    }
    return false
  })

  return newRequests.map(req => formatDates(req))
}

export const getAllApprovedRequests = () =>
  new Promise((resolve, reject) => {
    db.collection('users')
      .get()
      .then(users => {
        const promises = []
        users.forEach(snap => {
          promises.push(
            db
              .collection('users')
              .doc(snap.id)
              .collection('requests')
              .where('approval.admin.pending', '==', false)
              .where('approval.supervisor.pending', '==', false)
              .where('approval.admin.approved', '==', true)
              .where('approval.supervisor.approved', '==', true)
              .get()
              .then(requests => {
                const all = []
                requests.forEach(request =>
                  all.push({
                    ...request.data(),
                    uId: snap.id,
                    teamId: snap.data().team,
                    name: snap.data().name,
                    email: snap.data().email,
                    requestId: request.id
                  })
                )
                return all
              })
          )
        })

        Promise.all(promises)
          .then(requests => {
            const flattenDeep = reqs =>
              reqs.reduce(
                (acc, val) =>
                  Array.isArray(val)
                    ? acc.concat(flattenDeep(val))
                    : acc.concat(val),
                []
              )
            flattenDeep(requests)

            const merged = [].concat(...requests)

            resolve([].concat(merged))
          })
          .catch(err => reject(err))
      })
  })
