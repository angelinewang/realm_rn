import { View, Text, Pressable } from "react-native";
import React from "react";
import Loading from "../Loading";
// Added config to metro.config.js and declarations.d.ts to allow for direct import of SVGs
import InviteSVG from '../../assets/images/invite.svg'
// Card used to display each individual Guest Profile on the Browse and Guestlist Screens

const BrowseCard = ({item, authUserId, authData, userRole, handleModal}) => {
// Called on User

const [guest, setGuest] = React.useState()

const [loading, setLoading] = React.useState(true)

const [party, setParty] = React.useState()


  React.useEffect(
  () => {
    console.log(`Item is ${item}`)
    console.log(item)
    getGuest(item)
  }, [item, loading, authUserId, authData, userRole]
)

const getGuest = async (item) => {
  try {
  // setInvite(item)
  // What's being based through as "item" is already the user, so just call id on "item"
  let response = await fetch(`https://212a-193-61-207-186.eu.ngrok.io/api/user/v1/profile/${item.id}/`);
  let json = await response.json();
  setGuest(json)
  console.log(json)
  if (guest) {
    setLoading(false)
  }
  }
  catch (error) {
    console.error(error);
  }
}

const handleInvite = async () => {
  // Add invite POST Request 
  // item.id is the Guest ID being grabbed through getGet right now 
  // Pass item.id through an API to send CREATE INVITE with the that id as the guest_id
  console.log("INVITE button pressed!")

  if (userRole == 0) {
    // Open Modal to Add Party
    handleModal()
    // Works: If User Role is not Host, open modal when invite button pressed
  }
  else if (userRole == 1) {
    // POST request for creating invite
    
    sendInvite(item)
  }
}

  const sendInvite = async (item) => {
      try {
        let response = await fetch(`https://212a-193-61-207-186.eu.ngrok.io/api/invite/v1/invite/1/`);
        let json = await response.json();


        console.log("Reached end Invite Promise")
        } catch (error) {
          console.error(error);
        }
  }
    return (
guest ? (
      <View style={{ display: 'flex', flexDirection: 'row',  backgroundColor: "black", marginTop: 20, marginHorizontal: 20, borderRadius: 20, height: 563}}>
      <View style={{ flex: 1, flexDirection: 'column'}}>
        <View style={{flex: 1, padding: 30, height: "10%", justifyContent: "flex-end"}}>
        <Text style={{ fontSize: 28, color: 'white', fontWeight: 'bold'}}>
          {guest.name ? guest.name : "no name"}
          </Text>
          <Text style={{ fontSize: 18, color: 'white'}}>
          { guest.birthdate ? `${guest.birthdate} ` : "no birthdate"}
          {/* Convert Deparment NUM to STRING */}
          { guest.department ? guest.department : "no department"}
         </Text>
         
         </View>
         </View>
         <View style={{display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'flex-end', margin: 25}}>
          
          <Text style={{color: '#4abbff', fontWeight: 'bold', fontSize: 14}}>INVITE</Text>
          <Pressable onPress={handleInvite} style={{backgroundColor: '#4abbff', borderRadius: 100, width: 65, height: 65, display: 'flex', alignItems: 'center', justifyContent: 'center'}}>
            {/* <View style={{display: 'flex', justifyContent: 'center', alignItems: 'center'}}> */}
              <InviteSVG height={40} width={40} fill='white'/>
            {/* </View> */}
         </Pressable>
         </View>
      </View>  ) : <Loading />
    );
};  

export default BrowseCard;