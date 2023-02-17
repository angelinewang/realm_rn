import { View, Text } from "react-native";
import React from "react";
import Loading from "../Loading";

const HostCard = ({item, host, setHost}) => {  
  // const [host, setHost] = React.useState()

  React.useEffect(
  () => {
    getHost(item)
  }, [item]
)

const [department, setDepartment] = React.useState("")

const getHost = async (item) => {
  try {
  let response = await fetch(`https://realm-dj-34ezrkuhla-ew.a.run.app/api/invite/v1/parties/host/${item}/`);
  let json = await response.json();
  setHost(json)
  console.log(json)

  if (host) {
     switch(host?.department) {
      case 0:
        setDepartment('No Department')
        break;
      case 1: 
        setDepartment('Arts/Humanities')
        break;
      case 2:
        setDepartment('Business')
        break;
      case 3:
        setDepartment('Dentistry')
        break;
      case 4:
        setDepartment('Engineering')
        break;
      case 5:
        setDepartment('Law')
        break;
      case 6:
        setDepartment('Medic/Life Sciences')
        break;
      case 7:
        setDepartment('Natural Sciences')
        break;
      case 8:
        setDepartment('Nursing')
        break;
      case 9: 
        setDepartment('Psych/Neuroscience')
        break;
      case 10: 
        setDepartment('Social Sciences')
        break;
    }
  }

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
      {department ? department: "No Department"}
      </Text>
  </View>
  ) : <Loading/>

)
    
};

export default HostCard;