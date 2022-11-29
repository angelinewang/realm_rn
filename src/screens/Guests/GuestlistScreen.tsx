import { SafeAreaView, StyleSheet, View, Text, Pressable, FlatList } from 'react-native';

import React from 'react';
import GuestlistInvite from '../../components/Guestlist/GuestlistInvite';

const GuestlistScreen = () => {
  // Set the hostId to the Authenticated User ID 
  const [hostId, setHostId] = React.useState(1)

  const [invites, setInvites] = React.useState([])
  React.useEffect(
  () => {
    getPartyAndInvites()
  }, [hostId]
)

// Get party by host_id

// This page is working

// Get party and invites at same time and only find the party with the host and then find the invites with that party id

const getPartyAndInvites = async () => {
  try {
  // Get Party using User_id
  let response = await fetch(`https://334d-193-61-207-166.eu.ngrok.io/api/invite/v1/guestlist/${hostId}/`);
  let json = await response.json();
  setInvites(json)
  }
  catch (error) {
    console.error(error);
  }
}

// const getInvites = async () => {
//      try {
//     // Get the invites according to the Party_ID
//     // setParty(item)
//     let response = await fetch(`https://4ee1-193-61-207-166.eu.ngrok.io/api/invite/v1/guestlist/${party.id}/`);
//     let json = await response.json();
//     setInvites(json)
//     console.log(json)
//     }
//     catch (error) {
//       console.error(error);
//     }
// }

  const inviteCard = ({item}) => {
    return (
      <GuestlistInvite item={item}/>
    )
  };

  return (
    <SafeAreaView style={{ flex: 1, flexDirection: 'column', }}>
      <FlatList data={invites} renderItem={inviteCard} keyExtractor={item => item.id}/>
    </SafeAreaView>
  );
};

export default GuestlistScreen;