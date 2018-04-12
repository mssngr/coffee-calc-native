import React from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import Swiper from 'react-native-swiper'
import styled from 'styled-components'

import caret from '../assets/images/caret-gray.png'
import Colors from '../constants/Colors'
import Selectors from '../state/selectors'
import Actions from '../state/actions'
import { HeaderAlt } from '../components/styled'
import Screen from '../components/Screen'

/* STYLES */
const SlideContainer = styled.View`
  flex: 1;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
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
    method: PropTypes.object.isRequired,
  }

  render() {
    const { method } = this.props
    return (
      <SlideContainer>
        <HeaderAlt>{method.name}</HeaderAlt>
        <SlideImage source={method.image} resizeMode="contain" />
      </SlideContainer>
    )
  }
}

class Method extends React.Component {
  static navigationOptions = {
    title: 'Method',
    header: null,
  }

  static propTypes = {
    navigation: PropTypes.object.isRequired,
    methods: PropTypes.object.isRequired,
    currentMethod: PropTypes.object.isRequired,
    changeMethod: PropTypes.func.isRequired,
  }

  currentIndex = () => {
    const { currentMethod } = this.props
    switch (currentMethod.id) {
      case 'pourOver':
        return 0

      case 'frenchPress':
        return 1

      default:
        return 0
    }
  }

  handleSwipe = index => {
    const { changeMethod } = this.props
    switch (index) {
      case 0:
        return changeMethod('pourOver')
      case 1:
        return changeMethod('frenchPress')
      default:
        break
    }
  }

  handlePress = () => {
    this.props.navigation.navigate('Instructions')
  }

  render() {
    const { navigation, methods } = this.props
    return (
      <Screen
        header="Choose your method"
        next={{ screen: 'Instructions', text: 'Choose this method' }}
        navigation={navigation}
        hasBack
      >
        <Swiper
          activeDotColor={Colors.tintColor}
          onIndexChanged={this.handleSwipe}
          nextButton={nextArrow}
          prevButton={prevArrow}
          loop={false}
          showsButtons
        >
          <Slide method={methods.pourOver} />
          <Slide method={methods.frenchPress} />
        </Swiper>
      </Screen>
    )
  }
}

const mapState = state => ({
  methods: Selectors.getMethods(state),
  currentMethod: Selectors.getCurrentMethod(state),
})

const mapActions = {
  changeMethod: Actions.changeMethod,
}

export default connect(mapState, mapActions)(Method)
