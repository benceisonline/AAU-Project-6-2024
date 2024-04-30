import React, { useEffect, useState } from 'react'
import { View } from "react-native"
import Carousel from 'react-native-snap-carousel'
import CarouselCardItem, { SLIDER_WIDTH, ITEM_WIDTH } from './CarouselCardItem'
import { fetchPredictions } from '../utils/AxiosRequest';

const userID = "1078040";

const CarouselCards = () => {
  const isCarousel = React.useRef(null)

  const [ data, setData ] = useState([]);

  const fetchData = async () => {
    try {
      const data = await fetchPredictions(userID, 10);
      setData(data.news);
    } catch (error) {
      console.error('Error fetching articles:', error);
    }
  };

  fetchData();

  return (
    <View>
      <Carousel
        layout="tinder"
        layoutCardOffset={9}
        ref={isCarousel}
        data={data}
        renderItem={CarouselCardItem}
        sliderWidth={SLIDER_WIDTH}
        itemWidth={ITEM_WIDTH}
        itemHeight={350}
        sliderHeight={300}
        inactiveSlideShift={0}
        vertical={true}
    />
    </View>
  )
}


export default CarouselCards