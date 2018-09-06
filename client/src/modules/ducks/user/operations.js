import { auth } from 'config'
import setAuthHeaders from 'utils/setAuthHeaders'
import * as actions from './actions'
import * as utils from './utils'
import api from '../../api'

export const loginRequest = actions.requestLogin()

export const requestUser = actions.requestUser()

export const noCurrentUser = actions.noCurrentUser()

export const logUserOut = () => dispatch => {
  auth.signOut()
  utils.deleteCookies()
  localStorage.removeItem('uid')
  localStorage.removeItem('token')
  dispatch(actions.logUserOut())
}

export const fetchCurrentUser = () => dispatch => {
  const uid = localStorage.getItem('uid')
  dispatch(requestUser)
  return api.user
    .getUserByUid(uid)
    .then(user => {
      setAuthHeaders(user.token)
      localStorage.setItem('token', user.token)
      return dispatch(actions.setCurrentUser(user))
    })
    .catch(() => dispatch(noCurrentUser))
}

export const submitLoginRequest = googleUser => dispatch => {
  dispatch(loginRequest)
  return api.user
    .getUserByEmail(googleUser.profileObj.email)
    .then(() =>
      utils
        .logUserIn(googleUser)
        .then(user => {
          localStorage.setItem('uid', user.uid)
          dispatch(actions.userLoginSuccess(user))
          return dispatch(fetchCurrentUser())
        })
        .catch(() => dispatch(actions.userLoginFail(utils.errors.unknown)))
    )
    .catch(() => dispatch(actions.userLoginFail(utils.errors.unauthorized)))
}

export const updateLeaveAmount = ({ id, amount }) =>
  actions.updateLeaveAmount({ id, amount })

export const getUserByIdRequest = id => dispatch => {
  dispatch(actions.getUserRequest())
  return api.user.getUserById(id).then(user => {
    if (user) {
      dispatch(actions.getUserSuccess(user))
    } else {
      dispatch(actions.getUserFail('Error getting user'))
    }
  })
}

export const getUserLogsRequest = id => dispatch => {
  dispatch(actions.getUserLogsRequest())
  return api.user.getUserLogs(id).then(logs => {
    if (logs) {
      dispatch(actions.getUserLogsSuccess(logs))
    } else {
      dispatch(actions.getUserLogsFail('Error getting logs'))
    }
  })
}
