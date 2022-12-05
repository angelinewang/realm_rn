import { View, Text, ScrollView, Pressable } from "react-native";
import React from "react";
import MainContainer from "../../components/MainContainer";
import KeyboardAvoidWrapper from "../../components/KeyboardAvoidWrapper";
import CustomTextInput from "../../components/InputText/CustomTextInput";
import ImagePicker from 'react-native-image-picker';
import RNPickerSelect from 'react-native-picker-select';
import { Formik, useFormik } from 'formik';

import { AtSymbolIcon, LockClosedIcon } from "react-native-heroicons/solid";
import CustomButton from "../../components/Buttons/CustomButton";

import { useNavigation } from '@react-navigation/native';

import { SignUpScreenNavigationProp } from '../../navigation/types';
import { useAuth } from "../../contexts/Auth";

import DateTimePicker from '@react-native-community/datetimepicker';

const SignUpScreen = () => {
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
        let signUpStatus = await signUp(_email, _password, _name, _department, _gender, _birthdate)
        
        signUpStatus ? logIn(_email, _password) : null
    }

    const logIn = async () => {
        await signIn(_email, _password)
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

                <Formik initialValues={{_email: '', _name: "", _password: '', _department: '', _gender: '', _birthdate: ''}} onSubmit={signUpAndLogIn}>
                    
                    <View>
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

                    <DateTimePicker textColor="#1B1B22" locale="GB" mode="date" value={_birthdate} onDateChange={setBirthdate}/>

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
            </KeyboardAvoidWrapper>
        </MainContainer>
    );
};

export default SignUpScreen;