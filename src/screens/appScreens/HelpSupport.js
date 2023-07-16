import React, { useState, useEffect, useContext } from 'react'
import { StyleSheet, Text, TouchableOpacity, View, TextInput, Image, ScrollView, Linking } from 'react-native'
import MaterialIcons from 'react-native-vector-icons/dist/MaterialIcons'
import FontAwesome5 from 'react-native-vector-icons/dist/FontAwesome5'
import BaseScreen from '../../components/BaseScreen'
import Button from '../../components/Button'
import { AuthContext } from '../../navigation/AuthProvider'
import axios from 'react-native-axios'

const HelpSupport = ({ navigation }) => {

    return (
        <BaseScreen title={"Help & Support"} navigation={navigation} renderChild={Content({ navigation })} />
    )
}

const Content = ({ navigation }) => {


    const OpenURL = async (url) => {
        // Checking if the link is supported for links with custom URL scheme.
        const supported = await Linking.canOpenURL(url);
        if (supported) {
            await Linking.openURL(url);
        } else {
            Alert.alert(`Don't know how to open this URL: ${url}`);
        }
    }

    return (
        <ScrollView style={styles.contentScroll} showsVerticalScrollIndicator={false} keyboardShouldPersistTaps={'always'}>

            <Image source={require("../../assets/images/help-support.png")} style={{ resizeMode: 'contain', alignSelf: 'center', width: '100%' }} />
            <Text style={[styles.heading, { textAlign: 'center', marginTop: 5 }]}>Hey we’re here to help!</Text>
            <Text style={[styles.regTxt, { textAlign: 'center', color: '#B8B7B7', marginTop: 3, marginBottom: 10 }]}>
                Get any question about our service or your order?
                just ask! our shoply superhouse are ready to
                assist and support you.
            </Text>

            <View style={[styles.cardWrapper, { marginBottom: 2 }]}>
                <View style={styles.rowAlign}>
                    <View style={[{ display: 'flex', }]}>
                        <Text style={styles.subHeading}>Call Us</Text>
                        <Text style={[styles.regTxt, { color: '#B8B7B7' }]}>+91 95235 58483</Text>
                    </View>
                    <TouchableOpacity onPress={()=>OpenURL("tel:+919523558483")}>
                        <Image source={require("../../assets/images/icons/call-us.png")} />
                    </TouchableOpacity>
                </View>
            </View>

            <View style={[styles.cardWrapper, { marginBottom: 2 }]}>
                <View style={styles.rowAlign}>
                    <View style={[{ display: 'flex',}]}>
                        <Text style={styles.subHeading}>Mail Us</Text>
                        <Text style={[styles.regTxt, { color: '#B8B7B7' }]}>Support@tagdaraho.com</Text>
                    </View>
                    <TouchableOpacity onPress={()=>OpenURL("mailto:Support@tagdaraho.com")}>
                        <Image source={require("../../assets/images/icons/mail-us.png")} style={{height:33,width:33}}/>
                    </TouchableOpacity>
                </View>
            </View>

            <View style={[styles.cardWrapper, { marginBottom: 30 }]}>
                <View style={styles.rowAlign}>
                    <View style={[{ display: 'flex',}]}>
                        <Text style={styles.subHeading}>Live Chat</Text>
                        <Text style={[styles.regTxt, { color: '#B8B7B7' }]}>Start live chat with us</Text>
                    </View>
                    <TouchableOpacity onPress={()=>OpenURL("mailto:Support@tagdaraho.com")}>
                        <Image source={require("../../assets/images/icons/chat.png")} />
                    </TouchableOpacity>
                </View>
            </View>
        </ScrollView>
    )
}

export default HelpSupport

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