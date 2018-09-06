import { db } from '../../firebase'

export const findPendingApprovals = (teams, team) =>
  teams
    .doc(team.id)
    .collection('users')
    .get()
    .then(userRefs => {
      const allUsers = []
      userRefs.forEach(user => {
        allUsers.push(
          teams
            .doc(team.id)
            .collection('users')
            .doc(user.id)
            .collection('requests')
            .where('approval.supervisor.pending', '==', true)
            .get()
            .then(requests => {
              const allRequests = []
              requests.forEach(request => {
                allRequests.push({
                  ...request.data(),
                  teamUid: user.id,
                  userUid: user.data().id,
                  name: user.data().name,
                  id: request.id,
                  team: team.data().name,
                  teamId: team.id
                })
              })
              return allRequests
            })
        )
      })
      return Promise.all(allUsers).then(refs => refs)
    })

export const updateTeamInUserRef = user =>
  db
    .collection('users')
    .doc(user.id)
    .update({ team: user.team.id })

export const migrateUserToNewTeam = (user, team) =>
  new Promise((resolve, reject) => {
    const allPromises = []
    db.collection('teams')
      .doc(team.oldTeam)
      .collection('users')
      .where('id', '==', user.id)
      .get()
      .then(userRef => {
        allPromises.push(
          userRef.forEach(ref => {
            db.collection('teams')
              .doc(team.oldTeam)
              .collection('users')
              .doc(ref.id)
              .collection('requests')
              .get()
              .then(requests => {
                const all = []
                requests.forEach(request => {
                  all.push({ ...request.data(), id: request.id })
                })
                return all
              })
              .then(userRequests => {
                const dataToMigrate = {
                  user: { ...ref.data() },
                  requests: userRequests
                }

                db.collection('teams')
                  .doc(team.oldTeam)
                  .collection('users')
                  .doc(ref.id)
                  .collection('requests')
                  .get()
                  .then(allReqs => allReqs.forEach(al => al.ref.delete()))
                  .then(() => ref.ref.delete())

                db.collection('teams')
                  .doc(user.team.id)
                  .collection('users')
                  .add({ ...dataToMigrate.user })
                  .then(newUser => {
                    dataToMigrate.requests.forEach(newRequest => {
                      allPromises.push(
                        db
                          .collection('teams')
                          .doc(user.team.id)
                          .collection('users')
                          .doc(newUser.id)
                          .collection('requests')
                          .doc(newRequest.id)
                          .set(newRequest)
                      )
                    })
                  })
              })
          })
        )
      })
    Promise.all(allPromises)
      .then(() => resolve(true))
      .catch(() => reject())
  })
