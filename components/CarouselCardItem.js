import React from 'react'
import { View, Text, StyleSheet, Dimensions, Image, TouchableOpacity } from "react-native"
import PropTypes from 'prop-types';
import { Component } from 'react';

export const SLIDER_WIDTH = Dimensions.get('window').width + 80
export const ITEM_WIDTH = Math.round(SLIDER_WIDTH * 0.7)

export default class CarouselCardItem extends Component {
  static propTypes = {
    data: PropTypes.object.isRequired,
  };

  render () {
    const { data, navigation, articles } = this.props

    return (
        <TouchableOpacity activeOpacity={1} onPress={() => navigation.navigate('Article', { article: data, articlesInView: articles })}>
          <View style={styles.container}>
            <Image
              source={{ uri: data.image_url }}
              style={styles.image}
            />
            <Text style={styles.header}>{data.title}</Text>
          </View>
        </TouchableOpacity>
    )
  }
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: 'white',
    borderRadius: 8,
    width: ITEM_WIDTH,
    paddingBottom: 20,
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 3,
    },
    shadowOpacity: 0.29,
    shadowRadius: 4.65,
    elevation: 7,
  },
  image: {
    width: ITEM_WIDTH,
    height: 250,
  },
  header: {
    color: "#222",
    fontSize: 19,
    fontWeight: "bold",
    paddingLeft: 20,
    paddingTop: 20,
    height: 50,
    alignSelf: 'flex-start',
  },
})