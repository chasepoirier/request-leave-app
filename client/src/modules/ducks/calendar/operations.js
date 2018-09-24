import * as actions from './actions'
import api from '../../api'

export const fetchAllApprovedRequests = () => dispatch => {
  dispatch(actions.allApprovalsRequest())
  return api.calendar
    .getAllApprovedRequests()
    .then(requests => dispatch(actions.allApprovalsSuccess(requests)))
    .catch(err => dispatch(actions.allApprovalsFail(err)))
}

export const fetchExcludedDates = () => dispatch => {
  dispatch(actions.getExcludedDatesRequest())
  return api.calendar
    .getAllExcludedDates()
    .then(dates => dispatch(actions.getExcludedDatesSuccess(dates)))
    .catch(() => dispatch(actions.getExcludedDatesFail('Error getting dates')))
}

export const addExcludedDate = date => dispatch => {
  dispatch(actions.addExcludedDateRequest())
  return api.calendar
    .addExcludedDate(date)
    .then(() => dispatch(actions.addExcludedDateSuccess()))
    .catch(() => dispatch(actions.addExcludedDateFail('Error adding date')))
}

export const deleteExcludedDate = id => dispatch => {
  dispatch(actions.deleteExcludedDateRequest())
  return api.calendar
    .deleteExcludedDate(id)
    .then(() => dispatch(actions.deleteExcludedDateSuccess()))
    .catch(() => dispatch(actions.deleteExcludedDateFail('Error adding date')))
}
