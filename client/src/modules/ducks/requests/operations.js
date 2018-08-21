import * as actions from './actions'
import api from '../../api'

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
    .then(requests => {
      console.log(requests)
      dispatch(userRequestsSuccess({ id, requests }))
    })
    .catch(error => dispatch(userRequetsFail(error)))
}
