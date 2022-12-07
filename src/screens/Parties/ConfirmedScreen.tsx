import { SafeAreaView, StyleSheet, View, Text, Pressable, FlatList } from 'react-native';
import Loading from '../../components/Loading';
import { useAuth } from '../../contexts/Auth';
import jwt_decode from 'jwt-decode';
import { useIsFocused } from '@react-navigation/native';

import React from 'react';
import ConfirmPartyCard from '../../components/Card/ConfirmPartyCard';

const ConfirmedScreen = () => {  
  const [parties, setParties] = React.useState()
  const {authUserId} = useAuth()

  const isFocused = useIsFocused()
  const [loading, setLoading] = React.useState(Boolean)

  React.useEffect(() => {

      console.log(authUserId)
      // Grab authUserId value from Auth Context 

      // Current there is a bug, so need to comment out token section for Browse, Guestlist, Invited, and Confirmed BEFORE attempting to sign in 

      // Extract the UserId from the sub property of the decoded object

      // Get user profile information from API by passing in the UserId found through decoded token 
      
      getParties(authUserId)

  }, [loading, authUserId, isFocused])

const getParties = async (authUserId) => {


// If the authUserId has been set, then get parties

  try { 
  let response = await fetch(`https://212a-193-61-207-186.eu.ngrok.io/api/invite/v1/parties/confirmed/${authUserId}`);
  let json = await response.json();
  // Current expected response:
  // [{"id":1,"created_at":"2022-11-26T00:00:01Z","updated_at":"2022-11-26T00:00:01Z","party_id":9,"guest_id":1,"status":0,"plus_ones":null}]
  setParties(json)
  console.log(json)
  if (parties) {
    setLoading(false)
  }
  }
  catch (error) {
    console.error(error);
  }

}
const partyCard = ({item}) => {
  return (
    <ConfirmPartyCard item={item}/>
  )
};

  return (
<> 
{
   isFocused ? (parties ? (
    <SafeAreaView style={{ flex: 1, flexDirection: 'column', }}>
      <FlatList data={parties} renderItem={partyCard} keyExtractor={item => item.id}/>
    </SafeAreaView>
    ) : <Loading/>) : null
}
 
</>
    

  );
};

export default ConfirmedScreen;