import * as types from './types'

const initialState = {
  loading: false,
  addUser: {
    submitting: false,
    errors: null
  },
  allUsers: []
}

const supervisor = (state = initialState, action = {}) => {
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
    default: {
      return state
    }
  }
}

export default supervisor
