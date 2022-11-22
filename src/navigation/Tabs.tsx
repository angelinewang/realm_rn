import * as React from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';

import { BottomTabNavigatorParamList } from './types';
import GuestsStackNavigator from './GuestsStack';
import PartiesStackNavigator from './PartiesStack';
import ProfileScreen from '../screens/Profile/ProfileScreen';

const Tab = createBottomTabNavigator<BottomTabNavigatorParamList>();

const BottomTabs = () => {
  return (
    <Tab.Navigator>

      <Tab.Screen
      name="Parties"
      component={PartiesStackNavigator}
      options={{ headerShown: false }}
      />

    
      <Tab.Screen
        name="Guests"
        component={GuestsStackNavigator}
        options={{ headerShown: false }}
      />

      <Tab.Screen name="Profile" component={ProfileScreen} />

    </Tab.Navigator>

  );
};

export default BottomTabs;