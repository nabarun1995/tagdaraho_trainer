import React, { useState, useEffect, useContext } from 'react'
import { StyleSheet, Text, TouchableOpacity, View, TextInput, Image, ScrollView, Linking } from 'react-native'
import MaterialIcons from 'react-native-vector-icons/dist/MaterialIcons'
import MaterialCommunityIcons from 'react-native-vector-icons/dist/MaterialCommunityIcons'
import FontAwesome5 from 'react-native-vector-icons/dist/FontAwesome5'
import BaseScreen from '../../components/BaseScreen'
import Button from '../../components/Button'
import { AuthContext } from '../../navigation/AuthProvider'
import axios from 'react-native-axios'

const themeColor = '#fc9918'

const TermsCondition = ({ navigation }) => {

    return (
        <BaseScreen title={"Terms & Conditions"} navigation={navigation} renderChild={Content({ navigation })} />
    )
}

const Content = ({ navigation }) => {

    return (
        <ScrollView style={styles.contentScroll} showsVerticalScrollIndicator={false} keyboardShouldPersistTaps={'always'}>


            <Text style={styles.subHeading}>Terms of Service</Text>
            <Text style={[styles.regTxt, { color: '#B4B4B4', marginVertical: 5, marginBottom: 10 }]}>
                Lorem ipsum dolor sit amet, consectetur adipiscing elit. Enim nam fermentum et ac, venenatis iaculis ornare. Fusce porttitor feugiat duis ut vitae aliquet. At arcu dictumst viverra amet sagittis quis adipiscing nisl nunc. Faucibus eget cras bibendum sodales magna egestas quis. Mattis nisl aenean cursus lobortis odio adipiscing morbi platea. Pellentesque diam nunc at massa enim.
                Pellentesque montes, sit aliquam quis arcu. Felis tellus interdum a est natoque est pellentesque tellus quis. Velit laoreet dictum ultrices congue. Non ultrices nec id cras felis ipsum, a mauris, sed. Risus sit sed sagittis a, ultrices interdum. Risus suspendisse sem integer amet, dolor. Semper turpis ut ac nunc vel id morbi ut.
            </Text>

            <Text style={styles.subHeading}>Terms of Service</Text>
            <Text style={[styles.regTxt, { color: '#B4B4B4', marginVertical: 5, marginBottom: 10 }]}>
                Lorem ipsum dolor sit amet, consectetur adipiscing elit. Enim nam fermentum et ac, venenatis iaculis ornare. Fusce porttitor feugiat duis ut vitae aliquet. At arcu dictumst viverra amet sagittis quis adipiscing nisl nunc. Faucibus eget cras bibendum sodales magna egestas quis. Mattis nisl aenean cursus lobortis odio adipiscing morbi platea. Pellentesque diam nunc at massa enim.
                Pellentesque montes, sit aliquam quis arcu. Felis tellus interdum a est natoque est pellentesque tellus quis. Velit laoreet dictum ultrices congue. Non ultrices nec id cras felis ipsum, a mauris, sed. Risus sit sed sagittis a, ultrices interdum. Risus suspendisse sem integer amet, dolor. Semper turpis ut ac nunc vel id morbi ut.
            </Text>

        </ScrollView>
    )
}

export default TermsCondition

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