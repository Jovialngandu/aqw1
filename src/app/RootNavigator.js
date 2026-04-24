import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

import { FeedScreen } from '@features/articles';

const Stack = createNativeStackNavigator();

const HomeStack = () => {
  return (
    <Stack.Navigator 
      screenOptions={{ 
        headerShown: false, // Pas de headers inutiles
        animationEnabled: true, 
		
      }}
    >
      <Stack.Screen name="feed" component={FeedScreen} />
      {/* <Stack.Screen name="article-detail" component={ArticleDetailScreen} /> */}
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