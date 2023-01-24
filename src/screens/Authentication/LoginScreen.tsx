import {Alert, Linking, KeyboardAvoidingView, TextInput, Image, View, Text, Button, StyleSheet, DatePickerIOSBase, Pressable } from "react-native";

import { useNavigation } from '@react-navigation/native';

import { LoginScreenNavigationProp } from '../../navigation/types';

import { createContext, useState, useContext, useEffect } from 'react';

import React, { useCallback } from 'react';
import { useAuth } from "../../contexts/Auth";
import { authService } from "../../services/authService";
import { getTabBarHeight } from "@react-navigation/bottom-tabs/lib/typescript/src/views/BottomTabBar";

import { useFonts } from 'expo-font';
// All data passed through context


//Create the Auth Context with the data type specified
//and a empty object

const LoginScreen: React.FC = () => {
    const termsAndConditions = "https://realmpartyapp.com/terms-of-use"
    const privacyPolicy = "https://realmpartyapp.com/privacy-policy"
    
    type OpenURLButtonProps = {
        url: string;
        children: any;
    }

    const OpenURLButton = ({url, children}:
        OpenURLButtonProps) => {
            const handlePress = useCallback(async () => {
                const supported = await 
                Linking.canOpenURL(url);

                if(supported) {
                    await Linking.openURL(url);
                } else {
                    Alert.alert(`Don't know how to open this URL: ${url}`);
                } }, [url]
            );
            return <Pressable onPress={handlePress}>{children}</Pressable>
        }

    const [fontsLoaded] = useFonts({
        'Mulish-Regular': require('../../assets/fonts/Mulish-Regular.ttf'),
        'Plus-Jakarta-Sans-Bold': require('../../assets/fonts/PlusJakartaSans-Bold.ttf')
    })
    const [error, setError] = useState();

    const {signIn} = useAuth()

    const logIn = async () => {
        await signIn(_email, _password)
    }

    const [_email, setEmail] = useState<String | null>(null);
    const [_password, setPassword] = useState<String | null>(null);

    useEffect(() => {

    }, [_email, _password])

    const navigation = useNavigation<LoginScreenNavigationProp>();


    const onEmailChange = (newEmail: string) => {
        setEmail(newEmail);
    };
    const onPasswordChange = (newPassword: String) => {
        setPassword(newPassword);
    };


  //This loads whether or not the current user is authenticated
  useEffect(() => {

  }, []);

// #1 Make login Function work

    return (
        // <MainContainer>
            <KeyboardAvoidingView style={styles.screenBackground}>
                <View style={styles.container}>
                <View style={styles.box}>
                <View style={styles.viewContainer}>
                <View style={styles.viewBox}>
                <Image style={styles.kclLogo} source={require('../../assets/images/kcl.png')}/>
                    {/* <CustomTextInput 
                        icon={<AtSymbolIcon color={"#EFE3C850"} width={35} height={35} />}
                        onChangeText={onEmailChange}
                        label="Email"
                        keyboardType={"email-address"}
                        placeholder="Enter your email"
                    /> */}
                    <View style={styles.allContainer}>
                    <View style={styles.allBox}>
                    <View style={styles.inputBoxesContainer}>
                    <View style={styles.inputBoxes}>
                    <View style={styles.inputBoxShadow}>
                    <TextInput 
                        style={styles.inputBox}
                        onChangeText={onEmailChange}
                        placeholder="KCL Email"
                        keyboardType="default"
                    />
                    </View>
                    <View style={styles.inputBoxShadow}>
                    <TextInput 
                        style={styles.inputBox}
                        onChangeText={onPasswordChange}
                        placeholder="Password"
                        keyboardType="default"
                    />
                    </View>
                    </View>
                    </View>
                    {/* <CustomTextInput 
                        icon={<LockClosedIcon color={"#EFE3C850"} width={35} height={35} />}
                        onChangeText={onPasswordChange}
                        label="Password"
                        IsSecureText={true}
                        keyboardType="default"
                        placeholder="* * * * * * * *"
                    /> */}
                    {/* Button right now signs into MainScreen no matter whether the login details are valid */}
                    <View style={styles.buttonsContainer}>
                    <View style={styles.buttonsBox}>
                    <Pressable 
                        onPress={logIn}
                        style={styles.loginButton}
                    >
                        <Text style={styles.loginButtonText}>Log In</Text>
                    </Pressable>
                    
                    <Pressable 
                        onPress={() => navigation.navigate('SignUp')} 
                        style={styles.createAccountButton}
                    >
                        <Text style={styles.createAccountButtonText}>Create Account</Text>
                    </Pressable>
                    </View>
                    </View>
                    </View>
                    </View>
                    <View style={styles.urlsBox}>
                    <OpenURLButton url={termsAndConditions}><Text style={styles.urlText}>Terms & Conditions</Text></OpenURLButton>
                    <OpenURLButton url={privacyPolicy}><Text style={styles.urlText}>Privacy Policy</Text></OpenURLButton>
                    </View>
                </View>
                </View>
                </View>
                </View>
            </KeyboardAvoidingView>
        // </MainContainer>
    );
}


const styles = StyleSheet.create({
    container: {
        height: 644
    },
    box: {
        height: '100%',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'space-between'
    },
    urlText: {
        fontFamily: 'Plus-Jakarta-Sans-Regular',
        fontSize: 12,
        color: '#8D8DA5'
    },
    urlsBox: {
        width: '100%',
        display: 'flex',
        flexDirection: 'row',
        justifyContent: 'space-around'
    },
    viewContainer: {
        height: 518,
        marginTop: 80
    },
    viewBox: {
        height: '100%',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'space-between'
    },
    screenBackground: {
        backgroundColor: '#FFFFFF',
        height: '100%',
    },  
    allContainer: {
        height: 326
    },
    allBox: {
        height: '100%',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'space-between'
    },
    buttonsContainer: {
        height: 143
    },
    buttonsBox: {
        height: '100%',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'space-between'
    },
    inputBoxesContainer: {
        height: 148
    },
    inputBoxes: {
        height: '100%',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'space-between',
    },
    kclLogo: {
        width: 224,
        height: 157, 
        alignSelf: 'center'
    },
    loginButton: {
        width: 318,
        height: 63,
        backgroundColor: '#4abbff',
        borderRadius: 20,
        shadowColor: '#000000',
        shadowOffset: {width: 0, height: 2},
        shadowOpacity: 0.25,
        shadowRadius: 4,
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center'
    },
    createAccountButton: {
        width: 318,
        height: 63,
        backgroundColor: '#ffffff',
        borderColor: '#4abbff',
        borderRadius: 20,
        borderWidth: 2,
        borderStyle: 'solid',
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center'
    },
    inputBox: {
        width: 318,
        height: 63,
        borderRadius: 20,
        color: '#1B1B22',
        backgroundColor: '#ffffff',
        fontSize: 18,
        shadowColor: '#EAEAEAB2',
        shadowOffset: {width: 8, height: 8},
        shadowOpacity: 0.7,
        shadowRadius: 24,
        fontFamily: 'Mulish-Regular',
        padding: 15
    },
    inputBoxShadow: {
        width: 318,
        height: 63,
        borderRadius: 20,
        shadowColor: '#F7F7F8',
        shadowOffset: {width: -8, height: -8},
        shadowOpacity: 1,
        shadowRadius: 24
    },
    loginButtonText: {
        color: '#ffffff',
        fontSize: 20,
        fontFamily: 'Plus-Jakarta-Sans-Bold'
    },
    createAccountButtonText: {
        color: '#4abbff',
        fontSize: 20,
        fontFamily: 'Plus-Jakarta-Sans-Bold'
    }
})

export { LoginScreen };