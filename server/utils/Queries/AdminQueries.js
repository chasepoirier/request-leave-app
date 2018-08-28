const getPendingApprovalsByteam = teamRef =>
  new Promise(resolve => {
    teamRef.get().then(users => {
      const requests = []
      users.forEach(userRef => {
        requests.push(
          teamRef
            .doc(userRef.id)
            .get()
            .then(user =>
              teamRef
                .doc(userRef.id)
                .collection('requests')
                .where('approval.admin.pending', '==', true)
                .get()
                .then(snaps => {
                  const allRequests = []
                  snaps.forEach(snap => {
                    allRequests.push({
                      ...snap.data(),
                      teamUid: userRef.id,
                      userUid: user.data().id,
                      name: user.data().name,
                      id: snap.id
                    })
                  })
                  return allRequests
                })
            )
        )
      })

      Promise.all(requests).then(data => resolve([].concat(...data)))
    })
  })

export { getPendingApprovalsByteam }
