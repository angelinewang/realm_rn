import Modal from 'react-native-modal'
import { Button, Alert } from 'react-native'
import { deleteAccountButtonPress } from '../../analytics.native';

export default function SettingsModal({ isModalVisible, handleModal, setIsModalVisible }) {
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
        <Modal isVisible={isModalVisible}>
            <Button title="Delete Account" onPress={deleteAccount}/>
        </Modal>
    )
}