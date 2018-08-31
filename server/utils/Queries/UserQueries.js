import { db, firebase } from '../../firebase'

const getOneUser = (query, value) =>
  new Promise((resolve, reject) => {
    db.collection('users')
      .where(query, '==', value)
      .get()
      .then(user => {
        if (user.docs[0] !== undefined) {
          resolve({
            id: user.docs[0].id,
            email: user.docs[0].data().email,
            uid: user.docs[0].data().uid,
            name: user.docs[0].data().name,
            status: user.docs[0].data().status,
            team: user.docs[0].data().team,
            typeAmounts: user.docs[0].data().typeAmounts
          })
        } else {
          reject()
        }
      })
      .catch(err => reject(err))
  })

const createNewUser = user =>
  new Promise((resolve, reject) => {
    const { email, name, status, uid, team, typeAmounts } = user
    db.collection('users')
      .add({
        uid,
        email,
        name,
        team,
        status,
        typeAmounts,
        createdAt: Date.now()
      })
      .then(ref => {
        resolve({ id: ref.id, email, name, status, team, typeAmounts, uid })
      })
      .catch(err => reject(err))
  })

const signUserIn = credentials =>
  new Promise((resolve, reject) => {
    const { email, password } = credentials
    firebase
      .auth()
      .createUserWithEmailAndPassword(email, password)
      .then(ref => {
        resolve(ref)
      })
      .catch(err => {
        reject(err)
      })
  })

export { getOneUser, createNewUser, signUserIn }
