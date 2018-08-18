import { db } from '../../firebase'

const getAllTeams = () =>
  new Promise((resolve, reject) => {
    db.collection('teams')
      .get()
      .then(snap => {
        const teams = []
        snap.forEach(team =>
          teams.push({
            name: team.data().name,
            id: team.id
          })
        )
        resolve(teams)
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
