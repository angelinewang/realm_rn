import { View, Text } from "react-native";
import React from "react";

// Card used to display each individual Guest Profile on the Browse and Guestlist Screens

const ProfileCard = ({item}) => {

// item = guest_id 
// used to find the guest profile
const [user, setUser] = React.useState(item)

  React.useEffect(
  () => {

  }, [item]
)

// const getGuest = async () => {
//   try {
//   // setInvite(item)
//   let response = await fetch(`https://334d-193-61-207-166.eu.ngrok.io/api/user/v1/profile/${invite.guest_id}/`);
//   let json = await response.json();
//   setGuest(json)
//   console.log(json)
//   }
//   catch (error) {
//     console.error(error);
//   }
// }

    return (
      <View style={{ flex: 1, flexDirection: 'column', backgroundColor: "#4abbff", marginTop: 20, marginHorizontal: 20, borderRadius: 20, height: 563}}>
        <View style={{flex: 1, padding: 30, height: "10%", justifyContent: "flex-end"}}>
        <Text style={{ fontSize: 28, color: 'white', fontWeight: 'bold'}}>
          {user.name ? user.name : "no name"}
          </Text>
          <Text style={{ fontSize: 18, color: 'white'}}>
          { user.birthdate ? `${user.birthdate} ` : "no birthdate"}
          {/* Convert Deparment NUM to STRING */}
          { user.department ? user.department : "no department"}
         </Text>
         </View>
      </View>
    );
};

export default ProfileCard;