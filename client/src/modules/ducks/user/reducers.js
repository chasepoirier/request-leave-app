import * as types from './types'

const initialState = {
  info: {
    name: {
      fname: null,
      lname: null
    },
    status: {
      supervisor: false,
      admin: false
    }
  },
  loading: false,
  login: {
    errors: null,
    success: false,
    loggedIn: false
  },
  addRequest: {
    submitting: false,
    errors: null
  },
  userFetched: false
}

const user = (state = initialState, action = {}) => {
  switch (action.type) {
    case types.REQUEST_LOGIN: {
      return {
        ...state,
        loading: true,
        login: { ...state.login, errors: null }
      }
    }
    case types.REQUEST_USER: {
      return {
        ...state,
        loading: true
      }
    }
    case types.USER_LOGIN_SUCCESS: {
      return {
        ...state,
        info: { ...state.info, ...action.payload.user },
        loading: false,
        login: { ...state.login, errors: null, success: true, loggedIn: true }
      }
    }
    case types.USER_LOGIN_FAIL: {
      return {
        ...state,
        loading: false,
        login: { ...state.login, errors: action.payload.error, success: false }
      }
    }
    case types.LOG_USER_OUT: {
      return {
        ...state,
        info: initialState.info
      }
    }
    case types.SET_CURRENT_USER: {
      return {
        ...state,
        loading: false,
        info: action.payload.user,
        userFetched: true,
        login: { ...state.login, loggedIn: true }
      }
    }
    case types.NO_CURRENT_USER: {
      return {
        ...state,
        loading: false,
        userFetched: true,
        login: { ...state.login, loggedIn: false }
      }
    }
    default: {
      return state
    }
  }
}

export default user
