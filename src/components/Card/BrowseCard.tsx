import { View, Text, Pressable } from "react-native";
import React from "react";
import Loading from "../Loading";
// Added config to metro.config.js and declarations.d.ts to allow for direct import of SVGs
import InviteSVG from '../../assets/images/invite.svg'
// Card used to display each individual Guest Profile on the Browse and Guestlist Screens

const BrowseCard = ({item, authUserId, userRole, setIsModalVisible, setCreateInvite}) => {
// Called on User

const [guest, setGuest] = React.useState()

const [guestId, setGuestId] = React.useState()

const [loading, setLoading] = React.useState(true)

const [partyId, setPartyId] = React.useState()

React.useEffect(() => {
    console.log(`Item is ${item}`)
    console.log(item)
    setGuestId(item.id)
    console.log("GUEST ID: (on BrowseCard)")
    console.log(guestId)
    getGuest(item)
  }, [item, loading, authUserId, userRole]
)

const getGuest = async (item) => {
  try {
    // setInvite(item)
    // What's being based through as "item" is already the user, so just call id on "item"
    let response = await fetch(`https://27f9-193-61-207-186.eu.ngrok.io/api/user/v1/profile/${item.id}/`);
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

// To send invite: 
// #1 Check that user is a Host 
// #2 Grab User Party 
// #3 Create Invite with Party Id and Guest Id 

const handleInvite = async () => {
  // Add invite POST Request 
  // item.id is the Guest ID being grabbed through getGet right now 
  // Pass item.id through an API to send CREATE INVITE with the that id as the guest_id
  console.log("INVITE button pressed!")

  // #1 Check User is Host
  if (userRole == 0) {
    // Open Modal to Add Party
    setIsModalVisible(true)
    // Works: If User Role is not Host, open modal when invite button pressed
  }
  else if (userRole == 1) {
    // POST request for creating invite
    // #2 Grab User Party
    getParty(authUserId)
  }
}

const getParty = async (authUserId) => {
  try {
  // Get Party using User_id

  // 1. Create getParty API like the getPartyAndInvites API
  let response = await fetch(`https://27f9-193-61-207-186.eu.ngrok.io/api/party/v1/myparties/${authUserId}/`);
  let json = await response.json();

  let latestParty = json.pop();
  console.log("LATEST PARTY:")
  console.log(latestParty)

  setPartyId(latestParty.id)

  sendInvite(partyId)
  console.log("Reached Get Party Function")
  }
  catch (error) {
    console.error(error);
  }
}


  const sendInvite = async (partyId, guestId) => {
      try {
        console.log("PARTY ID of LATEST PARTY:")
        console.log(partyId)

        // RESOLVE LATER: guestId sometimes successfully sets, but sometimes not 
        // Only reliable source for guest_id right now is the item.id
        setGuestId(item.id)
        console.log("GUEST ID on current Browse Card:")
        console.log(item.id)

        let response = await fetch(
              `https://27f9-193-61-207-186.eu.ngrok.io/api/invite/v1/createinvite/`,
              {
                method: "POST",
                headers: {
                  "Content-Type": "application/json",
                  Accept: "application/json",
                },
                body: JSON.stringify({
                  party_id: partyId,
                  guest_id: item.id,
                }),
              }
            );
            // Sends the response with auth token back to Auth Context as Object
            console.log("Reached end Create Invite Promise")

            // Set createInvite to the API response in order to trigger page to re-render through useEffect props
            setCreateInvite(response)
            return response.json();
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
          <Text style={{color: '#4abbff', fontWeight: 'bold', fontSize: 14}}>
            INVITE
          </Text>
          <Pressable onPress={handleInvite} style={{backgroundColor: '#4abbff', borderRadius: 100, width: 65, height: 65, display: 'flex', alignItems: 'center', justifyContent: 'center'}}>

            <InviteSVG height={40} width={40} fill='white'/>
     
          </Pressable>
        </View>

      </View>  ) : <Loading />
    );
};  

export default BrowseCard;