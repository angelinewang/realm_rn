import * as React from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';

import {Button, Pressable, Text} from 'react-native';

import { BottomTabNavigatorParamList } from '../navigation/types';
import SettingsSVG from '../assets/images/settings.svg'
import GuestsScreen from './GuestsScreen';
import PartiesScreen from './PartiesScreen';
import ProfileScreen from './ProfileScreen';

import SettingsModal from '../components/SettingsModal';

import { settingsButtonPress } from '../../analytics.native';

const Tab = createBottomTabNavigator<BottomTabNavigatorParamList>();

// This is the Authenticated Screen with a navigator that contains all the authenticated screens in the app, adding a bottom tabs bar with options
const MainScreen = () => {

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

  React.useEffect(() => {}, [])
  //MainScreen is where all the header buttons are set
  return (
  <>
    <Tab.Navigator initialRouteName="Guests" >

      <Tab.Screen
      name="Parties"
      component={PartiesScreen}
      />
    
      <Tab.Screen
        name="Guests"
        component={GuestsScreen}
      //Guests Screen Add Party Button is not set on MainScreen
      />
      {/* Profile Tab is name ProfileScreen, while actual Profile screen is named Profile inside ProfileStack*/}
      <Tab.Screen name="ProfileScreen" component={ProfileScreen} 
       options={({navigation, route}) => (
          {  headerTitle: 'Profile', headerRight: () => (
        <Pressable 
        onPress={handleModal} 
        style={{width: 25, height: 25, marginRight: 25}}>
          <SettingsSVG height={25} width={25} fill='#D1D1DB'/>
        </Pressable>

          )})}
          />

    </Tab.Navigator>
    <SettingsModal isModalVisible={isModalVisible} handleModal={handleModal} setIsModalVisible={setIsModalVisible}/>
  </>

  );
};

export default MainScreen;