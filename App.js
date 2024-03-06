import React from 'react'; 
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

// News Screens
import NewsFeedScreen from './screens/NewsFeed';

const GeneralStack = createNativeStackNavigator();
const NewsStack = createNativeStackNavigator();

function NewsStackScreen() {
  return (
    <NewsStack.Navigator initialRouteName={"NewsFeed"} >
      <NewsStack.Screen
        name="NewsFeed"
        component={ NewsFeedScreen }
        options={{ headerShown: false }}
      />
    </NewsStack.Navigator>
  );
}

export default function App() {
  return (
    <NavigationContainer>
      <GeneralStack.Navigator initialRouteName="NewsStack" >
        <GeneralStack.Screen 
          name="NewsStack" 
          component={ NewsStackScreen } 
          options={{ headerShown: false }}
        />
      </GeneralStack.Navigator>
    </NavigationContainer>
  );
}
