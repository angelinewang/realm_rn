import { View, Text } from "react-native";
import React from "react";
import HostCard from "./HostCard";

const InvitePartyCard = ({item}) => {

  const [party, setParty] = React.useState({})
  const [invite, setInvite] = React.useState(item)

  React.useEffect(
  () => {
    getParty()
  }, [item]
)

const getParty = async () => {
  try {
  let response = await fetch(`https://335b-82-0-186-223.eu.ngrok.io/api/invite/v1/parties/party/${invite.party_id}/`);
  let json = await response.json();
  setParty(json)
  console.log(json)
  }
  catch (error) {
    console.error(error);
  }
}

return (

<View style={{ flex: 1, flexDirection: 'column', backgroundColor: "#4abbff", marginTop: 20, marginHorizontal: 20, borderRadius: 20, height: 563}}>
  {/* Host Information */}
  <HostCard item={party.host_id}/>
  {/* Party Information */}
  <View style={{flex: 1, padding: 30, height: "10%", justifyContent: "flex-end"}}>
    <Text style={{ fontSize: 28, color: 'white', fontWeight: 'bold'}}>
    {party.first_entry ? party.first_entry : "no first entry"}
    </Text>
    <Text style={{ fontSize: 18, color: 'white'}}>
    {party.vibe ? `${party.vibe} ` : "no vibe "}
    {/* Convert Deparment NUM to STRING */}
    {/* Below plus_ones set to a custom input field */}
    {/* {invite.plus_ones ? item.plus_ones: "no plus-ones"} */}
    </Text>
  </View>
</View> 
)
    
};

export default InvitePartyCard;