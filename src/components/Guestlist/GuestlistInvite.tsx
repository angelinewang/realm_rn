import { View, Text, ImageBackground } from "react-native";
import React from "react";
import Loading from "../Loading";

const GuestlistInvite = ({item}) => {
  //States
  const [guest, setGuest] = React.useState(null)
  const [loading, setLoading] = React.useState(true)
  const [department, setDepartment] = React.useState("")
  const [age, setAge] = React.useState<Number | undefined>(0)

  //API Call to get guest information based on Guest Id from item
  const getGuest = async (item) => {
    try {
      let response = await fetch(`https://realm-dj-34ezrkuhla-ew.a.run.app/api/invite/v1/guestlist/guest/${item.guest_id_id}/`);
      let json = await response.json();
      setGuest(json)
      console.log(json)

      //If guest state is set:
      //Convert birthdate into age 
      //&& Determine department of the guest based on the department integer
      if (guest) {
        //Convert birthdate of the guest into age
        const date = guest?.birthdate?.slice(0, 10);
        const dob = new Date(date);
        const month_diff = Date.now() - dob.getTime()
        const age_dt = new Date(month_diff);
        const year = age_dt.getUTCFullYear();
        const finalAge = Math.abs(year - 1970)
        //Set the age calculated from the birthdate to the age state
        setAge(finalAge)
        
        //Determine the department of the guest based on the department integer
        //&& set the department state to the determined department string name
        switch(guest?.department) {
          case 0:
            setDepartment('No Department')
            setLoading(false)
            break;
          case 1: 
            setDepartment('Arts/Humanities')
            setLoading(false)
            break;
          case 2:
            setDepartment('Business')
            break;
          case 3:
            setDepartment('Dentistry')
            setLoading(false)
            break;
          case 4:
            setDepartment('Engineering')
            setLoading(false)
            break;
          case 5:
            setDepartment('Law')
            setLoading(false)
            break;
          case 6:
            setDepartment('Medic/Life Sciences')
            setLoading(false)
            break;
          case 7:
            setDepartment('Natural Sciences')
            setLoading(false)
            break;
          case 8:
            setDepartment('Nursing')
            setLoading(false)
            break;
          case 9: 
            setDepartment('Psych/Neuroscience')
            setLoading(false)
            break;
          case 10: 
            setDepartment('Social Sciences')
            setLoading(false)
            break;
        }
      }
    } catch (error) {
      console.error(error);
    }
  }

  //Each invite has a different guest, so for each invite, one inviteCard and one guestCard needs to be rendered
  React.useEffect(() => {
    getGuest(item)

    //If guest state is set:
    //Then set loading to false and remove loading screen
    if (guest) {
      setLoading(false)
    }
  }, [loading, item, age, department, guest]
  )

  return ( guest ? (
    <View style={{ flex: 1, flexDirection: 'column', marginTop: 20, marginHorizontal: 20, borderRadius: 20, height: 563}}>
      <ImageBackground style={{flex:1, justifyContent: 'center'}} imageStyle={{borderRadius: 20}} source={{uri: guest.profile_picture}}>
        <View style={{ flex: 1, flexDirection: 'column', marginTop: 20, marginHorizontal: 20, borderRadius: 20, height: 563}}>
          <View style={{flex: 1, padding: 30, height: "10%", justifyContent: "flex-end"}}>
            {/* In the past: GuestlistGuest component was used to display guest information */}
            {/* But now: Guest information is being directly rendered onto GuestlistInvite with the invite information */}
            {/* <GuestlistGuest item={guest} setGuest={setGuest} guest={guest}/> */}
            <Text style={{ fontSize: 28, color: 'white', fontWeight: 'bold'}}>
              {guest?.name ? guest.name : "No Name"}
            </Text>
            <Text style={{ fontSize: 18, color: 'white'}}>
              { guest?.birthdate ? `${age} ` : "No Birthdate"}
              {/* Convert Deparment NUM to STRING */}
              { guest?.department ? department : "No Department"}
            </Text>
                  
            {/* <Text>GUEST INFO</Text> */}
            {/* Invite Response Information */}

            {/* RO DO: Add back --> Display number of plus-ones */}
            {/* <Text style={{ fontSize: 18, color: 'white', fontWeight: 'bold'}}>
            {item.plus_ones ? `is bringing ${item.plus_ones} +1s` : "no plus-ones"}
            </Text> */}

            {/* DEV Purposes: To see the state of the invite */}
            {/* <Text style={{ fontSize: 18, color: 'white', fontWeight: 'bold'}}>
            {item.status ? item.status : "Invited"}
            </Text> */}
          </View>
        </View>
      </ImageBackground>
    </View>
  ) : <Loading/>
  )
};

export default GuestlistInvite;