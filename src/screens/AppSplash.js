import React, { useEffect, useState } from 'react'
import { StyleSheet, Text, View, Image } from 'react-native'
import * as Animatable from 'react-native-animatable'
import AsyncStorage from '@react-native-async-storage/async-storage';

const AppSplash = ({ navigation }) => {

    const [showText, setShowText] = useState(false)
    const [isFirstLaunch, setIsFirstLaunch] = useState(null);

    let routeName

    const routeTo = () => {
        setTimeout(() => {
            navigation.navigate('BottomTab')
        }, 2000)
    }

    useEffect(() => {
        routeTo()
    }, [])

    return (
        <View style={styles.container}>
            <Animatable.Image animation="bounceInDown" iterationCount={1} duration={1000} delay={200}
                onAnimationEnd={() => setShowText(true)}
                source={require('../assets/images/logo.png')} style={styles.logo} />
        </View>
    )
}

export default AppSplash

const styles = StyleSheet.create({
    container: {
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        height: '100%',
        width: '100%',
    },
    logo: {
        width: 320,
        height: 200,
        resizeMode: 'contain'
    },
    appText: {
        fontSize: 25,
        color: '#543',
        // fontFamily: "PTSans-Bold"
    }
})
