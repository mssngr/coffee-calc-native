import React from 'react'
import PropTypes from 'prop-types'
import { ActivityIndicator } from 'react-native'
import styled from 'styled-components'
import axios from 'axios'
import { get } from 'lodash'
import { GOOGLE_MAPS_API_KEY } from 'react-native-dotenv'
import StarRating from 'react-native-star-rating'
import truncate from 'truncate'
import { connect } from 'react-redux'

import Colors from 'constants/Colors'
import Actions from 'state/actions'
import Selectors from 'state/selectors'
import close from 'assets/images/close.png'
import { SmallText, Text } from 'components/styled'
import Button from 'components/Button'
import { graphcoolRequest } from 'App'

/* QUERIES */
const addCafe = (userId, favoriteCafeIds) => `mutation {
  updateUser(
    id: "${userId}",
    favoriteCafeIds: "${favoriteCafeIds}",
  ) {
    favoriteCafeIds
  }
}`

/* STYLES */
const DetailsContainer = styled.TouchableOpacity`
  position: relative;
  display: flex;
  flex-direction: column;
  flex-wrap: nowrap;
  width: 100%;
  background-color: ${Colors.white};
`

const PreviewContainer = styled.View`
  display: flex;
  flex-direction: row;
  flex-wrap: nowrap;
  width: 100%;
  height: 200px;
`

const Photo = styled.Image`
  width: 33%;
  height: 100%;
`

const Details = styled.View`
  display: flex;
  flex-direction: column;
  flex-wrap: nowrap;
  justify-content: space-around;
  flex: 1;
  padding: 15px;
`

const FavoriteContainer = PreviewContainer.extend`
  flex-direction: column;
  justify-content: space-around;
  align-items: center;
  padding: 30px 15px;
`

const CloseButton = styled.TouchableOpacity`
  position: absolute;
  top: 15px;
  right: 15px;
  width: 30px;
  height: 30px;
`

const CloseImage = styled.Image`
  width: 100%;
  height: 100%;
`

/* PRESENTATION/LOGIC */
class CafeDetails extends React.Component {
  static propTypes = {
    cafe: PropTypes.object.isRequired,
    clearCurrentCafe: PropTypes.func.isRequired,
    userId: PropTypes.string,
    favoriteCafeIds: PropTypes.array.isRequired,
    addCafeToFavorites: PropTypes.func.isRequired,
  }

  state = {
    isExpanded: false,
    isSaved: false,
    photo: '',
    details: null,
  }

  componentWillMount() {
    const { cafe } = this.props
    // Get the cafe's photo from Google's API
    this.requestPhoto(cafe.photos[0].photo_reference)
    // Get the cafe's details from Google's API
    this.requestDetails(cafe.place_id)
  }

  componentWillUpdate(nextProps) {
    // If the cafe has been updated...
    if (nextProps.cafe !== this.props.cafe) {
      // Get the new cafe's photo from Google's API
      this.requestPhoto(nextProps.cafe.photos[0].photo_reference)
      // Get the new cafe's details from Google's API
      this.requestDetails(nextProps.cafe.place_id)
    }
  }

  requestDetails = placeid => {
    axios
      .get('/details/json', {
        baseURL: 'https://maps.googleapis.com/maps/api/place',
        params: {
          key: GOOGLE_MAPS_API_KEY,
          placeid,
        },
      })
      .then(response => {
        const details = get(response, 'data.result')
        this.setState({ details })
      })
      .catch(err =>
        console.log(new Error(`Unable to load the details. ${err.message}`))
      )
  }

  requestPhoto = photoreference => {
    axios
      .get('/photo', {
        baseURL: 'https://maps.googleapis.com/maps/api/place',
        params: {
          key: GOOGLE_MAPS_API_KEY,
          photoreference,
          maxwidth: 150,
        },
      })
      .then(response => {
        const photo = get(response, 'request.responseURL')
        this.setState({ photo })
      })
      .catch(err =>
        console.log(new Error(`Unable to load the photo. ${err.message}`))
      )
  }

  handlePress = () =>
    this.setState(state => ({ isExpanded: !state.isExpanded }))

  handleAddFavorites = () => {
    const { cafe, userId, favoriteCafeIds, addCafeToFavorites } = this.props
    const newFavorites = [...favoriteCafeIds, cafe.place_id]

    graphcoolRequest(addCafe(userId, newFavorites))
      .then(() => {
        addCafeToFavorites(cafe.id)
        this.setState({ isSaved: true })
      })
      .catch(err =>
        console.log(new Error(`Could not add cafe to favorites. ${err}`))
      )
  }

  render() {
    const { photo, details, height, isExpanded, isSaved } = this.state
    const { clearCurrentCafe } = this.props
    return (
      <DetailsContainer height={height} onPress={this.handlePress}>
        <PreviewContainer>
          <ActivityIndicator
            display-if={!photo}
            size="small"
            color={Colors.darkGray}
          />
          <Photo
            display-if={photo}
            source={{ uri: photo }}
            resizeMode="cover"
          />
          <ActivityIndicator
            display-if={!details}
            size="large"
            color={Colors.darkGray}
          />
          <Details display-if={details}>
            <Text>{details && details.name}</Text>
            <StarRating
              maxStars={5}
              rating={details && details.rating}
              containerStyle={{ width: '50%', marginVertical: 5 }}
              starSize={25}
              iconSet="Ionicons"
              emptyStar="ios-star-outline"
              halfStar="ios-star-half-outline"
              fullStar="ios-star"
            />
            <SmallText>
              “{details && truncate(details.reviews[0].text, 100)}” -{' '}
              {details && details.reviews[0].author_name}
            </SmallText>
          </Details>
        </PreviewContainer>
        <FavoriteContainer display-if={isExpanded}>
          <Text centered>Add this coffee shop to your list of favorites.</Text>
          <Button
            style={{ width: '70%' }}
            outline={!isSaved}
            onPress={this.handleAddFavorites}
          >
            {isSaved ? 'Added to Favorites' : 'Add to Favorites'}
          </Button>
        </FavoriteContainer>
        <CloseButton onPress={clearCurrentCafe}>
          <CloseImage source={close} />
        </CloseButton>
      </DetailsContainer>
    )
  }
}

const mapState = state => ({
  userId: Selectors.getUserId(state),
  favoriteCafeIds: Selectors.getFavoriteCafeIds(state),
})

const mapActions = {
  addCafeToFavorites: Actions.addCafeToFavorites,
}

export default connect(mapState, mapActions)(CafeDetails)
