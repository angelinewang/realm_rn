import * as React from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { PartiesStackNavigatorParamList } from './types';
import InvitedScreen from '../screens/Parties/InvitedScreen';
import ConfirmedScreen from '../screens/Parties/ConfirmedScreen';

const PartiesStack = createNativeStackNavigator<PartiesStackNavigatorParamList>();

const PartiesStackNavigator = () => {
  return (
    <PartiesStack.Navigator>
      {/* Permissible "name"s are checked through ./types */}
      {/* Amend to dynamically add user accommodation name */}
      <PartiesStack.Screen name="Invited" component={InvitedScreen} options={{title: '*Accommodation*'}}/>
      <PartiesStack.Screen name="Confirmed" component={ConfirmedScreen} options={{title:'*Accommodation*'}}/>
    </PartiesStack.Navigator>
  );
};

export default PartiesStackNavigator;