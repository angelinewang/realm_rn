import { View, StyleSheet, Text, Button } from "react-native";
import React from 'react';
import { createMaterialTopTabNavigator } from "@react-navigation/material-top-tabs";
import BrowseScreen from "./Guests/BrowseScreen";
import GuestlistScreen from "./Guests/GuestlistScreen";
import Modal from 'react-native-modal'

const Tab = createMaterialTopTabNavigator();
// isModalVisible, setIsModalVisible, handleModal

const GuestsScreen: React.FC = ({navigation}) => { 

      const [isModalVisible, setIsModalVisible] = React.useState(false);
  const handleModal = () => 
  
  setIsModalVisible(() => 
  !isModalVisible);

    React.useEffect(() => {
        navigation.setOptions({
            headerRight: () => (
                <Button onPress={handleModal} title="Add Party"/>
            )
        })
    }, [navigation])
    
    return (
            <View style={styles.ViewContainer}>
            <View style={styles.View}>
            <Tab.Navigator>
                <Tab.Screen name="Browse" component={BrowseScreen} />
                <Tab.Screen name="Guestlist" component={GuestlistScreen}/>
            </Tab.Navigator>
            <Modal isVisible={isModalVisible}>
                <View style={{flex: 1}}>
                    <Text>Hello!</Text>
                    <Button title="Close Modal" onPress={handleModal}/>
                </View>
            </Modal>
            </View>
            </View>
    )
}

export default GuestsScreen;

// 1. Create Top Nav Component - DONE 
// 2. Add Accom to Header of each Page - DONE 
// 3. Add Top Nav to Each 4 Pages && Pass in the needed onPress and leftButtonText and rightButtonText

const styles = StyleSheet.create({
    btn: {
        color: '#D1D1DB',
        textDecorationLine: 'underline',
        textDecorationColor: '#D1D1DB'
    },
    btnActive: {
        color: '#4ABBFF',
        textDecorationLine: 'underline',
        textDecorationColor: '#4ABBFF'
    },
    View: {
        display: 'flex',
        flexDirection: 'row',
        justifyContent: 'space-around',
        alignItems: "center",
        width: '100%',
        height: '100%'
    },
    ViewContainer: {
        position: 'absolute',
        width: '100%',
        height: '100%',
    }
})