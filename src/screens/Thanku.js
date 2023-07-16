import React, { useState, useEffect, useContext } from 'react'
import { StyleSheet, Text, TouchableOpacity, View, TextInput, Image, ScrollView, ImageBackground, StatusBar } from 'react-native'
import MaterialIcons from 'react-native-vector-icons/dist/MaterialIcons'
import FontAwesome5 from 'react-native-vector-icons/dist/FontAwesome5'
import BaseScreen from '../components/BaseScreen'
import * as Animatable from 'react-native-animatable'
// import Sound from 'react-native-sound';
import SoundPlayer from 'react-native-sound-player'
import axios from 'react-native-axios'
import { AuthContext } from '../navigation/AuthProvider';
import moment from 'moment'

const Content = ({ navigation, route }) => {

    const { BaseUrl, loading, setLoading } = useContext(AuthContext)

    const activeColor = "red"

    const playSound = () => {
        try {
            SoundPlayer.playSoundFile('justsaying', 'mp3')
        } catch (e) {
            // alert('Cannot play the file')
            console.log('cannot play the song file', e)
        }
    }

    const stopSound = async () => {
        // try {
        //   const info = await SoundPlayer.getInfo() // Also, you need to await this because it is async
        //   console.log('getInfo', info) // {duration: 12.416, currentTime: 7.691}
        // } catch (e) {
        //   console.log('There is no song playing', e)
        // }
        try {
            const info = await SoundPlayer.pause()
            console.log('stopped playing')
        } catch (e) {
            console.log('There is no song playing', e)
        }
    }

    useEffect(() => {
        playSound()
    }, [])

    return (
        <View style={styles.content}>
            <StatusBar backgroundColor="#fc9918"
                // translucent={true}
                barStyle='light-content'
            ></StatusBar>
            <Animatable.View animation="bounceIn" easing="ease-in-out" iterationCount={1} duration={1200} delay={40} >
                <FontAwesome5 name='check-circle' size={100} color='#fff'></FontAwesome5>
            </Animatable.View>

            <Text style={styles.reviewSubject}>Congratulations ! </Text>
            <Text style={styles.aText}>Payment was successful and your order is confirmed. Enjoy the excellent service and fast delivery.</Text>

            <Text style={[styles.whiteTxt, { color: '#fff' }]}>Keep tracking your order in order history.
            </Text>

            <View style={styles.btnRow}>
                <TouchableOpacity style={[styles.solidBtn, styles.roundBtn]}
                    onPress={() => navigation.navigate('BottomTab')}>
                    <Text style={styles.solidBtnTxt}>Done</Text>
                </TouchableOpacity>
            </View>
        </View>
    )
}

const Thanku = ({ navigation, route }) => {
    return (
        <Content title={'Thank you'} navigation={navigation} />
    )
}

export default Thanku

const styles = StyleSheet.create({

    whiteTxt: {
        color: '#aaa',
        fontSize: 16,
        marginVertical: 2,
        // fontFamily: "PTSans-Regular",
    },
    aText: {
        fontSize: 18,
        textAlign: 'center',
        color: '#fff',
        marginVertical: 10,
        // fontFamily: "PTSans-Bold",
    },
    content: {
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        height: '100%',
        width: '100%',
        backgroundColor: '#fc9918'
    },

    solidBtn: {
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        width: '100%',
        height: 40,
        marginVertical: 15,
        borderRadius: 10,
        borderWidth: 1,
        borderColor: '#fff',
        backgroundColor: '#f6ae51',
    },
    solidBtnTxt: {
        fontSize: 16,
        color: '#fff',
        fontWeight: 'bold',
        // fontFamily: "PTSans-Bold",
    },
    rowAlign: {
        display: 'flex', flexDirection: 'row',
        alignItems: 'center'
    },
    roundBtn: {
        borderRadius: 25,
        width: '70%',
        margin: 0,
    },
    btnRow: {
        marginVertical: 20,
        display: 'flex',
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
        width: '100%',
    },
    reviewSubject: {
        color: '#fff',
        fontSize: 26,
        // fontFamily: "PTSans-Bold",
        marginTop: 20,
        fontWeight: 'bold',
    },
})
