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
