import { combineReducers } from 'redux'

import problemReducer from './problem-reducer'

export default combineReducers({
  problems: problemReducer
})