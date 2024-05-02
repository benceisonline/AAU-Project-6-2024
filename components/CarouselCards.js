import React, { useEffect, useState, useRef } from 'react'
import { View, TouchableOpacity } from "react-native"
import Carousel from 'react-native-snap-carousel'
import CarouselCardItem, { SLIDER_WIDTH, ITEM_WIDTH } from './CarouselCardItem'
import { useNavigation } from '@react-navigation/native';

export default function CarouselCards ({ articles }) {
  const carouselRef = useRef(null);
  const navigation = useNavigation();

  _renderItem = ({ item }) => {
    return (
      <CarouselCardItem
        data={item}
        navigation={navigation}
        articles={articles}
      />
    );
  }

  return (
    <View>
      <Carousel
        ref={carouselRef}
        layout="stack"
        layoutCardOffset={7}
        data={articles}
        renderItem={this._renderItem}
        sliderWidth={SLIDER_WIDTH}
        itemWidth={ITEM_WIDTH}
        itemHeight={400}
        sliderHeight={400}
        vertical={true}
      />
    </View>
  )
}