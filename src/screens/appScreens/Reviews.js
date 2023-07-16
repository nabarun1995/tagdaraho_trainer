import React, { useState, useEffect, useContext } from 'react'
import { StyleSheet, Text, TouchableOpacity, View, TextInput, Image, ScrollView, ImageBackground } from 'react-native'
import MaterialIcons from 'react-native-vector-icons/dist/MaterialIcons'
import FontAwesome5 from 'react-native-vector-icons/dist/FontAwesome5'
import { AuthContext } from '../../navigation/AuthProvider'
import axios from 'react-native-axios'

import BaseScreen from '../../components/BaseScreen'
import Button from '../../components/Button'

const Reviews = ({ navigation,route }) => {

    const { getProducts } = useContext(AuthContext)

    return (
        <BaseScreen
            title="Reviews"
            renderChild={Content({ navigation, route })} navigation={navigation}
        />
    )
}

const Content = ({ navigation, route }) => {

    const { reviews } = route.params

    const { BaseUrl, loading, setLoading, category, setCategory, } = useContext(AuthContext)
    const activeColor = "#fc9918"

    const filters = [
        { id: '1', name: 'Sort' },
        { id: '2', name: 'Filter' },
    ]

    useEffect(() => {
        // getServices()
    }, [])


    const getStars = (ratings) => {
        let content = [];
        let key = 0
        for (let i = 0; i < ratings; i++) {
            key = key + 1
            content.push(
                <MaterialIcons key={key} name="star" color='#FC9918' size={16} />
            );
        }
        if (ratings < 5) {
            let rem = 5 - ratings;
            for (let i = 0; i < rem; i++) {
                key = key + 1
                content.push(
                    <MaterialIcons key={key} name="star" color='#ccc' size={16} />
                );
            }
        }
        return content
    }

    return (
        <>
            <ScrollView style={styles.contentScroll} showsVerticalScrollIndicator={false}
            // justifyContent='center'
            >
                <View>
                    {/* <Text style={{ fontSize: 14, color: '#000', marginBottom: 5 }}>
                                        Ratings
                                    </Text> */}
                    {/* <Text style={[styles.whiteTxt2, { marginLeft: 5,alignSelf:'center',marginBottom:5 }]}>{getStars(4)} (114)</Text> */}
                    <View style={styles.reviewWrapper}>
                        {/* <Text style={styles.heading2}>Reviews</Text> */}
                        {
                            reviews.map((item, idx) =>
                                <View key={idx} style={[styles.review]}>
                                    <View style={styles.rImgWrapper}>
                                        <Image source={require("../../assets/images/DefaultUser.png")} style={styles.reviewImg}></Image>
                                    </View>
                                    <View style={styles.detailWrapper}>
                                        <Text style={styles.reviewSubject}>{item.customer_name}</Text>
                                        <View style={{ display: 'flex', flexDirection: 'row', justifyContent: 'space-between', marginVertical: 2, width: 100, }}>
                                            {getStars(item.rating)}
                                        </View>
                                        <Text
                                            numberOfLines={2} ellipsizeMode='tail'
                                            style={styles.whiteTxt2}>
                                            {item.review_text}
                                        </Text>
                                    </View>
                                </View>
                            )
                        }
                    </View>
                </View>


            </ScrollView >

        </>
    )
}

export default Reviews

const styles = StyleSheet.create({
    whiteTxt2: {
        color: '#000',
        fontSize: 12,
        // marginVertical: 5,
        // marginLeft: 10,
        // fontFamily: "PTSans-Bold",
    },
    contentScroll: {
        display: 'flex',
        height: '100%',
        width: '100%',
        paddingHorizontal: 5,
        // backgroundColor:'black'
        // borderWidth:1,borderColor:'#fff'
    },

    reviewWrapper: {
        // paddingLeft: 10,
        paddingBottom: 10,
        width: '100%',
        // borderWidth: 1
    },
    review: {
        marginBottom: 10,
        display: 'flex',
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',
        width: '100%',
        height: 110,
        paddingRight: 5,
        borderWidth: 1,
        borderColor: '#eee',
        borderRadius: 20,
        backgroundColor: '#fff',
        paddingHorizontal: 10
    },
    rImgWrapper: {
        alignSelf: 'center',
        display: 'flex',
        justifyContent: 'center', alignItems: 'center',
        width: '23%',
        height: '100%',
        // borderRadius: 60,
        // borderWidth: 1,
        borderColor: '#f77',
        borderTopLeftRadius: 20,
        borderBottomLeftRadius: 20
    },
    reviewImg: {
        width: 70,
        height: 70,
        resizeMode: 'cover',
        borderRadius: 20,
    },
    detailWrapper: {
        paddingVertical: 10,
        marginLeft: 10,
        width: '75%',
        display: 'flex',
        flexDirection: 'column',
    },
    reviewSubject: {
        color: '#222',
        fontSize: 14,
        fontWeight: 'bold',
        // fontFamily: "PTSans-Bold",
    },
    whiteBtnWrapper: {
        alignSelf: 'flex-end',
    },
    whiteBtn: {
        fontSize: 16,
        fontWeight: '600',
        color: '#fff',
    },


})
