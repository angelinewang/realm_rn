import { View, Text, ScrollView, Pressable } from "react-native";
import React from "react";
import MainContainer from "../../components/MainContainer";
import KeyboardAvoidWrapper from "../../components/KeyboardAvoidWrapper";
import CustomTextInput from "../../components/InputText/CustomTextInput";
import ImagePicker from 'react-native-image-picker';

import { AtSymbolIcon, LockClosedIcon } from "react-native-heroicons/solid";
import CustomButton from "../../components/Buttons/CustomButton";

import { useNavigation } from '@react-navigation/native';

import { SignUpScreenNavigationProp } from '../../navigation/types';
import { useAuth } from "../../contexts/Auth";

const SignUpScreen = () => {
    const navigation = useNavigation<SignUpScreenNavigationProp>();
    const auth = useAuth();
    const [email, setEmail] = React.useState<String | null>(null);
    const [password, setPassword] = React.useState<String | null>(null);

    const [name, setName] = React.useState<String | null>(null);
    // Add other necessary fields later 
    // Right now, just POST and get these fields

    const onEmailChange = (email: String) => {
        setEmail(email);
    };
    const onPasswordChange = (password: String) => {
        setPassword(password);
    };

    const onNameChange = (name: String) => {
        setName(name);
    }

    return (
        <MainContainer>
            <KeyboardAvoidWrapper>
                <View className="flex flex-row items-center justify-center gap-0 pt-[25%]">
                    <Text className="text-3xl text-[#EFE3C8] font-mono">Secure</Text>
                    <Text className="text-3xl text-[#EFE3C850 font-sans">App</Text>
                </View>
                <View className="flex flex-1 justify-center items-center pt-[20%] px-[25px]">
                    <Text className="text-[#EFE3C8] text-md">
                        Enter your account details to register 
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
                        icon={<AtSymbolIcon color={"#EFE3C850"} width={35} height={35} />}
                        onChangeText={onNameChange}
                        label="Name"
                        keyboardType={"name"}
                        placeholder="Enter your name"
                    />

                    <CustomTextInput 
                        icon={<LockClosedIcon color={"#EFE3C850"} width={35} height={35} />}
                        onChangeText={onPasswordChange}
                        label="Password"
                        IsSecureText={true}
                        keyboardType="default"
                        placeholder="* * * * * * * *"
                    />

                <CustomTextInput icon={<LockClosedIcon color={"#EFE3C850"} width={35} height={35}/>}
                    onChangeText={onPasswordChange}
                    label="Confirm Password"
                    IsSecureText={true}
                    placeholder="* * * * * * * *"
                />

                    <CustomButton 
                        buttonText="SignUp"
                        buttonClassNames="w-full rounded-md p-3 bg-[#EFE3C8] flex justify-center items-center mt-5"
                        textClassNames="text-[#4A2B29] text-[18px] font-semibold"
                        onPress={auth.signIn}
                    />

                    <View className="flex w-full justify-end items-end pt-4">
                        <Pressable onPress={() =>
          navigation.navigate('Login')
        }>
                            <Text className="text-center text-gray-500 text-sm">
                                Already have an account? 
                            </Text>
                        </Pressable>
                    </View>
                </View>
            </KeyboardAvoidWrapper>
        </MainContainer>
    );
};

export default SignUpScreen;