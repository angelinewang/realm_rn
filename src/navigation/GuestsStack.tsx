import * as React from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { GuestsStackNavigatorParamList } from './types';
import GuestlistScreen from '../screens/Guests/GuestlistScreen';
import BrowseScreen from '../screens/Guests/BrowseScreen';

const GuestsStack = createNativeStackNavigator<GuestsStackNavigatorParamList>();

const GuestsStackNavigator = () => {
  return (
    <GuestsStack.Navigator>
      {/* Permissible "name"s are checked through ./types */}
      <GuestsStack.Screen name="Guestlist" component={GuestlistScreen} />
      <GuestsStack.Screen name="Browse" component={BrowseScreen} />
    </GuestsStack.Navigator>
  );
};

export default GuestsStackNavigator;