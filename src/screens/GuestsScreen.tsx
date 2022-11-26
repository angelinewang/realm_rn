import { View, StyleSheet } from "react-native";
import React from 'react';
import { createMaterialTopTabNavigator } from "@react-navigation/material-top-tabs";
import BrowseScreen from "./Guests/BrowseScreen";
import GuestlistScreen from "./Guests/GuestlistScreen";

const Tab = createMaterialTopTabNavigator();

const GuestsScreen: React.FC = () => { 
           return (
            <View style={styles.ViewContainer}>
            <View style={styles.View}>
            <Tab.Navigator>
                <Tab.Screen name="Browse" component={BrowseScreen}/>
                <Tab.Screen name="Guestlist" component={GuestlistScreen}/>
            </Tab.Navigator>
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