import * as types from './types'

export const allApprovalsRequest = () => ({
  type: types.GET_APPROVED_REQUEST
})
export const allApprovalsSuccess = requests => ({
  type: types.GET_APPROVED_SUCCESS,
  payload: {
    requests
  }
})
export const allApprovalsFail = error => ({
  type: types.GET_APPROVED_FAIL,
  payload: {
    error
  }
})
