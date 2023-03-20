import { View, Button, Alert, Pressable, ScrollView } from 'react-native';
import React from 'react';

import ProfileCard from '../../components/Card/ProfileCard';
import Loading from '../../components/Loading';
import SettingsSVG from '../../assets/images/settings.svg'

import { useAuth } from '../../contexts/Auth'
import { useIsFocused } from '@react-navigation/native';

import SettingsModal from '../../components/SettingsModal';
import { profileScreenView, loginButtonPress, settingButtonPress } from '../../../analytics.native';
import { Text } from '../../../components/Themed';

import { useFonts } from 'expo-font';

const ViewScreen = () => {

  //Import Fonts
  const [fontsLoaded] = useFonts({
    'Plus-Jakarta-Sans-Bold': require('../../assets/fonts/PlusJakartaSans-Bold.ttf')
  })

  //Grab Auth User Id from AuthContext
  const {authUserId} = useAuth()

  const isFocused = useIsFocused()

  //States
  const [loading, setLoading] = React.useState(Boolean)
  const [user, setUser] = React.useState({})

  React.useEffect(() => {
    // Analytics.logEvent('screen_view', {
    //   firebase_screen: "Profile"
    // })

    console.log(authUserId)
    // Grab token value from authData
    // Current there is a bug, so need to comment out token section for Browse, Guestlist, Invited, and Confirmed BEFORE attempting to sign in 

    // Get user profile information from API by passing in the UserId found through decoded token 
    getUser(authUserId)

    //Screen View Analytics
    screenView()

  }, [loading, authUserId, isFocused])
  
  const screenView = async () => {
    try {
        await profileScreenView()
    } catch (error) {
        console.log(error)
    }
  }

  const logOutButton = async () => {
    try {
        await loginButtonPress()
    } catch (error) {
        console.log(error)
    }
  }




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
    //Button Press Analytics
    logOutButton()

    try {
      await signOut()
    } catch(error) {
      console.error
    }
      
  }

    // Return to Log In screen
    // const navigation = useNavigation<SignUpScreenNavigationProp>();



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
      //Height must go inside contentContainerStyle
        //Otherwise will not scroll to the full height 
      //Other styles must go inside style
      <ScrollView style={{ paddingTop: 12, paddingHorizontal: 10, display: 'flex', flexDirection: 'column' }} contentContainerStyle={{height: 700, justifyContent: 'space-between'}}>
      <View style={{display: 'flex', flexDirection: 'column', justifyContent: 'space-between'}}>
      <ProfileCard user={user}/>
      <Pressable onPress={logOut} style={{backgroundColor: '#D1D1DB', width: 318, height: 63, borderRadius: 20, display: 'flex', justifyContent: 'center', alignItems: 'center', alignSelf: 'center', marginTop: 25}}>
        <Text style={{color: '#FFFFFF', fontSize: 20, fontFamily
      : 'Plus-Jakarta-Sans-Bold', alignSelf: 'center'}}>Log Out</Text>
      </Pressable>

      {/* Add Gear Icon for Delete Account
      1. Find SVG from Figma and Add to Assets
      2. Add SVG here
      3. Add functionality to lead to Delete Account pop-up modal
      4. Add button to delete account on popup modal */}
      {/* <Pressable >
        <SettingsSVG height={25} width={25} fill='#D1D1DB'/>
      </Pressable> */}
      </View>
      </ScrollView>)
      : <Loading/>) : null
  }
 
  </>
);
};

export default ViewScreen;