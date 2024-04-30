import React, { useState, useEffect } from 'react';
import { View, Animated, Easing, Image, StyleSheet } from 'react-native';

const BouncingLogo = () => {
  const [animation] = useState(new Animated.Value(0));

  useEffect(() => {
    startAnimation();

    return () => animation.setValue(0);
  }, []);

  const startAnimation = () => {
    Animated.loop(
      Animated.sequence([
        Animated.timing(animation, {
          toValue: 1,
          duration: 500,
          easing: Easing.linear,
          useNativeDriver: true,
        }),
        Animated.timing(animation, {
          toValue: 0,
          duration: 500,
          easing: Easing.linear,
          useNativeDriver: true,
        }),
      ]),
    ).start();
  };

  const translateY = animation.interpolate({
    inputRange: [0, 1],
    outputRange: [0, 20],
  });

  return (
    <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
      <Animated.View style={{ transform: [{ translateY }] }}>
        <Image source={require('../assets/eb_logo.png')} style={styles.logo} />
      </Animated.View>
    </View>
  );
};

const styles = StyleSheet.create({
  logo: {
    width: 125, // Adjust width as needed
    height: 125, // Adjust height as needed
    resizeMode: 'contain', // Preserve aspect ratio
  },
});

export default BouncingLogo;
