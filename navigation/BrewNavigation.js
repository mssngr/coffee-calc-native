import { StackNavigator } from 'react-navigation'

import Servings from '../screens/Servings'
import Size from '../screens/Size'
import Method from '../screens/Method'
import Instructions from '../screens/Instructions'

export const BrewNavigation = StackNavigator({
  Servings: {
    screen: Servings,
  },
  Size: {
    screen: Size,
  },
  Method: {
    screen: Method,
  },
  Instructions: {
    screen: Instructions,
  },
})

export default BrewNavigation
