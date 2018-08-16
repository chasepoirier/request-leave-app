import { firebase } from 'config'

export const logUserIn = googleUser => {
  const credential = firebase.auth.GoogleAuthProvider.credential(
    googleUser.getAuthResponse().id_token
  )

  return new Promise((resolve, reject) =>
    firebase
      .auth()
      .signInAndRetrieveDataWithCredential(credential)
      .then(ref => {
        resolve({
          name: ref.user.displayName,
          email: ref.user.email,
          uid: ref.user.uid
        })
      })
      .catch(() => {
        reject()
      })
  )
}

export const deleteCookies = () => {
  const cookies = document.cookie.split(';')
  const deleteCookie = cookiename => {
    const d = new Date()
    d.setDate(d.getDate() - 1)
    const expires = `;expires=${d}`
    const name = cookiename
    const value = ''
    document.cookie = `${name}=${value + expires}; path=/acc/html`
  }
  for (let i = 0; i < cookies.length; i += 1) {
    const spcook = cookies[i].split('=')
    deleteCookie(spcook[0])
  }
  window.location = '' // TO REFRESH THE PAGE
}

export const errors = {
  unauthorized:
    'No account found for this email, you need an admin to register an account for you.',
  unknown: 'Something went wrong... Try Again'
}
