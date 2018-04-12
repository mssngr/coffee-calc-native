import keyMirror from 'keymirror'

export const types = keyMirror({
  UPDATE_USER: null,
  ADD_CAFE_TO_FAVORITES: null,
  ADD_RECIPE_TO_FAVORITES: null,
  CHANGE_SIZE: null,
  CHANGE_METHOD: null,
  CHANGE_SERVINGS: null,
})

const updateUser = user => ({
  type: types.UPDATE_USER,
  payload: { user },
})

const addCafeToFavorites = newCafeId => ({
  type: types.ADD_CAFE_TO_FAVORITES,
  payload: { newCafeId },
})

const addRecipeToFavorites = newRecipe => ({
  type: types.ADD_RECIPE_TO_FAVORITES,
  payload: { newRecipe },
})

const changeSize = newSize => ({
  type: types.CHANGE_SIZE,
  payload: { newSize },
})

const changeMethod = newMethod => ({
  type: types.CHANGE_METHOD,
  payload: { newMethod },
})

const changeServings = newServings => ({
  type: types.CHANGE_SERVINGS,
  payload: { newServings },
})

export default {
  updateUser,
  addCafeToFavorites,
  addRecipeToFavorites,
  changeSize,
  changeMethod,
  changeServings,
}
