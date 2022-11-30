import { Button, SafeAreaView, Image, ImageBackground, StyleSheet, View, Text, FlatList, Dimensions } from 'react-native';
import Modal from 'react-native-modal';
import React from 'react';
import BrowseCard from '../../components/Card/BrowseCard';

const BrowseScreen = ({}) => {
  const [guests, setGuests] = React.useState()

  React.useEffect(
  () => {
    getGuests()
  }, []
)

const getGuests = async () => {
  try {
  let response = await fetch("https://3341-193-61-207-166.eu.ngrok.io/api/user/v1/guests/browse");
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
    <BrowseCard item={item}/>
  )
};

  return (
    <SafeAreaView style={{ flex: 1, flexDirection: 'column', }}>
    
      <FlatList data={guests} renderItem={guestCard} keyExtractor={item => item.id}/>

    </SafeAreaView>
  );
};

export default BrowseScreen;