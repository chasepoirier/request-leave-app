import { combineReducers } from 'redux'
import * as types from './types'

const barInitialState = {
  visible: false,
  content: ''
}

const statusbar = (state = barInitialState, action = {}) => {
  switch (action.type) {
    case types.SHOW_STATUS_BAR: {
      return {
        ...state,
        visible: true,
        content: action.payload.content
      }
    }
    case types.HIDE_STATUS_BAR: {
      return {
        ...state,
        visible: false,
        content: ''
      }
    }
    default: {
      return state
    }
  }
}

export default combineReducers({ statusbar })
