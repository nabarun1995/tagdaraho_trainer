import React from 'react'
import { StyleSheet, Text, View,TouchableOpacity } from 'react-native'

const Button = ({onPress,title, width}) => {
    return (
        <TouchableOpacity style={[styles.solidBtn,{width: width ? width : '100%'}]}
            onPress={() => onPress()}>
            <Text style={styles.solidBtnTxt}>{title}</Text>
        </TouchableOpacity>
    )
}

export default Button

const styles = StyleSheet.create({
    solidBtn: {
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        width: '100%',
        height: 45,
        marginVertical: 15,
        borderRadius: 6,
        // backgroundColor: '#fc9918',
        backgroundColor:'#FC9918'
    },
    solidBtnTxt: {
        fontSize: 16,
        color: '#fff',
        // fontFamily: "Poppins-Bold",
    },
})
