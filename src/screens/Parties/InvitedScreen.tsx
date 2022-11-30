import { SafeAreaView, StyleSheet, View, Text, Pressable, FlatList } from 'react-native';
import jwt_decode from 'jwt-decode';

import React from 'react';
import InvitePartyCard from '../../components/Card/InvitePartyCard';
import Loading from '../../components/Loading';
import { useAuth } from '../../contexts/Auth';
import AsyncStorage from '@react-native-async-storage/async-storage';
const InvitedScreen = () => {  
  const [parties, setParties] = React.useState()
  const {authData} = useAuth()
  const [userId, setUserId] = React.useState()
  const [decoded, setDecoded] = React.useState()

  const [loading, setLoading] = React.useState(Boolean)

  React.useEffect(() => {
  console.log(authData)
  // Grab token value from authData
  const token = authData?.token
  console.log(token)

  const decoded = jwt_decode(token)

  console.log(decoded)
  setUserId(decoded.sub)

  console.log(userId)
  // Extract the UserId from the sub property of the decoded object

  // Get user profile information from API by passing in the UserId found through decoded token 
  getParties(userId)
  }, [loading, userId])

const getParties = async (userId) => {


// If the userId has been set, then get parties

  try { 
  let response = await fetch(`https://3341-193-61-207-166.eu.ngrok.io/api/invite/v1/parties/invited/${userId}`);
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
    <InvitePartyCard item={item}/>
  )
};

  return (

    parties ? (
    <SafeAreaView style={{ flex: 1, flexDirection: 'column', }}>
      <FlatList data={parties} renderItem={partyCard} keyExtractor={item => item.id}/>
    </SafeAreaView>
    ) : <Loading/>

  );
};

export default InvitedScreen;