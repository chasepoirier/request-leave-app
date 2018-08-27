import { combineReducers } from 'redux'
import * as types from './types'

const initialState = {
  addRequest: {
    submitting: false,
    errors: null
  },
  userRequests: {
    loading: false,
    errors: null,
    id: '',
    all: []
  },
  deleteRequest: {
    submitting: false,
    errors: null
  },
  currentRequest: null
}

const addRequest = (state = initialState.addRequest, action = {}) => {
  switch (action.type) {
    case types.LEAVE_REQUEST_SUBMIT: {
      return { ...state, submitting: true, errors: null }
    }
    case types.LEAVE_REQUEST_SUCCESS: {
      return { ...state, submitting: false, errors: null }
    }
    case types.LEAVE_REQUEST_FAIL: {
      return {
        ...state,
        submitting: false,
        errors: action.payload.error
      }
    }
    default: {
      return state
    }
  }
}

const deleteRequest = (state = initialState.deleteRequest, action = {}) => {
  switch (action.type) {
    case types.DELETE_REQUEST_SUBMIT: {
      return { ...state, submitting: true, errors: null }
    }
    case types.DELETE_REQUEST_SUCCESS: {
      return { ...state, submitting: false, errors: null }
    }
    case types.DELETE_REQUEST_FAIL: {
      return {
        ...state,
        submitting: false,
        errors: action.payload.error
      }
    }
    default: {
      return state
    }
  }
}

const userRequests = (state = initialState.userRequests, action = {}) => {
  switch (action.type) {
    case types.REQUEST_USER_REQUESTS: {
      return { ...state, loading: true, errors: null }
    }
    case types.USER_REQUESTS_SUCCESS: {
      return {
        ...state,
        loading: false,
        errors: null,
        id: action.payload.id,
        all: action.payload.requests
      }
    }
    case types.USER_REQUESTS_FAIL: {
      return {
        ...state,
        id: '',
        all: [],
        submitting: false,
        errors: action.payload.error
      }
    }
    default: {
      return state
    }
  }
}

const currentRequest = (state = initialState.currentRequest, action = {}) => {
  switch (action.type) {
    case types.SET_CURRENT_REQUEST: {
      return { ...action.payload.request }
    }
    default:
      return state
  }
}

export default combineReducers({
  addRequest,
  deleteRequest,
  userRequests,
  currentRequest
})
