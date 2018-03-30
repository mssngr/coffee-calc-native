import React from 'react';
import { Image, Platform } from 'react-native';
import { TabNavigator, TabBarBottom } from 'react-navigation';
import { Ionicons } from '@expo/vector-icons';

import smallCoffee from '../assets/images/smallCoffee.png'
import kettleWhite from '../assets/images/kettleWhite.png'
import kettleBlack from '../assets/images/kettleBlack.png'

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
            icon = focused ? kettleBlack : kettleWhite
            break;
          case 'Instructions':
            icon = focused ? smallCoffee : smallCoffee
            break;
          case 'Settings':
            icon = focused ? smallCoffee : smallCoffee
            break;
        }
        return (
          <Image source={icon} style={{height: 30}} resizeMode="contain" />
        );
        // let iconName;
        // switch (routeName) {
        //   case 'Measurements':
        //     iconName =
        //       Platform.OS === 'ios'
        //         ? `ios-information-circle${focused ? '' : '-outline'}`
        //         : 'md-information-circle';
        //     break;
        //   case 'Instructions':
        //     iconName = Platform.OS === 'ios' ? `ios-link${focused ? '' : '-outline'}` : 'md-link';
        //     break;
        //   case 'Settings':
        //     iconName =
        //       Platform.OS === 'ios' ? `ios-options${focused ? '' : '-outline'}` : 'md-options';
        // }
        // return (
        //   <Ionicons
        //     name={iconName}
        //     size={28}
        //     color={focused ? Colors.tabIconSelected : Colors.tabIconDefault}
        //   />
        // );
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
