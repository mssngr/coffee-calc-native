import React from 'react'
import PropTypes from 'prop-types'
import { MapView, Location } from 'expo'
import { ActivityIndicator } from 'react-native'
import styled from 'styled-components'
import axios from 'axios'
import { get } from 'lodash'
import { GOOGLE_MAPS_API_KEY } from 'react-native-dotenv'
import moment from 'moment'

import DayStyle from 'constants/DayMapStyle.json'
import NightStyle from 'constants/NightMapStyle.json'
import Colors from 'constants/Colors'
import coffeeMarkerDark from 'assets/images/coffeeCup.png'
import coffeeMarkerLight from 'assets/images/coffeeCup-white.png'

const Container = styled.View`
  position: relative;
  flex: 1;
`

const PhotosContainer = styled.TouchableOpacity`
  display: flex;
  flex-direction: row;
  flex-wrap: nowrap;
  width: 100%;
  height: 200px;
`

const Photo = styled.Image`
  width: 25%;
  height: 100%;
`

class Details extends React.Component {
  static propTypes = {
    cafe: PropTypes.object.isRequired,
  }

  state = {
    photo: null,
  }

  componentWillMount() {
    const { cafe } = this.props
    // Get the cafe's photo from Google's API...
    axios
      .get('/photo', {
        baseURL: 'https://maps.googleapis.com/maps/api/place',
        params: {
          key: GOOGLE_MAPS_API_KEY,
          photoreference: cafe.photos[0].photoreference,
          maxwidth: 200,
        },
      })
      .then(response => {
        const photo = get(response, 'data')
        this.setState({ photo }, () => console.log(photo))
      })
      .catch(err => new Error(err))
  }

  render() {
    const { photo } = this.state
    return (
      <PhotosContainer>
        <Photo source={photo} resizeMode="cover" />
      </PhotosContainer>
    )
  }
}

class Cafes extends React.Component {
  static navigationOptions = {
    title: 'Coffee Shops Within 10 Miles',
  }

  state = {
    cafes: [],
    currentCafe: null,
    currentLocation: null,
  }

  componentWillMount() {
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
      .catch(err => new Error(err))
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
            radius: 16000,
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
        .catch(err => new Error(err))
    }
  }

  handlePress = id => () => {
    const { cafes } = this.state
    this.setState({ currentCafe: cafes.find(cafe => cafe.id === id) })
  }

  render() {
    const { currentLocation, cafes, currentCafe } = this.state
    const currentHour = moment().hour()
    const isNight = currentHour >= 6 && currentHour < 20
    const mapStyle = isNight ? NightStyle : DayStyle
    const image = isNight ? coffeeMarkerLight : coffeeMarkerDark

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
