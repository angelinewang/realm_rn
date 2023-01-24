import { TextInput, Image, View, Text, Button, StyleSheet, DatePickerIOSBase, Pressable } from "react-native";
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
import { getTabBarHeight } from "@react-navigation/bottom-tabs/lib/typescript/src/views/BottomTabBar";

// All data passed through context


//Create the Auth Context with the data type specified
//and a empty object

const LoginScreen: React.FC = () => {

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
        <MainContainer>
            <KeyboardAvoidWrapper>
 
        
                <View className="flex flex-1 justify-center items-center pt-[20%] px-[25px]">
                    
                <Image style={styles.kclLogo} source={require('../../assets/images/kcl.png')}/>
                    {/* <CustomTextInput 
                        icon={<AtSymbolIcon color={"#EFE3C850"} width={35} height={35} />}
                        onChangeText={onEmailChange}
                        label="Email"
                        keyboardType={"email-address"}
                        placeholder="Enter your email"
                    /> */}
                    <TextInput 
                        style={styles.inputBox}
                        onChangeText={onEmailChange}
                        placeholder="KCL Email"
                        keyboardType="default"
                    />
             
                    <TextInput 
                        style={styles.inputBox}
                        onChangeText={onPasswordChange}
                        placeholder="Password"
                        keyboardType="default"
                    />
                    {/* <CustomTextInput 
                        icon={<LockClosedIcon color={"#EFE3C850"} width={35} height={35} />}
                        onChangeText={onPasswordChange}
                        label="Password"
                        IsSecureText={true}
                        keyboardType="default"
                        placeholder="* * * * * * * *"
                    /> */}
                    {/* Button right now signs into MainScreen no matter whether the login details are valid */}
                    <Pressable 
                        onPress={logIn}
                        style={styles.loginButton}
                    >
                        <Text style={styles.loginButtonText}>Login</Text>
                    </Pressable>
                    
                    <Pressable 
                        onPress={() => navigation.navigate('SignUp')} 
                        style={styles.createAccountButton}
                    >
                        <Text style={styles.createAccountButtonText}>Create Account</Text>
                    </Pressable>
                </View>
            </KeyboardAvoidWrapper>
        </MainContainer>
    );
}


const styles = StyleSheet.create({
    kclLogo: {
        width: 224,
        height: 157, 
        alignSelf: 'center'
    },
    loginButton: {
        width: 318,
        height: 63,
        backgroundColor: '#4abbff',
        borderRadius: 20
    },
    createAccountButton: {
        width: 318,
        height: 63,
        backgroundColor: '#ffffff',
        borderColor: '#4abbff',
        borderRadius: 20,
        borderWidth: 2,
        borderStyle: 'solid'
    },
    inputBox: {
        width: 318,
        height: 63,
        borderRadius: 20,
        color: '#1B1B22',
        backgroundColor: '#ffffff',
        fontSize: 18
    },
    loginButtonText: {
        color: '#ffffff',
        fontSize: 20
    },
    createAccountButtonText: {
        color: '#4abbff',
        fontSize: 20
    }
})

export { LoginScreen };