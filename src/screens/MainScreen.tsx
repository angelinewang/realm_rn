import * as React from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';

import { BottomTabNavigatorParamList } from '../navigation/types';

import GuestsStackNavigator from '../navigation/GuestsStack';
import PartiesStackNavigator from '../navigation/PartiesStack';
import ProfileStackNavigator from '../navigation/ProfileStack';

import GuestsScreen from './GuestsScreen';
import PartiesScreen from './PartiesScreen';
import ProfileScreen from './ProfileScreen';

const Tab = createBottomTabNavigator<BottomTabNavigatorParamList>();

// This is the Authenticated Screen with a navigator that contains all the authenticated screens in the app, adding a bottom tabs bar with options
const MainScreen = () => {

  React.useEffect(() => {}, [])
  
  return (
    <Tab.Navigator initialRouteName="Guests" >

      <Tab.Screen
      name="Parties"
      component={PartiesScreen}
      />
    
      <Tab.Screen
        name="Guests"
        component={GuestsScreen}
      />
      {/* Profile Tab is name ProfileScreen, while actual Profile screen is named Profile inside ProfileStack*/}
      <Tab.Screen name="ProfileScreen" component={ProfileScreen} options={{title: "Profile"}}/>

    </Tab.Navigator>

  );
};

export default MainScreen;