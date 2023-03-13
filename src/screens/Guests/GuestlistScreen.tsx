import { SafeAreaView, Text, FlatList } from 'react-native';
import Loading from '../../components/Loading';
import React from 'react';
import GuestlistInvite from '../../components/Guestlist/GuestlistInvite';
import { useAuth } from '../../contexts/Auth';
import { useIsFocused } from '@react-navigation/native';
import { roleService } from '../../services/roleService';

import { guestlistScreenView } from '../../../analytics.native';

const GuestlistScreen = ({isModalVisible}) => {
  // Set the authUserId to the Authenticated User ID 
  const {authUserId} = useAuth()

  const isFocused = useIsFocused()

  //States
  const [invites, setInvites] = React.useState()
  const [loading, setLoading] = React.useState(true)
  const [userRole, setUserRole] = React.useState()
  const [passedLastEntry, setPassedLastEntry] = React.useState()
  const [renderInvites, setRenderInvites] = React.useState(<></>)

  React.useEffect(() => {

    // Analytics.logEvent('screen_view', {
    //   firebase_screen: "Guestlist"
    // })

    console.log("Reached Guestlist UseEffect")

    // Grab token value from authData

    // Extract the UserId from the sub property of the decoded object

    // Get user profile information from API by passing in the UserId found through decoded token 

    roleService.getRole(authUserId, setUserRole, passedLastEntry, setPassedLastEntry)

    console.log(userRole)

    if (userRole == 0) {
      setInvites("No Party")
      debugger
    } else if (userRole == 1) {
      getPartyAndInvites(authUserId)
    }

    screenView()
  }, [loading, authUserId, userRole, isFocused, isModalVisible, renderInvites]
)

    const screenView = async () => {
        //Use this exact same syntax to send all the different screen views

        // if (typeof window !== 'undefined') {
            try {
                await guestlistScreenView()
            } catch (error) {
                console.log(error)
            }
            
        // }
    }

// Get party by host_id

// This page is working

// Get party and invites at same time and only find the party with the host and then find the invites with that party id
  
const getPartyAndInvites = async (authUserId) => {
  try {
    // Get Party using User_id
    let response = await fetch(`https://realm-dj-34ezrkuhla-ew.a.run.app/api/invite/v1/guestlist/${authUserId}/`);
    let json = await response.json();
    setInvites(json)
    // setLoading(false)
    console.log(invites)
    console.log("Reached Get Party And Invites Function")

    if (loading == true && invites == "No Party") {
      console.log("Reached no party inside renderInvites")
      setRenderInvites(<Text>{invites}</Text>)
      setLoading(false)
    }

    else if (loading == true && invites) {
      console.log("Reached else if for renderInvites")
      console.log(renderInvites)
      setRenderInvites(
      <SafeAreaView style={{ flex: 1, flexDirection: 'column', }}>
        <FlatList data={invites} renderItem={inviteCard} keyExtractor={item => item.id}/>
      </SafeAreaView>
      )
      setLoading(false)
    }
  } catch (error) {
    console.error(error);
  }
}

const inviteCard = ({item}) => {
  console.log("Reached inviteCard function")
  return (
    <GuestlistInvite item={item}/>
  )
};

//Must add condition that renderInvites is at initial state or else the page renders infinitely
  
//const renderInvitesFunction = () => {

//}

return (
  <>
  {
    isFocused ? (
      invites ? 
      <>
        {renderInvites}
      </>
      : <Loading/>
    ) : null
  }
  </>
)
}

export default GuestlistScreen;

// return (   
//     // After Invites API is called, invites are not set and the page does not escape loading 

//       <>
//        { isFocused ? (invites ? { 
//         if (invites == "No Party") {
//   // return (
//     <Text>You don't have a party</Text>
//   // )
// }
// else {
  
//           <SafeAreaView style={{ flex: 1, flexDirection: 'column', }}>

//             <FlatList data={invites} renderItem={inviteCard} keyExtractor={item => item.id}/>

//           </SafeAreaView>
  
//         ) : <Loading/>) : null

//        }
      
//    }
//     </>

//     )
    
