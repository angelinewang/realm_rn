import * as React from 'react';
import LoginScreen from '../screens/LoginScreen';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import Loading from '../components/Loading';

import { useAuth } from '../contexts/Auth';
import MainScreen from '../screens/MainScreen';

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
    <Stack.Navigator screenOptions={{headerShown: false}}>
        <Stack.Screen name="MainScreen" component={MainScreen}/>
    </Stack.Navigator>
  );
};

export const RootNavigator = () => {
  
  const {authData, loading} = useAuth();

  if(loading) {
    return <Loading />;
  }

  return (
    <>
      {authData?.token ? <AppStack /> : <AuthStack />}
    </>
  );
};