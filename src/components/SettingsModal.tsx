import Modal from 'react-native-modal'
import { Button, Alert, Pressable } from 'react-native'
import { deleteAccountButtonPress } from '../../analytics.native';
import { Text, View } from '../../components/Themed';

import CancelSVG from '../assets/images/cancel.svg'

import { useFonts } from 'expo-font';

export default function SettingsModal({ isModalVisible, handleModal, setIsModalVisible }) {

    const [fontsLoaded] = useFonts({
        'Mulish-Bold': require('../assets/fonts/Mulish-Bold.ttf'),
        'Plus-Jakarta-Sans-Bold': require('../assets/fonts/PlusJakartaSans-Bold.ttf'),
    })
    //Add Delete Account Function
  const deleteAccount = async () => {
    try {
      console.log("Reached deleteAccount!");
      let response = await fetch(
        `https://realm-dj-34ezrkuhla-ew.a.run.app/api/user/v1/delete/${authUserId}`,
        {
          method: "DELETE"
        }
      );
    deleteAccountButton()

    } catch (error) {
      console.error(error);
    }
    Alert.alert(
          `Account Deleted! Sign Out to go back to Log In screen`
    );
  }

const deleteAccountButton = async () => {
    try {
        await deleteAccountButtonPress()
    } catch (error) {
        console.log(error)
    }
}

    //Display Modal with Button to invoke Delete Account Function
    return (
        <Modal isVisible={isModalVisible} >
            <View style={{display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', backgroundColor: '#FFFFFF00', height: '15%'}}>
              
             
              <Pressable onPress={deleteAccount} style={{backgroundColor: '#ffffff', width: 335, height: 50, borderTopLeftRadius: 15, borderTopRightRadius: 15, display: 'flex', flexDirection: 'row', justifyContent: 'center', alignItems: 'center'}}>
                  <Text style={{color: '#1B1B22', fontSize: 16, fontFamily: 'Mulish-Bold', alignSelf: 'center'}}>Delete Account</Text>
              </Pressable>
              <View style={{backgroundColor: '#D1D1DB', height: 1, width: 335}}></View>
               <View style={{height: 50, width: 335, borderBottomLeftRadius: 15, borderBottomRightRadius: 15, backgroundColor: '#FFFFFF', display: 'flex', flexDirection: 'row', justifyContent: 'center', alignItems: 'center'}}>
                {/* <View></View> */}
                {/* <Text style={{color: '#1B1B22', fontSize: 18, fontFamily: 'Mulish-Bold', alignSelf: 'center'}}>
                  Settings
                </Text> */}
                <Pressable onPress={handleModal}>
                    <Text style={{color: '#D1D1DB'}}>Exit</Text>
                </Pressable>
              </View>
            </View>
        </Modal>

        //Make a header on the Settings Modal 
        //that says "Settings" 
        //and add on the right corner of the header: Cancel button
    )
}