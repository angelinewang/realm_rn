import { View, Text, Button, DatePickerIOSBase } from "react-native";
import React from "react";
import MainContainer from "../../components/MainContainer";
import KeyboardAvoidWrapper from "../../components/KeyboardAvoidWrapper";
import CustomTextInput from "../../components/InputText/CustomTextInput";

import { useNavigation } from '@react-navigation/native';

import { LoginScreenNavigationProp } from '../../navigation/types';

import { AtSymbolIcon, LockClosedIcon, WindowIcon } from "react-native-heroicons/solid";
import CustomButton from "../../components/Buttons/CustomButton";

import { useAuth } from "../../contexts/Auth";

import axios from "axios";

const LoginScreen = () => {

    const auth = useAuth();

    // function getCookie(name: string) {
    // var cookieValue = null;
    // if (document.cookie && document.cookie !== '') {
    //     var cookies = document.cookie.split(';');
    //     for (var i = 0; i < cookies.length; i++) {
    //         var cookie = jQuery.trim(cookies[i]);
    //         if (cookie.substring(0, name.length + 1) === (name + '=')) {
    //             cookieValue = decodeURIComponent(cookie.substring(name.length + 1));
    //             break;
    //         }
    //     }
    // }
    // return cookieValue;


// var csrftoken = getCookie('csrftoken');

    const navigation = useNavigation<LoginScreenNavigationProp>();
  
    const [email, setEmail] = React.useState<String | null>(null);
    const [password, setPassword] = React.useState<String | null>(null);

    const onEmailChange = (email: String) => {
        setEmail(email);
    };
    const onPasswordChange = (password: String) => {
        setPassword(password);
    };

// #1 Make login Function work

    return (
        <MainContainer>
            <KeyboardAvoidWrapper>
                <View className="flex flex-row items-center justify-center gap-0 pt-[25%]">
                    <Text className="text-3xl text-[#EFE3C8] font-mono">Secure</Text>
                    <Text className="text-3xl text-[#EFE3C850 font-sans">App</Text>
                </View>
                <View className="flex flex-1 justify-center items-center pt-[20%] px-[25px]">
                    <Text className="text-[#EFE3C8] text-md">
                        Enter your account credentials 
                    </Text>
                    <View className="h-[50px] w-full"></View>
                    <CustomTextInput 
                        icon={<AtSymbolIcon color={"#EFE3C850"} width={35} height={35} />}
                        onChangeText={onEmailChange}
                        label="Email"
                        keyboardType={"email-address"}
                        placeholder="Enter your email"
                    />
                    <CustomTextInput 
                        icon={<LockClosedIcon color={"#EFE3C850"} width={35} height={35} />}
                        onChangeText={onPasswordChange}
                        label="Password"
                        IsSecureText={true}
                        keyboardType="default"
                        placeholder="* * * * * * * *"
                    />
                    {/* Button right now signs into MainScreen no matter whether the login details are valid */}
                    <CustomButton 
                        buttonText="Login"
                        buttonClassNames="w-full rounded-md p-3 bg-[#EFE3C8] flex justify-center items-center mt-5"
                        textClassNames="text-[#4A2B29] text-[18px] font-semibold"
                        onPress={auth.signIn}
                    />
                    <View className="flex w-full justify-end items-end pt-4">
                        <Button onPress={() => navigation.navigate('SignUp')} title="Don't have an account yet?"/>
                    </View>
                </View>
            </KeyboardAvoidWrapper>
        </MainContainer>
    );
}

export default LoginScreen;