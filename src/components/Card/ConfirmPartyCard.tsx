import { View, Text, ImageBackground } from "react-native";
import React from "react";
import HostCard from "./HostCard";
//HostCard remains same for both Invite and Confirm Party Cards
import Loading from "../Loading";

const ConfirmPartyCard = ({item}) => {

  const [party, setParty] = React.useState()
  const [invite, setInvite] = React.useState(item)
  const [host, setHost] = React.useState()
  const [vibe, setVibe] = React.useState('')
  const [firstEntryDate, setFirstEntryDate] = React.useState('')
  const [firstEntryTime, setFirstEntryTime] = React.useState('')

  React.useEffect(
  () => {
    
    getParty(invite)

     if (party) {
        switch(party?.vibe) {
      case 0:
        setVibe('No Vibe')
        break;
      case 1: 
        setVibe('Chill: 5-10 People')
        break;
      case 2:
        setVibe('Party: 20-30 People')
        break;
      case 3:
        setVibe('Rager: 50+ People')
        break;
    }

    const dateStr = party?.first_entry;
    console.log(dateStr)

    const date = new String(new Date(dateStr));
    console.log(date)

    const partyDate = date?.slice(0, 10);
    const partyTime = date?.slice(16, 21);

    setFirstEntryDate(partyDate)
    setFirstEntryTime(partyTime)

    }
  }, [item, host, vibe, firstEntryDate, firstEntryTime]
)

const getParty = async (invite) => {
  try {
  let response = await fetch(`https://realm-dj-34ezrkuhla-ew.a.run.app/api/invite/v1/parties/party/${invite.party_id_id}/`);
  let json = await response.json();
  setParty(json)
  console.log(json)
  }
  catch (error) {
    console.error(error);
  }
}

return (

  party ? ( 

<View style={{ flex: 1, flexDirection: 'column', marginTop: 20, marginHorizontal: 20, borderRadius: 20, height: 563}}>
  {/* Add the ternary before calling profile picture solved issue of not having the host object */}
  <ImageBackground style={{flex:1, justifyContent: 'center'}} imageStyle={{borderRadius: 20}} source={{uri: host?.profile_picture}}>
<View style={{ flex: 1, flexDirection: 'column', marginTop: 20, marginHorizontal: 20, borderRadius: 20, height: 563}}>

  {/* Host Information */}
  <HostCard item={party.host_id} host={host} setHost={setHost}/>
  {/* Party Information */}
  <View style={{flex: 1, padding: 30, height: "10%", justifyContent: "flex-end"}}>
    <Text style={{ fontSize: 28, color: 'white', fontWeight: 'bold'}}>
    {party.first_entry ? `${firstEntryDate} ${firstEntryTime}` : "No First Entry"}
    </Text>
    <Text style={{ fontSize: 18, color: 'white'}}>
    {party.vibe ? `${vibe} ` : "No Vibe "}
    {/* Convert Deparment NUM to STRING */}
    {/* Below is the user's plus-ones submission upon confirming*/}
    {/* Plus-ones temporarily disabled since it is not possible to send plus-ones with invite acceptance yet */}
    {/* {invite.plus_ones ? item.plus_ones: "No Plus-ones"} */}
    </Text>
  </View>
  </View>
  </ImageBackground>
</View> 
  ) : <Loading />

)
    
};

export default ConfirmPartyCard;