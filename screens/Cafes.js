import React from 'react'
import { MapView, Location } from 'expo'
import { ActivityIndicator, Platform } from 'react-native'
import styled from 'styled-components'
import axios from 'axios'
import { get } from 'lodash'
import { GOOGLE_MAPS_API_KEY } from 'react-native-dotenv'
import moment from 'moment'

import DayStyle from 'constants/DayMapStyle.json'
import NightStyle from 'constants/NightMapStyle.json'
import Colors from 'constants/Colors'
import mapMarkerDark from 'assets/images/mapMarker.png'
import mapMarkerLight from 'assets/images/mapMarker-white.png'
import CafeDetails from 'components/CafeDetails'

/* STYLES */
const Container = styled.View`
  position: relative;
  flex: 1;
`

/* PRESENTATION/LOGIC */
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
    // Get the current location and load it into state
    this.getCurrentLocation()
  }

  componentDidUpdate(prevProps, prevState) {
    // When the current location is updated...
    if (prevState.currentLocation !== this.state.currentLocation) {
      // Get the cafe data from Google's API
      this.getCafeData()
    }
  }

  refresh = () => {
    // To refresh, update the current location
    // The cafe data will automatically update, accordingly
    this.getCurrentLocation()
  }

  getCurrentLocation = () => {
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

  getCafeData = () => {
    const { currentLocation } = this.state
    if (currentLocation) {
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
    const { cafes } = this.state
    this.setState({ currentCafe: cafes.find(cafe => cafe.id === id) })
  }

  clearCurrentCafe = () => {
    this.setState({ currentCafe: null })
  }

  render() {
    const { currentLocation, cafes, currentCafe } = this.state
    const currentHour = moment().hour()
    const isDay =
      Platform.OS === 'ios' || (currentHour >= 6 && currentHour < 20)
    const mapStyle = isDay ? DayStyle : NightStyle
    const image = isDay ? mapMarkerDark : mapMarkerLight

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
                flat
              />
            ))}
          </MapView>
          <CafeDetails
            display-if={currentCafe}
            cafe={currentCafe}
            clearCurrentCafe={this.clearCurrentCafe}
          />
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
