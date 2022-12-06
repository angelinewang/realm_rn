import { Pressable, View, StyleSheet, Text, Button, TextInput } from "react-native";
import {useState, useEffect} from 'react';
import { createMaterialTopTabNavigator } from "@react-navigation/material-top-tabs";
import BrowseScreen from "./Guests/BrowseScreen";
import GuestlistScreen from "./Guests/GuestlistScreen";
import Modal from 'react-native-modal'
import { Formik, useFormik } from 'formik';
import  DateTimePicker from '@react-native-community/datetimepicker';

import RadioGroup from 'react-native-radio-buttons-group';

const Tab = createMaterialTopTabNavigator();
// isModalVisible, setIsModalVisible, handleModal

const GuestsScreen: React.FC = ({navigation}) => { 

    const formik = useFormik({
        initialValues: {
            flat: "",
            date: "",
            time: "",
            vibe: ""
        },
        onSubmit: (values) => {
            console.log(JSON.stringify(values, null, 2));
        }
    })
    const [isModalVisible, setIsModalVisible] = useState(false);

    const handleModal = () => setIsModalVisible(() => !isModalVisible);

    const [flat, setFlat] = useState(" ")
    const [dateTime, setDateTime] = useState(new Date())

    const vibeOptions = [{id: '1', label: 'Chill', value: 'Chill'}, {id: '2', label: 'Party', value: 'Chill'}, {id: '3', label: 'Rager', value: 'Rager'}]

    const [vibe, setVibe] = useState('Chill')

    const setValue = (value: any) => {
        let newArray = value.filter((item: any) => item.selected===true);
        setVibe(newArray[0].value);
    }

    useEffect(() => {
        navigation.setOptions({
            headerRight: () => (
                <Button onPress={handleModal} title="Add Party"/>
            )
        })
    }, [navigation])

    const handleSubmit = () => {
        console.log("Form Submitted")
        console.log(flat)
        console.log(dateTime)
        console.log(vibe)
    }
    
    return (
            <View style={styles.viewContainer}>
            <View style={styles.view}>
            <Tab.Navigator>
                <Tab.Screen name="Browse" children={() => <BrowseScreen handleModal={handleModal}/>} />
                <Tab.Screen name="Guestlist" children={() => <GuestlistScreen/>}/>
            </Tab.Navigator>
            <Modal isVisible={isModalVisible} >
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
                            <DateTimePicker textColor="#1B1B22" locale="GB" mode="datetime" value={dateTime} onDateChange={setDateTime}/>
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
            </View>
            </View>
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