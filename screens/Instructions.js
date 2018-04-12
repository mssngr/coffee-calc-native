import React from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import styled from 'styled-components'
import { toLower } from 'lodash'

import { convertNumToText } from 'utils/functions'
import Colors from 'constants/Colors'
import Selectors from 'state/selectors'
import Actions from 'state/actions'
import { HeaderAlt, Text, StrongText } from 'components/styled'
import Screen from 'components/Screen'
import { graphcoolRequest } from 'App'

/* QUERIES */
const addRecipe = (userId, favoriteRecipes) => `mutation {
  updateUser(
    id: "${userId}",
    favoriteRecipes: "${favoriteRecipes}",
  ) {
    favoriteRecipes
  }
}`

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

const ImageContainer = styled.View`
  display: flex;
  flex-direction: row;
  flex-wrap: nowrap;
  width: 100%;
  height: 150px;
  margin: 15px 0;
`

const Image = styled.Image`
  height: 100%;
  max-width: 100px;
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
    userId: PropTypes.string,
    favoriteRecipes: PropTypes.array.isRequired,
    addRecipeToFavorites: PropTypes.func.isRequired,
  }

  state = {
    isSaved: false,
  }

  handleAddFavorites = () => {
    const {
      currentServings,
      currentSize,
      currentMethod,
      userId,
      favoriteRecipes,
      addRecipeToFavorites,
    } = this.props
    const recipe = `${currentServings},${currentSize.id}${currentMethod.id}`
    const newFavorites = [...favoriteRecipes, recipe]

    graphcoolRequest(addRecipe(userId, newFavorites))
      .then(() => {
        addRecipeToFavorites(recipe)
        this.setState({ isSaved: true })
      })
      .catch(err =>
        console.log(new Error(`Could not add recipe to favorites. ${err}`))
      )
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
    const { isSaved } = this.state
    const blankArray = new Array(currentServings)
    const servingsArray = blankArray.fill('')

    return (
      <Screen
        header="Brew your cup!"
        navigation={navigation}
        otherButton={{
          isNotOutline: isSaved,
          onPress: this.handleAddFavorites,
          text: isSaved ? 'Added to Favorites' : 'Add to Favorites',
        }}
        next={{ screen: 'Servings', text: 'Start Over' }}
        hasBack
      >
        <Container>
          <HeaderAlt>
            {currentSize.name} {toLower(currentMethod.name)} for{' '}
            {convertNumToText(currentServings)}.
          </HeaderAlt>
          <ImageContainer>
            {servingsArray.map((serving, index) => (
              <Image
                key={`Cup Image - ${index}`}
                source={currentSize.image}
                resizeMode="contain"
              />
            ))}
          </ImageContainer>
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
  userId: Selectors.getUserId(state),
  favoriteRecipes: Selectors.getFavoriteRecipes(state),
})

const mapActions = {
  addRecipeToFavorites: Actions.addRecipeToFavorites,
}

export default connect(mapState, mapActions)(Instructions)
