import * as types from './types'

export const requestLogin = () => ({
  type: types.REQUEST_LOGIN
})

export const logUserOut = () => ({
  type: types.LOG_USER_OUT
})

export const userLoginSuccess = user => ({
  type: types.USER_LOGIN_SUCCESS,
  payload: {
    user
  }
})

export const userLoginFail = error => ({
  type: types.USER_LOGIN_FAIL,
  payload: {
    error
  }
})

export const noCurrentUser = () => ({
  type: types.NO_CURRENT_USER
})

export const requestUser = () => ({
  type: types.REQUEST_USER
})

export const setCurrentUser = user => ({
  type: types.SET_CURRENT_USER,
  payload: {
    user
  }
})
