export function getUsername(user) {
  return user.username
}

/* eslint-disable no-param-reassign */
export const getOneRequest = (id, requests) =>
  requests.reduce((prev, curr) => {
    if (curr.id === id) {
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
