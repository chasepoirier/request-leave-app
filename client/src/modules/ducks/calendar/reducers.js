import * as types from './types'
import { combineReducers } from 'redux'

const initialState = {
  requests: {
    loading: false,
    error: null,
    all: []
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

export default combineReducers({
  requests
})
