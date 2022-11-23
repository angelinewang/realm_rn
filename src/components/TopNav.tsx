import { View, Text, Pressable, StyleSheet } from "react-native";
import React, {useEffect, useState} from 'react';
import { TopNavProps } from "../../auth-app";
import { styled } from "tailwindcss-react-native";
import { useNavigation } from "@react-navigation/native";

import { GuestlistScreenNavigationProp, BrowseScreenNavigationProp, InvitedScreenNavigationProp, ConfirmedScreenNavigationProp } from '../../navigation/types';

const TopNav: React.FC<TopNavProps> = ({
    leftButtonText,
    rightButtonText,
    isActive,
}
) => {
    let navigation: any = useNavigation<BrowseScreenNavigationProp>(), navigateTo: string = 'Guestlist', leftActive: boolean = false, rightActive: boolean = false;
    
    switch (isActive) {
        case 'Browse':
            navigation = useNavigation<BrowseScreenNavigationProp>();
            navigateTo = 'Guestlist';
            leftActive = true;
            break;
        case 'Guestlist':
            navigation = useNavigation<GuestlistScreenNavigationProp>();
            navigateTo = 'Browse';
            rightActive = true;
            break;
        case 'Invited':
            navigation = useNavigation<InvitedScreenNavigationProp>();
            navigateTo = 'Confirmed';
            leftActive = true;
            break;
        case 'Confirmed':
            navigation = useNavigation<ConfirmedScreenNavigationProp>();
            navigateTo = 'Invited';
            rightActive = true;
            break;
    }       

        switch(leftActive) {
            case true:
                return (
                <View style={styles.ViewContainer}>
                <View style={styles.View}>
                <Pressable>
                    <Text style={leftActive ? styles.btnActive : styles.btn}>
                        {leftButtonText}
                    </Text>
                </Pressable>
                <Pressable onPress={() => navigation.navigate('Guestlist')}>
                    <Text style={rightActive ? styles.btnActive : styles.btn}>
                        {rightButtonText}
                    </Text>
                </Pressable>
                </View>
                </View>)
            case false: 
                return (
                <View style={styles.ViewContainer}>
                <View style={styles.View}>
                <Pressable onPress={() => {useNavigation<BrowseScreenNavigationProp>().navigate({navigateTo})}}>
                    <Text style={leftActive ? styles.btnActive : styles.btn}>
                        {leftButtonText}
                    </Text>
                </Pressable>
                <Pressable>
                    <Text style={rightActive ? styles.btnActive : styles.btn}>
                        {rightButtonText}
                    </Text>
                </Pressable>
                </View>
                </View>)

        }
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