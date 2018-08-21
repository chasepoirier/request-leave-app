import * as types from './types'

export const hideStatusBar = () => ({
  type: types.HIDE_STATUS_BAR
})

export const showStatusBar = content => ({
  type: types.SHOW_STATUS_BAR,
  payload: {
    content
  }
})

export const hidePopup = () => ({
  type: types.HIDE_POPUP
})

export const showPopup = data => ({
  type: types.SHOW_POPUP,
  payload: {
    content: data.content,
    type: data.type
  }
})
