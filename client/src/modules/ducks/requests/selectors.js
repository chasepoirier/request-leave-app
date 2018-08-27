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
