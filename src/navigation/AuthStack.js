import React, { useEffect, useContext } from 'react'
import { View, Text } from 'react-native'
import { createNativeStackNavigator } from '@react-navigation/native-stack'
import { AuthContext } from './AuthProvider';

import OnboardingScreen from '../screens/OnboardingScreen';
import Login from '../screens/authScreens/Login';
import Forgot from '../screens/authScreens/Forgot';
import Splash from '../screens/Splash';
// import { GoogleSignin } from '@react-native-google-signin/google-signin';
import Welcome from '../screens/authScreens/Welcome';



const Stack = createNativeStackNavigator()

const AuthStack = () => {

    const { userToken, initialRoute, setInitialRoute, } = useContext(AuthContext)

    useEffect(() => {
        // GoogleSignin.configure({
        //     webClientId: "944603257535-fac2ice49b9tha98iqnj2cn9un8l0jc1.apps.googleusercontent.com",
        // });
    }, [])

    return (
        <Stack.Navigator initialRouteName={initialRoute === 'Welcome' ? 'Welcome' : 'Splash'}>
            <Stack.Screen name="Splash" component={Splash} options={{ headerShown: false, }} />
            <Stack.Screen name="OnBoarding" component={OnboardingScreen} options={{ headerShown: false, }} />
            <Stack.Screen name="Welcome" component={Welcome} options={{ headerShown: false }} />
            <Stack.Screen name="Login" component={Login} options={{ headerShown: false, }} />
            <Stack.Screen name="Forgot" component={Forgot} options={{ headerShown: false, }} />
        </Stack.Navigator>
    )
}

export default AuthStack
