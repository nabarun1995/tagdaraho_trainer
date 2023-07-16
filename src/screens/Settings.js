import React, { useState, useEffect, useContext } from 'react'
import { StyleSheet, Text, TouchableOpacity, View, TextInput, Image, ScrollView, ImageBackground } from 'react-native'
import MaterialIcons from 'react-native-vector-icons/dist/MaterialIcons'
import FontAwesome5 from 'react-native-vector-icons/dist/FontAwesome5'
import BaseScreen from '../components/BaseScreen'
import Button from '../components/Button'
import { AuthContext } from '../navigation/AuthProvider'
import axios from 'react-native-axios'


const Settings = ({ navigation }) => {

    return (
        <BaseScreen title={'Settings'} navigation={navigation} renderChild={Content({ navigation })}
            // specialButton={
            //     <TouchableOpacity style={{}} onPress={() => { navigation.navigate('ProfileEdit') }}>
            //         <MaterialIcons name='edit' size={25} color={'#000'}></MaterialIcons>
            //     </TouchableOpacity>
            // } 
            />
    )
}

const Content = ({ navigation }) => {

    const activeColor = "red"

    const { logout, user, userDetails, userToken, setLoading, getUser, BaseUrl } = useContext(AuthContext)

    const [photo, setPhoto] = useState()
    const [nav, setnav] = useState()
    const [mime, setMime] = useState()
    const [errors, setErrors] = useState({})

    const validate = () => {
        let errors = {}
        if (!photo) {
            errors.photo = "Photo is required"
            setErrors(errors)
            return false
        }
        else {
            setErrors({})
            return true
        }
    }
    const handleSubmit = async (uri, mime, name) => {
        console.log(photo, 'image to be uploaded', uri, mime, name)
        let isValid = true
        if (isValid === true) {
            setFetching({ type: 'setLoading', value: true })
            let form = new FormData()
            form.append('user_id', userToken)
            form.append('file', {
                name: name,
                type: mime,
                uri: uri
            })
            await axios.post(BaseUrl + "upload_profile_pic.php", form, {
                headers: { "Content-type": "multipart/form-data" }
            }
            )
                .then((response) => {
                    setFetching({ type: 'setLoading', value: false })
                    console.log(response.data, 'upload_profile_pic Api successful')
                    if (response.data !== 'null') {
                        getUser()
                        navigation.navigate('Settings')
                    }
                })
                .catch((error) => {
                    console.log(error, 'error while fetching upload_profile_pic Api')
                    setFetching({ type: 'setLoading', value: false })
                })
        }
    }

    useEffect(() => {
        // console.log(userDetails)
    }, [])


    const settingNav = [
        { id: 1, name: 'User Profile', icon: "person", navigation: 'Profile' },
        { id: 2, name: 'Change Password', icon: "vpn-key", navigation: 'ChangePassword' },
        // { id: 3, name: 'My Orders', icon: "list-alt", navigation: 'Transactions' },
        // { id: 4, name: 'My Address', icon: "account-circle", navigation: 'Addresses' },
        { id: 5, name: 'Contact Us', icon: "contact-support", navigation: 'ContactUsForm' },
        { id: 6, name: 'Notifications', icon: "notifications", navigation: 'Notifications' },
        // { id: 7, name: 'My Subscription', icon: "video-library", navigation: 'Videos' },
        // { id: 8, name: 'My Training Courses', icon: "video-library", navigation: 'MyCourses' },
        { id: 9, name: 'Help & Support', icon: "help", navigation: 'HelpSupport' },
        { id: 10, name: 'Terms & Conditions', icon: "security", navigation: 'TermsCondition' },
    ]


    return (

        <ScrollView style={styles.contentScroll} showsVerticalScrollIndicator={false}>

            {errors.photo ?
                <Text style={{ color: 'red', marginBottom: 10, marginTop: -15 }}>{errors.photo}</Text>
                : null
            }
            <View style={styles.profileDetailsRow}>
                <View style={styles.imgWrapper}>
                    {
                        photo ?
                            <Image source={{ uri: photo }} style={styles.profileImg}></Image>
                            :
                            // userDetails.profile_image !== null || '' ?
                            userDetails.profile_pic ?
                                <Image source={{ uri: BaseUrl + userDetails.profile_pic }} style={styles.profileImg}></Image>
                                :
                                <Image source={require("../assets/images/DefaultUser.png")} style={styles.profileImg}></Image>
                    }
                </View>
                <View style={styles.detailWrapper}>
                    <Text style={styles.userName}>{userDetails.cust_name}</Text>

                    <TouchableOpacity style={[styles.settingsBtn,{width:150,height:20,paddingLeft:0,marginBottom:0}]}
                        onPress={() => {
                            navigation.navigate("Profile")
                        }}>
                        <Text style={[styles.solidBtnTxt, { color: '#fc9918',marginLeft:0,fontWeight:'500' }]}>Edit Profile</Text>
                    </TouchableOpacity>
                    {/* <View style={styles.rowAlign}>
                        <MaterialIcons name='email' size={18} color={'#fc9918'} style={{ marginRight: 15 }}></MaterialIcons>
                        <Text style={styles.text}>{userDetails.email ? userDetails.email : user ? user.email : "abcd@mail.com"}</Text>
                    </View> */}
                </View>
            </View>

            {settingNav.map((item, index) =>
                <TouchableOpacity style={[styles.settingsBtn,]}
                    key={index}
                    onPress={() => {
                        setnav(item.id)
                        navigation.navigate(item.navigation)
                    }}>
                    <MaterialIcons name={item.icon} size={25} color={nav === item.id ? '#fc9918' : '#000'}></MaterialIcons>
                    <Text style={[styles.solidBtnTxt, { color: nav === item.id ? '#fc9918' : '#000' }]}>{item.name}</Text>
                </TouchableOpacity>
            )}
            <Button title='Logout'
                onPress={() => logout()
                } />

        </ScrollView>
    )
}

export default Settings

const styles = StyleSheet.create({
    contentScroll: {
        display: 'flex',
        height: '100%',
        width: '100%',
        position: 'relative'
        // borderWidth: 1, borderColor: '#fff'
    },
    editButton: {
        position: 'absolute',
        top: 0,
        right: 0,
        display: 'flex',
        justifyContent: 'flex-start',
        alignItems: 'flex-end',
        width: 40, height: 40,
        // borderWidth: 1, borderColor: '#000'
    },
    profileDetailsRow: {
        display: 'flex',
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',
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
    addPhoto: {
        display: 'flex',
        justifyContent: 'center', alignItems: 'center',
        backgroundColor: '#34A853',
        height: 30,
        width: 30,
        borderRadius: 40,
        position: 'absolute',
        top: 5,
        right: -10
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
    rowAlign: {
        display: 'flex', flexDirection: 'row',
        alignItems: 'center'
    },
    text: {
        color: '#000',
        fontSize: 14,
        marginVertical: 5,
        // fontFamily: "Poppins-Regular",
    },
    btnRow: {
        marginVertical: 20,
        display: 'flex',
        flexDirection: 'row',
        justifyContent: 'space-around',
        width: '100%'
    },
    settingsBtn: {
        display: 'flex',
        justifyContent: 'flex-start',
        // alignItems: 'flex-end',
        // justifyContent: 'center',
        alignItems: 'center',
        flexDirection: 'row',
        width: '95%',
        height: 40,
        borderRadius: 25,
        backgroundColor: 'transparent',
        paddingLeft:15,
        marginBottom:10
    },
    solidBtnTxt: {
        fontSize: 14,
        color: '#000',
        marginLeft: 15,
        // fontFamily: "Poppins-SemiBold",
    },
    likesCmntRow: {
        display: 'flex',
        flexDirection: 'row',
        justifyContent: 'space-around',
        alignItems: 'center',
        width: '100%',
        paddingVertical: 15,
        marginVertical: 15,
        borderTopWidth: 1,
        borderBottomWidth: 1,
        borderBottomColor: '#ccc',
        borderTopColor: '#ccc'
    },
    likeColumn: {
        justifyContent: 'center',
        alignItems: 'center'
    },
    whiteTxt: {
        color: '#555',
        fontSize: 16,
        marginVertical: 5,
        // fontFamily: "Poppins-Regular",
    },
    ftext: {
        fontSize: 18,
        fontWeight: 'bold',
        color: '#000',
        marginVertical: 5,
        marginBottom: 10,
    }
})
