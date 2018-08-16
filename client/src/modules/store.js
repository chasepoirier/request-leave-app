import { createStore, applyMiddleware, combineReducers } from 'redux'
import thunk from 'redux-thunk'
import logger from 'redux-logger'
import { composeWithDevTools } from 'redux-devtools-extension'
import * as reducers from './ducks'

const middleware =
  process.env.NODE_ENV === 'development'
    ? applyMiddleware(thunk, logger)
    : applyMiddleware(thunk)
const rootReducer = combineReducers(reducers)

export default createStore(
  rootReducer,
  process.env.NODE_ENV === 'development'
    ? composeWithDevTools(middleware)
    : middleware
)
