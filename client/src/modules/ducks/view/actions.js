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
