/* eslint-disable */
const fs = require('fs')
const readline = require('readline')
const { google } = require('googleapis')

// If modifying these scopes, delete token.json.
const SCOPES = ['https://www.googleapis.com/auth/calendar']
const TOKEN_PATH = 'token.json'

const credentials = {
  installed: {
    client_id: process.env.GLCOUD_WEB_CLIENT_ID,
    project_id: 'manager-9eaf5',
    auth_uri: 'https://accounts.google.com/o/oauth2/auth',
    token_uri: 'https://www.googleapis.com/oauth2/v3/token',
    auth_provider_x509_cert_url: 'https://www.googleapis.com/oauth2/v1/certs',
    client_secret: process.env.GLCOUD_WEB_CLIENT_SECRET,
    redirect_uris: ['urn:ietf:wg:oauth:2.0:oob', 'http://localhost']
  }
}

const authorize = () =>
  new Promise((resolve, reject) => {
    const { client_secret, client_id, redirect_uris } = credentials.installed
    const oAuth2Client = new google.auth.OAuth2(
      client_id,
      client_secret,
      redirect_uris[0]
    )

    // Check if we have previously stored a token.
    fs.readFile(TOKEN_PATH, (err, token) => {
      if (err) return getAccessToken(oAuth2Client).then(res => resolve(res))
      oAuth2Client.setCredentials(JSON.parse(token))
      resolve(oAuth2Client)
    })
  })

const getAccessToken = oAuth2Client =>
  new Promise((resolve, reject) => {
    const authUrl = oAuth2Client.generateAuthUrl({
      access_type: 'offline',
      scope: SCOPES
    })
    console.log('Authorize this app by visiting this url:', authUrl)
    const rl = readline.createInterface({
      input: process.stdin,
      output: process.stdout
    })
    rl.question('Enter the code from that page here: ', code => {
      rl.close()
      oAuth2Client.getToken(code, (err, token) => {
        if (err) return console.error('Error retrieving access token', err)
        oAuth2Client.setCredentials(token)
        // Store the token to disk for later program executions
        fs.writeFile(TOKEN_PATH, JSON.stringify(token), err => {
          if (err) console.error(err)
          console.log('Token stored to', TOKEN_PATH)
        })
        resolve(oAuth2Client)
      })
    })
  })

export default authorize
