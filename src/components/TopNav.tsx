import { View, Text, Pressable, StyleSheet } from "react-native";
import React, {useEffect, useState} from 'react';
import { TopNavProps } from "../../auth-app";
import { styled } from "tailwindcss-react-native";
import { useNavigation } from "@react-navigation/native";
import { createMaterialTopTabNavigator } from "@react-navigation/material-top-tabs";
import { GuestlistScreenNavigationProp, BrowseScreenNavigationProp, InvitedScreenNavigationProp, ConfirmedScreenNavigationProp } from '../../navigation/types';

const Tab = createMaterialTopTabNavigator();

const TopNav: React.FC<TopNavProps> = ({
    // leftButtonText,
    // rightButtonText,
    // isActive,
    // navigation,
    // navigateTo, 
    // leftActive,
    // rightActive
    leftScreen,
    leftComponent,
    rightScreen,
    rightComponent
}
) => { 
           return (
            <Tab.Navigator>
                <View style={styles.ViewContainer}>
                <View style={styles.View}>

                <Tab.Screen name={leftScreen} component={leftComponent}/>

                <Tab.Screen name={rightScreen} component={rightComponent}/>
   
                </View>
                </View>
            </Tab.Navigator>
        )
}

export default TopNav;

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
        height: '10%',
    }
})