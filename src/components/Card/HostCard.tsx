import { View, Text } from "react-native";
import React from "react";
import Loading from "../Loading";

const HostCard = ({item, host, setHost}) => {  

  //States
  const [department, setDepartment] = React.useState("")
  const [age, setAge] = React.useState<Number | undefined>(0)

  React.useEffect(
    () => {
      getHost(item)

      // Including age and department in the useEffect ensures that evaluated values are updated onto screen
    }, [item, age, department]
  )

  //Call API to get the host information and set to the host state
  const getHost = async (item) => {
    try {
      let response = await fetch(`https://realm-dj-34ezrkuhla-ew.a.run.app/api/invite/v1/parties/host/${item}/`);
      let json = await response.json();
      setHost(json)

      console.log(json)

      //Convert birthdate to age
      const date = host?.birthdate?.slice(0, 10);
      const dob = new Date(date);
      const month_diff = Date.now() - dob.getTime()
      const age_dt = new Date(month_diff);
      const year = age_dt.getUTCFullYear();
      const finalAge = Math.abs(year - 1970)
      //Use age calculation to set to the age state
      setAge(finalAge)

      //If host state is loaded,  determine host department based on associated integer
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
    } catch (error) {
      console.error(error);
    }
  }

  return (
    //If host state is loaded, render the host information
    host ? (
    <View style={{flex: 1, padding: 30, height: "10%", justifyContent: "flex-start"}}>
      <Text style={{ fontSize: 28, color: 'white', fontWeight: 'bold'}}>
        {host.name ? host.name : "No Name"}
      </Text>

      <Text style={{ fontSize: 18, color: 'white'}}>
        { host.birthdate ? `${age} ` : "No Birthdate" }
        {/* Convert Deparment NUM to STRING */}
        { host.department ? department: "No Department" }
        </Text>
    </View>
    ) 
    : <Loading/>
  );
};

export default HostCard;