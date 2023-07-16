import { StyleSheet, Text, View, TouchableOpacity, Pressable } from 'react-native'
import React, { useContext } from 'react'
import { AuthContext } from '../navigation/AuthProvider'
import MaterialIcons from 'react-native-vector-icons/dist/MaterialIcons'
import FontAwesome5 from 'react-native-vector-icons/dist/FontAwesome5'
import * as Animatable from 'react-native-animatable'


const Popup = ({ heading, type, data, onPress }) => {

    const PopupType = {
        'success': <MaterialIcons name="check-circle" color='#2a2' size={80} style={{ marginBottom: 8 }} />,
        'info': <MaterialIcons name="info" color='#22a' size={80} style={{ marginBottom: 8 }} />,
        'warning': <MaterialIcons name="warning" color='#ebcb15' size={80} style={{ marginBottom: 8 }} />,
        'error': <MaterialIcons name="error" color='#f00' size={80} style={{ marginBottom: 8 }} />
    }

    const PopupColor = {
        'success': '#2a2',
        'info': '#22a',
        'warning': '#ebcb15',
        'error': '#f00'
    }

    return (
        <View style={styles.container}>
            <Pressable style={[Platform.OS === "ios" ? styles.iOSBackdrop : styles.androidBackdrop, styles.backdrop]} onPress={() => onPress()} />
            <View style={styles.popUpBox}>
                {/* <TouchableOpacity style={{ position: 'absolute', top: 5, right: 5, }}
                    onPress={() => { onPress() }}>
                    <MaterialIcons name="highlight-off"
                        color='#aaa'
                        size={28} />
                </TouchableOpacity> */}
                <Animatable.View animation="bounceIn" iterationCount={1} duration={1000} delay={50}>
                    {PopupType[type]}
                </Animatable.View>
                <Text style={styles.headingStyle}>{heading}</Text>
                <Text style={styles.txt}>{data}</Text>
                {/* <TouchableOpacity style={[styles.solidBtn, { backgroundColor: PopupColor[type] }]}
                    onPress={() => onPress()}>
                    <Text style={styles.solidBtnTxt}>OK</Text>
                </TouchableOpacity> */}
            </View>
        </View>
    )
}

export default Popup

const styles = StyleSheet.create({
    container: {
        position: 'absolute', top: 0, bottom: 0, left: 0, right: 0, bottom: 0,
        flex: 1,
        backgroundColor: '#0009',
        zIndex: 100,
        justifyContent: 'center',
        alignItems: 'center'
    },
    // iOSBackdrop: {
    //     backgroundColor: "#000000",
    //     opacity: 0.3
    // },
    // androidBackdrop: {
    //     backgroundColor: "#232f34",
    //     opacity: 0.32
    // },
    backdrop: {
        position: 'absolute',
        top: 0,
        left: 0,
        right: 0,
        bottom: 0,
    },
    popUpBox: {
        backgroundColor: '#fff',
        position: 'absolute',
        top: 150,
        minWidth: '80%',
        // minHeight: 200,
        paddingVertical: 20,
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        paddingHorizontal: 15,
        marginHorizontal: 15,
        // paddingTop: 30,
        borderRadius: 8
    },
    headingStyle: {
        fontSize: 18,
        textAlign: 'center',
        marginTop: 5,
        color: '#000',
        // fontFamily: "Poppins-SemiBold",
    },
    txt: {
        fontSize: 14,
        fontWeight: '500',
        textAlign: 'center',
        marginBottom: 5,
        color: '#555',
        // fontFamily: "Poppins-Regular",
    },
    solidBtn: {
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        width: '100%',
        height: 40,
        marginVertical: 15,
        borderRadius: 8,
        backgroundColor: '#f33',
    },
    solidBtnTxt: {
        fontSize: 16,
        color: '#fff',
        // fontFamily: "Poppins-SemiBold",
    },
})