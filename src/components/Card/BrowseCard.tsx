import { View, Text } from "react-native";
import React from "react";
import Loading from "../Loading";
// Card used to display each individual Guest Profile on the Browse and Guestlist Screens

const BrowseCard = ({item}) => {
// Called on User

const [guest, setGuest] = React.useState()

const [loading, setLoading] = React.useState(true)
  React.useEffect(
  () => {
    console.log(`Item is ${item}`)
    console.log(item)
    getGuest(item)
  }, [item, loading]
)

const getGuest = async (item) => {
  try {
  // setInvite(item)
  // What's being based through as "item" is already the user, so just call id on "item"
  let response = await fetch(`https://3c6c-193-61-207-186.eu.ngrok.io/api/user/v1/profile/${item.id}/`);
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

    return (
guest ? (
      
      <View style={{ flex: 1, flexDirection: 'column', backgroundColor: "#4abbff", marginTop: 20, marginHorizontal: 20, borderRadius: 20, height: 563}}>
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
      </View>  ) : <Loading />
    );
};  

export default BrowseCard;