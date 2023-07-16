import React, { useState, useEffect, useContext, useCallback } from 'react'
import { StyleSheet, Text,RefreshControl, TouchableOpacity, View, PixelRatio, TextInput, Image, ScrollView, ImageBackground, Dimensions, Alert } from 'react-native'
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

const HomeScreen = ({ navigation }) => {
    const { refreshApp } = useContext(AuthContext)
    return (
        <BaseScreen
            logo={
                <TouchableOpacity onPress={() => { refreshApp() }}>
                    <Image source={require("../../assets/images/logo.png")} style={{
                        width: 150,
                        height: 50,
                        resizeMode: 'contain',
                        alignSelf: 'center'
                    }} ></Image>
                </TouchableOpacity>
            }
            renderChild={Content({ navigation })} navigation={navigation}
            leftButton={'menu'} paddingTop={false}
            rightButton={
                <TouchableOpacity onPress={() => { }}>
                    <MaterialIcons name="shopping-cart" size={25} color={'#fff'}></MaterialIcons>
                </TouchableOpacity>} />
    )
}

const Content = ({ navigation }) => {

    const { userToken, setFetching,refreshApp, BaseUrl, appData } = useContext(AuthContext)

    const themeColor = "#fc9918"

    const [popUp, setPopUp] = useState('')
    const [selected, setselected] = useState('')
    const [refreshing, setRefreshing] = useState(false);

    const wait = (timeout) => {
        return new Promise(resolve => setTimeout(resolve, timeout));
    }

    const onRefresh = useCallback(() => {
        setRefreshing(true);
        console.log('refreshed')
        refreshApp()
        wait(1000).then(() => setRefreshing(false));
    }, []);

    return (
        <>
            {popUp ? <Popup type={'info'} heading={'Timing Mismatched !'} data={popUp} onPress={() => setPopUp(false)} /> : null}
            <ScrollView style={styles.contentScroll} showsVerticalScrollIndicator={false}
                // justifyContent='center'
                refreshControl={
                    <RefreshControl
                        refreshing={refreshing}
                        onRefresh={onRefresh}
                    />
                }
            >


                <View style={styles.rowWrap}>
                    {
                       appData && appData.packages ?
                            appData.packages.map((item, index) =>
                                <TouchableOpacity key={index} style={[styles.imageTxtCard, { borderColor: selected === item.id ? themeColor : '#ddd', borderWidth: 1 }]}
                                    onPress={() => {
                                        setselected(item.id)
                                        navigation.navigate('PackageSlots', { item: item })
                                    }}>
                                    {item?.pkg_details.pkg_img !== "0" && item?.pkg_details.pkg_img ?
                                        <View style={styles.imgWrapper}>
                                            <Image source={{ uri: item?.pkg_img[0] }} style={styles.bgImg}>
                                            </Image>
                                        </View>
                                        :
                                        <View style={styles.imgWrapper}>
                                            <Text style={styles.nameImg}>{item?.pkg_details.pkg_title[0] + item?.pkg_details.pkg_title[item?.pkg_details.pkg_title.search(" ") + 1]}</Text>
                                        </View>
                                    }
                                    <Text style={[styles.subHeading, { marginVertical: 10, }]}>{item?.pkg_details.pkg_title}</Text>
                                </TouchableOpacity>
                            )
                            : null
                    }
                </View>


                <Text></Text>

            </ScrollView>
        </>
    )
}

export default HomeScreen

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

    rowWrap: {
        display: 'flex',
        flexDirection: 'row',
        alignItems: 'center',
        flexWrap: 'wrap',
        justifyContent: 'space-between',
        width: '100%',
        marginBottom: 10,
    },
    imageTxtCard: {
        alignSelf: "center",
        display: 'flex',
        alignItems: 'center',
        width: '48%',
        marginBottom: 10,
        borderRadius: 10,
    },
    nameImg: {
        color: '#000',
        fontSize: 40,
        // fontFamily: "Poppins-SemiBold",
    },
    imgWrapper: {
        display: 'flex',
        justifyContent: 'center', alignItems: 'center',
        width: '100%',
        height: PixelRatio.getPixelSizeForLayoutSize(70),
        borderTopLeftRadius: 9,
        borderTopRightRadius: 9,
        // borderWidth: 1,
        borderColor: '#555',
        overflow: 'hidden'
    },
    bgImg: {
        width: '100%',
        height: '100%',
        // borderRadius: 95 / 2,
        resizeMode: 'cover',
        // backgroundColor:'#222'
    },
})