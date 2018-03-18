import {get} from 'lodash'
import Conversions from '../constants/Conversions'

export const getBeans = state => {
  const servings = get(state, 'settings.servings')
  const ratio = get(state, 'settings.pourRatio')
  const cupSizes = get(state, 'settings.cupSizes')
  return {
    sm: Math.round((servings * cupSizes.sm * Conversions.gramsToOunces) / ratio),
    md: Math.round((servings * cupSizes.md * Conversions.gramsToOunces) / ratio),
    lg: Math.round((servings * cupSizes.lg * Conversions.gramsToOunces) / ratio),
  }
}

export const getBloom = state => {
  const servings = get(state, 'settings.servings')
  const ratio = get(state, 'settings.pourRatio')
  const cupSizes = get(state, 'settings.cupSizes')
  return {
    sm: Math.round(((servings * cupSizes.sm * Conversions.gramsToOunces) / ratio) * 2),
    md: Math.round(((servings * cupSizes.md * Conversions.gramsToOunces) / ratio) * 2),
    lg: Math.round(((servings * cupSizes.lg * Conversions.gramsToOunces) / ratio) * 2),
  }
}

export const getWater = state => {
  const servings = get(state, 'settings.servings')
  const cupSizes = get(state, 'settings.cupSizes')
  return {
    sm: Math.round(servings * cupSizes.sm * Conversions.gramsToOunces),
    md: Math.round(servings * cupSizes.md * Conversions.gramsToOunces),
    lg: Math.round(servings * cupSizes.lg * Conversions.gramsToOunces),
  }
}

export default {
  getBeans,
  getBloom,
  getWater,
}
