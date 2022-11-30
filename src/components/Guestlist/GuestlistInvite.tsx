import { SafeAreaView, FlatList, View, Text } from "react-native";
import React from "react";

import GuestlistGuest from "./GuestlistGuest";
import Loading from "../Loading";

const GuestlistInvite = ({item}) => {

  const [guest, setGuest] = React.useState()
  const [loading, setLoading] = React.useState(true)

  // Each invite has a different guest, so for each invite, one inviteCard and one guestCard needs to be rendered
  React.useEffect(
  () => {
    setGuest(item.guest_id)

    if (guest) {
        setLoading(false)
    }

  }, [loading, item]
)

return (
guest ? (
  <View style={{ flex: 1, flexDirection: 'column', backgroundColor: "#4abbff", marginTop: 20, marginHorizontal: 20, borderRadius: 20, height: 563}}>
    <View style={{flex: 1, padding: 30, height: "10%", justifyContent: "flex-end"}}>
      <GuestlistGuest item={guest}/>
      {/* <Text>GUEST INFO</Text> */}
      {/* Invite Response Information */}
      <Text style={{ fontSize: 18, color: 'white', fontWeight: 'bold'}}>
      {item.plus_ones ? `is bringing ${item.plus_ones} +1s` : "no plus-ones"}
      </Text>
      <Text style={{ fontSize: 18, color: 'white', fontWeight: 'bold'}}>
      {item.status ? item.status : "Invited"}
      </Text>
    </View>
  </View>
  ) : <Loading/>
)
    
};

export default GuestlistInvite;