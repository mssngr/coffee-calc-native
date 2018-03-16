import React from 'react';
import {
  Image,
  Platform,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import { WebBrowser } from 'expo';
import Swiper from 'react-native-swiper';

import smallCoffee from '../assets/images/smallCoffee.png'
import mediumCoffee from '../assets/images/mediumCoffee.png'
import largeCoffee from '../assets/images/largeCoffee.png'

import { MonoText } from '../components/StyledText';
import Colors from '../constants/Colors';

const cupSizes = {
  sm: 8,
  md: 12,
  lg: 16,
}
const servings = 1
const gramsConversion = 28.34952
const ratio = 16
const getBeans = size => Math.round((servings * size * gramsConversion) / ratio)
const getBloom = size => Math.round(((servings * size * gramsConversion) / ratio) * 2)
const getWater = size => Math.round(servings * size * gramsConversion)

export default class Measurements extends React.Component {
  static navigationOptions = {
    title: 'Measurements',
    header: null,
  };

  render() {
    return (
      <Swiper
        style={swiper.wrapper}
        showsButtons={false}
        activeDotColor={Colors.tintColor}
      >
        <View style={swiper.slide1}>
          <Text style={swiper.text}>Small</Text>
          <Image style={swiper.image} source={smallCoffee} />
          <Text style={styles.text}>
            <Text style={styles.strong}>{getBeans(cupSizes.sm)}g</Text> beans
          </Text>
          <Text style={styles.text}>
            <Text style={styles.strong}>{getBloom(cupSizes.sm)}g</Text> bloom
          </Text>
          <Text style={styles.text}>
            <Text style={styles.strong}>{getWater(cupSizes.sm)}g</Text> water
          </Text>
        </View>
        <View style={swiper.slide2}>
          <Text style={swiper.text}>Medium</Text>
          <Image style={swiper.image} source={mediumCoffee} />
          <Text style={styles.text}>
            <Text style={styles.strong}>{getBeans(cupSizes.md)}g</Text> beans
          </Text>
          <Text style={styles.text}>
            <Text style={styles.strong}>{getBloom(cupSizes.md)}g</Text> bloom
          </Text>
          <Text style={styles.text}>
            <Text style={styles.strong}>{getWater(cupSizes.md)}g</Text> water
          </Text>
        </View>
        <View style={swiper.slide3}>
          <Text style={swiper.text}>Large</Text>
          <Image style={swiper.image} source={largeCoffee} />
          <Text style={styles.text}>
            <Text style={styles.strong}>{getBeans(cupSizes.lg)}g</Text> beans
          </Text>
          <Text style={styles.text}>
            <Text style={styles.strong}>{getBloom(cupSizes.lg)}g</Text> bloom
          </Text>
          <Text style={styles.text}>
            <Text style={styles.strong}>{getWater(cupSizes.lg)}g</Text> water
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
