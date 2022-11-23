import * as React from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { ProfileStackNavigatorParamList } from './types';
import ProfileScreen from '../screens/Profile/ProfileScreen';

const ProfileStack = createNativeStackNavigator<ProfileStackNavigatorParamList>();

const ProfileStackNavigator = () => {
  return (
    <ProfileStack.Navigator>
      {/* Permissible "name"s are checked through ./types */}
      {/* Amend to dynamically add user accommodation name */}
      <ProfileStack.Screen name="Profile" component={ProfileScreen} options={{title: 'Profile'}}/>
    </ProfileStack.Navigator>
  );
};

export default ProfileStackNavigator;