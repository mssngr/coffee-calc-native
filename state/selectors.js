import {get} from 'lodash'
import Conversions from '../constants/Conversions'

export const getBeans = state => {
  const servings = get(state, 'settings.servings')
  const ratio = get(state, 'settings.pourRatio')
  const sizes = get(state, 'settings.sizes')
  return {
    sm: Math.round((servings * sizes.sm.ounces * Conversions.gramsToOunces) / ratio),
    md: Math.round((servings * sizes.md.ounces * Conversions.gramsToOunces) / ratio),
    lg: Math.round((servings * sizes.lg.ounces * Conversions.gramsToOunces) / ratio),
  }
}

export const getBloom = state => {
  const servings = get(state, 'settings.servings')
  const ratio = get(state, 'settings.pourRatio')
  const sizes = get(state, 'settings.sizes')
  return {
    sm: Math.round(((servings * sizes.sm.ounces * Conversions.gramsToOunces) / ratio) * 2),
    md: Math.round(((servings * sizes.md.ounces * Conversions.gramsToOunces) / ratio) * 2),
    lg: Math.round(((servings * sizes.lg.ounces * Conversions.gramsToOunces) / ratio) * 2),
  }
}

export const getWater = state => {
  const servings = get(state, 'settings.servings')
  const sizes = get(state, 'settings.sizes')
  return {
    sm: Math.round(servings * sizes.sm.ounces * Conversions.gramsToOunces),
    md: Math.round(servings * sizes.md.ounces * Conversions.gramsToOunces),
    lg: Math.round(servings * sizes.lg.ounces * Conversions.gramsToOunces),
  }
}

export const getServings = state => get(state, 'current.servings', 1)
export const getSizes = state => get(state, 'settings.sizes')

export const getCurrentSize = state => {
  const sizes = getSizes(state)
  const currentSize = get(state, 'current.size', 'sm')
  return sizes[currentSize]
}

export default {
  getBeans,
  getBloom,
  getWater,
  getServings,
  getSizes,
  getCurrentSize,
}
