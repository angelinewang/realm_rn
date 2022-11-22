import * as React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import LoginScreen from '../screens/LoginScreen';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import BrowseScreen from '../screens/Guests/BrowseScreen';
import Loading from '../components/Loading';

import { useAuth } from '../contexts/Auth';

import BottomTabs from './Tabs';

// 2 Different Options for Render: 1. Unauthenticated 2. Authenticated 


// Unauthenticated Flow 
const Stack = createNativeStackNavigator();

const AuthStack = () => {
  return (
    <Stack.Navigator>
      <Stack.Screen name="Login" component={LoginScreen}/>
    </Stack.Navigator>
  )
}

// Authenticated Flow 
const AppStack = () => {
  return (
    <Stack.Navigator>
        <Stack.Screen name="Browse" component={BrowseScreen}/>
        <BottomTabs />
    </Stack.Navigator>
  );
};

export const RootNavigator = () => {
  
  const {authData, loading} = useAuth();

  if(loading) {
    return <Loading />;
  }

  return (
    <NavigationContainer>
      {authData?.token ? <AppStack /> : <AuthStack />}
    </NavigationContainer>
  );
};