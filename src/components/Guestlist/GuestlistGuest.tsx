import { View, Text } from "react-native";
import React from "react";
// Card used to display each individual Guest Profile on the Browse and Guestlist Screens
import Loading from "../Loading";
const GuestlistGuest = ({item, setGuest, guest}) => {

// item = guest_id 
// used to find the guest profile
  // const [guest, setGuest] = React.useState()

  const [loading, setLoading] = React.useState(true)

  React.useEffect(() => {
    // "item" is the guest_id being passed from GuestlistInvite
    getGuest(item)
  }, [loading, item])

  const getGuest = async (item) => {
    try {
    // setInvite(item)
    let response = await fetch(`https://realm-dj-34ezrkuhla-ew.a.run.app/api/invite/v1/guestlist/guest/${item}/`);
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

        ) : <Loading/>)
};

export default GuestlistGuest;

