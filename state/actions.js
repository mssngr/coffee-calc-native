import keyMirror from 'keymirror'

export const types = keyMirror({
  CHANGE_SIZE: null,
  CHANGE_METHOD: null,
  CHANGE_SERVINGS: null,
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
  changeSize,
  changeMethod,
  changeServings,
}
