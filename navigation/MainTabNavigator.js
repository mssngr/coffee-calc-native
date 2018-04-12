import React from 'react'
import { Image } from 'react-native'
import { TabNavigator, TabBarBottom } from 'react-navigation'

import beansLight from '../assets/images/beans-white.png'
import beansDark from '../assets/images/beans.png'
import coffeeShopLight from '../assets/images/coffeeShop-white.png'
import coffeeShopDark from '../assets/images/coffeeShop.png'
import gearLight from '../assets/images/gear-white.png'
import gearDark from '../assets/images/gear-darkGray.png'

import Colors from '../constants/Colors'

import BrewNavigation from './BrewNavigation'
import Cafes from '../screens/Cafes'
import Settings from '../screens/Settings'

export default TabNavigator(
  {
    Brew: {
      screen: BrewNavigation,
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
      /* eslint-disable react/prop-types */
      tabBarIcon: ({ focused }) => {
        const { routeName } = navigation.state
        let icon
        switch (routeName) {
          case 'Brew':
            icon = focused ? beansDark : beansLight
            break
          case 'Cafes':
            icon = focused ? coffeeShopDark : coffeeShopLight
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
      /* eslint-enable react/prop-types */
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
