import React from 'react';
import { Image, Platform } from 'react-native';
import { TabNavigator, TabBarBottom } from 'react-navigation';

import scaleWhite from '../assets/images/scaleWhite.png'
import scaleBlack from '../assets/images/scaleBlack.png'
import kettleWhite from '../assets/images/kettleWhite.png'
import kettleBlack from '../assets/images/kettleBlack.png'
import settingsWhite from '../assets/images/settingsWhite.png'
import settingsBlack from '../assets/images/settingsBlack.png'

import Colors from '../constants/Colors';

import Measurements from '../screens/Measurements';
import Instructions from '../screens/Instructions';
import Settings from '../screens/Settings';

export default TabNavigator(
  {
    Measurements: {
      screen: Measurements,
    },
    Instructions: {
      screen: Instructions,
    },
    Settings: {
      screen: Settings,
    },
  },
  {
    navigationOptions: ({ navigation }) => ({
      tabBarIcon: ({ focused }) => {
        const { routeName } = navigation.state;
        let icon;
        switch (routeName) {
          case 'Measurements':
            icon = focused ? scaleBlack : scaleWhite
            break;
          case 'Instructions':
          icon = focused ? kettleBlack : kettleWhite
            break;
          case 'Settings':
            icon = focused ? settingsBlack : settingsWhite
            break;
        }
        return (
          <Image source={icon} style={{height: 30, maxWidth: 40}} resizeMode="contain" />
        );
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
);
