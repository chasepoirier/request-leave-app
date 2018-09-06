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

export const updateLeaveAmount = ({ id, amount }) => ({
  type: types.UPDATE_LEAVE_AMOUNT,
  payload: {
    id,
    amount
  }
})

export const getUserRequest = () => ({
  type: types.GET_USER_REQUEST
})
export const getUserFail = error => ({
  type: types.GET_USER_FAIL,
  payload: {
    error
  }
})
export const getUserSuccess = user => ({
  type: types.GET_USER_SUCCESS,
  payload: {
    user
  }
})

export const getUserLogsRequest = () => ({
  type: types.GET_USER_LOGS_REQUEST
})
export const getUserLogsSuccess = logs => ({
  type: types.GET_USER_LOGS_SUCCESS,
  payload: {
    logs
  }
})
export const getUserLogsFail = error => ({
  type: types.GET_USER_LOGS_FAIL,
  payload: {
    error
  }
})
