import React from 'react'
import { Image, Platform } from 'react-native'
import { TabNavigator, TabBarBottom } from 'react-navigation'

import cupLight from '../assets/images/cup-white.png'
import cupDark from '../assets/images/cup-darkGray.png'
import coffeeBagLight from '../assets/images/coffeeBag-white.png'
import coffeeBagDark from '../assets/images/coffeeBag-darkGray.png'
import gearLight from '../assets/images/gear-white.png'
import gearDark from '../assets/images/gear-darkGray.png'

import Colors from '../constants/Colors'

import Brew from '../screens/Brew'
import Cafes from '../screens/Cafes'
import Settings from '../screens/Settings'

export default TabNavigator(
  {
    Brew: {
      screen: Brew,
    },
    Cafes: {
      screen: Cafes,
    },
    Settings: {
      screen: Settings,
    },
  },
  {
    navigationOptions: ({ navigation }) => ({
      tabBarIcon: ({ focused }) => {
        const { routeName } = navigation.state
        let icon
        switch (routeName) {
          case 'Brew':
            icon = focused ? cupDark : cupLight
            break
          case 'Cafes':
            icon = focused ? coffeeBagDark : coffeeBagLight
            break
          case 'Settings':
            icon = focused ? gearDark : gearLight
            break
        }
        return (
          <Image
            source={icon}
            style={{ height: 35, maxWidth: 45 }}
            resizeMode="contain"
          />
        )
      },
    }),
    tabBarOptions: {
      inactiveTintColor: Colors.accentColor,
      inactiveBackgroundColor: Colors.tintColor,
      activeTintColor: Colors.tintColor,
      activeBackgroundColor: Colors.accentColor,
      showLabel: false,
    },
    tabBarComponent: TabBarBottom,
    tabBarPosition: 'bottom',
    animationEnabled: false,
    swipeEnabled: false,
  }
)
