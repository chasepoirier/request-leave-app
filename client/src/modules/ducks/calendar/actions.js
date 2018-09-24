import * as types from './types'

export const allApprovalsRequest = () => ({
  type: types.GET_APPROVED_REQUEST
})
export const allApprovalsSuccess = requests => ({
  type: types.GET_APPROVED_SUCCESS,
  payload: {
    requests
  }
})
export const allApprovalsFail = error => ({
  type: types.GET_APPROVED_FAIL,
  payload: {
    error
  }
})

export const getExcludedDatesRequest = () => ({
  type: types.GET_EXCLUDED_DATES_REQUEST
})
export const getExcludedDatesSuccess = dates => ({
  type: types.GET_EXCLUDED_DATES_SUCCESS,
  payload: {
    dates
  }
})
export const getExcludedDatesFail = error => ({
  type: types.GET_EXCLUDED_DATES_FAIL,
  payload: {
    error
  }
})

export const addExcludedDateRequest = () => ({
  type: types.ADD_EXCLUDED_DATE_REQUEST
})
export const addExcludedDateSuccess = () => ({
  type: types.ADD_EXCLUDED_DATE_SUCCESS
})
export const addExcludedDateFail = error => ({
  type: types.ADD_EXCLUDED_DATE_FAIL,
  payload: {
    error
  }
})

export const deleteExcludedDateRequest = () => ({
  type: types.DELETE_EXCLUDED_DATE_REQUEST
})
export const deleteExcludedDateSuccess = () => ({
  type: types.DELETE_EXCLUDED_DATE_SUCCESS
})
export const deleteExcludedDateFail = error => ({
  type: types.DELETE_EXCLUDED_DATE_FAIL,
  payload: {
    error
  }
})
