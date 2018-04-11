import React from 'react'
import {TouchableHighlight} from 'react-native'
import {connect} from 'react-redux'
import styled from 'styled-components'
import Swiper from 'react-native-swiper'
import {capitalize, map} from 'lodash'

import Colors from '../constants/Colors'
import Selectors from '../state/selectors'
import Actions from '../state/actions'

/* STYLES */
export const Page = styled.View`
  flex: 1;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  padding: 45px 0;
  background-color: #c3c3c3;
`

export const Header = styled.Text`
  color: black;
  font-size: 30px;
  font-weight: 700;
`

export const Image = styled.Image`
`

export const Servings = styled.Text`
`

/* LOGIC */

class Measurements extends React.Component {
  static navigationOptions = {
    title: 'Measurements',
    header: null,
  }

  handleDecrementServings = () => {
    const {servings, changeServings} = this.props
    if (servings > 1) {
      changeServings(servings - 1)
    }
  }

  handleIncrementServings = () => {
    const {servings, changeServings} = this.props
    if (servings < 4) {
      changeServings(servings + 1)
    }
  }

  handleSwipe = index => {
    const {changeSize} = this.props
    switch (index) {
      case 0:
        return changeSize('sm')
      case 1:
        return changeSize('md')
      case 2:
        return changeSize('lg')
      default:
        break
    }
  }

  render() {
    const {servings} = this.props
    /* PRESENTATION */
    return (
      <Page>
        <Header>Coffee for...</Header>
        <TouchableHighlight onPress={this.handleDecrementServings}>
          <Image />
        </TouchableHighlight>
        <Servings>{servings}</Servings>
        <TouchableHighlight onPress={this.handleIncrementServings}>
          <Image />
        </TouchableHighlight>
      </Page>
    )
  }
}

const mapState = state => ({
  servings: Selectors.getServings,
})

const mapActions = {
  changeServings: Actions.changeServings,
  changeSize: Actions.changeSize,
}

export default connect(mapState, mapActions)(Measurements)
