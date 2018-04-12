import { combineReducers } from 'redux'

import { types as ActionTypes } from './actions'

import smallCoffee from '../assets/images/coffee-sm.png'
import mediumCoffee from '../assets/images/coffee-md.png'
import largeCoffee from '../assets/images/coffee-lg.png'
import chemex from '../assets/images/chemex.png'
import frenchPress from '../assets/images/frenchPress.png'

const settingsInitState = {
  sizes: {
    sm: {
      id: 'sm',
      name: 'Small',
      ounces: 8,
      image: smallCoffee,
    },
    md: {
      id: 'md',
      name: 'Medium',
      ounces: 12,
      image: mediumCoffee,
    },
    lg: {
      id: 'lg',
      name: 'Large',
      ounces: 16,
      image: largeCoffee,
    },
  },
  methods: {
    pourOver: {
      id: 'pourOver',
      name: 'Pour Over',
      ratio: 16,
      image: chemex,
    },
    frenchPress: {
      id: 'frenchPress',
      name: 'French Press',
      ratio: 15,
      image: frenchPress,
    },
  },
}

const settings = (state = settingsInitState, action) => {
  switch (action.type) {
    default:
      return state
  }
}

const currentInitState = {
  servings: 1,
  sizeId: settingsInitState.sizes.sm.id,
  methodId: settingsInitState.methods.pourOver.id,
}

const current = (state = currentInitState, action) => {
  switch (action.type) {
    case ActionTypes.CHANGE_SIZE:
      return { ...state, sizeId: action.payload.newSize || state.size }

    case ActionTypes.CHANGE_METHOD:
      return { ...state, methodId: action.payload.newMethod || state.method }

    case ActionTypes.CHANGE_SERVINGS:
      return {
        ...state,
        servings: action.payload.newServings || state.servings,
      }

    default:
      return state
  }
}

const userInitState = {
  id: '',
  favoriteCafeIds: [],
  favoriteRecipes: [],
}

const user = (state = userInitState, action) => {
  switch (action.type) {
    case ActionTypes.UPDATE_USER:
      return action.payload.user

    case ActionTypes.ADD_CAFE_TO_FAVORITES:
      return {
        favoriteCafeIds: [...state.favoriteCafeIds, action.payload.newCafeId],
      }

    case ActionTypes.ADD_RECIPE_TO_FAVORITES:
      return {
        favoriteRecipes: [...state.favoriteRecipes, action.payload.newRecipe],
      }

    default:
      return state
  }
}

export default combineReducers({
  settings,
  current,
  user,
})
