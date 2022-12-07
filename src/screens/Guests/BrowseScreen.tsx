import { SafeAreaView, Image, ImageBackground, StyleSheet, View, Text, FlatList, Dimensions } from 'react-native';
import { useIsFocused } from '@react-navigation/native';

import React from 'react';
import BrowseCard from '../../components/Card/BrowseCard';
import { useAuth } from '../../contexts/Auth';
import Loading from '../../components/Loading';
import jwt_decode from 'jwt-decode';
import AsyncStorage from '@react-native-async-storage/async-storage';

const BrowseScreen = ({handleModal}) => {
  
  const [guests, setGuests] = React.useState()

  const {authData, signOut} = useAuth()

  const [userId, setUserId] = React.useState()
  // const [decoded, setDecoded] = React.useState()

  const isFocused = useIsFocused()
  const [loading, setLoading] = React.useState(Boolean)

  const [userRole, setUserRole] = React.useState()

  const [token, setToken] = React.useState("")
    // const logOut = async () => {
    //     await signOut()
    // }
  const [passedLastEntry, setPassedLastEntry] = React.useState()


// 1. Get whether get is 1 or 2 for role 

// 2. If role is 1: Run Host Mode URL 
// 3. If role is 0: Run Guest Mode URL

// const myToken = async () => {
//   await AsyncStorage.getItem('@AuthData')
// }

  React.useEffect(() => {
      // TESTING: console.log(authData)
      // Grab token value from authData
      // Current there is a bug, so need to comment out token section for Browse, Guestlist, Invited, and Confirmed BEFORE attempting to sign in 

        const token = authData?.token
        // console.log(token)
        const decoded = jwt_decode(token)

        // TESTING: console.log(decoded)

        // TESTING: console.log(userId)
        setUserId(decoded.sub)

      // Extract the UserId from the sub property of the decoded object

      // Get user profile information from API by passing in the UserId found through decoded token 

      getUserRole(userId)
      // console.log(userRole)

      if (userRole == 0) {
        getGuestsGuestMode(userId)
      } else if (userRole == 1) {
        getGuestsHostMode(userId)
      }

      // Adding "guests" to the below parameters caused infinite rerender and infinite server calls
  }, [loading, userId, userRole, isFocused])


  const getUserRole = async (userId) => {
    // REPEATED AT: all getUserRoles --> Move into a module 

    // Every getUserRole function calls: 
    // 1. Get Profile 
    // 2. If Role is Guest, setUserRole 
    // 3. If Role is Host, API to find party, grab the party first entry and see if last entry passed is true or false  
    // 4. If last entry passed is true, then call API to change the User Role to Guest on the backend 
    // 5. And then grab new User Info with changed Role
      try {
        let response = await fetch(`https://3c6c-193-61-207-186.eu.ngrok.io/api/user/v1/profile/${userId}/`);
        let json = await response.json();

        if (json.role == 0) {
          setUserRole(json.role)
        }

       else if (json.role == 1) {
        // Sets user role, pending further change if last entry  
        setUserRole(json.role)
         getFirstEntry()
       }

        console.log("Reached Get User Role Function")
        } catch (error) {
          console.error(error);
        }
  }

const getFirstEntry = async () => {
  try {
    // Get most recent party of the user and return the first entry time of that party 
    let response = await fetch(`https://3c6c-193-61-207-186.eu.ngrok.io/api/user/v1/firstentry/${userId}/`);
    let json = await response.json();
    console.log(json)
    setPassedLastEntry(response)
    console.log(passedLastEntry)

    if (passedLastEntry == true) {
      changeUserRole()
    }
  }
  catch (error) {
    console.error(error);
  }
}

const changeUserRole = async () => {
    try {
    // Get most recent party of the user and return the first entry time of that party 
    let response = await fetch(`https://3c6c-193-61-207-186.eu.ngrok.io/api/user/v1/changerole/${userId}/`);
    let json = await response.json();
    setUserRole(json.role)
    console.log(passedLastEntry)
  }
  catch (error) {
    console.error(error);
  }
}

const getGuestsGuestMode = async (userId) => {
  try {
  let response = await fetch(`https://3c6c-193-61-207-186.eu.ngrok.io/api/user/v1/guests/browse/${userId}/guestmode/`);
  let json = await response.json();
  setGuests(json)
  console.log(json)
  if (guests) {
        setLoading(false)
  }
  }
  catch (error) {
    console.error(error);
  }
}

const getGuestsHostMode = async (userId) => {
  try {
  let response = await fetch(`https://3c6c-193-61-207-186.eu.ngrok.io/api/user/v1/guests/browse/${userId}/hostmode/`);
  let json = await response.json();
  setGuests(json)


  console.log(`${guests[0]} is the first guest ${guests}`)
  console.log(guests[0])
  if (guests) {
        setLoading(false)
  }
  }
  catch (error) {
    console.error(error);
  }
}


const guestCard = ({item}) => {
  return (
    <BrowseCard item={item} userId={userId} authData={authData} userRole={userRole} handleModal={handleModal}/>
  )
};

  return (
    <> 
{
   isFocused ? (guests ? (
    <SafeAreaView style={{ flex: 1, flexDirection: 'column', }}>
    
      <FlatList data={guests} renderItem={guestCard} keyExtractor={item => item.id}/>

    </SafeAreaView>

      ) : <Loading/>) : null
}
</>
  );
};

export default BrowseScreen;