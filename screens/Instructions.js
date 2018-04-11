import React from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import styled from 'styled-components'
import { toLower } from 'lodash'

import { convertNumToText } from '../utils/functions'
import Colors from '../constants/Colors'
import Selectors from '../state/selectors'
import { LargeText, Text, StrongText } from '../components/styled'
import Screen from '../components/Screen'

/* STYLES */
const Container = styled.View`
  flex: 1;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
`

const MeasurementsText = Text.extend`
  color: ${Colors.darkGray};
`

const Image = styled.Image`
  margin-vertical: 15px;
  height: 150px;
`

/* PRESENTATION/LOGIC */
class Instructions extends React.Component {
  static navigationOptions = {
    title: 'Instructions',
    header: null,
  }

  static propTypes = {
    navigation: PropTypes.object.isRequired,
    currentSize: PropTypes.object.isRequired,
    currentMethod: PropTypes.object.isRequired,
    currentServings: PropTypes.number.isRequired,
    beans: PropTypes.number.isRequired,
    bloom: PropTypes.number.isRequired,
    water: PropTypes.number.isRequired,
  }

  render() {
    const {
      navigation,
      currentSize,
      currentMethod,
      currentServings,
      beans,
      bloom,
      water,
    } = this.props
    return (
      <Screen header="Brew your cup!" navigation={navigation} hasBack>
        <Container>
          <LargeText>
            {currentSize.name} {toLower(currentMethod.name)} for{' '}
            {convertNumToText(currentServings)}.
          </LargeText>
          <Image source={currentSize.image} resizeMode="contain" />
          <MeasurementsText>
            <StrongText>{beans}g</StrongText> beans
          </MeasurementsText>
          <MeasurementsText>
            <StrongText>{bloom}g</StrongText> bloom
          </MeasurementsText>
          <MeasurementsText>
            <StrongText>{water}g</StrongText> water
          </MeasurementsText>
        </Container>
      </Screen>
    )
  }
}

const mapState = state => ({
  beans: Selectors.getBeans(state),
  bloom: Selectors.getBloom(state),
  water: Selectors.getWater(state),
  currentSize: Selectors.getCurrentSize(state),
  currentServings: Selectors.getCurrentServings(state),
  currentMethod: Selectors.getCurrentMethod(state),
})

export default connect(mapState)(Instructions)
