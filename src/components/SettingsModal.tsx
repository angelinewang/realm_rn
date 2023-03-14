import Modal from 'react-native-modal'
import { Button, Alert, Pressable } from 'react-native'
import { deleteAccountButtonPress } from '../../analytics.native';
import { Text, View } from '../../components/Themed';

import { useFonts } from 'expo-font';

export default function SettingsModal({ isModalVisible, handleModal, setIsModalVisible }) {

    const [fontsLoaded] = useFonts({
        'Mulish-Bold': require('../assets/fonts/Mulish-Bold.ttf'),
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
            <View style={{display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'space-around', backgroundColor: '#FFFFFF00', height: '15%'}}>
            <Pressable onPress={deleteAccount} style={{backgroundColor: '#ffffff', width: 335, height: 50, borderRadius: 15, display: 'flex', flexDirection: 'row', justifyContent: 'center', alignItems: 'center'}}>
                <Text style={{color: '#1B1B22', fontSize: 16, fontFamily: 'Mulish-Bold', alignSelf: 'center'}}>Delete Account</Text>
            </Pressable>

            <Pressable onPress={handleModal}>
                <Text>Cancel</Text>
            </Pressable>
            </View>

        </Modal>
    )
}