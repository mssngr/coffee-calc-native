import {combineReducers} from 'redux'

import {types as ActionTypes} from './actions'

const settingsInitState = {
  cupSizes: {
    sm: 8,
    md: 12,
    lg: 16,
  },
  servings: 1,
  pourRatio: 16,
  submersionRatio: 16,
}

const settings = (state = settingsInitState, action) => {
  switch (action.type) {
    default:
      return state
  }
}

const currentInitState = {
}

const current = (state = currentInitState, action) => {
  switch (action.type) {
    default:
      return state
  }
}

export default combineReducers({
  settings,
  current,
})
