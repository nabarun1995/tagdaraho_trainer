import React, { useState, createContext, useEffect, useReducer, useCallback } from 'react'
import { View, Text } from 'react-native'
import axios from 'react-native-axios'
import AsyncStorage from '@react-native-async-storage/async-storage'
// import auth from '@react-native-firebase/auth'
// import { GoogleSignin } from '@react-native-google-signin/google-signin'
import messaging from '@react-native-firebase/messaging';
import { getAppData } from '../screens/homeScreen/HomeScreenData'


const AuthContext = createContext()

const AuthProvider = ({ children }) => {

    const BaseUrl = "https://techninza.in/tagdaraho/api2/public/index.php"

    const [userToken, setUserToken] = useState(null)
    const [userDetails, setUserDetails] = useState({})
    const [deviceId, setDeviceId] = useState()
    const [initialRoute, setInitialRoute] = useState('AppSplash')

    const initialFetch = {
        loading: false,
        success: false,
        error: false,
        response: false
    }
    const fetchReducer = (state, action) => {
        switch (action.type) {
            case 'setLoading': return { ...state, loading: action.value }
            case 'setSuccess': return { ...state, success: action.value }
            case 'setError': return { ...state, error: action.value }
            case 'setResponse': return { ...state, response: action.value }
            case 'reset': return initialFetch
            default: return state
        }
    }
    const [fetching, setFetching] = useReducer(fetchReducer, initialFetch)

    const initialAppData = {
        packages: "",
        transactions: "",
        expiredTxns: "",
    }
    const dataReducer = (state, action) => {
        switch (action.type) {
            case 'setPackages': return { ...state, packages: action.value }
            case 'setTransactions': return { ...state, transactions: action.value }
            case 'setExpiredTxns': return { ...state, expiredTxns: action.value }
            default: return state
        }
    }
    const [appData, setAppData] = useReducer(dataReducer, initialAppData)

    const getApiData = (id) => getAppData(id, setFetching, setAppData)

    const getToken = async () => {
        await AsyncStorage.getItem('userToken').then(value => {
            if (value !== null) {
                setUserToken(value)
                getApiData(value)
            }
        })
    }

    const _getFcmToken = async () => {
        try {
            const token = await messaging().getToken();
            console.log('FCM token registered:', token);
            setDeviceId(token)
            console.log('FCM token length:', token.length);
        } catch (error) {
            console.error('Error getting FCM token:', error);
        }
    };

    useEffect(() => {
        getToken()
        _getFcmToken()
        getUser()
    }, [userToken])

    // useEffect(() => {
    //     getApiData()
    // }, [])

    // generate new debug.keystore ---
    // keytool -genkey -v -keystore debug.keystore -storepass android -alias androiddebugkey -keypass android -keyalg RSA -keysize 2048 -validity 10000
    // see sha1 key --
    // keytool -exportcert -keystore ./android/app/debug.keystore -list -v

    const getUser = async () => {
        console.log(userToken, 'userToken')
        setFetching({ type: 'setLoading', value: true })
        var data = new FormData();
        data.append('customer_id', userToken);
        await axios.post(BaseUrl + "/customer_details", data, {
            headers: { "Content-type": "multipart/form-data" }
        })
            .then((response) => {
                console.log(response.data, 'customer_details Api successful')
                setFetching({ type: 'setLoading', value: false })
                if (response.data !== null) {
                    setUserDetails(response.data.msg)
                }
            })
            .catch((error) => {
                setFetching({ type: 'setError', value: error.message })
                console.log(error, 'error while fetching customer_details api')
                setFetching({ type: 'setLoading', value: false })
            })
    }


    return (
        <AuthContext.Provider value={{
            userToken, setUserToken, userDetails, setUserDetails,
            BaseUrl, initialRoute, setInitialRoute, getUser,
            fetching, setFetching, appData,
            refreshApp: () => getApiData(userToken),
            login: async (email, password) => {
                console.log(email, password, 'username,password entered are')
                setFetching({ type: 'setLoading', value: true })
                var form = new FormData()
                form.append('email', email);
                form.append('password', password);
                form.append('device_id', deviceId);
                await axios.post(BaseUrl + "/trainer_login", form, {
                    headers: { "Content-type": "multipart/form-data" }
                })
                    .then((response) => {
                        console.log(response.data, 'trainer_login Api successful')
                        setFetching({ type: 'setLoading', value: false })
                        if (response.data.status === 200) {
                            setInitialRoute('BottomTab')
                            setUserToken(response.data.msg.id)
                            getApiData(response.data.msg.id)
                            AsyncStorage.setItem('userToken', response.data.msg.id)
                            setUserDetails(response.data.msg)
                        }
                        else {
                            setFetching({ type: 'setError', value: response.data.msg })
                        }
                    })
                    .catch((error) => {
                        setFetching({ type: 'setError', value: error.message })
                        console.log(error, 'error while fetching trainer_login Api')
                        setFetching({ type: 'setLoading', value: false })
                    })

            },

            logout: async () => {
                try {
                    setFetching({ type: 'setLoading', value: true })
                    setInitialRoute('Welcome')
                    setUserDetails({})
                    await AsyncStorage.getItem('userToken').then((value) => console.log(value, 'is being logged out'))
                    await AsyncStorage.removeItem('userToken')
                    setUserToken(null)
                    setFetching({ type: 'setLoading', value: false })
                }
                catch (e) {
                    console.log(e)
                    setFetching({ type: 'setLoading', value: false })
                }
            },
        }}>
            {children}
        </AuthContext.Provider>
    )
}

export { AuthProvider, AuthContext }
