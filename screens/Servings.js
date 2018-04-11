import React from 'react'
import PropTypes from 'prop-types'
import { TouchableOpacity, View } from 'react-native'
import { connect } from 'react-redux'
import styled from 'styled-components'

import figure1 from '../assets/images/figure1.png'
import figure2 from '../assets/images/figure2.png'
import figure3 from '../assets/images/figure3.png'
import figure4 from '../assets/images/figure4.png'
import plus from '../assets/images/plus.png'
import minus from '../assets/images/minus.png'

import { convertNumToText } from '../utils/functions'
import Selectors from '../state/selectors'
import Actions from '../state/actions'
import { HeaderAlt } from '../components/styled'
import Screen from '../components/Screen'

/* STYLES */
const FlexContainer = styled.View`
  display: flex;
  flex-direction: column;
  flex-wrap: nowrap;
  justify-content: center;
  align-items: center;
`

const IllustrationContainer = FlexContainer.extend`
  flex-direction: row;
  justify-content: space-between;
  margin-top: 30px;
`

const FiguresContainer = FlexContainer.extend`
  flex-direction: row;
  width: 60%;
`

const FigureImage = styled.Image`
  width: 40px;
  height: 120px;
`

const OperatorImage = styled.Image`
  width: 30px;
  height: 30px;
`

/* PRESENTATION/LOGIC */
class Servings extends React.Component {
  static navigationOptions = {
    title: 'Servings',
    header: null,
  }

  static propTypes = {
    navigation: PropTypes.object.isRequired,
    servings: PropTypes.number.isRequired,
    changeServings: PropTypes.func.isRequired,
  }

  handleDecrementServings = () => {
    const { servings, changeServings } = this.props
    if (servings > 1) {
      changeServings(servings - 1)
    }
  }

  handleIncrementServings = () => {
    const { servings, changeServings } = this.props
    console.log(servings, changeServings)
    if (servings < 4) {
      console.log('less than 4')
      changeServings(servings + 1)
    }
  }

  handlePress = () => {
    this.props.navigation.navigate('Size')
  }

  render() {
    const { navigation, servings } = this.props
    return (
      <Screen
        header="Choose your servings"
        otherButton={{ screen: 'Instructions', text: 'Skip' }}
        next={{ screen: 'Size', text: 'Continue' }}
        navigation={navigation}
      >
        <FlexContainer>
          <HeaderAlt>Coffee for {convertNumToText(servings)}</HeaderAlt>
          <IllustrationContainer>
            <TouchableOpacity onPress={this.handleDecrementServings}>
              <OperatorImage source={minus} />
            </TouchableOpacity>
            <FiguresContainer>
              <FigureImage display-if={servings >= 1} source={figure1} />
              <FigureImage display-if={servings >= 2} source={figure2} />
              <FigureImage display-if={servings >= 3} source={figure3} />
              <FigureImage display-if={servings >= 4} source={figure4} />
            </FiguresContainer>
            <TouchableOpacity onPress={this.handleIncrementServings}>
              <OperatorImage source={plus} />
            </TouchableOpacity>
          </IllustrationContainer>
        </FlexContainer>
      </Screen>
    )
  }
}

const mapState = state => ({
  servings: Selectors.getCurrentServings(state),
})

const mapActions = {
  changeServings: Actions.changeServings,
}

export default connect(mapState, mapActions)(Servings)
