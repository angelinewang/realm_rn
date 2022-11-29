import { View, Text, Button } from 'react-native';
import React from 'react';

// import { useAuth } from '../../contexts/Auth';
import ProfileCard from '../../components/Card/ProfileCard';

import  AsyncStorage from '@react-native-async-storage/async-storage';

import jwt_decode from 'jwt-decode';

import { useAuth } from '../Authentication/LoginScreen';
// const DATA = 
//   {
//     id: 1,
//     name: 'Angeline Wang',
//     birthdate: '2002-02-10',
//     department: 'Law',
//     profile_picture: '../../assets/profile_pictures/test1.jpg'
//   };

const ViewScreen = () => {

  const {authData} = useAuth()
  const [user, setUser] = React.useState(authData)

// const [authData, setToken] = React.useState("")
//  const getToken = async () => {
//   try {
//     let _token = await AsyncStorage.getItem('@AuthData')
//     setToken(_token)
//     console.log(_token)
//   } catch (error){
//     console.error(error)
//   }

//   }
//   const [authData, setAuthData] = React.useState()
//   React.useEffect(() => {
//     getToken()
//     // getUser()
//   }, [])
  

const signOut = async () => {
    //Remove data from context, so the App can be notified
    //and send the user to the AuthStack
    setUser(undefined);

    //Remove the data from Async Storage
    //to NOT be recovered in next session.
    await AsyncStorage.removeItem('@AuthData');
  };


  // const getUser = async () => {
  //     try {
  //       let response = await fetch(`https://334d-193-61-207-166.eu.ngrok.io/api/user/v1/profile/${authData.id}`);
  //       let json = await response.json();
  //       set(json)
  //       console.log(json)
  //     }
  //     catch (error) {
  //         console.error(error);
  //     }
  // }

// const auth = useAuth();
  return (
    <View style={{ flex: 1, paddingTop: 12, paddingHorizontal: 10 }}>
    {/* <Text>{user.name}</Text>
    <Text>{user.birthdate}</Text>
    <Text>{user.department}</Text> */}
    {/* <ProfileCard item={authData}/> */}
    <Button title="Log Out" onPress={signOut}/>
    </View>
  );
};

export default ViewScreen;