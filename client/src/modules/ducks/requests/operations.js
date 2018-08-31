import * as actions from './actions'
import api from '../../api'
import { getOneRequest } from './selectors'

export const requestLeaveSubmit = () => actions.leaveRequestSubmit()
export const requestLeaveSuccess = () => actions.leaveRequestSuccess()
export const requestLeaveFail = error => actions.leaveRequestFail(error)

export const submitRequestLeave = (user, request) => dispatch => {
  dispatch(requestLeaveSubmit())
  return api.requests
    .createNewRequest(user, request)
    .then(() => {
      dispatch(requestLeaveSuccess())
      return true
    })
    .catch(() =>
      dispatch(requestLeaveFail('Something went wrong... try again'))
    )
}

export const requestUserRequests = () => actions.requestUserRequests()
export const userRequetsFail = error => actions.userRequestsFail(error)
export const userRequestsSuccess = ({ id, requests }) =>
  actions.userRequestsSuccess({ id, requests })

export const submitRequestForUserRequests = id => dispatch => {
  dispatch(requestUserRequests())
  return api.requests
    .fetchAllUserRequests(id)
    .then(requests => dispatch(userRequestsSuccess({ id, requests })))
    .catch(error => dispatch(userRequetsFail(error)))
}

export const deleteRequestSubmit = () => actions.deleteRequestSubmit()
export const deleteRequestFail = error => actions.deleteRequestFail(error)
export const deleteRequestSuccess = () => actions.deleteRequestSuccess()

export const submitRequestToDeleteRequest = ({
  userID,
  requestID,
  teamID
}) => dispatch => {
  dispatch(deleteRequestSuccess())
  return api.requests
    .deleteRequest({ userID, requestID, teamID })
    .then(() => dispatch(deleteRequestSuccess()))
    .catch(() => dispatch(deleteRequestFail('Error deleting request')))
}

export const setCurrentRequest = (id, requests) => dispatch => {
  dispatch(actions.currentRequest(getOneRequest(id, requests)))
}

export const leaveTypesRequest = () => actions.leaveTypesRequest()
export const leaveTypesFail = error => actions.leaveTypesFail(error)
export const leaveTypesSuccess = leaveTypes =>
  actions.leaveTypesSuccess(leaveTypes)

export const fetchAllLeaveTypes = () => dispatch => {
  dispatch(leaveTypesRequest())
  return api.requests
    .fetchAllLeaveTypes()
    .then(leaveTypes => dispatch(leaveTypesSuccess(leaveTypes)))
    .catch(() => dispatch(leaveTypesFail('Error getting types')))
}
