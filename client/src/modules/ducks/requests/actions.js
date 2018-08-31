import * as types from './types'

export const leaveRequestSubmit = () => ({
  type: types.LEAVE_REQUEST_SUBMIT
})
export const leaveRequestSuccess = () => ({
  type: types.LEAVE_REQUEST_SUCCESS
})
export const leaveRequestFail = error => ({
  type: types.LEAVE_REQUEST_FAIL,
  payload: {
    error
  }
})

export const requestUserRequests = () => ({
  type: types.REQUEST_USER_REQUESTS
})
export const userRequestsSuccess = ({ id, requests }) => ({
  type: types.USER_REQUESTS_SUCCESS,
  payload: {
    id,
    requests
  }
})
export const userRequestsFail = error => ({
  type: types.USER_REQUESTS_FAIL,
  payload: {
    error
  }
})

export const deleteRequestSubmit = () => ({
  type: types.DELETE_REQUEST_SUBMIT
})
export const deleteRequestSuccess = () => ({
  type: types.DELETE_REQUEST_SUCCESS
})
export const deleteRequestFail = error => ({
  type: types.DELETE_REQUEST_FAIL,
  payload: {
    error
  }
})

export const currentRequest = request => ({
  type: types.SET_CURRENT_REQUEST,
  payload: {
    request
  }
})

export const leaveTypesRequest = () => ({
  type: types.LEAVE_TYPES_REQUEST
})
export const leaveTypesSuccess = leaveTypes => ({
  type: types.LEAVE_TYPES_SUCCESS,
  payload: {
    types: leaveTypes
  }
})
export const leaveTypesFail = error => ({
  type: types.LEAVE_TYPES_FAIL,
  payload: {
    error
  }
})
