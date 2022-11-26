import { SafeAreaView, Image, ImageBackground, StyleSheet, View, Text, FlatList, Dimensions } from 'react-native';

import React from 'react';
import GuestCard from '../../components/Card/GuestCard';

const BrowseScreen = () => {
  const [guests, setGuests] = React.useState()

  React.useEffect(
  () => {
    getGuests()
  }, []
)

const getGuests = async () => {
  try {
  let response = await fetch("https://335b-82-0-186-223.eu.ngrok.io/api/user/v1/guests/");
  let json = await response.json();
  setGuests(json)
  console.log(json)
  }
  catch (error) {
    console.error(error);
  }
}


const guestCard = ({item}) => {
  return (
    <GuestCard item={item}/>
  )
};

  return (
    <SafeAreaView style={{ flex: 1, flexDirection: 'column', }}>
      <FlatList data={guests} renderItem={guestCard} keyExtractor={item => item.id}/>
    </SafeAreaView>
  );
};

export default BrowseScreen;