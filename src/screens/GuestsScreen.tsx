import { View, StyleSheet, Button, Pressable } from "react-native";
import {useState, useEffect} from 'react';
import { createMaterialTopTabNavigator } from "@react-navigation/material-top-tabs";
import BrowseScreen from "./Guests/BrowseScreen";
import GuestlistScreen from "./Guests/GuestlistScreen";
import { roleService } from "../services/roleService";
import Loading from "../components/Loading";

import AddPartySVG from '../assets/images/addparty.svg'
import { useAuth } from "../contexts/Auth";
import PartyModal from "../components/PartyModal";

import { addPartyButtonPress } from "../../analytics.native";
import { Text } from "../../components/Themed";

const Tab = createMaterialTopTabNavigator();
// isModalVisible, setIsModalVisible, handleModal

const GuestsScreen: React.FC = ({navigation}) => { 
    // Cannot create useAuth() inside tokenService
    // So creating authData variable here and passing it to tokenService

    const { authUserId } = useAuth();
    // authUserId passed back in tokenService response 
    // Then setUserId in current file

    const [passedLastEntry, setPassedLastEntry] = useState()
    const [userRole, setUserRole] = useState()
    const [loadingComplete, setLoadingComplete] = useState(false)
    const [isModalVisible, setIsModalVisible] = useState(false);
    // const {authData} = useAuth()

    const handleModal = () => {
        setIsModalVisible(() => !isModalVisible);

        //Button Press Analytics
        addPartyButton()
    }

    const addPartyButton = async () => {
        try {
            await addPartyButtonPress()
        } catch (error) {
            console.log(error)
        }
    }
    
    useEffect(() => {
        getUserRole(authUserId, setUserRole, passedLastEntry, setPassedLastEntry)
    }, [navigation, isModalVisible, authUserId, userRole, loadingComplete])

    const getUserRole = async (authUserId, setUserRole, passedLastEntry, setPassedLastEntry) => {
        try {
            await roleService.getRole(authUserId, setUserRole, passedLastEntry, setPassedLastEntry)
            console.log("User Role on GuestsScreen:")
            console.log(userRole)

            //AddParty Modal always there 
            //If userRole is already host, just display the existing party information 

            // if (userRole == 0) {
            navigation.setOptions({
                headerRight: () => (
                    <Pressable onPress={handleModal} style={{width: 40, height: 40, marginRight: 20, marginBottom: 20}}>
                        <AddPartySVG height={40} width={40}/>
                    </Pressable>
                )
            })
            setLoadingComplete(true)
            console.log(userRole)
            // }

            // else if (userRole == 1) {
                
            //     navigation.setOptions({
            //         headerRight: () => (
            //             //Create Modal displaying party information
            //             //Not editable
            //             <Pressable style={{width: 40, height: 40, marginRight: 20, marginBottom: 20}}>
            //                 <Text>You have a party</Text>
            //             </Pressable>
            //         )
            //     })
            // }

            // else if (userRole == 1) {
            //     console.log("User Already Host: Do not display Add Party button")
            //     setLoadingComplete(true)
            //     console.log(userRole)
            // }
        } catch(error) {
            console.error
        }
    }

    return (
        // If User Role is Guest, on press of INVITE button, Party Modal opens, so handleModal is passed as props
        // DO NOT add comments inside the Tab Navigator, it will stop the Modal from opening
        // Modal moved to separate module to be imported so that authData can be retrieved there 
        // Moved PartyModal outside of inner View because Tabs disappeared when PartyModal was within

        // Individual Screens already reloaded on focus, thus unnecessary to useIsFocused or setLoading on GuestsScreen
    loadingComplete ? (
        <View style={styles.viewContainer}>
            <View style={styles.view}>
                <Tab.Navigator>
                    <Tab.Screen 
                    name="Browse" 
                    children={() => 
                    <BrowseScreen handleModal={handleModal} isModalVisible={isModalVisible} setIsModalVisible/>
                    } />

                    <Tab.Screen name="Guestlist" children={() => <GuestlistScreen isModalVisible={isModalVisible}/>}/>
                </Tab.Navigator>
            </View>
            <PartyModal isModalVisible={isModalVisible} handleModal={handleModal} setIsModalVisible={setIsModalVisible} userRole={userRole}/>
        </View>
    ) : <Loading />
    )
}

export default GuestsScreen;

// 1. Create Top Nav Component - DONE 
// 2. Add Accom to Header of each Page - DONE 
// 3. Add Top Nav to Each 4 Pages && Pass in the needed onPress and leftButtonText and rightButtonText

const styles = StyleSheet.create({
    btn: {
        color: '#D1D1DB',
        textDecorationLine: 'underline',
        textDecorationColor: '#D1D1DB'
    },
    btnActive: {
        color: '#4ABBFF',
        textDecorationLine: 'underline',
        textDecorationColor: '#4ABBFF'
    },
    view: {
        display: 'flex',
        flexDirection: 'row',
        justifyContent: 'space-around',
        alignItems: "center",
        width: '100%',
        height: '100%'
    },
    viewContainer: {
        position: 'absolute',
        width: '100%',
        height: '100%',
    },
    modal: {
        position: 'relative',
        width: 335,
        height: 450,
        backgroundColor: '#FFFFFF',
        borderRadius: 15,
        // paddingEnd: 20,
        // paddingStart: 20,
        paddingHorizontal: 20,
        paddingVertical: 20,
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'space-around',
        alignItems: 'center'
    },
    cancelText: {
        color: 'blue'
    },
    sendInvites: {
        width: 273,
        height: 60,

        backgroundColor: '#4ABBFF',
        shadowColor: 'rgba(0, 0, 0, 0.25)',
        shadowOffsetX: 0,
        shadowOffsetY: 2,
        shadowOpacity: 0.25,
        shadowRadius: 4,

        borderRadius: 20,

        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center'
    },
    sendInvitesText: {
        color: 'white',
        fontFamily: 'Plus Jakarta Sans',
        fontStyle: 'normal',
        fontWeight: '700',
        fontSize: 20,
    },
    header: {
        display: 'flex',
        justifyContent: 'flex-start',
        alignItems: 'flex-start',
        textAlign: 'left'
    },
    headerText: {
        color: '#4abbff',
        textAlign: 'left'
    },
    dateTime: {
        display: 'flex',
        flexDirection: 'row',
        justifyContent: "space-between"
    },
    flatNumber: {
        backgroundColor: '#FFFFFF',
        shadowColor: '#F7F7F8',
        shadowOffsetX: -8,
        shadowOffsetY: -8,
        shadowRadius: 24,

        borderRadius: 20,
  
        left: '9.25%',
        right: '9.25%',
        top: '11.11%',
        bottom: '75.78%',

        borderColor: 'black'
    },
    placeholderTextStyle: {
        fontSize: 16,
        fontWeight: 'bold',
        fontFamily: 'Mulish',
        fontStyle: 'normal',
        fontColor: '#1B1B22',
        textAlign: "left"
    },
    Body: {
        display: 'flex',
        flexDirection: 'column',
        justifyContent: "space-around",
        height: '55%'
    }
})