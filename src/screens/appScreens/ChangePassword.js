import React, { useState, useEffect, useContext } from 'react'
import { StyleSheet, Text, TouchableOpacity, View, TextInput, Image, ScrollView, ImageBackground } from 'react-native'
import MaterialIcons from 'react-native-vector-icons/dist/MaterialIcons'
import FontAwesome5 from 'react-native-vector-icons/dist/FontAwesome5'
import BaseScreen from '../../components/BaseScreen'
import Button from '../../components/Button'
import Input from '../../components/Input'
import axios from 'react-native-axios'
import { AuthContext } from '../../navigation/AuthProvider'
import Popup from '../../components/Popup'

const themeColor =
    '#f33'

const ChangePassword = ({ navigation }) => {

    return (
        <BaseScreen title={'Change Password'} navigation={navigation} renderChild={Content({ navigation })} />
    )
}

const Content = ({ navigation }) => {

    const { BaseUrl, loading, setLoading, user, userToken, } = useContext(AuthContext)

    const [securePwd, setsecurePwd] = useState(true)
    const [newPassword, setNewPassword] = useState()
    const [confirmPassword, setConfirmPassword] = useState()
    const [popUpAlert, setpopUpAlert] = useState(false)
    const [err, setErr] = useState(false)

    const [errors, setErrors] = useState({})

    const validate = () => {
        const strongRegex = new RegExp("^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#\$%\^&\*])(?=.{8,})")
        let errors = {}
        if (!newPassword) {
            errors.newPassword = "new password is required"
            setErrors(errors)
            return false
        }
        else if (!confirmPassword) {
            errors.confirmPassword = "confirmPassword is required"
            setErrors(errors)
            return false
        }
        else if (newPassword !== confirmPassword) {
            errors.confirmPassword = "new password and confirm password do not match"
            setErrors(errors)
            return false
        }
        else if (!strongRegex.test(confirmPassword)) {
            errors.confirmPassword = 'Password must have at least 8 digits, 1 Capital letter, 1 small letter, 1 number and 1 special character.';
            setErrors(errors)
            return false
        }
        else {
            setErrors({})
            return true
        }
    }

    const changePwd = async () => {
        let isValid = validate()
        if (isValid === true) {
            setFetching({ type: 'setLoading', value: true })
            var data = new FormData();
            data.append('new_pass', newPassword)
            data.append('conf_pass', confirmPassword)
            data.append('cust_id', userToken)
            await axios.post(BaseUrl + "/changeUserPwd", data, {
                headers: { "Content-type": "multipart/form-data" }
            })
                .then((response) => {
                    setFetching({ type: 'setLoading', value: false })
                    console.log(response.data, ' changeUserPwd Api successful')
                    if (response.data.status === 200) {
                        setpopUpAlert(response.data.msg)
                    }
                    else {
                        setErr(response.data.msg)
                    }
                })
                .catch((error) => {
                    console.log(error, 'error while fetching Api changeUserPwd')
                    setFetching({ type: 'setLoading', value: false })
                    setErr(error.message)
                })
        }
    }


    return (
        <>
            {popUpAlert ?
                <Popup heading={popUpAlert} type={'success'} data={'Your password has been updated successfully.'}
                    onPress={() => {
                        setpopUpAlert(false)
                        // navigation.navigate('Settings')
                    }}
                />
                : null
            }

            {err ?
                <Popup heading={err} type={'error'} data={'Error occured while updating the password.'}
                    onPress={() => {
                        setErr(false)
                    }}
                />
                : null
            }
            <ScrollView style={styles.contentScroll} showsVerticalScrollIndicator={false}>

                <Text style={styles.regText}>Change password</Text>

                {/* <Text style={styles.regText}>Old Password</Text>
            <Input
                name="password" value={password} placeholder='Password' keyboardType='default' secureTextEntry={true}
                icon='lock'
                iconType={1}
                onChangeText={setPassword}>
            </Input>
            {errors.password ?
                <Text style={{ color: themeColor, marginBottom: 10, marginTop: -15 }}>{errors.password}</Text>
                : null
            } */}

                {/* <Text style={styles.regText}>New Password</Text> */}
                <Input
                    name="newPassword" value={newPassword} placeholder='New Password' keyboardType='default'
                    icon={securePwd ? 'visibility-off' : 'visibility'}
                    secureTextEntry={securePwd}
                    onIconPressed={() => setsecurePwd(!securePwd)}
                    iconType={1}
                    onChangeText={setNewPassword}>
                </Input>
                {errors.newPassword ?
                    <Text style={{ color: themeColor, marginBottom: 10, marginTop: -15 }}>{errors.newPassword}</Text>
                    : null
                }

                {/* <Text style={styles.regText}>Confirm Password</Text> */}
                <Input
                    name="confirmPaddword" value={confirmPassword} placeholder='Confirm Password' keyboardType='default'
                    icon={securePwd ? 'visibility-off' : 'visibility'}
                    secureTextEntry={securePwd}
                    onIconPressed={() => setsecurePwd(!securePwd)}
                    iconType={1}
                    onChangeText={setConfirmPassword}>
                </Input>
                {errors.confirmPassword ?
                    <Text style={{ color: themeColor, marginBottom: 10, marginTop: -15 }}>{errors.confirmPassword}</Text>
                    : null
                }

                <Button title='Update' onPress={() => {
                    changePwd()
                }} />

            </ScrollView>
        </>
    )
}

export default ChangePassword

const styles = StyleSheet.create({
    contentScroll: {
        display: 'flex',
        height: '100%',
        width: '100%',
        position: 'relative'
        // borderWidth: 1, borderColor: '#fff'
    },
    regText: {
        color: '#000',
        fontSize: 16,
        marginBottom: 15,
        // fontFamily: "Poppins-Medium",
    },
})