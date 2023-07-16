import React, { useEffect, useState } from 'react'
import { StyleSheet, Text, View, Image } from 'react-native'
import * as Animatable from 'react-native-animatable'
import AsyncStorage from '@react-native-async-storage/async-storage';

const Splash = ({ navigation }) => {

    const [showText, setShowText] = useState(false)
    const [isFirstLaunch, setIsFirstLaunch] = useState(null);

    let routeName

    const routeTo = () => {
        AsyncStorage.getItem('alreadyLaunched').then(value => {
            if (value == null) {
                AsyncStorage.setItem('alreadyLaunched', 'true');
                setIsFirstLaunch(true);
                setTimeout(() => {
                    navigation.replace('OnBoarding')
                }, 2000)
            }
            else {
                setIsFirstLaunch(false)
                setTimeout(() => {
                    navigation.replace('Welcome')
                }, 2000)

                // setTimeout(() => {
                //     AsyncStorage.getItem('preference').then(value => {
                //         if (value == null) {
                //             navigation.navigate('Switch')
                //         }
                //         else if (value == 'store') {
                //             navigation.navigate('Settings')
                //         }
                //         else if (value == 'technician') {
                //             navigation.navigate('ProfileEdit')
                //         }
                //         else if (value == 'manufacturer') {
                //             navigation.navigate('BottomTab')
                //         }
                //     })
                // }, 2000)
            }
        })
    }

    useEffect(() => {
        routeTo()
    }, [])

    return (
        <View style={styles.container}>
            {/* <Animatable.Text animation="zoomInUp" iterationCount={1} duration={1000} delay={200}
                onAnimationEnd={() => setShowText(true)}
                style={styles.logo}>TagdaRaho</Animatable.Text> */}
            <Animatable.Image animation="bounceInDown" iterationCount={1} duration={1000} delay={200}
                onAnimationEnd={() => setShowText(true)}
                source={require('../assets/images/logo.png')} style={styles.logo} />
        </View>
    )
}

export default Splash

const styles = StyleSheet.create({
    container: {
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        height: '100%',
        width: '100%',
    },
    // logo: {
    //     fontSize:44,
    //     fontWeight:'bold',
    //     color:'#FC9918'
    // },
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
