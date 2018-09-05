import { combineReducers } from 'redux'
import * as types from './types'

const initialState = {
  pendingApprovals: {
    loading: false,
    errors: null,
    all: []
  },
  setStatus: {
    submitting: false,
    errors: null
  }
}

const manageUserState = {
  loading: false,
  addUser: {
    submitting: false,
    errors: null
  },
  deleteUser: {
    submitting: false,
    errors: null
  },
  updateUser: {
    submitting: false,
    errors: null
  },
  allUsers: []
}

const manageUser = (state = manageUserState, action = {}) => {
  switch (action.type) {
    case types.REQUEST_ADD_USER: {
      return {
        ...state,
        addUser: { ...state.addUser, submitting: true, errors: null }
      }
    }
    case types.ADD_USER_SUCCESS: {
      return {
        ...state,
        allUsers: [...state.allUsers, action.payload.user],
        addUser: { ...state.addUser, submitting: false, errors: null }
      }
    }
    case types.ADD_USER_FAIL: {
      return {
        ...state,
        addUser: {
          ...state.addUser,
          submitting: false,
          errors: action.payload.error
        }
      }
    }
    case types.REQUEST_DELETE_USER: {
      return { ...state, deleteUser: { ...state.deleteUser, submitting: true } }
    }
    case types.DELETE_USER_SUCCESS: {
      return { ...state, deleteUser: { submitting: false, errors: null } }
    }
    case types.DELETE_USER_FAIL: {
      return {
        ...state,
        deleteUser: { submitting: false, errors: action.payload.error }
      }
    }
    case types.UPDATE_USER_REQUEST: {
      return { ...state, updateUser: { submitting: true, errors: null } }
    }
    case types.UPDATE_USER_SUCCESS: {
      return { ...state, updateUser: { submitting: false, errors: null } }
    }
    case types.UPDATE_USER_FAIL: {
      return {
        ...state,
        updateUser: { submitting: false, errors: action.payload.error }
      }
    }
    default: {
      return state
    }
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

export default combineReducers({ manageUser, pendingApprovals, setStatus })
