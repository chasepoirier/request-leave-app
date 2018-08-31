import * as actions from './actions'
import * as utils from './utils'
import api from '../../api'

export const requestAddUser = () => actions.requestAddUser()
export const requestDeleteUser = () => actions.requestDeleteUser()

export const submitAddUser = user => dispatch => {
  dispatch(requestAddUser())
  return api.supervisor
    .addUserToDB(user)
    .then(newUser => dispatch(actions.addUserSuccess(newUser)))
    .catch(() => dispatch(actions.addUserFail(utils.errors.userExists)))
}

export const submitDeleteUser = id => dispatch => {
  dispatch(requestDeleteUser())
  return api.supervisor
    .deleteUserFromDB(id)
    .then(res => {
      dispatch(actions.deleteUserSuccess())
      return res
    })
    .catch(() => dispatch(actions.deleteUserFail('error deleting user')))
}

export const pendingApprovalsRequest = () => actions.pendingApprovalsRequest()
export const pendingApprovalsFail = error => actions.pendingApprovalsFail(error)
export const pendingApprovalsSuccess = requests =>
  actions.pendingApprovalsSuccess(requests)

export const fetchPendingApprovals = () => dispatch => {
  dispatch(pendingApprovalsRequest())
  return api.supervisor
    .getPendingApprovals()
    .then(requests => dispatch(pendingApprovalsSuccess(requests)))
    .catch(() => dispatch(pendingApprovalsFail(utils.errors.unknown)))
}

const setApprovalStatusRequest = () => actions.setApprovalStatusRequest()
const setApprovalStatusSuccess = () => actions.setApprovalStatusSuccess()
const setApprovalStatusFail = error => actions.setApprovalStatusFail(error)

export const submitApprovalStatus = (ids, approved) => dispatch => {
  dispatch(setApprovalStatusRequest())
  return api.supervisor
    .setApprovalStatus(ids, approved)
    .then(() => dispatch(setApprovalStatusSuccess()))
    .catch(() => dispatch(setApprovalStatusFail('Error setting status')))
}
