import { KeyboardAvoidingView, StyleSheet, View, Text, ScrollView, Pressable, Image, Button, Platform } from "react-native";
import React from "react";
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

const SignUpScreen = () => {

     const [fontsLoaded] = useFonts({
        'Mulish-Regular': require('../../assets/fonts/Mulish-Regular.ttf'),
        'Plus-Jakarta-Sans-Bold': require('../../assets/fonts/PlusJakartaSans-Bold.ttf'),
        'Open-Sans-Light': require('../../assets/fonts/OpenSans-Light.ttf'),
        'Open-Sans-Bold': require('../../assets/fonts/OpenSans-Bold.ttf')
    })
    const [image, setImage] = React.useState(null);

    const pickImage = async () => {
        // No permissions request needed to launch image library 
        try {
            let result = await ImagePicker.launchImageLibraryAsync({
            mediaTypes: ImagePicker.MediaTypeOptions.All,
            allowsEditing: true, 
            aspect: [4, 3],
            quality: 1,
            // base64: true, 
            // allowsEditing: false, 
            // aspect: [4, 3],
        })

        console.log('image', result.assets[0]);

        if(!result.canceled) {
            // setImage(result.assets[0].uri);
            setImage(result.assets[0].uri)

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
        let signUpStatus = await signUp(image, _email, _password, _department, _name, _gender, _birthdate)
        
        signUpStatus ? logIn(_email, _password) : null
    }

    const logIn = async () => {
        await signIn(_email, _password)
    }

    // For Photo Upload, using multipart/form-data

    return (
            <KeyboardAvoidingView style={styles.screenBackground}>
                <View style={styles.loginSentence}>
                    <Text style={styles.staticLogin}>Already have an account? </Text>
                    <Pressable onPress={() => navigation.navigate('Login')}><Text style={styles.dynamicLogin}>Log In</Text></Pressable>
                </View>
            
                <View className="flex flex-1 justify-center items-center pt-[20%] px-[25px]">
                    <Text className="text-[#EFE3C8] text-md">
                        Enter your account details to register 
                    </Text>
                    <View className="h-[50px] w-full"></View>

                <Formik initialValues={{_email: '', _password: '', _department: '', _name: "", _gender: '', _birthdate: ''}} onSubmit={signUpAndLogIn}>
                    
                    <View>
                        <Button title="Pick an image from camera roll" onPress={pickImage}/>
                        {
                            image && <Image source={{uri: image}} style={{width: 200, height: 200}}/>
                        }

                    <CustomTextInput 
                        icon={<AtSymbolIcon color={"#EFE3C850"} width={35} height={35} />}
                        onChangeText={onEmailChange}
                        label="Email"
                        keyboardType={"email-address"}
                        placeholder="KCL Email"
                    />

                    <CustomTextInput 
                        icon={<LockClosedIcon color={"#EFE3C850"} width={35} height={35} />}
                        onChangeText={onPasswordChange}
                        label="Password"
                        IsSecureText={true}
                        keyboardType="default"
                        placeholder="Password"
                    />

                    {/* Department Select From List Entry */}
                    <RNPickerSelect onValueChange={onDepartmentChange} items={[{label: 'Arts/Humanities', value: 1}, {label: 'Business', value: 2}, {label: 'Dentistry', value: 3}, {label: 'Engineering', value: 4}, {label: 'Law', value: 5}, {label: 'Medic/Life Sciences', value: 6}, {label: 'Natural Sciences', value: 7}, {label: 'Nursing', value: 8}, {label: 'Pysch/Neuroscience', value: 9}, {label: 'Social Science', value: 10}]} />

                    <CustomTextInput 
                        icon={<AtSymbolIcon color={"#EFE3C850"} width={35} height={35} />}
                        onChangeText={onNameChange}
                        label="Name"
                        keyboardType={"name"}
                        placeholder="Name"
                    />
 
                {/* Gender Select From List Entry */}
                    <RNPickerSelect onValueChange={onGenderChange} items={[{label: 'Male', value: 1}, {label: 'Female', value: 2}, {label: 'Other', value: 3}]} />

                {/* Birthdate Date Entry */}

                    <DateTimePicker textColor="#1B1B22" locale="GB" mode="datetime" value={_birthdate} onDateChange={setBirthdate}/>

                    <CustomButton 
                        buttonText="SignUp"
                        buttonClassNames="w-full rounded-md p-3 bg-[#EFE3C8] flex justify-center items-center mt-5"
                        textClassNames="text-[#4A2B29] text-[18px] font-semibold"
                        onPress={signUpAndLogIn}
                    />
                    </View>

                </Formik>
                    <View className="flex w-full justify-end items-end pt-4">
                        <Pressable onPress={() => navigation.navigate('Login')}>
                            <Text className="text-center text-gray-500 text-sm">
                                Already have an account? 
                            </Text>
                        </Pressable>
                    </View>
                </View>
            </KeyboardAvoidingView>
    );
};

const styles = StyleSheet.create({
        screenBackground: {
            backgroundColor: '#FFFFFF',
            height: '100%',
            display: 'flex'
        },  
        loginSentence: {
            display: 'flex',
            flexDirection: 'row',
            alignSelf: 'center'
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
        }
 })

export default SignUpScreen;