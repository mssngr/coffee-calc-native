import React from 'react'
import { ScrollView, View } from 'react-native'
import {connect} from 'react-redux'
import Swiper from 'react-native-swiper'
import styled from 'styled-components'

import Colors from '../constants/Colors'
import Selectors from '../state/selectors'
import {Page, Header} from './Brew'
import Button from '../components/Button'

const SlideContainer = styled.View`
  flex: 1;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
`

const SlideTitle = styled.Text`
  color: #fff;
  fontSize: 30px;
  fontWeight: 700;
`

const SlideImage = styled.Image`
  margin-vertical: 15px;
  height: 150px;
`

const SlideText = styled.Text`
  color: black;
  font-size: 20px;
`

const StrongText = SlideText.extend`
  font-weight: 700;
`

class Slide extends React.Component {
  render() {
    const {currentSize, beans, bloom, water} = this.props
    return (
      <SlideContainer>
        <SlideTitle>{currentSize.name}</SlideTitle>
        <SlideImage source={currentSize.image} resizeMode="contain" />
        <SlideText>
          <StrongText>{beans[currentSize.id]}g</StrongText> beans
        </SlideText>
        <SlideText>
          <StrongText>{bloom[currentSize.id]}g</StrongText> bloom
        </SlideText>
        <SlideText>
          <StrongText>{water[currentSize.id]}g</StrongText> water
        </SlideText>
        <Button onPress={this.handlePress}>Brew this cup</Button>
      </SlideContainer>
    )
  }
}

const mapState = state => ({
  beans: Selectors.getBeans(state),
  bloom: Selectors.getBloom(state),
  water: Selectors.getWater(state),
  currentSize: Selectors.getCurrentSize(state),
})

const MeasurementsSlide = connect(mapState)(Slide)

class Instructions extends React.Component {
  static navigationOptions = {
    title: 'Cafes',
    header: null,
  }

  render() {
    const {sizes, currentSize} = this.props
    return (
      <Page>
        <Header>Brew your cup</Header>
        <Swiper activeDotColor={Colors.tintColor}>
          <MeasurementsSlide />
        </Swiper>
      </Page>
    )
  }
}

export default Instructions
