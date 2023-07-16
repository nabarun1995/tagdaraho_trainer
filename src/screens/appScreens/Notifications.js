import React, { useState, useEffect, useContext } from 'react'
import { StyleSheet, Text, TouchableOpacity, View, TextInput, Image, ScrollView, Linking } from 'react-native'
import MaterialIcons from 'react-native-vector-icons/dist/MaterialIcons'
import FontAwesome5 from 'react-native-vector-icons/dist/FontAwesome5'
import BaseScreen from '../../components/BaseScreen'
import Button from '../../components/Button'
import { AuthContext } from '../../navigation/AuthProvider'
import axios from 'react-native-axios'

const Notifications = ({ navigation }) => {

    return (
        <BaseScreen title={"Notifications"} navigation={navigation} renderChild={Content({ navigation })} />
    )
}

const Content = ({ navigation }) => {

    return (
        <ScrollView style={styles.contentScroll} showsVerticalScrollIndicator={false} keyboardShouldPersistTaps={'always'}>

            <View style={[styles.cardWrapper, { marginBottom: 2 }]}>
                <View style={styles.rowAlign}>
                    <View style={[{ display: 'flex', flexDirection: 'row', alignItems: 'center' }]}>
                        <Image source={require("../../assets/images/icons/track.png")} style={{ marginRight: 10 }} />
                        <Text style={styles.subHeading}>Festival Offers!</Text>
                    </View>
                    <Text style={[styles.regTxt, { color: '#B8B7B7' }]}>2 Jan</Text>
                </View>
                <Text style={[styles.regTxt, { color: '#B8B7B7', marginTop: 3, marginLeft: 45 }]}>
                    Festival sales starting tomorrow, Don’t
                    forget to check out shopify
                </Text>
            </View>
            <>
                <Image source={require("../../assets/images/No-notify.png")} style={{ resizeMode: 'contain', alignSelf: 'center', width: '100%' }} />
                <Text style={[styles.heading, { textAlign: 'center',marginTop:5 }]}>No Notification Yet!</Text>
                <Text style={[styles.regTxt, { textAlign: 'center', color: '#B8B7B7', marginTop: 3,marginBottom:10 }]}>
                    No notification found, we will notify you when
                    we have somting for you.
                </Text>
                <Button title={"Back To Home"} onPress={()=>navigation.navigate('Home')}/>
            </>
        </ScrollView>
    )
}

export default Notifications

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
        display: 'flex',
        // flexDirection: 'row',
        position: 'relative',
        padding: 10,
        width: '100%',
        // height: 120,
        backgroundColor: '#fff',
        borderRadius: 8,
        // borderWidth: 1,
        borderColor: '#fcfcfc',
        marginVertical: 15,
        elevation: 3,
        shadowRadius: 5,
        shadowColor: '#00000070',
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