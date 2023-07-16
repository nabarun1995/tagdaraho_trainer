import React, { useState, useEffect, useContext, useCallback } from 'react'
import { StyleSheet, Text, TouchableOpacity, View, TextInput, Image, ScrollView, ImageBackground, Dimensions, Alert } from 'react-native'
import MaterialIcons from 'react-native-vector-icons/dist/MaterialIcons'
import MaterialCommunityIcons from 'react-native-vector-icons/dist/MaterialCommunityIcons'
import FontAwesome5 from 'react-native-vector-icons/dist/FontAwesome5'
import Entypo from 'react-native-vector-icons/dist/Entypo'
import { AuthContext } from '../../navigation/AuthProvider'
import axios from 'react-native-axios'
import BaseScreen from '../../components/BaseScreen'
import Input from '../../components/Input'
import Popup from '../../components/Popup'
import moment from 'moment'

const PackageSlots = ({ navigation, route }) => {
    const { refreshApp } = useContext(AuthContext)
    return (
        <BaseScreen
            title={"Slots"}
            renderChild={Content({ navigation, route })} navigation={navigation} paddingTop={false} />
    )
}

const Content = ({ navigation, route }) => {

    const { item } = route.params
    const { userToken, setFetching, BaseUrl, appData } = useContext(AuthContext)

    const themeColor = "#fc9918"

    const [popUp, setPopUp] = useState('')
    const [type, setType] = useState(1)

    const calls = [
        { id: 1, name: 'Danny Rand', start_time: '18 Jul 22, 05:30 PM', end_time: '18 Jul 22, 06:30 PM', duration: '1 hour', session: true },
        { id: 2, name: 'Collen Wing', start_time: '18 Jul 22, 05:30 PM', end_time: '18 Jul 22, 06:30 PM', duration: '1 hour', session: true },
        { id: 3, name: 'Joy Mechum', start_time: '18 Jul 22, 05:30 PM', end_time: '18 Jul 22, 06:30 PM', duration: '1 hour', session: false },
        { id: 4, name: 'Mathew Murdok', start_time: '18 Jul 22, 05:30 PM', end_time: '18 Jul 22, 06:30 PM', duration: '1 hour', session: true },
        { id: 5, name: 'Foggy Nelson', start_time: '18 Jul 22, 05:30 PM', end_time: '18 Jul 22, 06:30 PM', duration: '1 hour', session: true },
    ]


    const timeDiff = (t1, t2, startTimeType, endTimeType) => {
        let startHour, endHour
        if (startTimeType == 'AM') startHour = parseInt(t1[0])
        else startHour = parseInt(t1[0]) + 12
        if (endTimeType == 'AM') endHour = parseInt(t2[0])
        else endHour = parseInt(t2[0]) + 12
        var dt = new Date()
        var dt1 = new Date(dt.getFullYear(), dt.getMonth(), dt.getDate(),
            startHour, parseInt(t1[1]));
        var dt2 = new Date(dt.getFullYear(), dt.getMonth(),
            dt.getDate(), endHour, parseInt(t2[1]));
        console.log(dt1, dt2, t1, t2, 'to get time diff')
        const diffTime = Math.abs(dt2 - dt);
        const mins = Math.ceil(diffTime / (1000 * 60));
        const secs = Math.ceil(diffTime / (1000));
        console.log(diffTime + " milliseconds");
        return secs
    }

    const checkSlotTimings = (slotStart, slotEnd, startTimeType, endTimeType) => {
        console.log('slot time is : ', slotStart, slotEnd, startTimeType, endTimeType)
        let startHour = parseInt(slotStart[0]), endHour = parseInt(slotEnd[0])
        if (startHour == '12') startHour = '00'
        if (endHour == '12') startHour = '00'

        if (startTimeType == 'PM') startHour = parseInt(startHour) + 12
        if (endTimeType == 'PM') endHour = parseInt(endHour) + 12
        var crrDateTime = new Date()
        var crrDateSlotStartTime = new Date(crrDateTime.getFullYear(), crrDateTime.getMonth(), crrDateTime.getDate(),
            startHour, parseInt(slotStart[1]));
        var crrDateSlotEndTime = new Date(crrDateTime.getFullYear(), crrDateTime.getMonth(), crrDateTime.getDate(),
            endHour, parseInt(slotEnd[1]));
        console.log("start :", crrDateSlotStartTime.toLocaleString(), 'end time is:', crrDateSlotEndTime.toLocaleString())
        if (crrDateSlotEndTime > crrDateTime && crrDateTime > crrDateSlotStartTime) {
            return true
        }
        else if (crrDateSlotStartTime > crrDateTime) {
            setPopUp("Today's slot time will start on : " + slotStart[0] + ":" + slotStart[1])
            return false
        }
        else {
            setPopUp("Today's slot timing has been ended. Please try connecting next day. ")
            return false
        }
    }

    const connectCall = async (id, startTime, endTime) => {
        let t1 = startTime[0].split(':')
        let t2 = endTime[0].split(':')
        let startTimeType = startTime[1]
        let endTimeType = endTime[1]
        const isSlotTime = checkSlotTimings(t1, t2, startTimeType, endTimeType)
        const timing = timeDiff(t1, t2, startTimeType, endTimeType)
        if (isSlotTime) {
            setFetching({ type: 'setLoading', value: true })
            // setFetching({ type: 'setSuccess', value: 'Call should be connected' })
            // setTimeout(() => {
            //     setFetching({ type: 'setLoading', value: false })
            // }, 1000)
            var data = new FormData()
            data.append('slot_id', id)
            data.append('pkg_id', item.pkg_id)
            data.append('trainer_id', userToken)
            await axios.post(BaseUrl + "/start_group_video_call", data, {
                headers: { "Content-type": "multipart/form-data" }
            })
                .then((response) => {
                    console.log(response.data, 'start_group_video_call Api successful')
                    setFetching({ type: 'setLoading', value: false })
                    if (response.data.status === 200) {
                        navigation.navigate('JoinCourse', { channel: response.data.token.channel_name, token: response.data.token.token, callTiming: timing, callId: response.data.group_call_id })
                    }
                    else {
                        setFetching({ type: 'setError', value: response.data.msg })
                    }
                })
                .catch((error) => {
                    setFetching({ type: 'setError', value: error.message })
                    console.log(error, 'error while fetching start_group_video_call api')
                    setFetching({ type: 'setLoading', value: false })
                })
        }
    }

    const TxnTypes = [
        { id: 1, title: 'Active' },
        { id: 2, title: 'Closed' },
    ]

    const List = ({ data }) => (
        data ?
            data.map((item, idx) =>
                <View style={styles.cardWrapper} key={idx}>
                    <View style={[styles.rowAlign, { paddingBottom: 10, marginBottom: 10, marginTop: 5, borderBottomWidth: 1, borderBottomColor: '#eee' }]}>
                        <Text style={styles.subHeading}>Slot {idx + 1}</Text>
                        <Text style={[styles.smTxt, { color: '#B4B4B4' }]}>{idx + 5} Users</Text>
                    </View>
                    <View style={{ flexDirection: 'row', alignItems: 'center', }}>
                        <Entypo name="time-slot" color={'#555'} size={18} style={{ marginRight: 15 }} />
                        <Text style={[styles.regTxt, { color: '#555', marginVertical: 5, }]}>
                            {item.start_time} - {item.end_time}
                        </Text>
                    </View>
                    {/* <View style={{ flexDirection: 'row', alignItems: 'center', }}>
                        <MaterialCommunityIcons name="account-clock-outline" color={'#555'} size={24} style={{ marginRight: 15 }} />
                        <Text style={[styles.regTxt, { color: '#555', marginVertical: 5, }]}>
                            Start Date - End Date
                        </Text>
                    </View> */}
                    {/* <Text style={styles.smTxt}>{item.expiry_status}</Text> */}
                    <View style={[styles.rowAlign, { paddingTop: 10, marginTop: 10, borderTopWidth: 1, borderTopColor: '#eee', justifyContent: 'flex-start' }]}>
                        <TouchableOpacity style={[styles.iconTxtBtn, { borderRightWidth: 1, borderRightColor: '#eee', paddingRight: 20 }]} onPress={() => { }}>
                            <MaterialIcons name="open-in-new" color={themeColor} size={24} />
                            <Text style={[styles.regTxt, { color: themeColor, marginLeft: 10 }]}>View</Text>
                        </TouchableOpacity>
                        {type === 1 ?
                            <TouchableOpacity style={[styles.iconTxtBtn, { paddingLeft: 20 }]}
                                onPress={() =>
                                    Alert.alert(
                                        "Connect now!",
                                        "Do you want to connect for a group video call?",
                                        [
                                            { text: 'cancel', onPress: () => console.log('cancelled') },
                                            {
                                                text: 'confirm', onPress: () => {
                                                    connectCall(item.slot_id, item.start_time.split(' '), item.end_time.split(' '))
                                                }
                                            }
                                        ]
                                    )}>
                                <MaterialIcons name="call" color={"#090"} size={24} />
                                <Text style={[styles.regTxt, { color: "#090", marginLeft: 10 }]}>Connect</Text>
                            </TouchableOpacity> :
                            <View style={[styles.iconTxtBtn, { paddingLeft: 20 }]}
                                onPress={() => { }}>
                                <MaterialIcons name="check-circle" color={"#090"} size={24} />
                                <Text style={[styles.regTxt, { color: "#090", marginLeft: 10 }]}>Closed</Text>
                            </View>}
                    </View>
                </View>) : <Text style={styles.regTxt}>No slots found</Text>
    )

    return (
        <>
            {popUp ? <Popup type={'info'} heading={'Timing Mismatched !'} data={popUp} onPress={() => setPopUp(false)} /> : null}
            <ScrollView style={styles.contentScroll} showsVerticalScrollIndicator={false}
            // justifyContent='center'
            >

                <View style={[styles.rowAlign, { marginBottom: 10 }]}>
                    {TxnTypes.map((item, index) =>
                        <TouchableOpacity key={index} style={[styles.secondaryBtn, { backgroundColor: item.id === type ? '#fc9918' : '#fff' }]}
                            onPress={() => setType(item.id)}>
                            <Text style={[styles.secondaryBtnTxt, { color: item.id === type ? '#fff' : '#fc9918' }]}>{item.title}</Text>
                        </TouchableOpacity>
                    )}
                </View>

                <List data={item?.pkg_details.slots} />

                <Text></Text>

            </ScrollView>
        </>
    )
}

export default PackageSlots

const styles = StyleSheet.create({
    contentScroll: {
        display: 'flex',
        height: '100%',
        width: '100%',
        position: 'relative',
        paddingTop: 20,
        paddingBottom: 20
    },
    heading: {
        fontSize: 18,
        color: '#000',
        // fontFamily: "Poppins-Bold",
        marginBottom: 5,
    },
    subHeadingBold: {
        fontSize: 16,
        color: '#000',
        // fontFamily: "Poppins-SemiBold",
    },
    subHeading: {
        fontSize: 16,
        color: '#000',
        // fontFamily: "Poppins-Medium",
    },
    smTxt: {
        fontSize: 12,
        color: '#000',
        // fontFamily: 'Poppins-Regular'
    },
    regTxt: {
        fontSize: 14,
        color: '#000',
        // fontFamily: 'Poppins-Regular'
    },
    fontMedium: {
        // fontFamily: 'Poppins-Medium'
    },
    cardWrapper: {
        alignSelf: "center",
        display: 'flex',
        position: 'relative',
        padding: 10,
        width: '99%',
        // height: 120,
        backgroundColor: '#fff',
        borderRadius: 8,
        // borderWidth: 1,
        borderColor: '#fcfcfc',
        marginVertical: 15,
        elevation: 3,
        shadowRadius: 5,
        shadowColor: '#00000095',
        // for ios below 
        shadowOffset: { width: 5, height: 5 }
    },
    rowAlign: {
        display: 'flex', flexDirection: 'row',
        width: '100%',
        justifyContent: 'space-between',
        alignItems: 'center'
    },

    iconTxtBtn: {
        display: 'flex', flexDirection: 'row',
        // justifyContent: 'center',
        alignItems: 'center',
        height: 35,
        paddingHorizontal: 10,
        // width:'40%',
        // backgroundColor: '#ECA6A6',
        // borderRadius: 10,
        // elevation: 3,
        // shadowColor: '#000',
        // // for ios below 
        // shadowOffset: { width: 5, height: 5 }
    },
    secondaryBtn: {
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        width: '45%',
        height: 40,
        backgroundColor: '#fff',
        borderWidth: 1,
        borderColor: '#fc9918',
        borderRadius: 8,
    },
    secondaryBtnTxt: {
        fontSize: 16,
        color: '#fc9918',
        // fontFamily: 'Poppins-Medium',
    },
})