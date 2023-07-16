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

const PackageSlots = ({ navigation }) => {
    const { refreshApp } = useContext(AuthContext)
    return (
        <BaseScreen
            title={"Slots"}
            renderChild={Content({ navigation })} navigation={navigation} paddingTop={false} />
    )
}

const Content = ({ navigation }) => {

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


    const timeDiff = (t1, t2) => {
        var dt = new Date()
        var dt1 = new Date(dt.getFullYear(), dt.getMonth(), dt.getDate(),
            parseInt(t1[0]), parseInt(t1[1]));
        var dt2 = new Date(dt.getFullYear(), dt.getMonth(),
            dt.getDate(), parseInt(t2[0]), parseInt(t2[1]));
        console.log(dt1, dt2, t1, t2, 'to get time diff')
        const diffTime = Math.abs(dt2 - dt1);
        const mins = Math.ceil(diffTime / (1000 * 60));
        const secs = Math.ceil(diffTime / (1000));
        console.log(diffTime + " milliseconds");
        return secs
    }

    const checkSlotTimings = (slotStart, slotEnd) => {
        console.log('slot end time is : ', slotEnd)
        var crrDateTime = new Date()
        var crrDateSlotStartTime = new Date(crrDateTime.getFullYear(), crrDateTime.getMonth(), crrDateTime.getDate(),
            parseInt(slotStart[0]), parseInt(slotStart[1]));
        var crrDateSlotEndTime = new Date(crrDateTime.getFullYear(), crrDateTime.getMonth(), crrDateTime.getDate(),
            parseInt(slotEnd[0]), parseInt(slotEnd[1]));
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

    const connectCall = async (id, t1, t2) => {
        const isSlotTime = checkSlotTimings(t1, t2)
        const timing = timeDiff(t1, t2)
        if (isSlotTime) {
            setFetching({ type: 'setLoading', value: true })
            var data = new FormData()
            data.append('transaction_id', id)
            await axios.post(BaseUrl + "/start_video_call", data, {
                headers: { "Content-type": "multipart/form-data" }
            })
                .then((response) => {
                    console.log(response.data, 'start_video_call Api successful')
                    setFetching({ type: 'setLoading', value: false })
                    if (response.data.status === 200) {
                        navigation.navigate('JoinCourse', { channel: response.data.token.channel_name, token: response.data.token.token, callTiming: timing })
                    }
                    else {
                        setFetching({ type: 'setError', value: response.data.msg })
                    }
                })
                .catch((error) => {
                    setFetching({ type: 'setError', value: error.message })
                    console.log(error, 'error while fetching start_video_call api')
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
                        <Text style={styles.subHeading}>{item?.customer_details?.cust_name}</Text>
                        <Text style={[styles.smTxt, { color: '#B4B4B4' }]}>{moment(item.trans_date).format('DD MMM YYYY, hh:mm A')}</Text>
                    </View>
                    <View style={{ flexDirection: 'row', alignItems: 'center', }}>
                        <Entypo name="time-slot" color={'#555'} size={18} style={{ marginRight: 15 }} />
                        <Text style={[styles.regTxt, { color: '#555', marginVertical: 5, }]}>
                            {item.class_slot_id.start_time} - {item.class_slot_id.end_time}
                        </Text>
                    </View>
                    <View style={{ flexDirection: 'row', alignItems: 'center', }}>
                        <MaterialCommunityIcons name="account-clock-outline" color={'#555'} size={24} style={{ marginRight: 15 }} />
                        <Text style={[styles.regTxt, { color: '#555', marginVertical: 5, }]}>
                            {item.pkg_booking_date} -  {item.pkg_expire_date}
                        </Text>
                    </View>
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
                                        "Do you want to connect with " + item.customer_details.cust_name + "?",
                                        [
                                            { text: 'cancel', onPress: () => console.log('cancelled') },
                                            {
                                                text: 'confirm', onPress: () => {
                                                    connectCall(item.trans_id, item.class_slot_id.start_time.slice(0, item.class_slot_id.start_time.search(' ')).split(':'), item.class_slot_id.end_time.slice(0, item.class_slot_id.end_time.search(' ')).split(':'))
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
                </View>) : <Text style={styles.regTxt}>No sessions found</Text>
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

                {type === 1 ?
                    <List data={appData.transactions} />
                    :
                    <List data={appData.expiredTxns} />
                }
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