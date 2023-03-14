import * as React from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { ProfileStackNavigatorParamList } from './types';
import ProfileScreen from '../screens/Profile/ViewScreen';
import SettingsModal from '../components/SettingsModal';
import { settingsButtonPress } from '../../analytics.native';
import SettingsSVG from '../assets/settings.svg';
import {Pressable} from 'react-native';

const ProfileStack = createNativeStackNavigator<ProfileStackNavigatorParamList>();

const ProfileStackNavigator = () => {
  const [isModalVisible, setIsModalVisible] = React.useState(false);
  const handleModal = () => {
    setIsModalVisible(() => !isModalVisible);
    settingsButton()
  };

  const settingsButton = async () => {
    try {
      await settingsButtonPress()
    } catch (error) {
      console.log(error)
    }
  }

  return (
    <>
      <ProfileStack.Navigator>
      {/* Permissible "name"s are checked through ./types */}
      {/* Amend to dynamically add user accommodation name */}
      <ProfileStack.Screen 
      name="Profile" 
      children={() =>
      <ProfileScreen handleModal={handleModal} isModalVisible={isModalVisible} setIsModalVisible/>} 
      options={{title: 'Profile', headerRight: () => (
        <Pressable onPress={handleModal} style={{width: 25, height: 25}}>
          <SettingsSVG height={25} width={25} fill='#D1D1DB'/>
        </Pressable>
      )}}/>
      </ProfileStack.Navigator>
      <SettingsModal isModalVisible={isModalVisible} handleModal={handleModal} setIsModalVisible={setIsModalVisible}/>
    </>
  );
};

export default ProfileStackNavigator;