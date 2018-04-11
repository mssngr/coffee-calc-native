import keyMirror from 'keymirror'

export const types = keyMirror({
  CHANGE_SIZE: null,
  CHANGE_SERVINGS: null,
})

const changeSize = newSize => ({
  type: types.CHANGE_SIZE,
  payload: {newSize},
})

const changeServings = newServings => ({
  type: types.CHANGE_SERVINGS,
  payload: {newServings},
})

export default {
  changeSize,
  changeServings
}
