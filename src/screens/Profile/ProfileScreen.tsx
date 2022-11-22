import { View, Text } from 'react-native';

const DATA = 
  {
    id: 1,
    name: 'Angeline Wang',
    birthdate: '2002-02-10',
    department: 'Law',
    profile_picture: '../../assets/profile_pictures/test1.jpg'
  };

const ProfileScreen = () => {

  return (
    <View style={{ flex: 1, paddingTop: 12, paddingHorizontal: 10 }}>
    
    <Text>{DATA.name}</Text>
    <Text>{DATA.birthdate}</Text>
    <Text>{DATA.department}</Text>
    
    </View>
  );
};

export default ProfileScreen;