import React from 'react'
import PropTypes from 'prop-types'
import { MapView, Location } from 'expo'
import { ActivityIndicator, Platform } from 'react-native'
import styled from 'styled-components'
import axios from 'axios'
import { get } from 'lodash'
import { GOOGLE_MAPS_API_KEY } from 'react-native-dotenv'
import moment from 'moment'
import StarRating from 'react-native-star-rating'
import truncate from 'truncate'

import DayStyle from 'constants/DayMapStyle.json'
import NightStyle from 'constants/NightMapStyle.json'
import Colors from 'constants/Colors'
import coffeeMarkerDark from 'assets/images/coffeeCup.png'
import coffeeMarkerLight from 'assets/images/coffeeCup-white.png'
import { SmallText, Text } from 'components/styled'

/* STYLES */
const Container = styled.View`
  position: relative;
  flex: 1;
`

const DetailsContainer = styled.TouchableOpacity`
  display: flex;
  flex-direction: row;
  flex-wrap: nowrap;
  width: 100%;
  height: 200px;
  background-color: ${Colors.white};
`

const Photo = styled.Image`
  width: 33%;
  height: 100%;
`

const CafeDetails = styled.View`
  display: flex;
  flex-direction: column;
  flex-wrap: nowrap;
  justify-content: space-around;
  flex: 1;
  padding: 30px 15px;
`

/* PRESENTATION/LOGIC */
class Details extends React.Component {
  static propTypes = {
    cafe: PropTypes.object.isRequired,
  }

  state = {
    photo: '',
    details: null,
  }

  componentWillMount() {
    const { cafe } = this.props
    // Get the cafe's photo from Google's API...
    this.requestPhoto(cafe.photos[0].photo_reference)
    // Get the cafe's details from Google's API...
    this.requestDetails(cafe.place_id)
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
        console.log(response)
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

  render() {
    const { photo, details } = this.state
    return (
      <DetailsContainer>
        <ActivityIndicator
          display-if={!photo}
          size="small"
          color={Colors.darkGray}
        />
        <Photo display-if={photo} source={{ uri: photo }} resizeMode="cover" />
        <ActivityIndicator
          display-if={!details}
          size="large"
          color={Colors.darkGray}
        />
        <CafeDetails display-if={details}>
          <Text>{details && details.name}</Text>
          <StarRating
            maxStars={5}
            rating={details && details.rating}
            containerStyle={{ width: '50%' }}
            starSize={25}
          />
          <SmallText>
            “{details && truncate(details.reviews[0].text, 100)}” -{' '}
            {details && details.reviews[0].author_name}
          </SmallText>
        </CafeDetails>
      </DetailsContainer>
    )
  }
}

class Cafes extends React.Component {
  static navigationOptions = {
    title: 'Coffee Shops Within 5 Miles',
  }

  state = {
    cafes: [],
    currentCafe: null,
    currentLocation: null,
  }

  componentWillMount() {
    console.log('mount')
    // Get the current location and load it into state
    Location.getCurrentPositionAsync()
      .then(location => {
        this.setState({
          currentLocation: {
            latitude: location.coords.latitude,
            longitude: location.coords.longitude,
            latitudeDelta: 0.0922,
            longitudeDelta: 0.0421,
          },
        })
      })
      .catch(err =>
        console.log(
          new Error(`Unable to load the current location. ${err.message}`)
        )
      )
  }

  componentWillUpdate(nextProps, nextState) {
    const { currentLocation } = nextState
    // Once the current location is established...
    if (currentLocation && !this.state.currentLocation) {
      // Get the cafe data from Google's API...
      axios
        .get('/nearbysearch/json', {
          baseURL: 'https://maps.googleapis.com/maps/api/place',
          params: {
            key: GOOGLE_MAPS_API_KEY,
            location: `${currentLocation.latitude},${
              currentLocation.longitude
            }`,
            radius: 8000,
            type: 'cafe',
          },
        })
        .then(response => {
          const results = get(response, 'data.results', null)
          // Filter out any results with ratings less than 4
          const cafes = results.filter(result => result.rating > 4)
          // And load the finalists into state
          this.setState({ cafes })
        })
        .catch(err =>
          console.log(
            new Error(`Unable to load the nearby cafes. ${err.message}`)
          )
        )
    }
  }

  handlePress = id => () => {
    console.log('test')
    const { cafes } = this.state
    this.setState({ currentCafe: cafes.find(cafe => cafe.id === id) })
  }

  render() {
    const { currentLocation, cafes, currentCafe } = this.state
    const currentHour = moment().hour()
    const isDay =
      Platform.OS === 'ios' || (currentHour >= 6 && currentHour < 20)
    const mapStyle = isDay ? DayStyle : NightStyle
    const image = isDay ? coffeeMarkerDark : coffeeMarkerLight

    if (currentLocation) {
      return (
        <Container>
          <MapView
            style={{ flex: 1 }}
            initialRegion={currentLocation}
            customMapStyle={mapStyle}
            showsUserLocation
            loadingEnabled
          >
            {cafes.map(cafe => (
              <MapView.Marker
                key={cafe.id}
                title={cafe.name}
                image={image}
                coordinate={{
                  latitude: cafe.geometry.location.lat,
                  longitude: cafe.geometry.location.lng,
                }}
                onPress={this.handlePress(cafe.id)}
              />
            ))}
          </MapView>
          <Details display-if={currentCafe} cafe={currentCafe} />
        </Container>
      )
    }
    return (
      <Container>
        <ActivityIndicator size="large" color={Colors.darkGray} />
      </Container>
    )
  }
}

export default Cafes
