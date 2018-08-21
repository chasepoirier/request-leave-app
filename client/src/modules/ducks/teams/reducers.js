// import { combineReducers } from 'redux'
import * as types from './types'

const teamsInitialState = {
  loading: false,
  error: null,
  all: [
    {
      name: '',
      id: '',
      users: []
    }
  ]
}

const teams = (state = teamsInitialState, action = {}) => {
  switch (action.type) {
    case types.REQUEST_ALL_TEAMS: {
      return {
        ...state,
        loading: true
      }
    }
    case types.FETCH_ALL_TEAMS_SUCCESS: {
      return {
        ...state,
        error: null,
        loading: false,
        all: action.payload.teams
      }
    }
    case types.FETCH_ALL_TEAMS_FAIL: {
      return {
        ...state,
        loading: false,
        error: action.payload.error
      }
    }
    default: {
      return state
    }
  }
}

export default teams
