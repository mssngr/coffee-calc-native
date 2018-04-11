import {combineReducers} from 'redux'

import {types as ActionTypes} from './actions'
import smallCoffee from '../assets/images/smallCoffee.png'
import mediumCoffee from '../assets/images/mediumCoffee.png'
import largeCoffee from '../assets/images/largeCoffee.png'

const settingsInitState = {
  sizes: {
    sm: {
      id: 'sm',
      image: smallCoffee,
      name: 'Small',
      ounces: 8,
    },
    md: {
      id: 'md',
      image: mediumCoffee,
      name: 'Medium',
      ounces: 12,
    },
    lg: {
      id: 'lg',
      image: largeCoffee,
      name: 'Large',
      ounces: 16,
    },
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
  size: 'sm',
  servings: 1,
}

const current = (state = currentInitState, action) => {
  switch (action.type) {
    case ActionTypes.CHANGE_SIZE:
      return {size: action.payload.newSize || state.size}

    case ActionTypes.CHANGE_SERVINGS:
      return {servings: action.payload.newServings || state.servings}

    default:
      return state
  }
}

export default combineReducers({
  settings,
  current,
})
