import { StackNavigator } from 'react-navigation'

import Servings from './Servings'
import Size from './Size'
import Method from './Method'
import Instructions from './Instructions'

export const Brew = StackNavigator({
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

export default Brew
