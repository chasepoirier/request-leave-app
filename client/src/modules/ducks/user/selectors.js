export const getUsername = user => {
  return user.username
}

export const sortLeaveAmountsByOrder = state => {
  const {
    requests: { leaveTypes },
    user: {
      info: { typeAmounts }
    }
  } = state

  const combined = typeAmounts.map(type => {
    const index = leaveTypes.all.map(t => t.id).indexOf(type.id)

    return { ...type, ...leaveTypes.all[index] }
  })

  return combined.sort((a, b) => {
    if (a.order > b.order) return 1
    if (a.order < b.order) return -1
    return 1
  })
}

export const sortSelectedLeaveAmountsByOrder = state => {
  const {
    requests: { leaveTypes },
    user: { selectedUser }
  } = state

  if (!selectedUser.loading) {
    const combined = selectedUser.info.typeAmounts.map(type => {
      const index = leaveTypes.all.map(t => t.id).indexOf(type.id)

      return { ...type, ...leaveTypes.all[index] }
    })

    return combined.sort((a, b) => {
      if (a.order > b.order) return 1
      if (a.order < b.order) return -1
      return 1
    })
  }
  return null
}

export const sortLogsByDate = logs =>
  logs.sort((a, b) => {
    const nameA = a.timestamp
    const nameB = b.timestamp
    if (nameA < nameB) return 1
    if (nameA > nameB) return -1
    return 0
  })
