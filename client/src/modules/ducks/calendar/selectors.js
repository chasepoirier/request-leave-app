import moment from 'moment'

const formatDates = req => {
  const { startDate, endDate, startTime, endTime } = req
  if (startTime) {
    return {
      startDate: moment(startTime)
        .set({ s: 0 })
        .toDate(),
      endDate: moment(endTime)
        .set({ s: 0 })
        .toDate()
    }
  }
  return {
    startDate: moment(startDate)
      .set({ h: 9, m: 0, s: 0 })
      .toDate(),
    endDate: moment(endDate)
      .set({ h: 17, m: 0, s: 0 })
      .toDate()
  }
}

const setCategory = (state, req) => {
  const { id, team } = state.user.info
  if (id === req.uId) {
    return 'self'
  }
  if (team === req.teamId) {
    return 'team'
  }
  return 'all'
}

export const formatRequests = state => {
  const { requests } = state.calendar

  if (!requests.loading) {
    return requests.all.map(req => {
      const newDates = formatDates(req)
      return {
        ...req,
        title: `${req.name.lname}, ${req.name.fname}`,
        startDate: newDates.startDate,
        endDate: newDates.endDate,
        category: setCategory(state, req)
      }
    })
  }
  return []
}
