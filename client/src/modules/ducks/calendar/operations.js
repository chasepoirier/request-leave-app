import * as actions from './actions'
import api from '../../api'

export const fetchAllApprovedRequests = () => dispatch => {
  dispatch(actions.allApprovalsRequest())
  return api.calendar
    .getAllApprovedRequests()
    .then(requests => dispatch(actions.allApprovalsSuccess(requests)))
    .catch(err => dispatch(actions.allApprovalsFail(err)))
}
