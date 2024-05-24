import React from 'react'
import Carousel from 'react-native-snap-carousel'
import CarouselCardItem from './CarouselCardItem'
import { useNavigation } from '@react-navigation/native';

export default function CarouselCards ({ articles, scrollParentToTop }) {
  const navigation = useNavigation();

  _renderItem = ({ item, index }) => {
    return (
      <CarouselCardItem
        data={item}
        navigation={navigation}
        articles={articles}
        scrollParentToTop={scrollParentToTop}
        index={index}
      />
    );
  }

  return (
    <Carousel
      layoutCardOffset={8}
      inactiveSlideOpacity={1}
      layout="stack"
      data={articles}
      renderItem={this._renderItem}
      itemHeight={400}
      sliderHeight={400}
      vertical={true}
      useScrollView={true}
    />
  )
}