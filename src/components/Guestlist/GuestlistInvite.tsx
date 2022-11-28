import { SafeAreaView, FlatList, View, Text } from "react-native";
import React from "react";

import GuestlistGuest from "./GuestlistGuest";

const GuestlistInvite = ({item}) => {

  const [invite, setInvite] = React.useState(item)
  const [guest, setGuest] = React.useState({})

  // Each invite has a different guest, so for each invite, one inviteCard and one guestCard needs to be rendered
  React.useEffect(
  () => {
    // setInvite(item)
  }, [item]
)

// const getGuest = async () => {
//   try {
//   let response = await fetch(`https://4ee1-193-61-207-166.eu.ngrok.io/api/invite/v1/parties/guest/${item}/`);
//   let json = await response.json();
//   setGuest(json)
//   console.log(json)
//   }
//   catch (error) {
//     console.error(error);
//   }

// Find the 4 URLs, make each of the 4 URLs work at a time through Django code

// 1. Get Party: https://4ee1-193-61-207-166.eu.ngrok.io/api/party/v1/${userID}/
// 2. Get Invites: https://4ee1-193-61-207-166.eu.ngrok.io/api/invite/v1/guestlist/${party.id}/
// 3. Get Guest: https://4ee1-193-61-207-166.eu.ngrok.io/api/invite/v1/guestlist/guest/${guest_id}/

// CURRENT TASKS
// 1. Figure out Get Party API
// 2. Figure out Get Invites API
// 3. Figure out Get Guest API

// 4. Test on Expo Go To see if it is all rendering 
return (
  <View style={{ flex: 1, flexDirection: 'column', backgroundColor: "#4abbff", marginTop: 20, marginHorizontal: 20, borderRadius: 20, height: 563}}>
    <View style={{flex: 1, padding: 30, height: "10%", justifyContent: "flex-end"}}>
      <GuestlistGuest item={item}/>
      {/* Invite Response Information */}
      <Text style={{ fontSize: 18, color: 'white', fontWeight: 'bold'}}>
      {invite.plus_ones ? `is bringing ${invite.plus_ones} +1s` : "no plus-ones"}
      </Text>
      {/* <Text style={{ fontSize: 18, color: 'white', fontWeight: 'bold'}}>
      {invite.status ? invite.status : "invited but not response"}
      </Text> */}
    </View>
  </View>
)
    
};

export default GuestlistInvite;