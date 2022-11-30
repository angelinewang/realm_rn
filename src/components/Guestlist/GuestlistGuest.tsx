import { View, Text } from "react-native";
import React from "react";

// Card used to display each individual Guest Profile on the Browse and Guestlist Screens

const GuestlistGuest = ({item}) => {

// item = guest_id 
// used to find the guest profile

const [invite, setInvite] = React.useState(item)
const [guest, setGuest] = React.useState({})

  React.useEffect(
  () => {
    getGuest()
  }, [item]
)

const getGuest = async () => {
  try {
  // setInvite(item)
  let response = await fetch(`https://3341-193-61-207-166.eu.ngrok.io/api/invite/v1/guestlist/guest/${invite.guest_id}/`);
  let json = await response.json();
  setGuest(json)
  console.log(json)
  }
  catch (error) {
    console.error(error);
  }
}

    return (
      // <View style={{ flex: 1, flexDirection: 'column', backgroundColor: "#4abbff", marginTop: 20, marginHorizontal: 20, borderRadius: 20, height: 563}}>
      //   <View style={{flex: 1, padding: 30, height: "10%", justifyContent: "flex-end"}}>
      <>
          <Text style={{ fontSize: 28, color: 'white', fontWeight: 'bold'}}>
          {guest.name ? guest.name : "no name"}
          </Text>
          <Text style={{ fontSize: 18, color: 'white'}}>
          { guest.birthdate ? `${guest.birthdate} ` : "no birthdate"}
          {/* Convert Deparment NUM to STRING */}
          { guest.department ? guest.department : "no department"}
         </Text>
      </>

      //    </View>
      // </View>
    );
};

export default GuestlistGuest;