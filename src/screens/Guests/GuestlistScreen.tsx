import { SafeAreaView, StyleSheet, View, Text, Pressable, FlatList } from 'react-native';
import Loading from '../../components/Loading';
import React from 'react';
import GuestlistInvite from '../../components/Guestlist/GuestlistInvite';
import { useAuth } from '../../contexts/Auth';
import { useIsFocused } from '@react-navigation/native';
import jwt_decode from 'jwt-decode';


const GuestlistScreen = () => {
  // Set the hostId to the Authenticated User ID 
  const [invites, setInvites] = React.useState()

  const {authData, signOut} = useAuth()

  const [hostId, setHostId] = React.useState()
  // const [decoded, setDecoded] = React.useState()

  const isFocused = useIsFocused()
  const [loading, setLoading] = React.useState(Boolean)

  const [userRole, setUserRole] = React.useState()

  // const [token, setToken] = React.useState("")
    // const logOut = async () => {
    //     await signOut()
    // }

  React.useEffect(
  () => {
      console.log(authData)
          // Current there is a bug, so need to comment out token section for Browse, Guestlist, Invited, and Confirmed BEFORE attempting to sign in 

      const token = authData?.token
      console.log(token)
      const decoded = jwt_decode(token)

      console.log(decoded)
      setHostId(decoded.sub)

      console.log("Reached Guestlist UseEffect")

      // Grab token value from authData
      // try {
      //     setToken(authData.token)
      //       console.log(token)
      //       setDecoded(jwt_decode(token))

      //       console.log(decoded)
      //       setHostId(decoded.sub)

      //       console.log(hostId)
      //     // valid token format
      //   } catch(error) {
      //     console.error(error)
      //     logOut()
      //   }

      // if (!token) {
      //   logOut()
      // }

      // Extract the UserId from the sub property of the decoded object

      // Get user profile information from API by passing in the UserId found through decoded token 

      getUserRole(hostId)
      console.log(userRole)

      if (userRole == 0) {
        setInvites("No Party")
      } else if (userRole == 1) {
        getPartyAndInvites(hostId)
      }
    
  }, [loading, hostId, userRole, isFocused]
)

// Get party by host_id

// This page is working

// Get party and invites at same time and only find the party with the host and then find the invites with that party id
  const getUserRole = async (hostId) => {
      try {
        let response = await fetch(`https://212a-193-61-207-186.eu.ngrok.io/api/user/v1/profile/${hostId}/`);
        let json = await response.json();
        setUserRole(json.role)
        console.log(userRole)
        console.log("Reached Get User Role Function")
        } catch (error) {
          console.error(error);
        }
  }
  
const getPartyAndInvites = async (hostId) => {
  try {
  // Get Party using User_id
  let response = await fetch(`https://212a-193-61-207-186.eu.ngrok.io/api/invite/v1/guestlist/${hostId}/`);
  let json = await response.json();
  setInvites(json)
  console.log(invites)
  console.log("Reached Get Party And Invites Function")
  }
  catch (error) {
    console.error(error);
  }
}

  const inviteCard = ({item}) => {
    return (
      <GuestlistInvite item={item}/>
    )
  };


if (invites == "No Party") {
  return (
    <Text>You don't have a party</Text>
  )
}

else {
    return (   
        isFocused ? (invites ? (
          <>
                      <FlatList data={invites} renderItem={inviteCard} keyExtractor={item => item.id}/>
          </>
          // <SafeAreaView style={{ flex: 1, flexDirection: 'column', }}>
          // </SafeAreaView>
        ) : <Loading/>) : null
      
    )
}
    

    
  
};

export default GuestlistScreen;
