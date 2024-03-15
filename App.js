import React from 'react'; 
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { StatusBar } from 'react-native';

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
