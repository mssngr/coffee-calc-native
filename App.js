import React from 'react'
import PropTypes from 'prop-types'
import { createStore } from 'redux'
import { Provider } from 'react-redux'
import {
  Platform,
  StatusBar,
  StyleSheet,
  View,
  SafeAreaView,
} from 'react-native'
import { AppLoading, Asset, Font } from 'expo'
import { Ionicons } from '@expo/vector-icons'
import devToolsEnhancer from 'remote-redux-devtools'

import RootNavigation from './navigation/RootNavigation'
import reducer from './state/reducers'

// Create the redux store with the devtools enhancer
const store = createStore(reducer, devToolsEnhancer())

export default class App extends React.Component {
  static propTypes = {
    skipLoadingScreen: PropTypes.bool,
  }

  state = {
    isLoadingComplete: false,
  }

  render() {
    if (!this.state.isLoadingComplete && !this.props.skipLoadingScreen) {
      return (
        <AppLoading
          startAsync={this._loadResourcesAsync}
          onError={this._handleLoadingError}
          onFinish={this._handleFinishLoading}
        />
      )
    } else {
      return (
        <SafeAreaView style={styles.container}>
          {Platform.OS === 'ios' && <StatusBar barStyle="default" />}
          {Platform.OS === 'android' && (
            <View style={styles.statusBarUnderlay} />
          )}
          <Provider store={store}>
            <RootNavigation />
          </Provider>
        </SafeAreaView>
      )
    }
  }

  _loadResourcesAsync = async () => {
    return Promise.all([
      Asset.loadAsync([
        require('./assets/images/caret-darkGray.png'),
        require('./assets/images/caret-gray.png'),
        require('./assets/images/caret-white.png'),
        require('./assets/images/caret.png'),
        require('./assets/images/coffeeBag-darkGray.png'),
        require('./assets/images/coffeeBag-white.png'),
        require('./assets/images/cup-darkGray.png'),
        require('./assets/images/cup-white.png'),
        require('./assets/images/figure1.png'),
        require('./assets/images/figure2.png'),
        require('./assets/images/figure3.png'),
        require('./assets/images/figure4.png'),
        require('./assets/images/frenchPress.png'),
        require('./assets/images/gear-darkGray.png'),
        require('./assets/images/gear-white.png'),
        require('./assets/images/gear.png'),
        require('./assets/images/largeCoffee.png'),
        require('./assets/images/mediumCoffee.png'),
        require('./assets/images/minus.png'),
        require('./assets/images/plus.png'),
        require('./assets/images/settingsBlack.png'),
        require('./assets/images/settingsWhite.png'),
        require('./assets/images/smallCoffee.png'),
      ]),
      Font.loadAsync({
        // This is the font that we are using for our tab bar
        ...Ionicons.font,
        // We include SpaceMono because we use it in HomeScreen.js. Feel free
        // to remove this if you are not using it in your app
        'space-mono': require('./assets/fonts/SpaceMono-Regular.ttf'),
      }),
    ])
  }

  _handleLoadingError = error => {
    // In this case, you might want to report the error to your error
    // reporting service, for example Sentry
    console.warn(error)
  }

  _handleFinishLoading = () => {
    this.setState({ isLoadingComplete: true })
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#c3c3c3',
  },
  statusBarUnderlay: {
    height: 24,
    backgroundColor: 'rgba(0,0,0,0.2)',
  },
})
