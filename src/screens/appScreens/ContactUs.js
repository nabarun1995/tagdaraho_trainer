import React, { useState, useEffect, useContext } from 'react'
import { StyleSheet, Text, TouchableOpacity, View, TextInput, Image, ScrollView, ImageBackground } from 'react-native'
import MaterialIcons from 'react-native-vector-icons/dist/MaterialIcons'
import FontAwesome5 from 'react-native-vector-icons/dist/FontAwesome5'
import BaseScreen from '../../components/BaseScreen'
import * as Animatable from 'react-native-animatable'
import axios from 'react-native-axios'
import { AuthContext } from '../../navigation/AuthProvider';
import moment from 'moment'
import Button from '../../components/Button'

const Content = ({ navigation, route }) => {

    // const { bookingId } = route.params

    const { BaseUrl, loading, setLoading } = useContext(AuthContext)

    const [searchError, setSearchError] = useState(false)
    const activeColor = "red"


    return (
        <View style={styles.content}>
            <Animatable.View animation="zoomIn" easing="ease-in-out" iterationCount={1} duration={400} delay={0} >
                {/* <FontAwesome5 name='check-circle' size={100} color='#9B4130'></FontAwesome5> */}
                <Image source={require("../../assets/images/icons/namaste1.png")}
                    style={{ width: 150, height: 150 }}></Image>
            </Animatable.View>
            {/* <Image source={require("../../assets/images/icons/namaste.png")}
                style={{ width: 80, height: 80 }}></Image> */}

            <Animatable.View animation="fadeIn" easing="ease-in-out" iterationCount={1} duration={400} delay={0} 
                style={{display:'flex',alignItems:"center",justifyContent:'center',width:'100%'}}>

                <Text style={styles.reviewSubject}>Thanks for contacting TagdaRaho! </Text>
                <Text style={styles.aText}>We will revert back to you soon.</Text>

                {/* <Text style={[styles.whiteTxt, { color: '#000' }]}>You booked an appointment with.
            </Text>
            <Text style={[styles.whiteTxt, { color: '#000' }]}>Time of booking :.</Text> */}

                {/* <View style={styles.btnRow}>
                <TouchableOpacity style={[styles.solidBtn, styles.roundBtn]}
                    onPress={() => navigation.navigate('BottomTab')}>
                    <Text style={styles.solidBtnTxt}>Done</Text>
                </TouchableOpacity>
            </View> */}
                <Button title={"Done"} width={'90%'}
                    onPress={() => {
                        navigation.navigate('BottomTab')
                    }} />
            </Animatable.View>
        </View>
    )
}

const ContactUs = ({ navigation, route }) => {
    return (
        <BaseScreen title={'Contact Us'} navigation={navigation} renderChild={Content({ navigation, route })} notGoBack={true} />
    )
}

export default ContactUs

const styles = StyleSheet.create({

    whiteTxt: {
        color: '#000',
        fontSize: 16,
        marginVertical: 2,
        // fontFamily: "PTSans-Regular",
    },
    aText: {
        fontSize: 16,
        color: '#000',
        marginBottom: 10,
        // fontFamily: "PTSans-Bold",
    },
    content: {
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        height: '100%',
        width: '100%',
    },

    solidBtn: {
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        width: '100%',
        height: 40,
        marginVertical: 15,
        borderRadius: 10,
        backgroundColor: '#f33',
    },
    solidBtnTxt: {
        fontSize: 16,
        color: '#000',
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
        color: '#000',
        fontSize: 22,
        // fontFamily: "PTSans-Bold",
        marginTop: 50,
        marginBottom: 10
    },
})
