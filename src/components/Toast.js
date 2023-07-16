import { StyleSheet, Text, View } from 'react-native'
import React from 'react'
import * as Animatable from 'react-native-animatable'

const Toast = ({ heading }) => {
    return (
        <Animatable.View animation="slideInUp" iterationCount={1} duration={400} delay={0}
            style={styles.container}>
            <View style={styles.toastWrapper}>
                {/* <View style={styles.wrapBorder}></View> */}
                <Text style={styles.heading}>{heading}</Text>
            </View>
        </Animatable.View>
    )
}

export default Toast

const styles = StyleSheet.create({
    container: {
        position: 'absolute',
        bottom: 10,
        width:'100%',
        zIndex: 999999
    },
    toastWrapper: {
        position:'relative' ,
        alignSelf: 'center',
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        minWidth: '35%',
        maxWidth:'70%',
        paddingHorizontal:15,
        minHeight: 50,
        backgroundColor: '#f7f7f7',
        borderRadius: 50,
        overflow: 'hidden',
        elevation: 3,
        shadowColor: '#666',
        // for ios below 
        shadowOffset: { width: 5, height: 5 }
    },
    wrapBorder: {
        position: 'absolute',
        left:0 ,
        height: '100%',
        width: 4,
        backgroundColor: '#ECA6A6'
    },
    heading: {
        fontSize: 14,
        color: '#000',
        // fontFamily: 'Roboto-Medium',
    },
})