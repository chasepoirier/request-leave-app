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

const popupInitialState = {
  visible: false,
  type: '',
  content: {
    title: '',
    desc: '',
    handleSubmit: null
  }
}

const popup = (state = popupInitialState, action = {}) => {
  switch (action.type) {
    case types.SHOW_POPUP:
      return {
        ...state,
        visible: true,
        content: action.payload.content,
        type: action.payload.type
      }
    case types.HIDE_POPUP: {
      return { ...state, ...popupInitialState }
    }
    default:
      return state
  }
}

export default combineReducers({ statusbar, popup })
