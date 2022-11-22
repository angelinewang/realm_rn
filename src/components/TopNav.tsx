import { View, Text } from 'react-native';
import './TopNav.css';
import ButtonNav from './ButtonNav';

const TopNav = ({nav1, nav2}) => {

  return (
    <View style={{ paddingTop: 12, paddingHorizontal: 10, height: '10vh', width: '100vw' }}>
    <View style={{display: 'flex'}}>

    <ButtonNav props={nav1}/>
    <ButtonNav />

    </View>

    
    </View>
  );
};

export default TopNav;