import * as types from './types'

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

export const setApprovalStatusRequest = () => ({
  type: types.SET_APPROVAL_STATUS_REQUEST
})
export const setApprovalStatusFail = error => ({
  type: types.SET_APPROVAL_STATUS_FAIL,
  payload: {
    error
  }
})
export const setApprovalStatusSuccess = () => ({
  type: types.SET_APPROVAL_STATUS_SUCCESS
})
