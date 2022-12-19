import { View, Text, ImageBackground } from "react-native";
import React from "react";
import HostCard from "./HostCard";
//HostCard remains same for both Invite and Confirm Party Cards
import Loading from "../Loading";

const ConfirmPartyCard = ({item}) => {

  const [party, setParty] = React.useState()
  const [invite, setInvite] = React.useState(item)
  const [host, setHost] = React.useState()

  React.useEffect(
  () => {
    
    getParty(invite)
  }, [item, host]
)

const getParty = async (invite) => {
  try {
  let response = await fetch(`https://effb-82-0-186-223.eu.ngrok.io/api/invite/v1/parties/party/${invite.party_id_id}/`);
  let json = await response.json();
  setParty(json)
  console.log(json)
  }
  catch (error) {
    console.error(error);
  }
}

return (

  party ? ( 

<View style={{ flex: 1, flexDirection: 'column', marginTop: 20, marginHorizontal: 20, borderRadius: 20, height: 563}}>
  {/* Add the ternary before calling profile picture solved issue of not having the host object */}
  <ImageBackground style={{flex:1, justifyContent: 'center'}} imageStyle={{borderRadius: 20}} source={{uri: host?.profile_picture}}>
<View style={{ flex: 1, flexDirection: 'column', marginTop: 20, marginHorizontal: 20, borderRadius: 20, height: 563}}>

  {/* Host Information */}
  <HostCard item={party.host_id} host={host} setHost={setHost}/>
  {/* Party Information */}
  <View style={{flex: 1, padding: 30, height: "10%", justifyContent: "flex-end"}}>
    <Text style={{ fontSize: 28, color: 'white', fontWeight: 'bold'}}>
    {party.first_entry ? party.first_entry : "no first entry"}
    </Text>
    <Text style={{ fontSize: 18, color: 'white'}}>
    {party.vibe ? `${party.vibe} ` : "no vibe "}
    {/* Convert Deparment NUM to STRING */}
    {/* Below is the user's plus-ones submission upon confirming*/}
    {invite.plus_ones ? item.plus_ones: "no plus-ones"}
    </Text>
  </View>
  </View>
  </ImageBackground>
</View> 
  ) : <Loading />

)
    
};

export default ConfirmPartyCard;