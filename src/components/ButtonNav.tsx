import { View, Text } from 'react-native';

const TopNav = ({nav1, nav2}) => {

  return (
    <View style={{ paddingTop: 12, paddingHorizontal: 10, height: '10vh', width: '100vw' }}>
    <View style={{display: 'flex'}}>

    <Text>{nav1}</Text>
    <Text>{nav2}</Text>

    </View>

    
    </View>
  );
};

export default TopNav;