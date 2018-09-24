import moment from 'moment'
import Filters from '../../../utils/FilterTypes'

const filterByNameAsc = requests =>
  requests.sort((a, b) => {
    if (a.name.lname < b.name.lname) return -1
    if (a.name.lname > b.name.lname) return 1
    return 0
  })

const filterByNameDesc = requests =>
  requests.sort((a, b) => {
    if (a.name.lname > b.name.lname) return -1
    if (a.name.lname < b.name.lname) return 1
    return 0
  })

const filterByRequestType = requests =>
  requests.sort((a, b) => {
    if (a.types[0].type > b.types[0].type) return 1
    if (a.types[0].type < b.types[0].type) return -1
    return 0
  })

const filterByStartDate = requests =>
  requests.sort((a, b) => {
    const diffA = moment().diff(moment(a.startDate))
    const diffB = moment().diff(moment(b.startDate))
    if (diffA > diffB) return -1
    if (diffA < diffB) return 1
    return 0
  })

const filterByEndDate = requests =>
  requests.sort((a, b) => {
    const diffA = moment().diff(moment(a.endDate))
    const diffB = moment().diff(moment(b.endDate))
    if (diffA > diffB) return -1
    if (diffA < diffB) return 1
    return 0
  })

const filterByApproval = requests =>
  requests.sort((a, b) => {
    const typeA = determineType(a.approval)
    const typeB = determineType(b.approval)
    if (typeA > typeB) return 1
    if (typeA < typeB) return -1
    return 0
  })

const determineType = type => {
  if (type.admin.pending) return 1
  if (type.supervisor.pending) return 2
  if (!type.admin.approved) return 3
  if (!type.supervisor.approved) return 4
  if (type.admin.approved && type.supervisor.approved) return 5
}

export const filterRequests = (type, requests) => {
  switch (type) {
    case Filters.nameUp:
      return filterByNameAsc(requests)
    case Filters.nameDown:
      return filterByNameDesc(requests)
    case Filters.startDate:
      return filterByStartDate(requests)
    case Filters.endDate:
      return filterByEndDate(requests)
    case Filters.requestTypes:
      return filterByRequestType(requests)
    case Filters.approval:
      return filterByApproval(requests)
    default:
      return requests
  }
}
