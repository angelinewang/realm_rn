import { Linking, Alert, TextInput, StyleSheet, View, Text, ScrollView, Pressable, Image, Button } from "react-native";
import React, { useCallback } from "react";
import RNPickerSelect from 'react-native-picker-select';
import { Formik } from 'formik';

import * as ImagePicker from 'expo-image-picker';

import { useFonts } from 'expo-font';

import { useNavigation } from '@react-navigation/native';

import { SignUpScreenNavigationProp } from '../../navigation/types';
import { useAuth } from "../../contexts/Auth";

import DateTimePickerModal from 'react-native-modal-datetime-picker';

import { SafeAreaView } from "react-native-safe-area-context";
import { initializeApp } from "firebase/app";
import { getDownloadURL, getStorage, ref, uploadBytes} from "firebase/storage";
import { firebaseConfig } from '../../../firebaseConfig';

initializeApp(firebaseConfig);

const SignUpScreen = () => {
    //Navigation to other pages
    const navigation = useNavigation<SignUpScreenNavigationProp>();

    //Fonts displayed on Signup Page
    const [fontsLoaded] = useFonts({
        'Mulish-Regular': require('../../assets/fonts/Mulish-Regular.ttf'),
        'Plus-Jakarta-Sans-Bold': require('../../assets/fonts/PlusJakartaSans-Bold.ttf'),
        'Open-Sans-Light': require('../../assets/fonts/OpenSans-Light.ttf'),
        'Open-Sans-Bold': require('../../assets/fonts/OpenSans-Bold.ttf')
    })

    //Signup Form Fields
    //Waits for photo to be uploaded to Firebase Storage in uploadImageAsync, before sending signup function with downloadURL 
    //Profile Image: No state created for backend
    //Because sent directly through scoped downloadURL variable inside uploadImageAsync
    
    //Image set BEFORE downloadURL and BEFORE being sent to backend
    //Only accessible on frontend 
    const [initialImage, setInitialImage] = React.useState(null);

    const [_email, setEmail] = React.useState<String | null>(null);
    const [_password, setPassword] = React.useState<String | null>(null);
    const [_name, setName] = React.useState<String | null>(null);
    const [_department, setDepartment] = React.useState<Number | null>(0);
    const [_gender, setGender] = React.useState<Number | null>(0);

    const [isSelectedDate, setIsSelectedDate] = React.useState(false);
    const [isDatePickerVisible, setDatePickerVisibility] = React.useState(false);
    const [selectedDate, setSelectedDate] = React.useState(new Date());
    
    //Changed Data Type in Database for Birthdate into timestamp/DateTime in order to accept a Timestamp value entry
    const [_birthdate, setBirthdate] = React.useState(null);

    //To allow for null birthdate value:
    //1. Text is used to display the current value or "No Date Selected"
    //2. When the user clicks the text, the date time picker is shown to let them select a date
    //3. There is a button to click if the user wants to clear the date and go back to null
    //https://stackoverflow.com/questions/71216463/allowing-null-value-for-react-native-datetimepicker

    const showDatePicker = () => {
        setDatePickerVisibility(true);
    };

    const hideDatePicker = () => {
        setDatePickerVisibility(false);
    }

    const handleConfirm = (date: any) => {
     setSelectedDate(date)  
     setBirthdate(date)
     setIsSelectedDate(true) 
     hideDatePicker()
    } 

    //Sign up and Log in functions from authService
    const {signUp, signIn} = useAuth()

    //After clicking on Add Image icon, launch image library and allow image selection
    const pickImage = async () => {
        //No permissions request needed to launch image library 
        try {
            let result = await ImagePicker.launchImageLibraryAsync({
            mediaTypes: ImagePicker.MediaTypeOptions.All,
            allowsEditing: true, 
            aspect: [4, 3],
            quality: 1,
        })
        console.log('image', result.assets[0].uri);
        if(!result.canceled) {
             setInitialImage(result.assets[0].uri)
        }
        } catch(error) {
            console.error
        } 
    }

    React.useEffect(() => {
    //Rerender page if any of the below states are changed
    }, [_email, _password, _name, _department, _gender, _birthdate, initialImage, uploaded])

    //Set signup form fields' states on change of input values
    const onEmailChange = (newEmail: String) => {
        setEmail(newEmail);
    };
    const onPasswordChange = (newPassword: String) => {
        setPassword(newPassword);
    };
    const onNameChange = (newName: String) => {
        setName(newName);
    }
    //Passed to Backend as Integer 
    const onDepartmentChange = (newDepartment: Number) => {
        setDepartment(newDepartment);
        console.log("Department Selected:");
        console.log(_department); 
    }
    //Passed to Backend as Integer 
    const onGenderChange = (newGender: Number) => {
        setGender(newGender);
        console.log("Gender Selected:");
        console.log(_gender); 
    }

    const uploadImageAsync = async () => {
        //Upload image to Firebase Storage
        //Signup user and send data to backend
        console.log("Reached upload image sync")

        try {
        //Create storage space in Firebase
        //, upload photo to Firebase Storage
        //, and then create variable with the URL of the uploaded photo
        const storage = getStorage();

        const filename = initialImage.substring(initialImage.lastIndexOf('/')+1);
        const reference = ref(storage, filename);
    
        const img = await fetch(initialImage)
        const bytes = await img.blob();

        const uploadPhoto = await uploadBytes(reference, bytes)
        
        const downloadURL = await getDownloadURL(reference)

        const signupStatus = await signUp(downloadURL, _email, _password, _department, _name, _gender, _birthdate)

        } catch (e) {
            console.log(e);
        }
        //Alert created here so that it only appears after POST request has been sent to backend
        Alert.alert(
            `Account created! Go back to Log In`
        );
    }

    //RESOLVED-BUG: Image not being saved to Firebase Storage in production
    //SOLUTION: Set downloadURL as const variable inside uploadImageAsync and moved signup function into uploadImageAsync
    //, with profile photo sent with downloadURL instead of image state
    const signUpAndLogIn = async () => {
        await uploadImageAsync() 
    }

    const logIn = async () => {
        await signIn(_email, _password)
    }

    //Links at bottom of Signup Page
    const termsAndConditions = "https://realmpartyapp.com/terms-of-use"
    const privacyPolicy = "https://realmpartyapp.com/privacy-policy"
    
    type OpenURLButtonProps = {
        url: string;
        children: any;
    }

    const OpenURLButton = ({url, children}: OpenURLButtonProps) => {
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
                                initialImage && <Image source={{uri: initialImage}} style={{width: 200, height: 200}}/> 
                                ? <Image source={{uri: initialImage}} style={{width: 200, height: 200}}/> 
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

                        {/* Birthdate Picker */}
                        <Text style={styles.inputBox}>
                            {/* Set birthdate field to empty string if there is none selected */}
                            {isSelectedDate ? selectedDate.toLocaleDateString() : ''}
                        </Text>
                        <Button title="Select Birthdate" onPress={showDatePicker} />
                        <DateTimePickerModal
                            date={selectedDate}
                            // value={new Date()}
                            isVisible={isDatePickerVisible}
                            mode="date"
                            onConfirm={handleConfirm}
                            onCancel={hideDatePicker}
                        />

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
      fixToText: {
            flexDirection: 'row'
        },
        button: {
            alignItems: "center",
            backgroundColor: "lightblue",
            padding: 5,
            height: 30,
            width: 50
        },
        dateText:{
            height: 30,
            textAlignVertical: 'center'
        }, 

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