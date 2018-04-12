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
import devToolsEnhancer from 'remote-redux-devtools'
import { GraphQLClient } from 'graphql-request'
import {
  GRAPHCOOL_API_SIMPLE_ENDPOINT,
  GRAPHCOOL_AUTH_TOKEN,
} from 'react-native-dotenv'

import RootNavigation from 'navigation/RootNavigation'
import reducer from 'state/reducers'

// Initialize the GraphQL Client
const graphcoolClient = new GraphQLClient(GRAPHCOOL_API_SIMPLE_ENDPOINT, {
  headers: {
    Authorization: `Bearer ${GRAPHCOOL_AUTH_TOKEN}`,
  },
})

export const graphcoolRequest = req => graphcoolClient.request(req)

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
        require('./assets/images/beans-white.png'),
        require('./assets/images/beans.png'),
        require('./assets/images/caret-darkGray.png'),
        require('./assets/images/caret-gray.png'),
        require('./assets/images/caret-white.png'),
        require('./assets/images/caret.png'),
        require('./assets/images/coffeeShop.png'),
        require('./assets/images/coffeeShop-white.png'),
        require('./assets/images/close.png'),
        require('./assets/images/chemex.png'),
        require('./assets/images/frenchPress.png'),
        require('./assets/images/figure1.png'),
        require('./assets/images/figure2.png'),
        require('./assets/images/figure3.png'),
        require('./assets/images/figure4.png'),
        require('./assets/images/gear.png'),
        require('./assets/images/gear-white.png'),
        require('./assets/images/refresh.png'),
        require('./assets/images/refresh-white.png'),
        require('./assets/images/mapMarker.png'),
        require('./assets/images/mapMarker-white.png'),
        require('./assets/images/minus.png'),
        require('./assets/images/plus.png'),
        require('./assets/images/coffee-sm.png'),
        require('./assets/images/coffee-md.png'),
        require('./assets/images/coffee-lg.png'),
      ]),
      Font.loadAsync({
        'gamja-flower': require('./assets/fonts/GamjaFlower-Regular.ttf'),
        'gaegu-bold': require('./assets/fonts/Gaegu-Bold.ttf'),
        'caveat-bold': require('./assets/fonts/Caveat-Bold.ttf'),
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
