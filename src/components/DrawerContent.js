import React, { useContext } from 'react'
import { Image, StyleSheet, Text, View, TouchableOpacity } from 'react-native'
import { DrawerContentScrollView, DrawerItem } from '@react-navigation/drawer'
import MaterialCommunityIcons from 'react-native-vector-icons/dist/MaterialCommunityIcons'
import MaterialIcons from 'react-native-vector-icons/dist/MaterialIcons'
import FontAwesome5 from 'react-native-vector-icons/dist/FontAwesome5'
import { AuthContext } from '../navigation/AuthProvider'
// import AsyncStorage from '@react-native-async-storage/async-storage';


const iconColor = '#fc9918'
const fontSize = 24

const DrawerContent = (props) => {

    const { user, userToken, userDetails, userType, setUserToken, mainBalance, BaseUrl, logout, stores, setStores } = useContext(AuthContext)

    return (
        <View style={styles.container}>
            <DrawerContentScrollView {...props}>
                <View style={styles.userContent}>
                    <View style={styles.profileDetailsRow}>
                        <View style={styles.imgWrapper}>
                            {
                                userDetails?.profile_pic ?
                                    <Image source={{ uri: BaseUrl + userDetails.profile_pic }} style={styles.profileImg}></Image>
                                    :
                                    <Image source={require("../assets/images/DefaultUser.png")} style={styles.profileImg}></Image>
                            }
                        </View>
                        <View style={styles.detailWrapper}>
                            <Text style={styles.userName}>{userDetails?.full_name ? userDetails.full_name : user ? user.displayName : 'UserName'}</Text>

                            <TouchableOpacity style={[styles.settingsBtn, { width: 150, height: 20, paddingLeft: 0, marginBottom: 0 }]}
                                onPress={() => {
                                    navigation.navigate("Profile")
                                }}>
                                <Text style={[styles.solidBtnTxt, { color: '#fc9918', marginLeft: 0, fontWeight: '500' }]}>Edit Profile</Text>
                            </TouchableOpacity>
                        </View>
                    </View>
                </View>
                <DrawerItem
                    style={{ height: 45, borderBottomWidth: 0, borderBottomColor: '#fff' }}
                    labelStyle={{ 
                        // fontFamily: "Poppins-Medium",
                    }}
                    icon={({ color, size, focused }) => (
                        <Image source={require("../assets/images/icons/person.png")} />
                    )}
                    label="User Profile"
                    onPress={() => { props.navigation.navigate('Profile') }}>
                </DrawerItem>
                <DrawerItem
                    style={{ height: 45, borderBottomWidth: 0, borderBottomColor: '#fff' }}
                    labelStyle={{ 
                        // fontFamily: "Poppins-Medium",
                     }}
                    icon={({ color, size, focused }) => (
                        <Image source={require("../assets/images/icons/list.png")} />
                    )}
                    label="My Appointments"
                    onPress={() => { props.navigation.navigate('Home') }}>
                </DrawerItem>
                {/* <DrawerItem
                    style={{ height:45,borderBottomWidth: 0, borderBottomColor: '#fff' }}
                    labelStyle={{fontFamily: "Poppins-Medium",}}
                    icon={({ color, size, focused }) => (
                        <Image source={require("../assets/images/icons/account+.png")}/>
                    )}
                    label="Account"
                    onPress={() => { props.navigation.navigate('Settings') }}>
                </DrawerItem>

                <DrawerItem
                    style={{ height:45,borderBottomWidth: 0, borderBottomColor: '#fff' }}
                    labelStyle={{fontFamily: "Poppins-Medium",}}
                    icon={({ color, size, focused }) => (
                        <Image source={require("../assets/images/icons/contact.png")}/>
                    )}
                    label="Contact Us"
                    onPress={() => { props.navigation.navigate('ContactUsForm') }}>
                </DrawerItem>

                <DrawerItem
                    style={{ height:45,borderBottomWidth: 0, borderBottomColor: '#fff' }}
                    labelStyle={{fontFamily: "Poppins-Medium",}}
                    icon={({ color, size, focused }) => (
                        <Image source={require("../assets/images/icons/notification.png")}/>
                    )}
                    label="Notifications"
                    onPress={() => { props.navigation.navigate('Notifications') }}>
                </DrawerItem>

                <DrawerItem
                    style={{ height:45,borderBottomWidth: 0, borderBottomColor: '#fff' }}
                    labelStyle={{fontFamily: "Poppins-Medium",}}
                    icon={({ color, size, focused }) => (
                        <Image source={require("../assets/images/icons/help.png")}/>
                    )}
                    label="Help & Support"
                    onPress={() => { props.navigation.navigate('HelpSupport') }}>
                </DrawerItem>

                <DrawerItem
                    style={{ height:45,borderBottomWidth: 0, borderBottomColor: '#fff' }}
                    labelStyle={{fontFamily: "Poppins-Medium",}}
                    icon={({ color, size, focused }) => (
                        <MaterialCommunityIcons name="information-outline"
                            color={'#555'}
                            size={fontSize} />
                    )}
                    label="Terms & Conditions"
                    onPress={() => { props.navigation.navigate('TermsCondition') }}>
                </DrawerItem>

                <DrawerItem
                    style={{ height:45,borderBottomWidth: 0, borderBottomColor: '#fff' }}
                    labelStyle={{fontFamily: "Poppins-Medium",}}
                    icon={({ color, size, focused }) => (
                        <MaterialCommunityIcons name="forum-outline"
                            color={'#555'}
                            size={fontSize} />
                    )}
                    label="FAQ"
                    onPress={() => { props.navigation.navigate('Faq') }}>
                </DrawerItem>

                */}

                {/* <DrawerItem
                    style={{ height: 45, borderBottomWidth: 0, borderBottomColor: '#fff' }}
                    labelStyle={{ fontFamily: "Poppins-Medium", }}
                    icon={({ color, size, focused }) => (
                        <MaterialCommunityIcons name="clock-outline"
                            color={'#555'}
                            size={fontSize} />
                    )}
                    label="Call History"
                    onPress={() => { props.navigation.navigate('CallHistory') }}>
                </DrawerItem> */}

            </DrawerContentScrollView>
            <DrawerItem
                // style={{ borderBottomWidth: 0, borderBottomColor: '#fff' }}
                labelStyle={{ 
                    // fontFamily: "Poppins-Medium",
                 }}
                icon={({ color, size }) => (
                    <MaterialCommunityIcons name="exit-to-app"
                        color={color}
                        size={fontSize} />
                )}
                label="Sign Out"
                onPress={() => logout()}
            >
            </DrawerItem>
            <Text style={styles.version}>Version 1.0</Text>
        </View>
    )
}

export default DrawerContent

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff'
    },
    userContent: {
        display: 'flex',
        // justifyContent:'center',
        alignItems: 'center',
        paddingTop: 25,
        paddingLeft: 15,
        marginBottom: 30,
        // borderWidth:1
    },
    profileDetailsRow: {
        display: 'flex',
        flexDirection: 'row',
        alignItems: 'center',
        // justifyContent: 'center',
        width: '100%',
        marginBottom: 15,
        // borderWidth: 1,
    },
    imgWrapper: {
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        borderWidth: 1,
        borderColor: '#aaa',
        width: 70,
        height: 70,
        borderRadius: 35,
    },
    profileImg: {
        // resizeMode: 'contain',
        width: 65,
        height: 65,
        borderRadius: 35
    },
    detailWrapper: {
        width: '80%',
        display: 'flex',
        flexDirection: 'column',
        paddingLeft: 20,
        justifyContent: 'center',
        // alignItems: 'center',
        // borderWidth: 1,
    },
    userName: {
        fontSize: 16,
        color: '#000',
        // fontFamily: "Poppins-Bold",
    },
    solidBtnTxt: {
        fontSize: 14,
        color: '#000',
        marginLeft: 15,
        // fontFamily: "Poppins-Medium",
    },
    version: {
        fontSize: 12,
        color: '#ccc',
        marginLeft: 20,
        // fontFamily: "Poppins-Medium",
        // textAlign:'center'
    }
})
