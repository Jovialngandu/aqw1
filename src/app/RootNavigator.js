import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { Platform } from 'react-native';
import { FeedScreen } from '@features/articles';
import WebLandingScreen from '@features/WebLandingScreen';

const Stack = createNativeStackNavigator();
const isWeb = Platform.OS === 'web';
const HomeStack = () => {
return (
    <Stack.Navigator
      initialRouteName={isWeb ? "Landing" : "Feed"}
      screenOptions={{ headerShown: false }}
    >
      {isWeb && (
        <Stack.Screen name="Landing" component={WebLandingScreen} />
      )}
      <Stack.Screen name="Feed" component={FeedScreen} />
    </Stack.Navigator>
  );
};



const RootNavigator = () => {
  return (
    <NavigationContainer>
      <HomeStack />
    </NavigationContainer>
  );
};

export default RootNavigator;



