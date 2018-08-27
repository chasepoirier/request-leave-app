import { combineReducers } from 'redux'
import * as types from './types'

const initialState = {
  pendingApprovals: {
    loading: false,
    errors: null,
    all: [],
    current: null
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

export default combineReducers({ pendingApprovals })
