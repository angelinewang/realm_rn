import { SafeAreaView, Image, ImageBackground, StyleSheet, View, Text, FlatList, Dimensions } from 'react-native';
import { useIsFocused } from '@react-navigation/native';

import React from 'react';
import BrowseCard from '../../components/Card/BrowseCard';
import { useAuth } from '../../contexts/Auth';
import Loading from '../../components/Loading';
import jwt_decode from 'jwt-decode';

const BrowseScreen = ({}) => {
  
  const [guests, setGuests] = React.useState()

  const {authData, signOut} = useAuth()

  const [userId, setUserId] = React.useState()
  const [decoded, setDecoded] = React.useState()

  const isFocused = useIsFocused()
  const [loading, setLoading] = React.useState(Boolean)

  const [userRole, setUserRole] = React.useState()

  const [token, setToken] = React.useState("")
    const logOut = async () => {
        await signOut()
    }

// 1. Get whether get is 1 or 2 for role 

// 2. If role is 1: Run Host Mode URL 
// 3. If role is 0: Run Guest Mode URL


  React.useEffect(() => {
      console.log(authData)
      // Grab token value from authData

      // if (authData.token !== false) {
      
      // }
      try {
          setToken(authData.token)
            console.log(token)
            setDecoded(jwt_decode(token))

            console.log(decoded)
            setUserId(decoded.sub)

            console.log(userId)
          // valid token format
        } catch(error) {
                console.error(error)
          logOut()
        }
      // if (!token) {
      //   logOut()
      // }


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
      try {
        let response = await fetch(`https://3341-193-61-207-166.eu.ngrok.io/api/user/v1/profile/${userId}`);
        let json = await response.json();
        setUserRole(json.role)
        console.log(userRole)
      
        // if (userRole) {
        // setLoading(false)
        // }
        } catch (error) {
          console.error(error);
        }

  }

const getGuestsGuestMode = async (userId) => {
  try {
  let response = await fetch(`https://3341-193-61-207-166.eu.ngrok.io/api/user/v1/guests/browse/${userId}/guestmode/`);
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
  let response = await fetch(`https://3341-193-61-207-166.eu.ngrok.io/api/user/v1/guests/browse/${userId}/hostmode/`);
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
    <BrowseCard item={item}/>
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