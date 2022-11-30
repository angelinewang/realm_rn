import { View, Text } from "react-native";
import React from "react";
import Loading from "../Loading";

const HostCard = ({item}) => {  
  const [host, setHost] = React.useState()

  React.useEffect(
  () => {
    getHost()
  }, [item]
)

const getHost = async () => {
  try {
  let response = await fetch(`https://3341-193-61-207-166.eu.ngrok.io/api/invite/v1/parties/host/${item}/`);
  let json = await response.json();
  setHost(json)
  console.log(json)
  }
  catch (error) {
    console.error(error);
  }
}

return (
  host ? (
  <View style={{flex: 1, padding: 30, height: "10%", justifyContent: "flex-start"}}>
    <Text style={{ fontSize: 28, color: 'white', fontWeight: 'bold'}}>
      {host.name ? host.name : "no name"}
      </Text>
      <Text style={{ fontSize: 18, color: 'white'}}>
      { host.birthdate ? `${host.birthdate} ` : "no birthdate"}
      {/* Convert Deparment NUM to STRING */}
      {host.department ? host.department: "no department"}
      </Text>
  </View>
  ) : <Loading/>

)
    
};

export default HostCard;