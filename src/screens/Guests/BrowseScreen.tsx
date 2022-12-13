import { SafeAreaView, Image, ImageBackground, StyleSheet, View, Text, FlatList, Dimensions } from 'react-native';
import { useIsFocused } from '@react-navigation/native';

import React from 'react';
import BrowseCard from '../../components/Card/BrowseCard';
import { useAuth } from '../../contexts/Auth';
import Loading from '../../components/Loading';

import {roleService} from '../../services/roleService';

const BrowseScreen = ({isModalVisible, setIsModalVisible}) => {
  
  const [createInvite, setCreateInvite] = React.useState()
  // State set after invite sent, added as props in useEffect in order to re-ender BrowseScreen after sent
  // So that the invited guest disappears

  const [guests, setGuests] = React.useState()

  const {authUserId} = useAuth()

  // const [decoded, setDecoded] = React.useState()

  const isFocused = useIsFocused()
  const [loading, setLoading] = React.useState(Boolean)

  const [userRole, setUserRole] = React.useState()

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

      // Extract the UserId from the sub property of the decoded object

      // Get user profile information from API by passing in the UserId found through decoded token 

      roleService.getRole(authUserId, setUserRole, passedLastEntry, setPassedLastEntry)
      // console.log(userRole)

      if (userRole == 0) {
        getGuestsGuestMode(authUserId)
      } else if (userRole == 1) {
        console.log("Passed last entry: (BrowseScreen)")
        console.log(passedLastEntry)
        getGuestsHostMode(authUserId)
      }

      // Adding "guests" to the below parameters caused infinite rerender and infinite server calls
  }, [loading, authUserId, userRole, isFocused, isModalVisible, createInvite])

const getGuestsGuestMode = async (authUserId) => {
  try {
  let response = await fetch(`https://4c33-193-61-207-186.eu.ngrok.io/api/user/v1/guests/browse/${authUserId}/guestmode/`);
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

const getGuestsHostMode = async (authUserId) => {
  try {
  let response = await fetch(`https://4c33-193-61-207-186.eu.ngrok.io/api/user/v1/guests/browse/${authUserId}/hostmode/`);
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
    <BrowseCard item={item} authUserId={authUserId} userRole={userRole} setIsModalVisible={setIsModalVisible} setCreateInvite={setCreateInvite}/>
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