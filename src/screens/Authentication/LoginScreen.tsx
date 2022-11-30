import { View, Text, Button, DatePickerIOSBase } from "react-native";
import MainContainer from "../../components/MainContainer";
import KeyboardAvoidWrapper from "../../components/KeyboardAvoidWrapper";
import CustomTextInput from "../../components/InputText/CustomTextInput";

import { useNavigation } from '@react-navigation/native';

import { LoginScreenNavigationProp } from '../../navigation/types';

import { AtSymbolIcon, LockClosedIcon, WindowIcon } from "react-native-heroicons/solid";
import CustomButton from "../../components/Buttons/CustomButton";

import { createContext, useState, useContext, useEffect } from 'react';

import { useAuth } from "../../contexts/Auth";
import { authService } from "../../services/authService";

// All data passed through context


//Create the Auth Context with the data type specified
//and a empty object

const LoginScreen: React.FC = () => {
// const AuthContext = createContext<AuthContextData>({authData, loading} as AuthContextData);
// const signInFunction = () => {
//     // const auth = useAuth();
//     console.log("Reached signinfunction call")
//     const {signIn} = useAuth()
//     signIn(_email, _password)
// }
// const auth = useAuth()
    const {signIn} = useAuth()

    const logIn = async () => {
        await signIn(_email, _password)
    }

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
    const [_email, setEmail] = useState<String | null>(null);
    const [_password, setPassword] = useState<String | null>(null);

    useEffect(() => {

    }, [_email, _password])


// var csrftoken = getCookie('csrftoken');

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
                        onPress={logIn}
                    />
                    <View className="flex w-full justify-end items-end pt-4">
                        <Button onPress={() => navigation.navigate('SignUp')} title="Don't have an account yet?"/>
                    </View>
                </View>
            </KeyboardAvoidWrapper>
        </MainContainer>
    );
}

export { LoginScreen };