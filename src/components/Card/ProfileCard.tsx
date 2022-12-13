import { View, Text, ImageBackground, Button } from "react-native";
import React from "react";
import Loading from "../Loading";
import { useIsFocused } from '@react-navigation/native';
import * as ImagePicker from 'expo-image-picker';
import { useAuth } from "../../contexts/Auth";

// Card used to display each individual Guest Profile on the Browse and Guestlist Screens

const ProfileCard = ({user}) => {

  const {authUserId} = useAuth()

const isFocused = useIsFocused()
const [image, setImage] = React.useState(user.profile_picture);

    const pickImage = async () => {
        // No permissions request needed to launch image library 
        try {
            let result = await ImagePicker.launchImageLibraryAsync({
            mediaTypes: ImagePicker.MediaTypeOptions.All,
            allowsEditing: true, 
            aspect: [4, 3],
            quality: 1,
            // base64: true, 
            // allowsEditing: false, 
            // aspect: [4, 3],
        })

        console.log('image', result.assets[0]);

        if(!result.canceled) {
            // setImage(result.assets[0].uri);
            setImage(result.assets[0].uri)

            // let base64 = result.assets[0].base64
            // setImage({base64: base64, fileExtension: 'jpg'
                
            // })

            // 1. Add File Extension to Image

            // set
        }
    } catch(error) {
        console.error
    }
    }

const uploadImage = async () => {
  try {
    console.log("Reach uploadImage!");

    console.log(image);

    let formData = new FormData();
    formData.append("profile_picture", image);

    let response = await fetch(
      `https://4c33-193-61-207-186.eu.ngrok.io/api/user/v1/updatephoto/${authUserId}/`,
      {
        method: "PATCH",
        headers: {
          "Content-Type": "multipart/form-data",
          // Accept: "multipart/form-data",
        },
        body: formData,
      }
    );
    return response.json();
  } catch (error) {
    console.error(error);
  }
};


  React.useEffect(
  () => {
    console.log("Reached Profile Card")
    console.log(user)

  }, [user, image]
  )

  return (
  <> 
{
   isFocused ? ( user ? (
    <View style={{ flex: 1, flexDirection: 'column', marginTop: 20, marginHorizontal: 20, borderRadius: 20, height: 563}}>
      {/* Setting the uri to "image" does not work */}
      <ImageBackground style={{flex:1, justifyContent: 'center'}} imageStyle={{borderRadius: 20}} source={{uri: image}} >
        {/* <Pressable style={{ flex: 1, flexDirection: 'column', marginTop: 20, marginHorizontal: 20, borderRadius: 20, height: 563}} onPress={pickImage}> */}
      <View style={{ flex: 1, flexDirection: 'column', marginTop: 20, marginHorizontal: 20, borderRadius: 20, height: 563}}>
      <View style={{flex: 1, padding: 30, height: "10%", justifyContent: "flex-end"}}>
      {/* <Image style={{height: '10%'}} source={{uri: user.profile_picture}}/> */}
      <Text style={{ fontSize: 28, color: 'white', fontWeight: 'bold'}}>
        {user.name ? user.name : "no name"}
        </Text>
        <Text style={{ fontSize: 18, color: 'white'}}>
        { user.birthdate ? `${user.birthdate} ` : "no birthdate"}
        {/* Convert Deparment NUM to STRING */}
        { user.department ? user.department : "no department"}
        </Text>
        </View>
        </View>
        {/* </Pressable> */}
        <Button title="Pick an image from camera roll" onPress={pickImage}/>
        <Button title="Update Profile Photo" onPress={uploadImage}/>
        </ImageBackground>
    </View>
    ) : <Loading/>) : null
}
</>

// 1. DONE - Add ImageBackground to cards in Invited, Confirmed, Browse, and Guestlist
// 2. Allow user to upload profile picture through profile page
  // a. Create backend API to patch profile_picture 
  // b. Add same logic for signup photo upload to profile card
  );
};

export default ProfileCard;