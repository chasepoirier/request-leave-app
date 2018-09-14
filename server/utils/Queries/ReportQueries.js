import moment from 'moment'

const findIndexOfId = (array, id) => array.map(u => u.id).indexOf(id)

/* eslint no-param-reassign:off */
const checkIfTypeExists = (selected, types) =>
  selected.reduce((prev, curr) => {
    const index = types.map(t => t.type).indexOf(curr.id)
    if (index !== -1) {
      prev = true
    }
    return prev
  }, false)

export const filterBySelectedUsers = (requests, users) =>
  requests.filter(req => {
    const index = findIndexOfId(users, req.userID)
    if (index !== -1) return true
    return false
  })

export const filterBySelectedTypes = (requests, types) =>
  requests.filter(req => {
    const exists = checkIfTypeExists(types, req.types)
    return exists
  })

export const filterByDateRange = (requests, start, end) =>
  requests.filter(req => {
    const valid = moment(req.startDate).isBetween(start, end, 'days', '[]')
    return valid
  })

export const filterByTeam = (requests, teams) =>
  requests.filter(req => {
    const index = findIndexOfId(teams, req.teamID)
    if (index !== -1) return true
    return false
  })
