import { SafeAreaView, StyleSheet, View, Text, Pressable, FlatList } from 'react-native';
import jwt_decode from 'jwt-decode';

import { useIsFocused } from '@react-navigation/native';
import React from 'react';
import InvitePartyCard from '../../components/Card/InvitePartyCard';
import Loading from '../../components/Loading';
import { useAuth } from '../../contexts/Auth';
const InvitedScreen = () => {  
  const [parties, setParties] = React.useState()
  const {authUserId} = useAuth()

  const isFocused = useIsFocused()
  const [loading, setLoading] = React.useState(Boolean)

  React.useEffect(() => {

      console.log(authUserId)

      // Current there is a bug, so need to comment out token section for Browse, Guestlist, Invited, and Confirmed BEFORE attempting to sign in 

      // Extract the UserId from the sub property of the decoded object

      // Get user profile information from API by passing in the UserId found through decoded token 
      
      getParties(authUserId)

  }, [loading, authUserId, isFocused])

const getParties = async (authUserId) => {


// If the authUserId has been set, then get parties

  try { 

    // Invites should only get the ones in the future
    // Currently Bob should have 5 Invites: 3 in the future, 2 in the past
    
  let response = await fetch(`https://c4a0-193-61-207-186.eu.ngrok.io/api/invite/v1/parties/invited/${authUserId}`);
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

// 1. Get Parties whose first entry is less than 12 hours past 
// 2. Only send back parties with relevant first entries from the backend 
// 3. Test Invited API on Postman
// 4. Test Confirmed API on Postman

const partyCard = ({item}) => {

  return (
    <InvitePartyCard item={item}/>
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

export default InvitedScreen;