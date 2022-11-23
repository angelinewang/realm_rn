import * as React from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { GuestsStackNavigatorParamList } from './types';
import GuestlistScreen from '../screens/Guests/GuestlistScreen';
import BrowseScreen from '../screens/Guests/BrowseScreen';
import { useNavigation } from '@react-navigation/native';
import { BrowseScreenNavigationProp } from './types';
import { GuestlistScreenNavigationProp } from './types';
import { InvitedScreenNavigationProp } from './types';
import { ConfirmedScreenNavigationProp } from './types';

import {Text, Button} from 'react-native';

const GuestsStack = createNativeStackNavigator<GuestsStackNavigatorParamList>();

const GuestsStackNavigator = () => {

  const navigationBrowse = useNavigation<BrowseScreenNavigationProp>()
  return (
    <GuestsStack.Navigator>
      {/* Permissible "name"s are checked through ./types */}
      {/* Amend to dynamically add user accommodation name */}

      <GuestsStack.Screen name="Browse" component={BrowseScreen} options={{title:'*Accomodation*'}}/>
      <GuestsStack.Screen name="Guestlist" component={GuestlistScreen} options={{title:'*Accomodation*'}}/>
    </GuestsStack.Navigator>
  );
};

export default GuestsStackNavigator;

// 0. Add background color to Button: Create Header Nav Button Component
// 0.5 Add Header Nav Button Component to GuestsStack and PartiesStack 
// 1. Remove Title Header for Guests and Parties Pages
// 2. Remove Back buttons on Guests and Parties Pages
