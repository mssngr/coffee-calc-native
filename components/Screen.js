import React from 'react'
import PropTypes from 'prop-types'
import styled from 'styled-components'

import caret from '../assets/images/caret-darkGray.png'
import Colors from '../constants/Colors'
import { Header, Text } from '../components/styled'
import Button from '../components/Button'

/* STYLES */
const ScreenContainer = styled.View`
  position: relative;
  flex: 1;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  align-items: center;
  padding: 45px 0;
  background-color: ${Colors.lightGray};
`

const Caret = styled.Image`
  width: 30px;
  height: 30px;
  margin-right: 5px;
  transform: rotate(-90deg);
`

const BackButton = styled.TouchableOpacity`
  display: flex;
  flex-direction: row;
  flex-wrap: nowrap;
  align-items: center;
  position: absolute;
  top: 5;
  left: 0;
`

const BackText = Text.extend`
  color: ${Colors.darkGray};
`

const ButtonsContainer = styled.View`
  display: flex;
  flex-direction: row;
  justify-content: center;
  align-items: center;
  width: 100%;
`

const Spacer = styled.View`
  width: 15px;
  height: 100%;
`

const ActionButton = styled(Button)`
  min-width: 35%;
`

/* PRESENTATION/LOGIC */
class Screen extends React.Component {
  static propTypes = {
    hasBack: PropTypes.bool,
    header: PropTypes.string,
    next: PropTypes.shape({
      screen: PropTypes.string.isRequired,
      text: PropTypes.string.isRequired,
    }),
    otherButton: PropTypes.shape({
      screen: PropTypes.string.isRequired,
      text: PropTypes.string.isRequired,
    }),
    navigation: PropTypes.object,
    children: PropTypes.node.isRequired,
  }

  handleBack = () => {
    this.props.navigation.goBack()
  }

  handleNext = nextScreen => () => {
    this.props.navigation.navigate(nextScreen)
  }

  render() {
    const { hasBack, header, next, otherButton, children } = this.props
    return (
      <ScreenContainer>
        <BackButton display-if={hasBack} onPress={this.handleBack}>
          <Caret source={caret} />
          <BackText>Back</BackText>
        </BackButton>
        <Header display-if={header}>{header}</Header>
        {children}
        <ButtonsContainer display-if={otherButton || next}>
          <ActionButton
            display-if={otherButton}
            onPress={this.handleNext(otherButton && otherButton.screen)}
            outline
          >
            {otherButton && otherButton.text}
          </ActionButton>
          <Spacer display-if={otherButton && next} />
          <ActionButton
            display-if={next}
            onPress={this.handleNext(next && next.screen)}
          >
            {next && next.text}
          </ActionButton>
        </ButtonsContainer>
      </ScreenContainer>
    )
  }
}

export default Screen
