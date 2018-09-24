import * as types from './types'
import { combineReducers } from 'redux'

const initialState = {
  requests: {
    loading: false,
    error: null,
    all: []
  },
  excludedDates: {
    addDate: {
      submitting: false,
      error: null
    },
    dates: {
      loading: false,
      error: null,
      all: []
    }
  }
}

const requests = (state = initialState.requests, action = {}) => {
  switch (action.type) {
    case types.GET_APPROVED_REQUEST: {
      return { loading: true, error: null, all: [] }
    }
    case types.GET_APPROVED_SUCCESS: {
      return { loading: false, error: null, all: action.payload.requests }
    }
    case types.GET_APPROVED_FAIL: {
      return { loading: false, error: action.payload.error, all: [] }
    }
    default: {
      return state
    }
  }
}

const excludedDates = (state = initialState.excludedDates, action = {}) => {
  switch (action.type) {
    case types.GET_EXCLUDED_DATES_REQUEST:
      return { ...state, dates: { loading: true, error: null, all: [] } }
    case types.GET_EXCLUDED_DATES_SUCCESS:
      return {
        ...state,
        dates: { loading: false, error: null, all: action.payload.dates }
      }
    case types.GET_EXCLUDED_DATES_FAIL:
      return {
        ...state,
        dates: { loading: false, error: action.payload.error, all: [] }
      }
    case types.ADD_EXCLUDED_DATE_REQUEST:
      return { ...state, addDate: { submitting: true, error: null } }
    case types.ADD_EXCLUDED_DATE_SUCCESS:
      return { ...state, addDate: { submitting: false, error: null } }
    case types.ADD_EXCLUDED_DATE_FAIL:
      return {
        ...state,
        addDate: { submitting: false, error: action.payload.error }
      }
    default:
      return state
  }
}

export default combineReducers({
  requests,
  excludedDates
})
