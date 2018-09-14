import * as actions from './actions'
import * as utils from './utils'
import api from '../../api'

const pendingApprovalsRequest = () => actions.pendingApprovalsRequest()
const pendingApprovalsFail = error => actions.pendingApprovalsFail(error)
const pendingApprovalsSuccess = requests =>
  actions.pendingApprovalsSuccess(requests)

export const fetchPendingApprovals = team => dispatch => {
  dispatch(pendingApprovalsRequest())
  return api.admin
    .getPendingApprovals(team)
    .then(requests => dispatch(pendingApprovalsSuccess(requests)))
    .catch(() => dispatch(pendingApprovalsFail(utils.errors.unknown)))
}

const setApprovalStatusRequest = () => actions.setApprovalStatusRequest()
const setApprovalStatusSuccess = () => actions.setApprovalStatusSuccess()
const setApprovalStatusFail = error => actions.setApprovalStatusFail(error)

export const submitApprovalStatus = (ids, approved) => dispatch => {
  dispatch(setApprovalStatusRequest())
  return api.admin
    .setApprovalStatus(ids, approved)
    .then(() => dispatch(setApprovalStatusSuccess()))
    .catch(() => dispatch(setApprovalStatusFail('Error setting status')))
}

export const submitQueryRequests = data => dispatch => {
  dispatch(actions.queryRequests())
  return api.admin
    .getRequestsByQuery(data)
    .then(requests => dispatch(actions.queryRequestsSuccess(requests)))
    .catch(() => dispatch(actions.queryRequestsFail('Error')))
}
