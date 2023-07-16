import React, { useState } from 'react'
import { StyleSheet, Text, View, TextInput, TouchableWithoutFeedback,TouchableOpacity } from 'react-native'
import MaterialIcons from 'react-native-vector-icons/dist/MaterialIcons'
import Feather from 'react-native-vector-icons/dist/Feather'
import { useNavigation } from '@react-navigation/native';

const Search = ({ value, onChangeText }) => {

    const navigation = useNavigation();
    const [borderColor, setBorderColor] = useState(false)

    return (
        <View>
            <TouchableOpacity style={[styles.inputWrapper, {
                shadowColor: borderColor ? '#000' : '#999',
            }]}
            onPress={() => {navigation.navigate("SearchScreen") }}
            >
                <View style={styles.iconWrapper}>
                    <Feather name={'search'} size={22} color={'#9E9696'}></Feather>
                </View>
                {/* <TextInput
                    name={'search'} value={value} placeholder={'Search'} keyboardType='default'
                    placeholderTextColor='#888'
                    style={[styles.Input,]}
                    onFocus={() => setBorderColor(true)}
                    onEndEditing={() => setBorderColor(false)}
                    onChangeText={(text) => {
                        onChangeText(text)
                        console.log(value, 'value')
                    }}
                ></TextInput> */}
                <View
                    style={[styles.Input,{justifyContent:'center'}]}
                >
                    <Text style={{color:'#888'}}>Search</Text>
                </View>

                <View style={styles.iconWrapper} onPress={() => { }}>
                    <Feather name={'sliders'} size={22} color={'#9E9696'}></Feather>
                </View>
            </TouchableOpacity>
        </View>
    )
}

export default Search

const styles = StyleSheet.create({
    inputWrapper: {
        alignSelf: 'center',
        display: 'flex',
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        width: '99%', height: 50,
        marginBottom: 20,
        borderRadius: 6,
        backgroundColor: '#fff',
        borderColor: '#ccc',
        elevation: 3,
        shadowColor: '#000',
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
        width: '10%',
        height: '100%',
        // backgroundColor:'#000',
    },
    Input: {
        width: '80%',
        height: '100%',
        paddingLeft: 10,
        fontSize: 14,
        color: '#000',
        // borderWidth:1,
        // fontFamily: "Poppins-Regular",
    },
})