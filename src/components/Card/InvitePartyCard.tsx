import { View, Text, Pressable, ImageBackground } from "react-native";
import React from "react";
import HostCard from "./HostCard";
import Loading from "../Loading";
import ConfirmSVG from '../../assets/images/confirm.svg'

import { confirmButtonPress } from "../../../analytics.native";

//MODE: Guest
//TAB: Parties
const InvitePartyCard = ({item}) => {
  //States
  const [party, setParty] = React.useState()
  const [invite, setInvite] = React.useState(item)
  const [confirm, setConfirm] = React.useState()
  const [host, setHost] = React.useState()
  const [vibe, setVibe] = React.useState('')
  const [firstEntryDate, setFirstEntryDate] = React.useState('')
  const [firstEntryTime, setFirstEntryTime] = React.useState('')

  const [address, setAddress] = React.useState()
  //On load of component get the party information using the invite state set to the item
  //Using the Party ID attached to the invite state
  React.useEffect( () => {
      getParty()
      //Allocate the vibe of the party according to the associated integer
      // if (party) {
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

        //Date and Time extracted from JSON: 
        //Resource: https://weblog.west-wind.com/posts/2014/jan/06/javascript-json-date-parsing-and-real-dates
        const dateStr = party?.first_entry;
        console.log(dateStr)

        const date = new String(new Date(dateStr));
        console.log(date)

        const partyDate = date?.slice(0, 10);
        const partyTime = date?.slice(16, 21);

        //Set the states for the first entry date of the party 
        //and the first entry time of the party
        setFirstEntryDate(partyDate)
        setFirstEntryTime(partyTime)

        setAddress(party?.flat)

        console.log(`Flat: ${party?.flat}`)
      // }
    }, [item, host, vibe, firstEntryDate, firstEntryTime, address]
  )
  
  //Call API to get the party information based on the party id attached to the invite state
  //&& set to the party state
  const getParty = async () => {
    try {
    let response = await fetch(`https://realm-dj-34ezrkuhla-ew.a.run.app/api/invite/v1/parties/party/${invite.party_id_id}/`);
    let json = await response.json();
    setParty(json)

    console.log(json)
    } catch (error) {
      console.error(error);
    }
  }

  const handleConfirmation = async () => {
    console.log("CONFIRM button pressed!")

    //Call confirm API with the Invite Id attached to the invite state
    confirmAttend();
  }

  //FUNCTION: Takes in the invite_id as params
  //&& changes the status of the invite to 1 from 0 
  //Invite Id received in backend through body of POST request fields
  const confirmAttend = async () => {
      //Button Press Analytics
      confirmButton()
    try {
      console.log("INVITE CONFIRMED:")
      console.log(invite.id)

      //TASKS COMPLETED:
      //1. Check that the CONFIRM button is showing DONE
      //2. Move CONFIRM button to correct position 
      //3. Change the SVG on the CONFIRM button to be checkmark from Figma
      //4. Finalise API to CONFIRM 
      //5. Connect the API to this frontend page

      let response = await fetch(
        `https://realm-dj-34ezrkuhla-ew.a.run.app/api/invite/v1/confirm/${invite.id}/`,
        {
          method: "PATCH",
          headers: {
            "Content-Type": "application/json",
            Accept: "application/json",
          },
        }
      );

      console.log("Reached end Confirm Invite Promise")
      console.log(response.json())

      //TO DO: Below does not seem to be in use
      //Set createInvite to the API response
      //in order to trigger page to re-render through useEffect props
      setConfirm(response.json())
    } catch(error) {
      console.error
    }
  }

    const confirmButton = async () => {
      try {
          await confirmButtonPress()
      } catch (error) {
          console.log(error)
      }
    }


  return (
    party ? (
    <View style={{marginTop: 20, marginHorizontal: 20, borderRadius: 20, height: 563}}>
      <ImageBackground style={{flex:1, justifyContent: 'center'}} imageStyle={{borderRadius: 20}} source={{uri: host?.profile_picture}}>
        <View style={{marginTop: 20, marginHorizontal: 20, borderRadius: 20, height: 563}}>
          {/* Host Information */}
          <HostCard item={party.host_id} host={host} setHost={setHost}/>
          {/* Party Information */}
          {/* <View style={{display: "flex", flexDirection: "row"}}>
          <View style={{flex: 1, flexDirection: 'column', padding: 30, height: "10%", justifyContent: "flex-end"}}>
          <View style={{flex: 1, padding: 30, height: "10%", justifyContent: "flex-end"}}> */}
          <View style={{ display: 'flex', flexDirection: 'row'}}>
            
            <View style={{ flex: 1, flexDirection: 'column'}}>
              <View style={{flex: 1, padding: 30, height: "10%", justifyContent: "flex-end"}}>
                <Text style={{ fontSize: 24, color: 'white', fontWeight: 'bold'}}>
                {party.first_entry ? `${firstEntryDate} ${firstEntryTime}` : "No First Entry"}
                </Text>

                <Text style={{ fontSize: 16, color: 'white', fontWeight: 'bold'}}>
                {party.flat ? `${address}` : "No Address"}
                {/* Datetime received from backend in JSON format, and then converted into human readable format to be displayed */}
                </Text>

                <Text style={{ fontSize: 16, color: 'white'}}>
                {party.vibe ? `${vibe} ` : "No Vibe "}
                {/* Convert Deparment NUM to STRING */}
                {/* Below plus_ones set to a custom input field */}
                {/* {invite.plus_ones ? item.plus_ones: "no plus-ones"} */}
                </Text>
              </View>
            </View>

            <View style={{display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'flex-end', margin: 25}}>  
              <Text style={{color: '#4abbff', fontWeight: 'bold', fontSize: 14}}>
                ACCEPT
              </Text>
              <Pressable onPress={handleConfirmation} style={{backgroundColor: 'white', borderRadius: 100, width: 65, height: 65, display: 'flex', alignItems: 'center', justifyContent: 'center'}}>
                <ConfirmSVG height={65} width={65} fill='#4abbff'/>
              </Pressable>
            </View>
          </View>
        </View>
      </ImageBackground>
    </View> 
    ) : <Loading />
  ) 
};

export default InvitePartyCard;