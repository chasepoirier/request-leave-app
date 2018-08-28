import { combineReducers } from 'redux'
import * as types from './types'

const initialState = {
  pendingApprovals: {
    loading: false,
    errors: null,
    all: [],
    current: null
  },
  setStatus: {
    submitting: false,
    errors: null
  }
}

const pendingApprovals = (
  state = initialState.pendingApprovals,
  action = {}
) => {
  switch (action.type) {
    case types.PENDING_APPROVALS_REQUEST: {
      return { ...state, loading: true, errors: null }
    }
    case types.PENDING_APPROVALS_SUCCESS: {
      return {
        ...state,
        loading: false,
        errors: null,
        all: action.payload.requests
      }
    }
    case types.PENDING_APPROVALS_FAIL: {
      return { ...state, loading: false, errors: action.payload.error }
    }
    default: {
      return state
    }
  }
}

const setStatus = (state = initialState.setStatus, action = {}) => {
  switch (action.type) {
    case types.SET_APPROVAL_STATUS_REQUEST:
      return { ...state, submitting: true, errors: null }
    case types.SET_APPROVAL_STATUS_SUCCESS:
      return { ...state, submitting: false, errors: null }
    case types.SET_APPROVAL_STATUS_FAIL:
      return { ...state, submitting: false, errors: action.payload.error }
    default:
      return state
  }
}

export default combineReducers({ pendingApprovals, setStatus })
