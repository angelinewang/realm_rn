import {useEffect, useState} from 'react'
import Modal from 'react-native-modal'
import { Formik } from 'formik';
import  DateTimePicker from '@react-native-community/datetimepicker';
import jwt_decode from 'jwt-decode'
import RadioGroup from 'react-native-radio-buttons-group';
import { useAuth } from "../contexts/Auth";
import {partyService} from '../services/partyService';
import {StyleSheet, View, Text, Pressable, TextInput} from 'react-native';

import { tokenService } from '../services/tokenService';
// Import Modal
// Pass through: 1. ModalisVisible 2. HandleSubmit 

// Modal separated from GuestsScreen in order to grab and pass in userId to POST request
export default function PartyModal({ isModalVisible, handleModal, setIsModalVisible }) {
    // const isFocused = useIsFocused()

    const [_flat, setFlat] = useState(" ")
    const [_dateTime, setDateTime] = useState(new Date())

    const {authData} = useAuth()
    const [loading, setLoading] = useState(Boolean)

    const [userId, setUserId] = useState(null)

    console.log("Reacted PartyModal Component")
    console.log(authData)
    console.log(userId)

    const vibeOptions = [{id: '1', label: 'Chill', value: '1'}, {id: '2', label: 'Party', value: '2'}, {id: '3', label: 'Rager', value: '3'}]

    const [apiResponse, setApiResponse] = useState(null)
    const [_vibe, setVibe] = useState()

    // Get authData, get token and get id from decoded token

    const setValue = (value: any) => {
        let newArray = value.filter((item: any) => item.selected===true);
        setVibe(newArray[0].value);
    }

    const handleSubmit = async () => {
        try {
            setUserId(tokenService.getUserId(authData))
            console.log("User Id on PartyModal:")
            console.log(userId)

            if (userId) {
                submitRequest(userId)
            }
        } catch(error) {
            console.error(error)
        }
    }

    const submitRequest = async (userId) => {
        // TO DO: If user does not have a party whose first entry is less than 12 hours from current time, allow button to post, if does have party, disappear the posting button
        console.log("Form Submission Pressed")
        console.log(_flat)
        console.log(_dateTime)
        console.log(_vibe)
        // userId set through setUserId from state which is passed to BrowseScreen and set when the UserId is set there
        console.log(userId)
        
        try {
            let response = await partyService.createParty(setIsModalVisible, userId, _flat, _dateTime, _vibe)
            setApiResponse(response)
            console.log(response)
            // After successful response is received from the backend, the handleModal function is called in order to close the Modal from view
            // if (apiResponse) {
            //     handleModal()
            // }
        }
        catch (error) {
            console.error(error);
        }

        }
    useEffect(() => {
      // TESTING: console.log(authData)
      // Grab token value from authData
      // Current there is a bug, so need to comment out token section for Browse, Guestlist, Invited, and Confirmed BEFORE attempting to sign in 

        // const token = authData?.token
        // // console.log(token)
        // const decoded = jwt_decode(token)

        // // TESTING: console.log(decoded)

        // // TESTING: console.log(userId)
        // setUserId(decoded.sub)

      // Adding "guests" to the below parameters caused infinite rerender and infinite server calls
  }, [_flat, _dateTime, _vibe, loading, userId, isModalVisible])

  return (

            <Modal isVisible={isModalVisible}>
                <Formik initialValues={{flat: '', dateTime: "", vibe: ''}} onSubmit={handleSubmit}>
                    <View style={styles.modal}>
                        <View style={styles.header} className="modal-header">
                        <Text style={styles.headerText}>
                        Only invited guests will see this
                        </Text>
                        </View>
                        
                        <View style={styles.Body}className="modal-body">
                        <View>
                            <TextInput
                            placeholder="Flat Number"
                            placeholderTextColor="#1B1B22"
                            style={styles.placeholderTextStyle}
                            onChangeText={newFlat => setFlat(newFlat)}
                            />
                        </View>

                        <View style={styles.dateTime} className="date-time">
                            <View >
                            <DateTimePicker textColor="#1B1B22" locale="GB" mode="datetime" value={_dateTime} onDateTimeChange={setDateTime}/>
                            </View>
                        </View>

                            <View className="radio-buttons">

                            <RadioGroup layout="row" radioButtons={vibeOptions} onPress={(value) => setValue(value)}/>

                            </View> 
                        </View>

                        <View className="modal-footer">
                            <Pressable onPress={handleModal}>
                                <Text style={styles.cancelText}>Cancel</Text>
                            </Pressable>

                            <Pressable style={styles.sendInvites} onPress={handleSubmit}>
                                <Text style={styles.sendInvitesText}>Send Invites</Text>
                            </Pressable>
                   
                        </View>
                    </View>
                </Formik>

            </Modal>

  )
}

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