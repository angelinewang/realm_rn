import { View, Text } from "react-native";
import React from "react";

// Card used to display each individual Guest Profile on the Browse and Guestlist Screens

const ProfileCard = ({user}) => {

  React.useEffect(
  () => {
    console.log("Reached Profile Card")
    console.log(user)
  }, [user]
  )

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