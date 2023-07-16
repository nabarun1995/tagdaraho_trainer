import React, { useState, useEffect, useContext } from 'react'
import { StyleSheet, Text, TouchableOpacity, View, TextInput, Image, ScrollView, Linking } from 'react-native'
import MaterialIcons from 'react-native-vector-icons/dist/MaterialIcons'
import FontAwesome5 from 'react-native-vector-icons/dist/FontAwesome5'
import BaseScreen from '../../components/BaseScreen'
import Button from '../../components/Button'
import { AuthContext } from '../../navigation/AuthProvider'
import axios from 'react-native-axios'

const CallHistory = ({ navigation }) => {

    return (
        <BaseScreen title={"Call History"} navigation={navigation} renderChild={Content({ navigation })} />
    )
}

const Content = ({ navigation }) => {

    const calls = [
        { id: 1, name: 'Danny Rand', start_time: '18 Jul 22, 05:30 PM', end_time: '18 Jul 22, 06:30 PM', duration: '1 hour', session: true },
        { id: 2, name: 'Collen Wing', start_time: '18 Jul 22, 05:30 PM', end_time: '18 Jul 22, 06:30 PM', duration: '1 hour', session: false },
        { id: 3, name: 'Joy Mechum', start_time: '18 Jul 22, 05:30 PM', end_time: '18 Jul 22, 06:30 PM', duration: '1 hour', session: true },
        { id: 4, name: 'Mathew Murdok', start_time: '18 Jul 22, 05:30 PM', end_time: '18 Jul 22, 06:30 PM', duration: '1 hour', session: false },
        { id: 5, name: 'Foggy Nelson', start_time: '18 Jul 22, 05:30 PM', end_time: '18 Jul 22, 06:30 PM', duration: '1 hour', session: true },
    ]

    return (
        <ScrollView style={styles.contentScroll} showsVerticalScrollIndicator={false} keyboardShouldPersistTaps={'always'}>

            {calls.map((item, index) =>
                <View style={[styles.cardWrapper, { marginBottom: 2 }]} key={index}>
                    <View style={styles.rowAlign}>
                        <View style={[{ display: 'flex', flexDirection: 'row', alignItems: 'center' }]}>
                            {item.session ?
                                <MaterialIcons name={"call-made"} color={'#090'} size={30} style={{ marginRight: 15 }} />
                                :
                                <MaterialIcons name={"call-missed-outgoing"} color={'#f00'} size={30} style={{ marginRight: 15 }} />
                            }
                            <Text style={styles.subHeading}>{item.name}</Text>
                        </View>
                        <Text style={[styles.regTxt, { color: '#B8B7B7' }]}>{item.start_time}</Text>
                    </View>
                    <Text style={[styles.regTxt, { color: '#B8B7B7', marginTop: 3, marginLeft: 45 }]}>
                        {item.duration}
                    </Text>
                </View>
            )}
        </ScrollView>
    )
}

export default CallHistory

const styles = StyleSheet.create({
    contentScroll: {
        display: 'flex',
        height: '100%',
        width: '100%',
        // paddingTop: 15
        // borderWidth: 1, borderColor: '#fff'
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

    addBtn: {
        display: 'flex', justifyContent: 'center', alignItems: 'center',
        height: 35,
        width: 35,
        // backgroundColor: '#ECA6A6',
        borderRadius: 10,
        // elevation: 3,
        // shadowColor: '#000',
        // // for ios below 
        // shadowOffset: { width: 5, height: 5 }
    },
})