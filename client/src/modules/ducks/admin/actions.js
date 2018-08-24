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
