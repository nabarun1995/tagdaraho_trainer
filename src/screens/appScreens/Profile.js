import React, { useState, useEffect, useContext } from 'react'
import { StyleSheet, Text, TouchableOpacity, View, TextInput, Image, ScrollView, ImageBackground } from 'react-native'
import MaterialIcons from 'react-native-vector-icons/dist/MaterialIcons'
import FontAwesome5 from 'react-native-vector-icons/dist/FontAwesome5'
import BaseScreen from '../../components/BaseScreen'
import Button from '../../components/Button'
import { AuthContext } from '../../navigation/AuthProvider'
import axios from 'react-native-axios'
import Input from '../../components/Input'
import moment from 'moment'
import Popup from '../../components/Popup'


const Profile = ({ navigation }) => {

    return (
        <BaseScreen title={'Profile'} navigation={navigation} renderChild={Content({ navigation })}
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

    const { logout, user, userDetails, userToken, measures, setLoading, getUser, BaseUrl } = useContext(AuthContext)

    const [photo, setPhoto] = useState()
    const [imgName, setImgName] = useState()
    const [mime, setMime] = useState()
    const [date, setDate] = useState('')
    const [name, setName] = useState(userDetails.cust_name)
    const [email, setemail] = useState(userDetails.cust_email)
    const [mobile, setmobile] = useState(userDetails.cust_mobile)
    const [popUpAlert, setpopUpAlert] = useState(false)
    const [err, setErr] = useState(false)
    const [errors, setErrors] = useState({})

    const validate = () => {
        let errors = {}
        if (!name) {
            errors.name = "Name is required"
            setErrors(errors)
            return false
        }
        else if (!email) {
            errors.email = "Email is required"
            setErrors(errors)
            return false
        }
        else if (!/\S+@\S+\.\S+/.test(email)) {
            errors.email = 'Invalid email address';
            setErrors(errors)
            return false
        }
        else if (!mobile) {
            errors.mobile = "mobile is required"
            setErrors(errors)
            return false
        }
        else if (!/^[0]?[789]\d{9}$/.test(mobile)) {
            errors.mobile = 'Invalid mobile no.';
            setErrors(errors)
            return false
        }
        else {
            setErrors({})
            return true
        }
    }

    const handleSubmit = async () => {
        // console.log(photo, 'image to be uploaded', uri, mime, name)
        const isValid = validate()
        if (isValid === true) {
            setFetching({ type: 'setLoading', value: true })
            let form = new FormData()
            form.append('user_id', userToken)
            form.append('name', name)
            form.append('email', email)
            form.append('mobile', mobile)
            await axios.post(BaseUrl + "/update_customer_info", form, {
                headers: { "Content-type": "multipart/form-data" }
            })
                .then((response) => {
                    setFetching({ type: 'setLoading', value: false })
                    console.log(response.data, 'update_customer_info Api successful')
                    if (response.data.status === 200) {
                        setpopUpAlert(true)
                    }
                    else {
                        setErr(response.data.msg)
                    }
                })
                .catch((error) => {
                    console.log(error, 'error while fetching update_customer_info Api')
                    setFetching({ type: 'setLoading', value: false })
                })
        }
    }

    useEffect(() => {
        getUser()
    }, [])

    
    return (
        <>
            {popUpAlert ?
                <Popup heading={'Updated Profile !'} type={'success'} data={'Your profile has been updated successfully.'}
                    onPress={() => {
                        setpopUpAlert(false)
                    }}
                />
                : null
            }

            {err ?
                <Popup heading={err} type={'error'} data={'Error in updating user details.'}
                    onPress={() => {
                        setErr(false)
                    }}
                />
                : null
            }

            <ScrollView style={styles.contentScroll} showsVerticalScrollIndicator={false}>
                {errors.photo ?
                    <Text style={{ color: 'red', marginBottom: 10, marginTop: -15 }}>{errors.photo}</Text>
                    : null
                }
                {/* <DateTimePickerModal
                    isVisible={showCalendar}
                    onConfirm={handleConfirm}
                    onCancel={hideDatePicker}
                    maximumDate={new Date()}
                    mode="date">
                </DateTimePickerModal> */}

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
                                    <Image source={require("../../assets/images/DefaultUser.png")} style={styles.profileImg}></Image>
                        }
                    </View>
                </View>

                <Input
                    name="name" value={name} placeholder="Your Name"
                    multiline={true}
                    keyboardType='default'
                    width="95%" height={45}
                    onChangeText={(text) => setName(text)}>
                </Input>
                {errors.name ?
                    <Text style={{ color: themeColor, marginBottom: 10, marginTop: -15 }}>{errors.name}</Text>
                    : null
                }
                <Input
                    name="email" value={email} placeholder="Your Email"
                    keyboardType='email-address'
                    width="95%" height={45}
                    onChangeText={(text) => setemail(text)}>
                </Input>
                {errors.email ?
                    <Text style={{ color: themeColor, marginBottom: 10, marginTop: -15 }}>{errors.email}</Text>
                    : null
                }
                <Input
                    name="mobile" value={mobile} placeholder="Your mobile"
                    editable={false}
                    keyboardType='phone-pad'
                    width="95%" height={45}
                    onChangeText={(text) => setmobile(text)}>
                </Input>
                {errors.mobile ?
                    <Text style={{ color: themeColor, marginBottom: 10, marginTop: -15 }}>{errors.mobile}</Text>
                    : null
                }

                <Button title='Update'
                    onPress={() => { handleSubmit() }
                    } />

               
            </ScrollView>
        </>
    )
}

export default Profile

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
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        width: '100%',
        marginBottom: 15,
        // borderWidth: 1, borderColor: '#fff'
    },
    imgWrapper: {
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        borderWidth: 1,
        borderColor: '#aaa',
        width: 115,
        height: 115,
        borderRadius: 60,
        marginBottom: 20
    },
    profileImg: {
        // resizeMode: 'contain',
        width: 100,
        height: 100,
        borderRadius: 50
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

    inputWrapper: {
        alignSelf: 'center',
        display: 'flex', flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        width: '95%',
        // margin: 10,
        marginBottom: 20,
        height: 45,
        backgroundColor: '#fff',
        borderRadius: 6,
        paddingHorizontal: 10,
        borderColor: '#ccc',
        elevation: 3,
        shadowColor: '#999',
        // for ios below 
        shadowOffset: { width: 5, height: 5 }
    },
    input: {
        width: '88%',
        // height: 40,
        paddingLeft: 5,
        fontSize: 14,
        color: '#000',
        // fontFamily: "Poppins-Regular",
        // borderWidth:1,
    },
    rowAlign: {
        alignSelf: 'center',
        display: 'flex', flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        width: '95%'
    },
    rowAlign2: {
        display: 'flex',
        flexDirection: 'row',
        alignItems: 'center',
    },





    detailWrapper: {
        width: '100%',
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center',
        // borderWidth: 1, borderColor: '#ff0'
    },
    userName: {
        fontSize: 16,
        color: '#000',
        fontWeight: 'bold',
        // fontFamily: "PTSans-Bold",
    },

    text: {
        color: '#000',
        fontSize: 14,
        marginVertical: 5,
        // fontFamily: "PTSans-Regular",
    },
    btnRow: {
        marginVertical: 20,
        display: 'flex',
        flexDirection: 'row',
        justifyContent: 'space-around',
        width: '100%'
    },
    socialBtn: {
        display: 'flex',
        // justifyContent: 'flex-start',
        // alignItems: 'flex-end',
        justifyContent: 'center',
        alignItems: 'center',
        flexDirection: 'row',
        width: '80%',
        height: 40,
        borderRadius: 25,
        backgroundColor: '#fc9918',
    },
    solidBtnTxt: {
        fontSize: 14,
        color: '#fff',
        // marginLeft: 15,
        fontWeight: 'bold',
        // fontFamily: "PTSans-Bold",
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
        // fontFamily: "PTSans-Regular",
    },
    ftext: {
        fontSize: 18,
        fontWeight: 'bold',
        color: '#000',
        marginVertical: 5,
        marginBottom: 10,
    },

    cardWrapper: {
        // marginBottom: 10,
        display: 'flex',
        // flexDirection: 'row',
        position: 'relative',
        justifyContent: 'flex-start',
        alignItems: 'center',
        padding: 10,
        // paddingBottom:20,
        width: '95%',
        // height: 200,
        borderRadius: 10,
        // borderWidth: 1,
        backgroundColor: '#fff',
        borderColor: '#ddd',
        overflow: 'hidden',
        // marginHorizontal: 8,
        // marginVertical:8,
        margin: 8,
        // elevation: 3,
        // shadowColor: '#000',
        // // for ios below 
        // shadowOffset: { width: 5, height: 5 }
    },
    linkBtn: {
        position: 'absolute',
        bottom: 5, right: 10
    },
    link: {
        color: '#fc9918',
        fontSize: 14,
        // fontFamily: "Poppins-Medium"
    },
})
