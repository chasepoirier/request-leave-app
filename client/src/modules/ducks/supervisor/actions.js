import * as types from './types'

export const requestAddUser = () => ({
  type: types.REQUEST_ADD_USER
})

export const addUserSuccess = user => ({
  type: types.ADD_USER_SUCCESS,
  payload: {
    user
  }
})

export const addUserFail = error => ({
  type: types.ADD_USER_FAIL,
  payload: {
    error
  }
})
