import React, { useState, useContext, useEffect } from 'react'
import { StyleSheet, Text, TouchableOpacity, View, TextInput, ScrollView, ImageBackground, SafeAreaView, Image, StatusBar } from 'react-native'
import MaterialIcons from 'react-native-vector-icons/dist/MaterialIcons'
import FontAwesome5 from 'react-native-vector-icons/dist/FontAwesome5'
import Button from '../components/Button'
import Input from '../components/Input'
import { AuthContext } from '../navigation/AuthProvider'
import Loader from './Loader'
import Popup from './Popup'

const BaseScreen = ({ navigation, renderChild, header, title, leftButton, rightButton, backTo, logo, paddingTop, paddingHorizontal }) => {

    const { fetching, setFetching } = useContext(AuthContext)

    return (
        <View style={styles.container}>
            <StatusBar backgroundColor="#fff" translucent={false}
                barStyle='dark-content'
                hidden={false}
            ></StatusBar>
            {fetching.loading ? <Loader /> : null}
            {fetching.error ? <Popup heading={'Error!'} type={'error'} data={fetching.error}
                onPress={() => {
                    setFetching({ type: 'setError', value: false })
                }} /> : null}

            {fetching.success ? <Popup heading={fetching.success} type={'success'} data={fetching.response}
                onPress={() => {
                    setFetching({ type: 'setSuccess', value: false })
                }} /> : null}

            {header === false ? null :
                <View style={styles.header}>
                    {leftButton === false ? null :
                        leftButton === 'menu' ?
                            <TouchableOpacity style={styles.menuButton}
                                onPress={() => navigation.openDrawer()}>
                                <MaterialIcons name="menu" size={25} color='#fc9918'></MaterialIcons>
                            </TouchableOpacity>
                            :
                            <TouchableOpacity style={styles.menuButton}
                                onPress={() => {
                                    backTo ?
                                        navigation.navigate(backTo)
                                        :
                                        navigation.goBack()
                                }}>
                                <MaterialIcons name="keyboard-backspace" size={25} color='#000'></MaterialIcons>
                            </TouchableOpacity>
                    }
                    {logo ? <View>{logo}</View>
                        :
                        <Text style={styles.headerTxt}>{title}</Text>
                    }
                    <View style={styles.rightButton}>
                        {rightButton}
                    </View>
                </View>
            }


            <View style={[styles.content, {
                paddingHorizontal: paddingHorizontal === false ? 0 : 10,
                paddingTop: paddingTop === false ? 0 : 20, height: header === false ? '100%' : '92%',
            }]}>
                {renderChild}
            </View>
        </View>
    )
}

export default BaseScreen

const styles = StyleSheet.create({
    container: {
        display: 'flex',
        justifyContent: 'flex-start',
        alignItems: 'center',
        height: '100%',
        paddingTop: 0,
        // backgroundColor: '#f7f7f7',
        backgroundColor: '#fff',
        position: 'relative',
    },
    specialTxt: {
        color: '#f33',
        fontSize: 16,
        fontWeight: '600',
        marginVertical: 5,
        // fontFamily: "Poppins-Regular",
    },
    header: {
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        width: '100%',
        height: '8%',
        backgroundColor: '#fff',
        borderBottomWidth: 1,
        borderBottomColor: '#ddd'
        // backgroundColor: '#f1f1f1',
    },
    menuButton: {
        marginLeft: 10,
        color: '#fc9918',
        position: 'absolute',
        left: 0
    },
    rightButton: {
        marginRight: 15,
        color: '#f33',
        position: 'absolute',
        right: 0
    },
    headerTxt: {
        fontSize: 22,
        color: '#000',
        // fontFamily: "Poppins-Bold",
    },
    content: {
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'flex-start',
        height: '92%',
        width: '100%',
        paddingHorizontal: 10,
        // paddingBottom: 5,
        // paddingTop:20,
        // backgroundColor: '#f7f7f7',
        // backgroundColor: '#fff',
        // borderTopLeftRadius: 30,
        // borderTopRightRadius: 30,
        // opacity: 0.8,
        // borderTopWidth:1,borderTopColor:'#222'
    },
    bg: {
        position: 'absolute',
        top: 0, bottom: 0, right: 0, left: 0,
        width: '100%', height: '100%',
        // width: 320,
        // height: 200,
        resizeMode: 'cover'
    },
    contentScroll: {
        display: 'flex',
        height: '100%',
        width: '100%',
        // borderWidth: 1, borderColor: '#000'
    },
})
