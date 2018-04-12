import styled, { css } from 'styled-components'
import Colors from '../constants/Colors'

export const Text = styled.Text`
  color: ${Colors.black};
  font-family: 'gamja-flower';
  font-size: 24px;

  ${props =>
    props.centered &&
    css`
      text-align: center;
    `};
`

export const LargeText = Text.extend`
  font-size: 30px;
`

export const SmallText = Text.extend`
  font-size: 18px;
`

export const StrongText = Text.extend`
  font-family: 'gaegu-bold';
`

export const Header = StrongText.extend`
  font-family: 'caveat-bold';
  font-size: 48px;
  color: ${Colors.white};
  text-align: center;
  padding: 0 5px;
`

export const HeaderAlt = StrongText.extend`
  font-size: 36px;
  text-align: center;
`
