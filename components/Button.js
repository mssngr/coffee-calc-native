import React from 'react'
import PropTypes from 'prop-types'
import { TouchableOpacity } from 'react-native'
import styled from 'styled-components'

import Colors from '../constants/Colors'
import { Text, StrongText } from './styled'

const StyledButton = styled.TouchableOpacity`
  display: flex;
  justify-content: center;
  align-items: center;
  height: 50px;
  padding-horizontal: 30px;
  background-color: ${Colors.black};
`

const OutlineButton = StyledButton.extend`
  background-color: transparent;
  border: 2px solid ${Colors.black};
`

const WhiteText = StrongText.extend`
  color: white;
`

class Button extends React.Component {
  static propTypes = {
    link: PropTypes.bool,
    outline: PropTypes.bool,
    children: PropTypes.node.isRequired,
  }

  render() {
    const { link, outline, children, ...restProps } = this.props
    let Touchable = StyledButton
    let ButtonText = WhiteText
    if (link) {
      Touchable = TouchableOpacity
      ButtonText = Text
    }
    if (outline) {
      Touchable = OutlineButton
      ButtonText = Text
    }

    return (
      <Touchable {...restProps}>
        <ButtonText>{children}</ButtonText>
      </Touchable>
    )
  }
}

export default Button
