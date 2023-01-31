import { Linking, Alert, TextInput, KeyboardAvoidingView, StyleSheet, View, Text, ScrollView, Pressable, Image, Button, Platform, Dimensions } from "react-native";
import React, { useCallback } from "react";
import MainContainer from "../../components/MainContainer";
import KeyboardAvoidWrapper from "../../components/KeyboardAvoidWrapper";
import CustomTextInput from "../../components/InputText/CustomTextInput";
import {launchImageLibrary} from 'react-native-image-picker';
import RNPickerSelect from 'react-native-picker-select';
import { Formik, useFormik } from 'formik';
import { manipulateAsync, FlipType, SaveFormat } from 'expo-image-manipulator';

import * as ImagePicker from 'expo-image-picker';

import { useFonts } from 'expo-font';

import { AtSymbolIcon, LockClosedIcon } from "react-native-heroicons/solid";
import CustomButton from "../../components/Buttons/CustomButton";

import { useNavigation } from '@react-navigation/native';

import { SignUpScreenNavigationProp } from '../../navigation/types';
import { useAuth } from "../../contexts/Auth";

import DateTimePicker from '@react-native-community/datetimepicker';
import { SafeAreaView } from "react-native-safe-area-context";

const SignUpScreen = () => {

    const {height} = Dimensions.get('window')

     const [fontsLoaded] = useFonts({
        'Mulish-Regular': require('../../assets/fonts/Mulish-Regular.ttf'),
        'Plus-Jakarta-Sans-Bold': require('../../assets/fonts/PlusJakartaSans-Bold.ttf'),
        'Open-Sans-Light': require('../../assets/fonts/OpenSans-Light.ttf'),
        'Open-Sans-Bold': require('../../assets/fonts/OpenSans-Bold.ttf')
    })
    const [image, setImage] = React.useState(null);

    const [fileImage, setFileImage] = React.useState(null);

    const pickImage = async () => {
        // No permissions request needed to launch image library 
        try {
            let result = await ImagePicker.launchImageLibraryAsync({
            mediaTypes: ImagePicker.MediaTypeOptions.All,
            allowsEditing: true, 
            aspect: [4, 3],
            quality: 1,
            base64: true, 
            // allowsEditing: false, 
            // aspect: [4, 3],
        })

        console.log('image', result.assets[0]);

        if(!result.canceled) {
            // setImage(result.assets[0].uri);

            setImage(result.assets[0].uri)
            // setImage(result.assets[0].uri)
            setFileImage(result.assets[0])

            // **Get rid of 500 server error when only sending email and password 
            // DONE 

            // **Get rid of crashing when press Create Account button

            // DONE, when stopped trying to grab properties from file uploaded that did not exist

            // 0. Figure out where react native console logs are 

            // 1. Print result.assets[0] to see all the properties

            // 2. Check if there are all the properties needed from the stackoverflow instructions 

            // 3. Extract all the needed properties

            // 4. Create 1 object for all needed properties 

            // 5. Send the final object in form as file_image back to backend 

            // 6. Change backend file_image field into a filefield

            // setType(result.assets[0].type)
            // setFileName(result.assets[0].uri.split('/').pop())

            // let base64 = result.assets[0].base64
            // setImage({base64: base64, fileExtension: 'jpg'
                
            // })

            // 1. Add File Extension to Image

            // set
        }
    } catch(error) {
        console.error
    }
    }

    const navigation = useNavigation<SignUpScreenNavigationProp>();
    const [_email, setEmail] = React.useState<String | null>(null);
    const [_password, setPassword] = React.useState<String | null>(null);

    const [_name, setName] = React.useState<String | null>(null);
    const [_department, setDepartment] = React.useState<Number | null>();
    const [_gender, setGender] = React.useState<Number | null>();

    // Changed Data Type in Database for Birthdate into timestamp/DateTime in order to accept a Timestamp value entry
    const [_birthdate, setBirthdate] = React.useState(new Date());

    // Add other necessary fields later 
    // Right now, just POST and get these fields

        React.useEffect(() => {

    }, [_email, _password, _name, _department, _gender, _birthdate])

    const {signUp, signIn} = useAuth()

    const onEmailChange = (newEmail: String) => {
        setEmail(newEmail);
    };
    const onPasswordChange = (newPassword: String) => {
        setPassword(newPassword);
    };

    const onNameChange = (newName: String) => {
        setName(newName);
    }

    // Passed to Backend as Number 
    const onDepartmentChange = (newDepartment: Number) => {
        setDepartment(newDepartment);
        console.log("Department Selected:");
        console.log(_department); 
    }

    // Passed to Backend as Number 
    const onGenderChange = (newGender: Number) => {
        setGender(newGender);
        console.log("Gender Selected:");
        console.log(_gender); 
    }

    const signUpAndLogIn = async () => {
        let signUpStatus = await signUp(image, _email, _password, _department, _name, _gender, _birthdate, fileImage)
        
        signUpStatus ? logIn(_email, _password) : null
    }

    const logIn = async () => {
        await signIn(_email, _password)
    }

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
    // For Photo Upload, using multipart/form-data

    return (
        <ScrollView style={styles.screenBackground}>
            <SafeAreaView style={styles.keyboardAvoidBackground}>
                <View style={styles.loginSentence}>
                    <Text style={styles.staticLogin}>Already have an account? </Text>
                    <Pressable onPress={() => navigation.navigate('Login')}><Text style={styles.dynamicLogin}>Log In</Text></Pressable>
                </View>
                
                <Formik style={styles.allContainer} initialValues={{_email: '', _password: '', _department: '', _name: "", _gender: '', _birthdate: ''}} onSubmit={signUpAndLogIn}>
                <View style={styles.allBox}>
                    <Pressable onPress={pickImage}>
                        {
                            image && <Image source={{uri: image}} style={{width: 200, height: 200}}/> 
                            ? <Image source={{uri: image}} style={{width: 200, height: 200}}/> 
                            : <Image source={require('../../assets/images/photo-upload.png')}/>

                        }
                    </Pressable>

                    <View style={styles.inputBoxShadow}>
                    <TextInput
                        onChangeText={onEmailChange}
                        style={styles.inputBox}
                        keyboardType={"email-address"}
                        placeholder="KCL Email"
                    />
                    </View>
                    
                    <View style={styles.inputBoxShadow}>
                    <TextInput 
                        onChangeText={onPasswordChange}
                        style={styles.inputBox}
                        keyboardType="default"
                        placeholder="Password"
                    />
                    </View>

                    {/* Department Select From List Entry */}
                <View style={styles.department}>
                    <Text style={styles.labelText}>Department</Text>
                    <RNPickerSelect onValueChange={onDepartmentChange} items={[{label: 'Arts/Humanities', value: 1}, {label: 'Business', value: 2}, {label: 'Dentistry', value: 3}, {label: 'Engineering', value: 4}, {label: 'Law', value: 5}, {label: 'Medic/Life Sciences', value: 6}, {label: 'Natural Sciences', value: 7}, {label: 'Nursing', value: 8}, {label: 'Pysch/Neuroscience', value: 9}, {label: 'Social Science', value: 10}]} />
                </View>
                    
                    <View style={styles.inputBoxShadow}>
                    <TextInput 
                        style={styles.inputBox}
                        onChangeText={onNameChange}
                        keyboardType="default"
                        placeholder="Name"
                    />
                    </View>
 
                {/* Gender Select From List Entry */}
                <View style={styles.gender}>
                    <Text style={styles.labelText}>Gender</Text>
                    <RNPickerSelect onValueChange={onGenderChange} items={[{label: 'Male', value: 1}, {label: 'Female', value: 2}, {label: 'Other', value: 3}]} />
                </View>

                {/* Birthdate Date Entry */}
                <View style={styles.birthdate}>
                    <Text style={styles.labelText}>Birthdate</Text>
                    <DateTimePicker textColor="#1B1B22" locale="GB" mode="datetime" value={_birthdate} onDateChange={setBirthdate}/>
                </View>
                    <Pressable 
                        style={styles.createAccountButton}
                        onPress={signUpAndLogIn}
                    >
                        <Text style={styles.createAccountButtonText}>Create Account</Text>
                    </Pressable>
                    </View>
                </Formik>
                <View style={styles.urlsContainer}>
                <View style={styles.urlsBox}>
                    <OpenURLButton url={termsAndConditions}><Text style={styles.urlText}>Terms & Conditions</Text></OpenURLButton>
                    <OpenURLButton url={privacyPolicy}><Text style={styles.urlText}>Privacy Policy</Text></OpenURLButton>
                </View>
                </View>
                </SafeAreaView>
            </ScrollView>
    );
};

const styles = StyleSheet.create({
    gender: {
        width: 318,
        height: 63,
        display: 'flex',
        flexDirection: 'row',
        padding: 15,
        alignItems: 'center',
        justifyContent: 'space-between'
    },
    department: {
        width: 318,
        height: 63,
        display: 'flex',
        flexDirection: 'row',
        padding: 15,
        alignItems: 'center',
        justifyContent: 'space-between'
    },
    birthdate: {
        width: 318,
        height: 63,
        display: 'flex',
        flexDirection: 'row',
        padding: 15,
        alignItems: 'center',
        justifyContent: 'space-between'
    },
    keyboardAvoidBackground: {
        height: '100%',
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'flex-start',
        padding: 0,
        margin: 0
    },
    allContainer: {
        height: '75%',
    },
        allBox: {
            height: '100%',
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            justifyContent: 'space-between'       
        },
        screenBackground: {
            backgroundColor: '#FFFFFF',
            height: '100%',
            display: 'flex',
        },  
        loginSentence: {
            display: 'flex',
            flexDirection: 'row',
            alignSelf: 'center',
            justifyContent: 'flex-start',
        },
        staticLogin: {
            fontFamily: 'Open-Sans-Light',
            fontSize: 16,
            color: '#8D8DA5'
        },
        dynamicLogin: {
            fontFamily: 'Open-Sans-Bold',
            fontSize: 16,
            color: '#8D8DA5'
        }, 
    labelText: {
        color: '#1B1B22',
        fontSize: 18,
        fontFamily: 'Mulish-Regular'
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
    createAccountButton: {
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
       createAccountButtonText: {
        color: '#ffffff',
        fontSize: 20,
        fontFamily: 'Plus-Jakarta-Sans-Bold'
    },
    urlsBox: {
        width: '100%',
        display: 'flex',
        flexDirection: 'row',
        justifyContent: 'space-around',
    },
    urlText: {
        fontFamily: 'Plus-Jakarta-Sans-Regular',
        fontSize: 12,
        color: '#8D8DA5',
    },
 })

export default SignUpScreen;