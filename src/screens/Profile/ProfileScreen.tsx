import { View, Text, Button } from 'react-native';
import React from 'react';

import { useAuth } from '../../contexts/Auth';

const DATA = 
  {
    id: 1,
    name: 'Angeline Wang',
    birthdate: '2002-02-10',
    department: 'Law',
    profile_picture: '../../assets/profile_pictures/test1.jpg'
  };

const ProfileScreen = () => {
const auth = useAuth();
  return (
    <View style={{ flex: 1, paddingTop: 12, paddingHorizontal: 10 }}>
    
    <Text>{DATA.name}</Text>
    <Text>{DATA.birthdate}</Text>
    <Text>{DATA.department}</Text>
    <Button title="Log Out" onPress={auth.signOut}/>
    </View>
  );
};

export default ProfileScreen;