import * as React from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';

import { BottomTabNavigatorParamList } from '../navigation/types';

import GuestsStackNavigator from '../navigation/GuestsStack';
import PartiesStackNavigator from '../navigation/PartiesStack';
import ProfileStackNavigator from '../navigation/ProfileStack';

const Tab = createBottomTabNavigator<BottomTabNavigatorParamList>();

// This is the Authenticated Screen with a navigator that contains all the authenticated screens in the app, adding a bottom tabs bar with options
const MainScreen = () => {

  React.useEffect(() => {}, [])
  
  return (
    <Tab.Navigator initialRouteName="Guests" screenOptions={{headerShown: false}}>

      <Tab.Screen
      name="Parties"
      component={PartiesStackNavigator}
      />

    
      <Tab.Screen
        name="Guests"
        component={GuestsStackNavigator}
      />
      {/* Profile Tab is name ProfileScreen, while actual Profile screen is named Profile inside ProfileStack*/}
      <Tab.Screen name="ProfileScreen" component={ProfileStackNavigator}/>

    </Tab.Navigator>

  );
};

export default MainScreen;