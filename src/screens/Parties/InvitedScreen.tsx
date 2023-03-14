import { SafeAreaView, FlatList } from 'react-native';

import { useIsFocused } from '@react-navigation/native';
import React from 'react';
import InvitePartyCard from '../../components/Card/InvitePartyCard';
import Loading from '../../components/Loading';
import { useAuth } from '../../contexts/Auth';

import { invitedScreenView } from '../../../analytics.native';

const InvitedScreen = () => {  
  //Grab User Id from Auth Context
  const {authUserId} = useAuth()

  const isFocused = useIsFocused()

  //States
  const [parties, setParties] = React.useState()
  const [loading, setLoading] = React.useState(Boolean)

  React.useEffect(() => {
      console.log(authUserId)

      // Current there is a bug, so need to comment out token section for Browse, Guestlist, Invited, and Confirmed BEFORE attempting to sign in 

      // Extract the UserId from the sub property of the decoded object

      // Get user profile information from API by passing in the UserId found through decoded token 
      
      getParties(authUserId)

      //Screen View Analytics
      screenView()
  }, [loading, authUserId, isFocused])

    const screenView = async () => {
      try {
          await invitedScreenView()
      } catch (error) {
          console.log(error)
      }
    }

const getParties = async (authUserId) => {
// If the authUserId has been set, then get parties

  try { 
    // Invites should only get the ones in the future
    // Currently Bob should have 5 Invites: 3 in the future, 2 in the past
    
    let response = await fetch(`https://realm-dj-34ezrkuhla-ew.a.run.app/api/invite/v1/parties/invited/${authUserId}`);
    let json = await response.json();
    // Current expected response:
    // [{"id":1,"created_at":"2022-11-26T00:00:01Z","updated_at":"2022-11-26T00:00:01Z","party_id":9,"guest_id":1,"status":0,"plus_ones":null}]
    setParties(json)

    console.log(json)

    if (parties) {
      setLoading(false)
    }
  }
  catch (error) {
    console.error(error);
  }
}

// 1. Get Parties whose first entry is less than 12 hours past 
// 2. Only send back parties with relevant first entries from the backend 
// 3. Test Invited API on Postman
// 4. Test Confirmed API on Postman

const partyCard = ({item}) => {
  return (
    <InvitePartyCard item={item}/>
  )
};

return (
<> 
{
   isFocused ? (parties ? (
    <SafeAreaView style={{ flex: 1, flexDirection: 'column', }}>
      <FlatList data={parties} renderItem={partyCard} keyExtractor={item => item.id}/>
    </SafeAreaView>
    ) : <Loading/>
    ) : null
}
</>
  );
};

export default InvitedScreen;