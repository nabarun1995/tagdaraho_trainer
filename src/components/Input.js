import React, { useState } from 'react'
import { StyleSheet, Text, View, TextInput,TouchableWithoutFeedback } from 'react-native'
import MaterialIcons from 'react-native-vector-icons/dist/MaterialIcons'
import FontAwesome5 from 'react-native-vector-icons/dist/FontAwesome5'

const Input = ({ onChangeText, value, placeholder, name, icon, keyboardType, iconType, secureTextEntry, height, border,
    multiline, numberOfLines, editable, width,onIconPressed,iconColor }) => {

    const [borderColor, setBorderColor] = useState(false)

    return (
        <View style={[styles.inputWrapper, border ? styles.fullborder : null, {
            height: height ? height : 50, shadowColor: borderColor ? '#000' : '#999',
            width: width ? width : '99%'
        }]}>

            <TextInput name={name} value={value} placeholder={placeholder} keyboardType={keyboardType}
                placeholderTextColor='#888'
                secureTextEntry={secureTextEntry}
                style={[styles.Input, { width: icon ? '88%' : '100%' }]}
                multiline={multiline}
                numberOfLines={numberOfLines}
                editable={editable}
                onFocus={() => setBorderColor(true)}
                onEndEditing={() => setBorderColor(false)}
                onChangeText={(text) => {
                    onChangeText(text)
                    console.log(value, 'value')
                }}
            ></TextInput>
            {icon ?
                <TouchableWithoutFeedback style={styles.iconWrapper} onPress={()=>onIconPressed()}>
                    {iconType === 1 ?
                        <MaterialIcons name={icon} size={22} color={iconColor ? iconColor: '#fc9918'}></MaterialIcons>
                        :
                        <FontAwesome5 name={icon} size={22} color={iconColor ? iconColor: '#fc9918'}></FontAwesome5>
                    }
                </TouchableWithoutFeedback>
                : null
            }
        </View>
    )
}

export default Input

const styles = StyleSheet.create({
    inputWrapper: {
        alignSelf: 'center',
        display: 'flex',
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'flex-start',
        width: '99%', height: 45,
        // paddingLeft: 10,
        marginBottom: 20,
        borderRadius: 6,
        backgroundColor: '#fff',
        // borderWidth: 1,
        borderColor: '#ccc',
        elevation: 3,
        shadowColor: '#999',
        // for ios below 
        shadowOffset: { width: 5, height: 5 }
    },
    fullborder: {
        borderWidth: 1
    },
    iconWrapper: {
        display: 'flex',
        flexDirection: 'row',
        alignItems: 'center', justifyContent: 'center',
        width: 40, height: '100%',
    },
    Input: {
        width: '100%',
        height: '100%',
        paddingLeft: 10,
        fontSize: 14,
        color: '#000',
        // borderWidth:1,
        // fontFamily: "Poppins-Regular",
    },
})
