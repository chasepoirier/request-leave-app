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

export const fetchPendingApprovals = () => dispatch => {
  dispatch(actions.pendingApprovalsRequest())
  return api.supervisor
    .getPendingApprovals()
    .then(requests => dispatch(actions.pendingApprovalsSuccess(requests)))
    .catch(() => dispatch(actions.pendingApprovalsFail(utils.errors.unknown)))
}

export const submitApprovalStatus = (ids, approved) => dispatch => {
  dispatch(actions.setApprovalStatusRequest())
  return api.supervisor
    .setApprovalStatus(ids, approved)
    .then(() => dispatch(actions.setApprovalStatusSuccess()))
    .catch(() =>
      dispatch(actions.setApprovalStatusFail('Error setting status'))
    )
}

export const updateUserRequest = data => dispatch => {
  dispatch(actions.updateUserRequest())
  return api.supervisor
    .updateUserInfo(data)
    .then(() => dispatch(actions.updateUserSuccess()))
    .catch(() => dispatch(actions.updateUserFail('Error updating user')))
}
