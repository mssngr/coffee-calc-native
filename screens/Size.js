import React from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import Swiper from 'react-native-swiper'
import styled from 'styled-components'

import caret from '../assets/images/caret-gray.png'
import Colors from '../constants/Colors'
import Selectors from '../state/selectors'
import Actions from '../state/actions'
import { HeaderAlt, Text } from '../components/styled'
import Screen from '../components/Screen'

/* STYLES */
const SlideContainer = styled.View`
  flex: 1;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
`

const SlideText = Text.extend`
  color: ${Colors.darkGray};
`

const SlideImage = styled.Image`
  margin-vertical: 15px;
  height: 150px;
`

const LeftArrow = styled.Image`
  width: 45px;
  height: 45px;
  transform: rotate(-90deg);
`

const RightArrow = LeftArrow.extend`
  transform: rotate(90deg);
`

/* PRESENTATION/LOGIC */
const prevArrow = <LeftArrow source={caret} />
const nextArrow = <RightArrow source={caret} />

class Slide extends React.Component {
  static propTypes = {
    size: PropTypes.object.isRequired,
  }

  render() {
    const { size } = this.props
    return (
      <SlideContainer>
        <HeaderAlt>{size.name}</HeaderAlt>
        <SlideText>{size.ounces} oz</SlideText>
        <SlideImage source={size.image} resizeMode="contain" />
      </SlideContainer>
    )
  }
}

class Size extends React.Component {
  static navigationOptions = {
    title: 'Size',
    header: null,
  }

  static propTypes = {
    navigation: PropTypes.object.isRequired,
    sizes: PropTypes.object.isRequired,
    currentSize: PropTypes.object.isRequired,
    changeSize: PropTypes.func.isRequired,
  }

  currentIndex = () => {
    const { currentSize } = this.props
    switch (currentSize.id) {
      case 'sm':
        return 0

      case 'md':
        return 1

      case 'lg':
        return 2

      default:
        return 0
    }
  }

  handleSwipe = index => {
    const { changeSize } = this.props
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
    const { navigation, sizes } = this.props
    return (
      <Screen
        header="Choose your size"
        next={{ screen: 'Method', text: 'Choose this size' }}
        navigation={navigation}
        hasBack
      >
        <Swiper
          activeDotColor={Colors.tintColor}
          index={this.currentIndex()}
          onIndexChanged={this.handleSwipe}
          nextButton={nextArrow}
          prevButton={prevArrow}
          showsButtons
        >
          <Slide size={sizes.sm} />
          <Slide size={sizes.md} />
          <Slide size={sizes.lg} />
        </Swiper>
      </Screen>
    )
  }
}

const mapState = state => ({
  sizes: Selectors.getSizes(state),
  currentSize: Selectors.getCurrentSize(state),
})

const mapActions = {
  changeSize: Actions.changeSize,
}

export default connect(mapState, mapActions)(Size)
