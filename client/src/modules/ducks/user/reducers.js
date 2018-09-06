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
    },
    typeAmounts: []
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
  userFetched: false,
  selectedUser: {
    loading: false,
    errors: null,
    info: null
  },
  logs: {
    loading: true,
    errors: null,
    all: null
  }
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
      return { ...state, loading: true }
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
      return { ...state, info: initialState.info }
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
    case types.UPDATE_LEAVE_AMOUNT: {
      const index = state.info.typeAmounts
        .map(t => t.id)
        .indexOf(action.payload.id)
      return {
        ...state,
        info: {
          ...state.info,
          typeAmounts: [
            ...state.info.typeAmounts.slice(0, index),
            { ...state.info.typeAmounts[index], amount: action.payload.amount },
            ...state.info.typeAmounts.slice(index + 1)
          ]
        }
      }
    }
    case types.GET_USER_REQUEST: {
      return {
        ...state,
        selectedUser: { loading: true, errors: null, info: null }
      }
    }
    case types.GET_USER_SUCCESS: {
      return {
        ...state,
        selectedUser: {
          loading: false,
          errors: null,
          info: action.payload.user
        }
      }
    }
    case types.GET_USER_FAIL: {
      return {
        ...state,
        selectedUser: {
          loading: false,
          errors: action.payload.error,
          info: null
        }
      }
    }
    case types.GET_USER_LOGS_REQUEST: {
      return { ...state, logs: { loading: true, errors: null, all: null } }
    }
    case types.GET_USER_LOGS_SUCCESS: {
      return {
        ...state,
        logs: { loading: false, errors: null, all: action.payload.logs }
      }
    }
    case types.GET_USER_LOGS_FAIL: {
      return {
        ...state,
        logs: { loading: false, errors: action.payload.error, all: null }
      }
    }
    default: {
      return state
    }
  }
}

export default user
