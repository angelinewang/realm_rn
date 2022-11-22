import * as React from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { IntroStackNavigatorParamList } from './types';
import LoginScreen from '../screens/LoginScreen';
import SignUpScreen from '../screens/SignUpScreen';

const IntroStack = createNativeStackNavigator<IntroStackNavigatorParamList>();

const IntroStackNavigator = () => {
  return (
    <IntroStack.Navigator>
      {/* Permissible "name"s are checked through ./types */}
      <IntroStack.Screen name="Login" component={LoginScreen} />
      <IntroStack.Screen name="SignUp" component={SignUpScreen} />
    </IntroStack.Navigator>
  );
};

export default IntroStackNavigator;