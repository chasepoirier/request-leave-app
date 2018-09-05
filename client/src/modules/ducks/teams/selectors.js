export const sortTeamsAlphabetically = teams =>
  teams.sort((a, b) => {
    const nameA = a.name.toLowerCase()
    const nameB = b.name.toLowerCase()
    if (nameA < nameB) return -1
    if (nameA > nameB) return 1
    return 0
  })

export const getTeamById = state => {
  const { user, teams } = state
  if (!teams.loading && !user.loading) {
    return teams.all.reduce((prev, curr) => {
      if (curr.id === user.info.team) {
        prev = curr
      }
      return prev
    }, {})
  }
  return {}
}
