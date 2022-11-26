import { View, Text } from "react-native";
import React from "react";

// Card used to display each individual Guest Profile on the Browse and Guestlist Screens

const GuestCard = ({item}) => {
    return (
      <View style={{ flex: 1, flexDirection: 'column', backgroundColor: "#4abbff", marginTop: 20, marginHorizontal: 20, borderRadius: 20, height: 563}}>
        <View style={{flex: 1, padding: 30, height: "10%", justifyContent: "flex-end"}}>
        <Text style={{ fontSize: 28, color: 'white', fontWeight: 'bold'}}>
          {item.name ? item.name : "no name"}
          </Text>
          <Text style={{ fontSize: 18, color: 'white'}}>
          { item.birthdate ? `${item.birthdate} ` : "no birthdate"}
          {/* Convert Deparment NUM to STRING */}
          {item.department ? item.department: "no department"}
         </Text>
         </View>
      </View>
    );
};

export default GuestCard;