import { View, Alert, Text, ImageBackground, Button } from "react-native";
import React from "react";
import Loading from "../Loading";
import { useIsFocused } from '@react-navigation/native';
import * as ImagePicker from 'expo-image-picker';
import { useAuth } from "../../contexts/Auth";
import { getStorage, ref, uploadBytes, getDownloadURL } from "firebase/storage";
import { firebaseConfig } from '../../../firebaseConfig';
import { initializeApp } from "firebase/app";

// Card used to display each individual Guest Profile on the Browse and Guestlist Screens

initializeApp(firebaseConfig);

const ProfileCard = ({user}) => {

  const {authUserId} = useAuth()

const isFocused = useIsFocused()
const [image, setImage] = React.useState();

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

    const [imageURL, setImageURL] = React.useState()
    const [uploaded, setUploaded] = React.useState("none")

    const uploadImageAsync = async () => {

        console.log("Reached upload image sync")
    
        try {
          const storage = getStorage();

          const filename = image.substring(image.lastIndexOf('/')+1);
          const reference = ref(storage, filename);

          const downloadURL = await getDownloadURL(ref(storage, filename))
          
          console.log(downloadURL)

          // Sends the photo URL to db
          setImage(downloadURL)
          setImageURL(downloadURL)
          
          const img = await fetch(image)
          const bytes = await img.blob();

          // Uploads the photo to Firestore
          const uploadPhoto = await uploadBytes(reference, bytes)
                  
          setUploaded(uploadPhoto)

          let formData = new FormData();
    formData.append("profile_picture", downloadURL);

    let response = await fetch(
      `https://realm-dj-34ezrkuhla-ew.a.run.app/api/user/v1/updatephoto/${authUserId}/`,
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
        } catch (e) {
            console.log(e);
        }
        Alert.alert(
            `Photo uploaded..${uploaded}!!`
        );
    }

const uploadImage = async () => {
    let uploadedImage = await uploadImageAsync()
};

const sendImage = async (imageURL) => {
  try{
    let formData = new FormData();
    formData.append("profile_picture", imageURL);

    let response = await fetch(
      `https://realm-dj-34ezrkuhla-ew.a.run.app/api/user/v1/updatephoto/${authUserId}/`,
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
  }catch (error) {
    console.error(error);
  }
}

  React.useEffect(
  () => {
    console.log("Reached Profile Card")
    console.log(user)
  }, [user]
  )

  return (
  <> 
{
   isFocused ? ( user ? (

    <View style={{ flex: 1, flexDirection: 'column', marginTop: 20, marginHorizontal: 20, borderRadius: 20, height: 563}}>
      {/* Setting the uri to "image" does not work */}
      <ImageBackground style={{flex:1, justifyContent: 'center'}} imageStyle={{borderRadius: 20}} source={{uri: image ? image : user.profile_picture}} >

      {/* <ImageBackground style={{flex:1, justifyContent: 'center'}} imageStyle={{borderRadius: 20}} source={{uri: "https://firebasestorage.googleapis.com/v0/b/realm-rn-dj.appspot.com/o/2DBF30EB-9378-4004-933E-119D99C297E8.png?alt=media&token=1a8efbcd-26da-43f4-acfc-1f682767f350"}} > */}
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

// Tues 13 December 2022
// 1. DONE - Add ImageBackground to cards in Invited, Confirmed, Browse, and Guestlist
// 2. DONE - Allow user to upload profile picture through profile page
  // a. DONE - Create backend API to patch profile_picture 
  // b. DONE - Add same logic for signup photo upload to profile card
  );
};

export default ProfileCard;