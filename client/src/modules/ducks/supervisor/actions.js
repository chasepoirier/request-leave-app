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

export const requestDeleteUser = () => ({
  type: types.REQUEST_DELETE_USER
})
export const deleteUserSuccess = () => ({
  type: types.DELETE_USER_SUCCESS
})
export const deleteUserFail = error => ({
  type: types.DELETE_USER_FAIL,
  payload: {
    error
  }
})

export const pendingApprovalsRequest = () => ({
  type: types.PENDING_APPROVALS_REQUEST
})
export const pendingApprovalsSuccess = requests => ({
  type: types.PENDING_APPROVALS_SUCCESS,
  payload: {
    requests
  }
})
export const pendingApprovalsFail = error => ({
  type: types.PENDING_APPROVALS_FAIL,
  payload: {
    error
  }
})
