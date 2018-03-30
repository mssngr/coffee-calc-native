import React from 'react'
import {connect} from 'react-redux'
import styled from 'styled-components'
import Swiper from 'react-native-swiper'
import {capitalize} from 'lodash'

import smallCoffee from '../assets/images/smallCoffee.png'
import mediumCoffee from '../assets/images/mediumCoffee.png'
import largeCoffee from '../assets/images/largeCoffee.png'
import dotdotdot from '../assets/images/dotdotdot.png'

import Colors from '../constants/Colors'
import Selectors from '../state/selectors'

/* STYLES */
const Slide = styled.View`
  flex: 1;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  background-color: #c3c3c3;
`

const TitleText = styled.Text`
  color: #fff;
  fontSize: 30px;
  fontWeight: 700;
`

const SizeImage = styled.Image`
  margin-vertical: 30px;
`

const StaticText = styled.Text`
  color: black;
  font-size: 20px;
`

const StrongText = StaticText.extend`
  font-weight: 700;
`

const FlipBtn = styled.TouchableOpacity`
  position: absolute;
  top: 50px;
  right: 20px;
`

const FlipImg = styled.Image`
  width: 30px;
  height: 30px;
`

/* LOGIC */
const sizes = [
  'small',
  'medium',
  'large',
]

const images = {
  small: smallCoffee,
  medium: mediumCoffee,
  large: largeCoffee,
}

const mapState = state => ({
  beans: Selectors.getBeans(state),
  bloom: Selectors.getBloom(state),
  water: Selectors.getWater(state),
})

class Measurements extends React.Component {
  static navigationOptions = {
    title: 'Measurements',
    header: null,
  };

  state = {
    isFlipped: false,
  }

  render() {
    const {beans, bloom, water} = this.props
    const {isFlipped} = this.state

    /* PRESENTATION */
    return (
      <Swiper
        showsButtons={false}
        activeDotColor={Colors.tintColor}
      >
        {sizes.map(size => (
          <Slide key={size}>
            <TitleText>{capitalize(size)}</TitleText>
            <SizeImage source={images[size]} />
            <StaticText>
              <StrongText>{beans[size]}g</StrongText> beans
            </StaticText>
            <StaticText>
              <StrongText>{bloom[size]}g</StrongText> bloom
            </StaticText>
            <StaticText>
              <StrongText>{water[size]}g</StrongText> water
            </StaticText>
          </Slide>
        ))}
      </Swiper>
    )
  }
}

export default connect(mapState)(Measurements)
