import { View, Text, Button } from 'react-native';
import React from 'react';

import { useAuth } from '../../contexts/Auth';
import ProfileCard from '../../components/Card/ProfileCard';


// const DATA = 
//   {
//     id: 1,
//     name: 'Angeline Wang',
//     birthdate: '2002-02-10',
//     department: 'Law',
//     profile_picture: '../../assets/profile_pictures/test1.jpg'
//   };

const ViewScreen = () => {

  const [user, setUser] = React.useState({id: 2})

  React.useEffect(() => {
    getUser()
  }, [])

  const getUser = async () => {
      try {
        let response = await fetch(`https://4ee1-193-61-207-166.eu.ngrok.io/api/user/v1/profile/${user.id}`);
        let json = await response.json();
        setUser(json)
        console.log(json)
      }
      catch (error) {
          console.error(error);
      }
  }

const auth = useAuth();
  return (
    <View style={{ flex: 1, paddingTop: 12, paddingHorizontal: 10 }}>
    {/* <Text>{user.name}</Text>
    <Text>{user.birthdate}</Text>
    <Text>{user.department}</Text> */}
    <ProfileCard item={user}/>
    <Button title="Log Out" onPress={auth.signOut}/>
    </View>
  );
};

export default ViewScreen;