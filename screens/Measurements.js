import React from 'react';
import {connect} from 'react-redux'
import {
  Image,
  Platform,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import Swiper from 'react-native-swiper';

import Selectors from '../state/selectors'

import smallCoffee from '../assets/images/smallCoffee.png'
import mediumCoffee from '../assets/images/mediumCoffee.png'
import largeCoffee from '../assets/images/largeCoffee.png'

import Colors from '../constants/Colors';

class Measurements extends React.Component {
  static navigationOptions = {
    title: 'Measurements',
    header: null,
  };

  state = {
    isFlipped: false,
  }

  render() {
    const {beans, bloom, water} = this.props
    const {isFlipped} = this.state
    return (
      <Swiper
        display-if={!isFlipped}
        style={swiper.wrapper}
        showsButtons={false}
        activeDotColor={Colors.tintColor}
      >
        <View style={swiper.slide1}>
          <Text style={swiper.text}>Small</Text>
          <Image style={swiper.image} source={smallCoffee} />
          <Text style={styles.text}>
            <Text style={styles.strong}>{beans.sm}g</Text> beans
          </Text>
          <Text style={styles.text}>
            <Text style={styles.strong}>{bloom.sm}g</Text> bloom
          </Text>
          <Text style={styles.text}>
            <Text style={styles.strong}>{water.sm}g</Text> water
          </Text>
        </View>
        <View style={swiper.slide2}>
          <Text style={swiper.text}>Medium</Text>
          <Image style={swiper.image} source={mediumCoffee} />
          <Text style={styles.text}>
            <Text style={styles.strong}>{beans.md}g</Text> beans
          </Text>
          <Text style={styles.text}>
            <Text style={styles.strong}>{bloom.md}g</Text> bloom
          </Text>
          <Text style={styles.text}>
            <Text style={styles.strong}>{water.md}g</Text> water
          </Text>
        </View>
        <View style={swiper.slide3}>
          <Text style={swiper.text}>Large</Text>
          <Image style={swiper.image} source={largeCoffee} />
          <Text style={styles.text}>
            <Text style={styles.strong}>{beans.lg}g</Text> beans
          </Text>
          <Text style={styles.text}>
            <Text style={styles.strong}>{bloom.lg}g</Text> bloom
          </Text>
          <Text style={styles.text}>
            <Text style={styles.strong}>{water.lg}g</Text> water
          </Text>
        </View>
      </Swiper>
    );
  }
}

const text = {
  color: '#000',
  fontSize: 20,
}

const styles = StyleSheet.create({
  text: text,
  strong: {
    ...text,
    fontWeight: '700',
  },
  flipButton: {
    ...text,
    position: 'absolute',
    top: '10%',
    right: 0,
  },
});

const slide = {
  flex: 1,
  justifyContent: 'center',
  alignItems: 'center',
  backgroundColor: '#c3c3c3',
}

const swiper = StyleSheet.create({
  wrapper: {
  },
  slide1: slide,
  slide2: slide,
  slide3: slide,
  image: {
    marginVertical: 30,
  },
  text: {
    color: '#fff',
    fontSize: 30,
    fontWeight: 'bold',
  }
})

const mapState = state => ({
  beans: Selectors.getBeans(state),
  bloom: Selectors.getBloom(state),
  water: Selectors.getWater(state),
})

export default connect(mapState)(Measurements)
