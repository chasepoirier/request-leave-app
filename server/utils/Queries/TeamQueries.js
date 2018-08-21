import { db } from '../../firebase'

const getUsersFromTeam = team =>
  new Promise(resolve =>
    db
      .collection('teams')
      .doc(team.id)
      .collection('users')
      .get()
      .then(userSnap => {
        const users = []
        userSnap.forEach(user => users.push(user.data()))
        resolve({
          name: team.data().name,
          id: team.id,
          users
        })
      })
  )

const getAllTeams = () =>
  new Promise((resolve, reject) => {
    db.collection('teams')
      .get()
      .then(teamSnap => {
        const teams = []
        teamSnap.forEach(team => teams.push(getUsersFromTeam(team)))
        Promise.all(teams).then(res => resolve(res))
      })
      .catch(err => reject(err))
  })

const addUserToTeam = (teamID, user) =>
  new Promise((resolve, reject) => {
    db.collection('teams')
      .doc(teamID)
      .collection('users')
      .add({
        name: user.name,
        status: user.status,
        email: user.email,
        id: user.id
      })
      .then(ref => resolve(ref))
      .catch(error => reject(error))
  })

export { getAllTeams, addUserToTeam }
