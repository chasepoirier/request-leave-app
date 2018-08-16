import { db } from '../../firebase'

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
            fname: user.docs[0].data().fname,
            uid: user.docs[0].data().uid,
            lname: user.docs[0].data().lname,
            admin: user.docs[0].data().admin,
            super: user.docs[0].data().super
          })
        } else {
          reject()
        }
      })
      .catch(err => reject(err))
  })

const createNewUser = user =>
  new Promise((resolve, reject) => {
    const { email, fname, lname, uid } = user
    db.collection('users')
      .add({
        uid,
        email,
        fname,
        lname,
        createdAt: Date.now()
      })
      .then(ref => {
        resolve({ id: ref.id, email, fname, lname })
      })
      .catch(err => reject(err))
  })

export { getOneUser, createNewUser }
