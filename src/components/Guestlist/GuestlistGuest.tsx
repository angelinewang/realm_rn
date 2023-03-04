// This component was used within GuestlistInvite to display Guest information
// But has been removed and directly added into GuestlistInvite instead
// Because of error loading guest age and department

import { View, Text } from "react-native";
import React from "react";
// Card used to display each individual Guest Profile on the Browse and Guestlist Screens
import Loading from "../Loading";
const GuestlistGuest = ({item, setGuest, guest}) => {

// item = guest_id 
// used to find the guest profile
  // const [guest, setGuest] = React.useState()

  const [loading, setLoading] = React.useState(true)

  const [department, setDepartment] = React.useState("")
  const [age, setAge] = React.useState<Number | undefined>(0)

  React.useEffect(() => {
    // "item" is the guest_id being passed from GuestlistInvite
    getGuest(item)
  }, [loading, item, age, department])

  const getGuest = async (item) => {
    try {
      //API call to get guest information based on Guest Id from item
      let response = await fetch(`https://realm-dj-34ezrkuhla-ew.a.run.app/api/invite/v1/guestlist/guest/${item}/`);
      let json = await response.json();
      setGuest(json)
      console.log(json)
      if (guest) {
        //Remove Loading state from the screen and render the guest information if guest state is set
        setLoading(false)

        //Convert guest birthdate to age
        const date = guest?.birthdate?.slice(0, 10);
        const dob = new Date(date);
        const month_diff = Date.now() - dob.getTime()
        const age_dt = new Date(month_diff);
        const year = age_dt.getUTCFullYear();
        const finalAge = Math.abs(year - 1970)
        //Use calculated age to set the age of the guest in the state
        setAge(finalAge)
          
        //Determine department of the guest based on the department integer 
        //&& set the department state to the determined department string name
        switch(guest?.department) {
          case 0:
            setDepartment('No Department')
            break;
          case 1: 
            setDepartment('Arts/Humanities')
            break;
          case 2:
            setDepartment('Business')
            break;
          case 3:
            setDepartment('Dentistry')
            break;
          case 4:
            setDepartment('Engineering')
            break;
          case 5:
            setDepartment('Law')
            break;
          case 6:
            setDepartment('Medic/Life Sciences')
            break;
          case 7:
            setDepartment('Natural Sciences')
            break;
          case 8:
            setDepartment('Nursing')
            break;
          case 9: 
            setDepartment('Psych/Neuroscience')
            break;
          case 10: 
            setDepartment('Social Sciences')
            break;
        }
      }
    } catch (error) {
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
        { guest.birthdate ? `${age} ` : "No Birthdate"}
        {/* Convert Deparment NUM to STRING */}
        { guest.department ? department : "No Department"}
      </Text>
    </>
  ) : <Loading/>
  );
};

export default GuestlistGuest;

