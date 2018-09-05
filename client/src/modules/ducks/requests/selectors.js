export function getUsername(user) {
  return user.username
}

/* eslint-disable no-param-reassign */
export const getOneRequest = (id, requests) =>
  requests.reduce((prev, curr) => {
    if (curr.id === id.id) {
      prev = curr
    }
    return prev
  })

export const getOnlyTypesWithLimit = types => {
  if (!types.loading) {
    return { ...types, all: types.all.filter(type => !type.unlimited) }
  }
  return types
}

export const getNonPendingRequests = requests =>
  requests.filter(request => {
    const { admin, supervisor } = request.approval
    if (!admin.pending && !supervisor.pending) {
      return true
    }
    return false
  })

export const getPendingRequests = requests =>
  requests.filter(request => {
    const { admin, supervisor } = request.approval
    if (admin.pending || supervisor.pending) {
      return true
    }
    return false
  })

export const sortByDateCreated = requests =>
  requests.sort((a, b) => {
    const nameA = a.timestamp
    const nameB = b.timestamp
    if (nameA < nameB) return 1
    if (nameA > nameB) return -1
    return 0
  })
