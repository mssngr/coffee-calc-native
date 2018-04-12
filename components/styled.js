import styled from 'styled-components'
import Colors from '../constants/Colors'

export const Text = styled.Text`
  color: ${Colors.black};
  font-size: 20px;
`

export const LargeText = Text.extend`
  font-size: 25px;
`

export const SmallText = Text.extend`
  font-size: 16px;
`

export const StrongText = Text.extend`
  font-weight: 700;
`

export const Header = StrongText.extend`
  font-size: 30px;
  text-align: center;
`

export const HeaderAlt = Header.extend`
  color: ${Colors.white};
`
