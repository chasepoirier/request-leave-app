import dotenv from 'dotenv'
import firebase from 'firebase'
import admin from 'firebase-admin'
// // import gcloud from '@google-cloud/storage';

dotenv.config()

const config = {
  apiKey: process.env.GCLOUND_API_KEY,
  authDomain: 'manager-9eaf5.firebaseapp.com',
  databaseURL: 'https://manager-9eaf5.firebaseio.com',
  projectId: process.env.GCLOUD_PROJECT_ID,
  storageBucket: 'manager-9eaf5.appspot.com',
  messagingSenderId: process.env.GCLOUND_MESSAGING_SENDER_ID
}

const serviceAccount = {
  type: 'service_account',
  project_id: process.env.GCLOUD_PROJECT_ID,
  private_key_id: process.env.GCLOUD_PRIVATE_KEY_ID,
  private_key: process.env.GCLOUD_PRIVATE_KEY.replace(/\\n/g, '\n'),
  client_email: process.env.GCLOUD_CLIENT_EMAIL,
  client_id: process.env.GCLOUD_CLIENT_ID,
  auth_uri: 'https://accounts.google.com/o/oauth2/auth',
  token_uri: 'https://accounts.google.com/o/oauth2/token',
  auth_provider_x509_cert_url: 'https://www.googleapis.com/oauth2/v1/certs',
  client_x509_cert_url:
    'https://www.googleapis.com/robot/v1/metadata/x509/advance-63ed2%40appspot.gserviceaccount.com'
}

firebase.initializeApp(config)

admin.initializeApp({
  credential: admin.credential.cert(serviceAccount)
})

const db = admin.firestore()
const settings = { timestampsInSnapshots: true }
db.settings(settings)

export { firebase, db }
