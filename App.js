import React from 'react'; 
import { createSessionId } from './utils/AsyncFunctions';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { StatusBar, Text } from 'react-native';
import { useFonts } from "expo-font";
import { createUserId } from './utils/AsyncFunctions';

import 'react-native-reanimated'; // Required for react-navigation

// News Screens
import NewsFeedScreen from './screens/NewsFeed';
import ArticleScreen from './screens/Article';

const GeneralStack = createNativeStackNavigator();
const NewsStack = createNativeStackNavigator();

function NewsStackScreens() {
	return (
			<NewsStack.Navigator initialRouteName={"NewsFeed"} >
				<NewsStack.Screen
					name="NewsFeed"
					component={ NewsFeedScreen }
					options={{ headerShown: false }}
				/>
				<NewsStack.Screen
					name="Article"
					component={ ArticleScreen }
					options={{ headerShown: false }}
				/>
			</NewsStack.Navigator>
	);
}

export default function App() {
	createUserId();
  createSessionId();
	const [fontsLoaded] = useFonts({
		"WorkSans-Regular": require("./assets/fonts/WorkSans-Regular.ttf"),
		"WorkSans-Medium": require("./assets/fonts/WorkSans-Medium.ttf"),
		"Karla-Regular": require("./assets/fonts/Karla-Regular.ttf"),
		"Karla-Medium": require("./assets/fonts/Karla-Medium.ttf"),
		"InterTight-SemiBold": require("./assets/fonts/InterTight-SemiBold.ttf"),
		"InterTight-Bold": require("./assets/fonts/InterTight-Bold.ttf"),
		"Calicanto-Regular": require("./assets/fonts/Calicanto-Regular.ttf"),
		"EuropaGroteskSH-Regular": require("./assets/fonts/EuropaGroteskSH-Reg.otf"),
	});
	if (!fontsLoaded) {
	return <Text>Loading...</Text>;
	}
	return (
		<NavigationContainer>
			<StatusBar barStyle="dark-content" backgroundColor="white" />
			<GeneralStack.Navigator initialRouteName="NewsStack" >
				<GeneralStack.Screen 
					name="NewsStack" 
					component={ NewsStackScreens } 
					options={{ headerShown: false }}
				/>
			</GeneralStack.Navigator>
		</NavigationContainer>
	);
}
