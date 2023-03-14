import {useEffect, useState} from 'react'
import Modal from 'react-native-modal'
import { Formik } from 'formik';
//Old datetime picker that could not send any datetime other than the current 
//NOT IN USE
//import  DateTimePicker from '@react-native-community/datetimepicker';
import RadioGroup from 'react-native-radio-buttons-group';
import { useAuth } from "../contexts/Auth";
import {partyService} from '../services/partyService';
import {Button, StyleSheet, View, Text, Pressable, TextInput} from 'react-native';

import DateTimePickerModal from "react-native-modal-datetime-picker";

import { partyModalView, submitPartyButtonPress } from '../../analytics.native';
//Import Modal
//Pass through: 1. ModalisVisible 2. HandleSubmit 

//Add Party Modal separated from "Guests" Screen in order to grab and pass in authUserId to POST request
export default function PartyModal({ isModalVisible, handleModal, setIsModalVisible }) {

    //States
    const [_flat, setFlat] = useState(" ")
    const [_dateTime, setDateTime] = useState(new Date())

    //States for DateTimePicker
    const [isSelectedDate, setIsSelectedDate] = useState(false);
    const [isDatePickerVisible, setDatePickerVisibility] = useState(false);
    const [selectedDate, setSelectedDate] = useState(new Date());

    //Functions for DateTimePicker
    const showDatePicker = () => {
        setDatePickerVisibility(true);
    };
    const hideDatePicker = () => {
        setDatePickerVisibility(false);
    }
    const handleConfirm = (date: any) => {
     setSelectedDate(date)  
     setDateTime(date)
     setIsSelectedDate(true) 
     hideDatePicker()
    } 

    //authUserId only set one in Auth Context, so no need for setting function
    const {authUserId} = useAuth()
    const [loading, setLoading] = useState(Boolean)

    console.log("Reacted PartyModal Component")
    console.log(authUserId)

    const vibeOptions = [{id: '1', label: 'Chill', value: '1'}, {id: '2', label: 'Party', value: '2'}, {id: '3', label: 'Rager', value: '3'}]

    const [apiResponse, setApiResponse] = useState(null)
    const [_vibe, setVibe] = useState()

    //Determine integer to send to backend for vibe field based on the option selected
    const setValue = (value: any) => {
        let newArray = value.filter((item: any) => item.selected===true);
        setVibe(newArray[0].value);
    }

    const handleSubmit = async () => {
        try {
            if (authUserId) {
                submitRequest(authUserId)
            }
        } catch(error) {
            console.error(error)
        }
    }

    const submitRequest = async (authUserId) => {
        //TO DO: If user does not have a party whose first entry is less than 12 hours from current time, allow button to post, if does have party, disappear the posting button
        console.log("Form Submission Pressed")
        console.log(_flat)
        console.log(_dateTime)
        console.log(_vibe)
        //authUserId set through setUserId from state which is passed to BrowseScreen and set when the UserId is set there
        console.log(authUserId)
        
        try {
            let response = await partyService.createParty(setIsModalVisible, authUserId, _flat, _dateTime, _vibe)
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
        //Screen View Analytics 
        screenView()
        //Button Press Analytics
        submitPartyButton()

    }, [_flat, _dateTime, _vibe, loading, authUserId, isModalVisible])

    const screenView = async () => {
        try {
            partyModalView()
        } catch (error) {
            console.error(error)
        }
    }

    const submitPartyButton = async () => {
        try {
            submitPartyButtonPress()
        } catch (error) {
            console.error(error)
        }
    }

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
                    <View style={styles.inputBoxShadow}>
                        <TextInput
                        placeholder="Address"
                        placeholderTextColor="#D1D1DB"
                        textColor="#1B1B22"
                        style={styles.placeholderTextStyle}
                        onChangeText={newFlat => setFlat(newFlat)}
                        />
                    </View>

                    <View style={styles.inputBoxShadow}>
                        <View style={styles.placeholderTextStyle}>
                            <Text style={styles.dateTimeText}>
                                {/* Set datetime to empty string if there is no datetime selected */}
                                {isSelectedDate ? selectedDate.toLocaleDateString() : ''}
                            </Text>
                        </View>
                    </View>
                    
                    <Button title="Select Date/Time" onPress={showDatePicker} />
                    <DateTimePickerModal
                        date={selectedDate}
                        isVisible={isDatePickerVisible}
                        //Mode set to datetime unlike in signup form where mode is set to only date
                        mode="datetime"
                        onConfirm={handleConfirm}
                        onCancel={hideDatePicker}
                    />

                    <View style={styles.radioButtons}>
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
    dateTimeText: {
        fontWeight: 'bold',
        fontStyle: 'normal',
        color: '#1B1B22',
        fontSize: 18,
        fontFamily: 'Mulish-Regular',
    },
    radioButtons: {
        alignItems: 'center'
    },
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
        textAlign: "left",
        width: 273,
        height: 63,
        borderRadius: 20,
        color: '#1B1B22',
        backgroundColor: '#ffffff',

        fontWeight: 'bold',
        fontStyle: 'normal',
        fontColor: '#1B1B22',
        fontSize: 18,
        fontFamily: 'Mulish-Regular',

        shadowColor: '#EAEAEAB2',
        shadowOffset: {width: 8, height: 8},
        shadowOpacity: 0.7,
        shadowRadius: 24,
        
        padding: 15
   
    },
     inputBoxShadow: {
        width: 318,
        height: 63,
        borderRadius: 20,
        shadowColor: '#F7F7F8',
        shadowOffset: {width: -8, height: -8},
        shadowOpacity: 1,
        shadowRadius: 24,
        alignItems: 'center'
    },
    Body: {
        display: 'flex',
        flexDirection: 'column',
        justifyContent: "space-around",
        height: '55%'
    }
})