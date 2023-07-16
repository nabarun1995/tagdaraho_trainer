import React, { useState, useEffect, useContext } from 'react'
import { StyleSheet, Text, TouchableOpacity, View, TextInput, ScrollView, Image } from 'react-native'
import MaterialIcons from 'react-native-vector-icons/dist/MaterialIcons'
import FontAwesome5 from 'react-native-vector-icons/dist/FontAwesome5'
import Button from '../components/Button'
import Input from '../components/Input'
import BaseScreen from '../components/BaseScreen'
import ImagePicker from 'react-native-image-crop-picker'
import { AuthContext } from '../navigation/AuthProvider'
import axios from 'react-native-axios'
import AsyncStorage from '@react-native-async-storage/async-storage'

const ProfileEdit = ({ navigation }) => {

    return (
        <BaseScreen title={'Update Profile'} renderChild={Content({ navigation })}
            navigation={navigation} />
    )
}

const Content = ({ navigation }) => {

    const { logout, user, userDetails, setUserDetails, userToken, setLoading, userType, BaseUrl, getUser } = useContext(AuthContext)

    // const [email, setEmail] = useState(userDetails.email)
    // const [name, setName] = useState(userDetails.name)
    // const [mobile, setmobile] = useState(userDetails.mobile)
    // // const [bio, setBio] = useState()
    // const [password, setPassword] = useState(userDetails.password)
    const [email, setEmail] = useState(userDetails.email)
    const [name, setName] = useState(userDetails.full_name)
    const [mobile, setmobile] = useState(userDetails.mobile)
    const [password, setPassword] = useState(userDetails.password)
    const [photo, setPhoto] = useState()
    const [imgName, setImgName] = useState()
    const [mime, setMime] = useState()
    const [apiError, setApiError] = useState(false)
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
        else if (!mobile) {
            errors.mobile = "Mobile is required"
            setErrors(errors)
            return false
        }
        else if (!password) {
            errors.password = "Password is required"
            setErrors(errors)
            return false
        }
        else {
            setErrors({})
            return true
        }
    }

    const handleSubmit = async () => {
        // console.log(photo, 'image to be uploaded', mime, imgName)
        let user = userType === 'store' ? 3 : userType === 'manufacturer' ? 2 : 1
        let details = {}
        let isValid = validate()
        if (isValid === true) {
            setFetching({ type: 'setLoading', value: true })
            let form = new FormData()
            form.append('id', userToken)
            form.append('name', name)
            form.append('email', email)
            form.append('mobile', mobile)
            form.append('password', password)
            form.append('type', user)
            // form.append('image', {
            //     name: imgName,
            //     type: mime,
            //     uri: photo
            // })
            await axios.post(BaseUrl + "/updateProfile", form, {
                headers: { "Content-type": "multipart/form-data" }
            }
            )
                .then((response) => {
                    setFetching({ type: 'setLoading', value: false })
                    console.log(response.data, 'updateProfile Api successful')
                    if (response.data.status === 200) {
                        setApiError(false)
                        details.full_name = name
                        details.email = email
                        details.mobile = mobile
                        details.password = password
                        details.created_at = userDetails.created_at
                        setUserDetails(details)
                        AsyncStorage.setItem('userDetails', JSON.stringify(details))
                        // details.status = userDetails.status
                        // getUser()
                        navigation.navigate('Settings')
                    }
                    else {
                        setApiError('Can not update the details')
                    }
                })
                .catch((error) => {
                    console.log(error, 'error while fetching updateProfile Api')
                    setFetching({ type: 'setLoading', value: false })
                })
        }
    }

    useEffect(() => {
    }, [])

    const choosePhotoFromGallary = () => {
        ImagePicker.openPicker({
            // width: 300,
            // height: 400,
            compressImageMaxWidth: 300,
            compressImageMaxHeight: 400,
            compressImageQuality: 0.99,
            cropping: true
        }).then(image => {
            console.log(image)
            const imageUri = Platform.OS === 'ios' ? image.sourceURL : image.path
            // const cleanUrl = imageUri.replace("file://", "")
            setPhoto(imageUri)
            setMime(image.mime)
            const fname = imageUri.split('/').pop()
            setImgName(fname)
        });
    }

    return (
        <ScrollView style={styles.contentScroll} showsVerticalScrollIndicator={false}>
            {apiError ?
                <Text style={{ color: 'red', marginVertical: 20 }}>{apiError}</Text>
                : null
            }
            {/* <Text style={styles.whiteTxt}>Update Profile</Text> */}

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

            <Input
                name="name" value={name} placeholder='Name'
                icon='person' keyboardType='default'
                iconType={1}
                onChangeText={setName}>
            </Input>
            {errors.name ?
                <Text style={{ color: 'red', marginBottom: 10, marginTop: -15 }}>{errors.name}</Text>
                : null
            }

            <Input
                name="email" value={email} placeholder='E-mail Id'
                iconType={1}
                editable={true}
                icon='email' keyboardType='email-address'
                onChangeText={setEmail}>
            </Input>
            {errors.email ?
                <Text style={{ color: 'red', marginBottom: 10, marginTop: -15 }}>{errors.email}</Text>
                : null
            }

            <Input
                name="mobile" value={mobile} placeholder='Mobile' keyboardType='phone-pad'
                icon='mobile-alt'
                iconType={2}
                editable={true}
                keyboardType='phone-pad'
                onChangeText={setmobile}>
            </Input>
            {errors.mobile ?
                <Text style={{ color: 'red', marginBottom: 10, marginTop: -15 }}>{errors.mobile}</Text>
                : null
            }

            <Input
                name="password" value={password} placeholder='Password' keyboardType='default' secureTextEntry={true}
                icon='lock'
                iconType={1}
                editable={true}
                keyboardType='default'
                onChangeText={setPassword}>
            </Input>
            {errors.password ?
                <Text style={{ color: 'red', marginBottom: 10, marginTop: -15 }}>{errors.password}</Text>
                : null
            }

            {/* <TouchableOpacity style={styles.sheetButtons} onPress={() => {
                choosePhotoFromGallary()
            }}>
                <MaterialIcons name="collections" size={20} color='black' ></MaterialIcons>
                <Text style={styles.sheetBtnTxt}>Choose photo from gallary</Text>
            </TouchableOpacity> */}

            <Button title='Update' onPress={() => {
                handleSubmit()
            }} />

        </ScrollView>
    )
}

export default ProfileEdit

const styles = StyleSheet.create({
    whiteTxt: {
        color: '#aaa',
        fontSize: 18,
        marginVertical: 10,
        // fontFamily: "PTSans-Regular",
    },
    contentScroll: {
        display: 'flex',
        height: '100%',
        width: '100%',
        // borderWidth: 1, borderColor: '#fff'
    },
    btnRow: {
        marginVertical: 10,
        display: 'flex',
        flexDirection: 'row',
        justifyContent: 'space-between',
        width: '100%'
    },
    socialBtn: {
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        width: '45%',
        height: 45,
        borderRadius: 25,
        backgroundColor: '#4267B2',
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
        color: '#fff',
        // fontFamily: "PTSans-Bold",
    },
    sheetButtons: {
        flexDirection: 'row',
        justifyContent: 'center', alignItems: 'center',
        // backgroundColor: '#D4BFF9',
        backgroundColor: '#DAD8DE',
        width: '100%',
        height: 40,
        borderRadius: 5,
        borderWidth: 1,
        borderColor: '#aaa',
        marginBottom: 30
    },
    sheetBtnTxt: {
        color: 'black',
        fontSize: 14,
        marginHorizontal: 5,
        // fontFamily: "PTSans-Bold",
    },
    imgWrapper: {
        alignSelf: 'center',
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        marginRight: 20,
        borderWidth: 1,
        borderColor: '#222',
        width: 120,
        height: 120,
        borderRadius: 60,
        marginBottom: 20
    },
    profileImg: {
        width: 100,
        height: 100,
        borderRadius: 50,
    },
})
