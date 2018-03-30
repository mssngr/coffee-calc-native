import {get} from 'lodash'
import Conversions from '../constants/Conversions'

export const getBeans = state => {
  const servings = get(state, 'settings.servings')
  const ratio = get(state, 'settings.pourRatio')
  const cupSizes = get(state, 'settings.cupSizes')
  return {
    small: Math.round((servings * cupSizes.sm * Conversions.gramsToOunces) / ratio),
    medium: Math.round((servings * cupSizes.md * Conversions.gramsToOunces) / ratio),
    large: Math.round((servings * cupSizes.lg * Conversions.gramsToOunces) / ratio),
  }
}

export const getBloom = state => {
  const servings = get(state, 'settings.servings')
  const ratio = get(state, 'settings.pourRatio')
  const cupSizes = get(state, 'settings.cupSizes')
  return {
    small: Math.round(((servings * cupSizes.sm * Conversions.gramsToOunces) / ratio) * 2),
    medium: Math.round(((servings * cupSizes.md * Conversions.gramsToOunces) / ratio) * 2),
    large: Math.round(((servings * cupSizes.lg * Conversions.gramsToOunces) / ratio) * 2),
  }
}

export const getWater = state => {
  const servings = get(state, 'settings.servings')
  const cupSizes = get(state, 'settings.cupSizes')
  return {
    small: Math.round(servings * cupSizes.sm * Conversions.gramsToOunces),
    medium: Math.round(servings * cupSizes.md * Conversions.gramsToOunces),
    large: Math.round(servings * cupSizes.lg * Conversions.gramsToOunces),
  }
}

export default {
  getBeans,
  getBloom,
  getWater,
}
