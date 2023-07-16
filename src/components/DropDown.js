import React, { useState } from 'react'
import * as Animatable from 'react-native-animatable'
import { StyleSheet, Text, TouchableOpacity, View, TextInput, Image, ScrollView, ImageBackground } from 'react-native'
import MaterialIcons from 'react-native-vector-icons/dist/MaterialIcons'

const DropDown = (props) => {

    const { data, id, label, selected, setSelected } = props

    const [makeSelection, setMakeSelection] = useState(false)
    // const [selected, setSelected] = useState('')

    // const data = [
    //     { label: 'Item 1', id: '1' },
    //     { label: 'Item 2', id: '2' },
    //     { label: 'Item 3', id: '3' },
    //     { label: 'Item 4', id: '4' },
    //     { label: 'Item 5', id: '5' },
    //     { label: 'Item 6', id: '6' },
    //     { label: 'Item 7', id: '7' },
    //     { label: 'Item 8', id: '8' },
    // ];

    const customFadeIn = {
        from: {
            height: 0,
        },
        to: {
            height: data.length * 45,
        },
    };

    const customFadeInItem = {
        from: {
            height: 0,
        },
        to: {
            height: 45,
        },
    };
    const customFadeOut = {
        from: {
            height: data.length * 45,
        },
        to: {
            height: 0,
        },
    };
    const customFadeOutItem = {
        from: {
            height: 45,
        },
        to: {
            height: 0,
        },
    };

    return (
        <View style={styles.dropDown}>
            <TouchableOpacity style={styles.dropDownSelect} onPress={() => setMakeSelection(!makeSelection)}>
                <Text style={styles.dropDownTxt}>{!selected ? `-- Select ${label} --` : selected[label]}</Text>
                <MaterialIcons name='arrow-drop-down' size={24} color={'#000'} style={styles.dropDownIcon}></MaterialIcons>
            </TouchableOpacity>
            <Animatable.View animation={makeSelection ? customFadeIn : customFadeOut} easing="ease-in-out" iterationCount={1} duration={400} delay={0} >
                {
                    data.map((item, idx) =>
                        // animate children to see the effect expanding from one element and collecting in one element
                        <Animatable.View key={idx} animation={makeSelection ? customFadeInItem : customFadeOutItem} easing="ease-in-out" iterationCount={1} duration={380} delay={0} >
                            <TouchableOpacity
                                style={[styles.dropDownItem, { borderBottomWidth: data.length - 1 == idx ? 0 : 1 }]}
                                onPress={() => {
                                    setSelected(item)
                                    setMakeSelection(!makeSelection)
                                }}>
                                <Text style={styles.dropDownTxt}> {item[label]}</Text>
                                {selected && selected[id] === item[id] ?
                                    < MaterialIcons name='done' size={24} color={'#fc9918'} style={styles.dropDownIcon}></MaterialIcons>
                                    : null}
                            </TouchableOpacity>
                        </Animatable.View>
                    )
                }
            </Animatable.View>
        </View>

    )
}

export default DropDown

const styles = StyleSheet.create({
    // dropDown css
    dropDown: {
        alignSelf: 'center',
        display: 'flex',
        width: '99%',
        borderWidth: 1,
        borderColor: '#eee',
        borderRadius: 5,
        overflow: 'hidden',
        // elevation: 3,
        // shadowColor: '#999',
        // // for ios below 
        // shadowOffset: { width: 5, height: 5 }
    },
    dropDownSelect: {
        display: 'flex',
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        height: 45,
        width: '100%',
        backgroundColor: '#f7f7f7',
        padding: 10,
    },
    dropDownTxt: {
        fontSize: 16,
        color: '#000',
        // fontFamily: "PTSans-Bold",
    },
    dropDownItem: {
        display: 'flex',
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        height: 45,
        width: '100%',
        backgroundColor: '#F2F2F2',
        padding: 10,
        borderBottomWidth: 1,
        borderBottomColor: '#ddd'
    }
})
