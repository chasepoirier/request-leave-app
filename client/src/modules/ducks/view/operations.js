import * as actions from './actions'

export const hideStatusBar = () => actions.hideStatusBar()

export const showStatusBar = content => actions.showStatusBar(content)

export const hidePopup = () => actions.hidePopup()

export const showPopup = data => actions.showPopup(data)
