import { View, Button, Alert } from 'react-native';
import React from 'react';

import ProfileCard from '../../components/Card/ProfileCard';
import Loading from '../../components/Loading';

import {useAuth} from '../../contexts/Auth'
import { useIsFocused } from '@react-navigation/native';

const ViewScreen = () => {
  //Grab Auth User Id from AuthContext
  const {authUserId} = useAuth()

  const isFocused = useIsFocused()

  //States
  const [loading, setLoading] = React.useState(Boolean)
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
    try {
      await signOut()
    } catch(error) {
      console.error
    }
      
  }

    // Return to Log In screen
    // const navigation = useNavigation<SignUpScreenNavigationProp>();

  const deleteAccount = async () => {
    try {
      console.log("Reached deleteAccount!");
      let response = await fetch(
        `https://realm-dj-34ezrkuhla-ew.a.run.app/api/user/v1/delete/${authUserId}`,
        {
          method: "DELETE"
        }
      );
    } catch (error) {
      console.error(error);
    }
    Alert.alert(
          `Account Deleted! Sign Out to go back to Log In screen`
    );
  }

    // Must pass UserId/Arguments into async
  const getUser = async (authUserId) => {
      try {
        let response = await fetch(`https://realm-dj-34ezrkuhla-ew.a.run.app/api/user/v1/profile/${authUserId}`);
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
      <Button title="Delete Account" onPress={deleteAccount}/>
      </View>)
      : <Loading/>) : null
  }
 
  </>
);
};

export default ViewScreen;