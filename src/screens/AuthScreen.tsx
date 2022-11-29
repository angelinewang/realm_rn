import {useEffect} from 'react';
import { createStackNavigator } from '@react-navigation/stack';

import { LoginScreen } from './Authentication/LoginScreen';
import SignUpScreen from './Authentication/SignUpScreen';
const Stack = createStackNavigator();

// This is the Authenticated Screen with a navigator that contains all the authenticated screens in the app, adding a bottom tabs bar with options
const AuthScreen = () => {

  useEffect(() => {}, [])
  
  return (
    <Stack.Navigator initialRouteName="Login" >

      <Stack.Screen
      name="Login"
      component={LoginScreen}
      />
    
      <Stack.Screen
        name="SignUp"
        component={SignUpScreen} options={{title: "Sign Up"}}
        />

    </Stack.Navigator>

  );
};

export default AuthScreen;