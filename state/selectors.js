import { get } from 'lodash'
import Conversions from '../constants/Conversions'

export const getSizes = state => get(state, 'settings.sizes')
export const getMethods = state => get(state, 'settings.methods')
export const getCurrentServings = state => get(state, 'current.servings', 1)

export const getCurrentSize = state => {
  const sizes = getSizes(state)
  const currentSize = get(state, 'current.sizeId', 'sm')
  return sizes[currentSize]
}
export const getCurrentMethod = state => {
  const methods = getMethods(state)
  const currentMethod = get(state, 'current.methodId', 'pourOver')
  return methods[currentMethod]
}

export const getCurrentRatio = state => getCurrentMethod(state).ratio

export const getBeans = state => {
  const servings = getCurrentServings(state)
  const ratio = getCurrentRatio(state)
  const size = getCurrentSize(state)
  const ounces = get(size, 'ounces', 0)
  return Math.round(servings * ounces * Conversions.gramsToOunces / ratio)
}

export const getBloom = state => {
  const servings = getCurrentServings(state)
  const ratio = getCurrentRatio(state)
  const size = getCurrentSize(state)
  const ounces = get(size, 'ounces', 0)
  return Math.round(servings * ounces * Conversions.gramsToOunces / ratio * 2)
}

export const getWater = state => {
  const servings = getCurrentServings(state)
  const size = getCurrentSize(state)
  const ounces = get(size, 'ounces', 0)
  return Math.round(servings * ounces * Conversions.gramsToOunces)
}

export default {
  getSizes,
  getMethods,
  getCurrentServings,
  getCurrentSize,
  getCurrentMethod,
  getCurrentRatio,
  getBeans,
  getBloom,
  getWater,
}
