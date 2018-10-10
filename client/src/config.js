import firebase from 'firebase/app'
import 'firebase/auth'
import 'firebase/firestore'

// ----------- MOMENT CONFIG --------------

// ----------- FIREBASE CONFIG --------------

const config = {
  apiKey: 'AIzaSyAAXDkzQt7ifmiPcgN0Yo698DElFMps22A',
  authDomain: 'manager-9eaf5.firebaseapp.com',
  databaseURL: 'https://manager-9eaf5.firebaseio.com',
  projectId: 'manager-9eaf5',
  storageBucket: 'manager-9eaf5.appspot.com',
  messagingSenderId: '1025860778836'
}

firebase.initializeApp(config)

const apiBase = 'api'

const auth = firebase.auth()
const db = firebase.firestore()
const settings = { timestampsInSnapshots: true }
db.settings(settings)

export { apiBase, auth, firebase, db }
