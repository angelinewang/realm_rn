import { SafeAreaView, StyleSheet, View, Text, Pressable, FlatList } from 'react-native';

import React from 'react';
import InvitePartyCard from '../../components/Card/InvitePartyCard';

const InvitedScreen = () => {  
  const [parties, setParties] = React.useState()

  React.useEffect(
  () => {
    getParties()
  }, []
)

const getParties = async () => {
  try {
  let response = await fetch("https://335b-82-0-186-223.eu.ngrok.io/api/invite/v1/parties/invited");
  let json = await response.json();

  setParties(json)
  console.log(json)
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
    <SafeAreaView style={{ flex: 1, flexDirection: 'column', }}>
      <FlatList data={parties} renderItem={partyCard} keyExtractor={item => item.id}/>
    </SafeAreaView>
  );
};

export default InvitedScreen;