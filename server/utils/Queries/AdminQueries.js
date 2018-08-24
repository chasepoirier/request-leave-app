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
                .where('approval.admin', '==', false)
                .get()
                .then(snaps => {
                  const allRequests = []
                  snaps.forEach(snap => {
                    allRequests.push({
                      ...snap.data(),
                      uid: userRef.id,
                      name: user.data().name
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
