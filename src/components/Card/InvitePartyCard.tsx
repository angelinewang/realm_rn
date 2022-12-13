import { View, Text, Pressable, ImageBackground } from "react-native";
import React from "react";
import HostCard from "./HostCard";
import Loading from "../Loading";
import ConfirmSVG from '../../assets/images/confirm.svg'

const InvitePartyCard = ({item}) => {

  const [party, setParty] = React.useState()
  const [invite, setInvite] = React.useState(item)
  const [confirm, setConfirm] = React.useState()
  const [host, setHost] = React.useState()

  React.useEffect( () =>
{
       getParty()

  }, [item, host]
)

const getParty = async () => {
  try {
  let response = await fetch(`https://4c33-193-61-207-186.eu.ngrok.io/api/invite/v1/parties/party/${invite.party_id_id}/`);
  let json = await response.json();
  setParty(json)
  console.log(json)
  }
  catch (error) {
    console.error(error);
  }
}

const handleConfirmation = async () => {
  // Add invite POST Request 
  // item.id is the Guest ID being grabbed through getGet right now 
  // Pass item.id through an API to send CREATE INVITE with the that id as the guest_id
  console.log("CONFIRM button pressed!")

  // Call confirm API with the invite_id
  // CONFIRM API just takes in the invite_id has params and changes the status of the invite to 1 from 0 
  // invite_id will be received through the body of the POST Request Fields

  confirmAttend();
}

const confirmAttend = async () => {
try {
console.log("INVITE CONFIRMED:")
console.log(invite.id)

// RESOLVE LATER: guestId sometimes successfully sets, but sometimes not 
// Only reliable source for guest_id right now is the item.id

// 1. Check that the CONFIRM button is showing DONE
// 2. Move CONFIRM button to correct position 
// 3. Change the SVG on the CONFIRM button to be checkmark from Figma
// 4. Finalise API to CONFIRM 
// 5. Connect the API to this frontend page

let response = await fetch(
    `https://4c33-193-61-207-186.eu.ngrok.io/api/invite/v1/confirm/${invite.id}/`,
    {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
      },
    }
  );
  // Sends the response with auth token back to Auth Context as Object
  console.log("Reached end Confirm Invite Promise")
  console.log(response.json())
  // Set createInvite to the API response in order to trigger page to re-render through useEffect props
  setConfirm(response.json())
  // return response.json();
 } catch(error) {
  console.error
 }
}

return (
party ? (
<View style={{marginTop: 20, marginHorizontal: 20, borderRadius: 20, height: 563}}>
  <ImageBackground style={{flex:1, justifyContent: 'center'}} imageStyle={{borderRadius: 20}} source={{uri: host?.profile_picture}}>
    <View style={{marginTop: 20, marginHorizontal: 20, borderRadius: 20, height: 563}}>

  {/* Host Information */}
  <HostCard item={party.host_id} host={host} setHost={setHost}/>
  {/* Party Information */}
  {/* <View style={{display: "flex", flexDirection: "row"}}>
  <View style={{flex: 1, flexDirection: 'column', padding: 30, height: "10%", justifyContent: "flex-end"}}>
  <View style={{flex: 1, padding: 30, height: "10%", justifyContent: "flex-end"}}> */}
<View style={{ display: 'flex', flexDirection: 'row'}}>
        
        <View style={{ flex: 1, flexDirection: 'column'}}>
          <View style={{flex: 1, padding: 30, height: "10%", justifyContent: "flex-end"}}>
    <Text style={{ fontSize: 18, color: 'white', fontWeight: 'bold'}}>
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

  <View style={{display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'flex-end', margin: 25}}>  
    <Text style={{color: '#4abbff', fontWeight: 'bold', fontSize: 14}}>
      ACCEPT
    </Text>
    <Pressable onPress={handleConfirmation} style={{backgroundColor: 'white', borderRadius: 100, width: 65, height: 65, display: 'flex', alignItems: 'center', justifyContent: 'center'}}>
      <ConfirmSVG height={65} width={65} fill='#4abbff'/>
    </Pressable>
  </View>
  </View>
  </View>
</ImageBackground>
</View> 
) : <Loading />

)
    
};

export default InvitePartyCard;