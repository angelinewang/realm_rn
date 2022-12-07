import { View, Text, Button } from 'react-native';
import React from 'react';

import ProfileCard from '../../components/Card/ProfileCard';
import Loading from '../../components/Loading';

import jwt_decode from 'jwt-decode';

import {useAuth} from '../../contexts/Auth'
 import { useIsFocused } from '@react-navigation/native';

const ViewScreen = () => {
  const [loading, setLoading] = React.useState(Boolean)

  const isFocused = useIsFocused()

  const {authUserId} = useAuth()

  const [user, setUser] = React.useState({})

  React.useEffect(() => {
  console.log(authUserId)
  // Grab token value from authData
  // Current there is a bug, so need to comment out token section for Browse, Guestlist, Invited, and Confirmed BEFORE attempting to sign in 

  // Get user profile information from API by passing in the UserId found through decoded token 
  getUser(authUserId)
  }, [loading, authUserId, isFocused])
  

// const signOut = async () => {
//     //Remove data from context, so the App can be notified
//     //and send the user to the AuthStack
//     setUser(undefined);

//     //Remove the data from Async Storage
//     //to NOT be recovered in next session.
//     await AsyncStorage.removeItem('@AuthData');
//   };
    const {signOut} = useAuth()

    const logOut = async () => {
        await signOut()
    }

    // Must pass UserId/Arguments into async
  const getUser = async (authUserId) => {
      try {
        let response = await fetch(`https://212a-193-61-207-186.eu.ngrok.io/api/user/v1/profile/${authUserId}`);
        let json = await response.json();
        setUser(json)
        console.log(json)
          if (user) {
    setLoading(false)
  }
      }
      catch (error) {
          console.error(error);
      }
  }

  return (
      <> 
{
   isFocused ? (user ? (
    <View style={{ flex: 1, paddingTop: 12, paddingHorizontal: 10 }}>
    <ProfileCard user={user}/>
    <Button title="Log Out" onPress={logOut}/>
    </View>)
     : <Loading/>) : null
}
 
</>
  );

};

export default ViewScreen;