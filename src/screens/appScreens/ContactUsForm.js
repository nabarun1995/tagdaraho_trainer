import React, { useState, useEffect, useContext } from 'react'
import { StyleSheet, Text, TouchableOpacity, View, TextInput, Image, ScrollView, ImageBackground } from 'react-native'
import MaterialIcons from 'react-native-vector-icons/dist/MaterialIcons'
import FontAwesome5 from 'react-native-vector-icons/dist/FontAwesome5'
import BaseScreen from '../../components/BaseScreen'
import { AuthContext } from '../../navigation/AuthProvider'
import Input from '../../components/Input'
import Button from '../../components/Button'
import axios from 'react-native-axios'


const Content = ({ navigation }) => {

    const activeColor = "red"

    const { BaseUrl, loading, setLoading, userDetails, getUser, category, setCategory } = useContext(AuthContext)

    const [errors, setErrors] = useState({})
    const [query, setQuery] = useState()
    const [hideIcon, setHideIcon] = useState(false)


    const validate = () => {
        let errors = {}
        if (!query) {
            errors.query = 'This field is required'
            setErrors(errors)
            return false
        }
        else {
            setErrors({})
            return true
        }
    }

    const handleSubmit = async () => {
        const isvalid = validate()
        if (isvalid) {
            setFetching({ type: 'setLoading', value: true })
            setTimeout(()=>{
                setFetching({ type: 'setLoading', value: false })
                navigation.navigate('ContactUs')
            },1500)
            // await axios.post(BaseUrl + "contact_mail",
            //     {
            //         cust_email: userDetails.email,
            //         cust_name: userDetails.name,
            //         msg: query
            //     }
            // )
            //     .then((response) => {
            //         setFetching({ type: 'setLoading', value: false })
            //         console.log(response.data, 'contact_mail Api successful')
            //         if (response.data.status === 200) {
            //             navigation.navigate('ContactUs')
            //         }
            //         else {
            //             // setSearchError('No record found')
            //         }
            //     })
            //     .catch((error) => {
            //         console.log(error, 'error while fetching contact_mail Api')
            //         setFetching({ type: 'setLoading', value: false })
            //     })
        }
    }


    useEffect(() => {
        // getUser()
    }, [])

    return (
        <ScrollView style={styles.contentScroll} showsVerticalScrollIndicator={false} keyboardShouldPersistTaps='handled'
        // justifyContent='center'
        >


            <Text style={styles.whiteTxt}>Your Message</Text>

            {/* <Input
                name="query" value={query} placeholder='query'
                iconType={1}
                icon='edit' keyboardType='default'
                height={120}
                multiline={true}
                numberOfLines={4}
                onChangeText={setQuery}>
            </Input> */}

            <View style={[styles.inputWrapper]}>
                {hideIcon ? null :
                    <View style={styles.iconWrapper}>
                        <MaterialIcons name='edit' size={24} color={'#9B4130'}></MaterialIcons>
                    </View>
                }
                <TextInput name={query} value={query} placeholder='Message' keyboardType='default'
                    placeholderTextColor='#888'
                    style={[styles.Input, { width: hideIcon ? '100%' : '90%' }]}
                    multiline={true}
                    numberOfLines={4}
                    onChangeText={(text) => {
                        setQuery(text)
                        console.log(query, 'value')
                    }}
                    onFocus={() => setHideIcon(true)}
                    onEndEditing={() => setHideIcon(false)}
                ></TextInput>
            </View>
            {errors.query ?
                <Text style={{ color: 'red', marginBottom: 10, marginTop: -15 }}>{errors.query}</Text>
                : null
            }

            {/* <TouchableOpacity style={[styles.solidBtn, styles.roundBtn]}
                onPress={() => {
                    handleSubmit()
                }}>
                <Text style={styles.solidBtnTxt}>Submit</Text>
            </TouchableOpacity> */}

            <Button title={"Submit"} 
             onPress={() => {
                handleSubmit()
            }}/>

        </ScrollView>
    )
}

const ContactUsForm = ({ navigation }) => {
    return (
        <BaseScreen title={'Contact Us'} navigation={navigation} renderChild={Content({ navigation })} />
    )
}

export default ContactUsForm

const styles = StyleSheet.create({
    whiteTxt: {
        color: '#000',
        fontSize: 16,
        fontWeight: '600',
        marginVertical: 5,
        marginBottom: 30
        // fontFamily: "PTSans-Regular",
    },
    whiteTxt2: {
        color: '#eee',
        fontSize: 14,
        marginVertical: 5,
        // fontFamily: "PTSans-Bold",
    },
    contentScroll: {
        display: 'flex',
        height: '100%',
        width: '100%',
        paddingHorizontal: 20
        // borderWidth:1,borderColor:'#fff'
    },
    solidBtn: {
        alignSelf: 'center',
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        width: '100%',
        height: 40,
        marginTop: 50,
        borderRadius: 10,
        backgroundColor: '#f33',
    },
    solidBtnTxt: {
        fontSize: 16,
        color: '#fff',
        fontWeight: '600'
    },
    trainerName: {
        fontSize: 18,
        color: '#fff',
        fontWeight: 'bold'
        // fontFamily: "PTSans-Bold",
    },
    rowAlign: {
        alignSelf: 'center',
        display: 'flex', flexDirection: 'row', justifyContent: 'space-between', width: '60%',
        alignItems: 'center',
        marginVertical: 5,
        marginBottom: 30
    },
    roundBtn: {
        borderRadius: 25,
        width: '50%',
        margin: 0,
    },
    inputWrapper: {
        display: 'flex',
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'flex-start',
        width: '100%', height: 120,
        paddingLeft: 10,
        marginBottom: 20,
        borderRadius: 10,
        backgroundColor: '#fff',
        // borderWidth: 1,
        borderColor: '#eee'
    },
    iconWrapper: {
        display: 'flex',
        flexDirection: 'row',
        alignItems: 'center', justifyContent: 'center',
        width: 40, height: '100%',
    },
    Input: {
        width: '90%',
        height: '100%',
        paddingHorizontal: 10,
        fontSize: 16,
        color: '#000'
    },
})
