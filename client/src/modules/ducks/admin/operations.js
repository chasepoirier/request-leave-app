import * as actions from './actions'
import * as utils from './utils'
import api from '../../api'

export const pendingApprovalsRequest = () => actions.pendingApprovalsRequest()
export const pendingApprovalsFail = error => actions.pendingApprovalsFail(error)
export const pendingApprovalsSuccess = requests =>
  actions.pendingApprovalsSuccess(requests)

export const fetchPendingApprovals = team => dispatch => {
  dispatch(pendingApprovalsRequest())
  return api.admin
    .getPendingApprovals(team)
    .then(requests => dispatch(pendingApprovalsSuccess(requests)))
    .catch(() => dispatch(pendingApprovalsFail(utils.errors.unknown)))
}
