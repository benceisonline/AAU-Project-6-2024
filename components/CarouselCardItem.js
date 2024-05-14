import React, { Component } from 'react';
import { View, Text, StyleSheet, Dimensions, Image, TouchableOpacity, PanResponder, Animated } from "react-native";
import PropTypes from 'prop-types';

export const SLIDER_WIDTH = Dimensions.get('window').width + 80;
export const ITEM_WIDTH = Math.round(SLIDER_WIDTH * 0.7);

export default class CarouselCardItem extends Component {
  static propTypes = {
    data: PropTypes.object.isRequired,
    navigation: PropTypes.object.isRequired,
    articles: PropTypes.array.isRequired,
    scrollParentToTop: PropTypes.func.isRequired,
    index: PropTypes.number.isRequired,
  };

  constructor(props) {
    super(props);
    this.state = {
      overlayOpacity: new Animated.Value(0.9),
    };

    this.panResponder = PanResponder.create({
      onStartShouldSetPanResponder: () => true,
      onPanResponderMove: this.handlePanResponderMove,
    });
  }

  handlePanResponderMove = (evt, gestureState) => {
    // Check if the gesture is moving upwards
    if (gestureState.dy < -10) {
      // Slowly animate the opacity to 0
      Animated.timing(this.state.overlayOpacity, {
        toValue: 0,
        duration: 500,
        useNativeDriver: true,
      }).start();
    }
  };

  render() {
    const { data, navigation, articles, scrollParentToTop, index } = this.props;
    const isSingleLine = data.title.length <= 34;
    const { overlayOpacity } = this.state;

    return (
      <TouchableOpacity
        activeOpacity={1}
        onPress={() => {
          navigation.navigate('Article', { article: data, articlesInView: articles });
          scrollParentToTop();
        }}
      >
        <View style={styles.container}>
          {/* Show overlay only for the first card */}
          {index === 0 && (
            <Animated.View {...this.panResponder.panHandlers} style={[styles.overlay, { backgroundColor: 'rgba(0, 0, 0, 0.5)', opacity: overlayOpacity }]}>
              <Text style={styles.overlayText}>Swipe op</Text>
            </Animated.View>
          )}
          <Image
            source={{ uri: data.image_url }}
            style={styles.image}
          />
          <Text style={[styles.header, isSingleLine && { fontSize: 18, paddingTop: 20 }]}>
            {data.title}
          </Text>
        </View>
      </TouchableOpacity>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    position: 'relative',
    zIndex: -1,
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
    fontSize: 16,
    fontWeight: "bold",
    paddingHorizontal: 20,
    paddingTop: 10,
    height: 50,
    alignSelf: 'flex-start',
  },
  overlay: {
    zIndex: 1,
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 8,
  },
  overlayText: {
    zIndex: 2,
    color: 'white',
    fontSize: 30,
    fontWeight: 'bold',
  },
});
