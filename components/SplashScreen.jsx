import React, { useRef, useEffect } from 'react';
import { Image, StyleSheet, Animated } from 'react-native';

const SplashScreen = () => {
	const fadeAnim = useRef(new Animated.Value(0)).current; // Initial opacity is set to 0

	useEffect(() => {
		const fadeIn = Animated.timing(
			fadeAnim,
			{
				toValue: 1, // Fades in to 1 opacity
				duration: 500, // Duration of the fade-in animation (in milliseconds)
				useNativeDriver: true,
			}
		);

		const fadeOut = Animated.timing(
			fadeAnim,
			{
				toValue: 0, // Fades out to 0 opacity
				duration: 500, // Duration of the fade-out animation (in milliseconds)
				useNativeDriver: true,
			}
		);

		const fadeInAndOut = Animated.sequence([
			fadeIn,
			Animated.delay(1000), // Delay before starting the fade-out animation
			fadeOut,
		]);

		fadeInAndOut.start();

		return () => fadeInAndOut.stop(); // Clean up the animation on unmount
	}, [fadeAnim]);

	return (
		<Animated.View style={[styles.container, { opacity: fadeAnim }]}>
			{/* Your splash screen content here */}
			<Image source={require('../assets/eb_logo.png')} style={styles.logo} />
		</Animated.View>
	);
};

const styles = StyleSheet.create({
	container: {
		flex: 1,
		justifyContent: 'center',
		alignItems: 'center',
		backgroundColor: 'white', // Set background color as needed
	},
	logo: {
		width: 200, // Adjust width as needed
		height: 200, // Adjust height as needed
		resizeMode: 'contain', // Preserve aspect ratio
	},
});

export default SplashScreen;
