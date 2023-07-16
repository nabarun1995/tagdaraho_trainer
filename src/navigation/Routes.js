import React, { useState, useContext, useEffect } from 'react'
import { StyleSheet, Text, View } from 'react-native'
import { NavigationContainer } from '@react-navigation/native';
import AppStack from './AppStack';
import { AuthContext } from './AuthProvider';
import AuthStack from './AuthStack';
// import auth from '@react-native-firebase/auth'
import Loader from '../components/Loader';

const Routes = () => {

    const { userToken, userType, user, setUser, initialRoute, setInitialRoute, } = useContext(AuthContext)
    // const [initializing, setInitializing] = useState(true)

    // const onAuthStateChanged = (user) => {
    //     // user ? setInitialRoute('SocialLogin') : null
    //     setUser(user)
    //     // if (initializing) setInitializing(false)
    // }

    // useEffect(() => {
    //     const subscriber = auth().onAuthStateChanged(onAuthStateChanged);
    //     return subscriber; // unsubscribe on unmount
    // }, [])

    // if (initializing) return null

    return (
        <NavigationContainer>
            {
                userToken === null
                    // &&
                    // !user
                    ?
                    <AuthStack /> :
                    <AppStack></AppStack>
            }
        </NavigationContainer >
    )
}

export default Routes

const styles = StyleSheet.create({})
