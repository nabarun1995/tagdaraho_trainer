import React, { useState, useEffect, useContext } from 'react'
import { StyleSheet, Text, TouchableOpacity, View, TextInput, Image, ScrollView, ImageBackground } from 'react-native'
import MaterialIcons from 'react-native-vector-icons/dist/MaterialIcons'
import FontAwesome5 from 'react-native-vector-icons/dist/FontAwesome5'
import BaseScreen from '../../components/BaseScreen'
import Button from '../../components/Button'
import { AuthContext } from '../../navigation/AuthProvider'
import axios from 'react-native-axios'

const Faq = ({ navigation }) => {

    return (
        <BaseScreen title={'FAQ'} navigation={navigation} renderChild={Content({ navigation })} />
    )
}

const Content = ({ navigation }) => {

    const activeColor = "red"

    const { logout, socialUser, userDetails, BaseUrl, loading, setLoading, } = useContext(AuthContext)
    const [show, setShow] = useState('')
    const [faqData, setFaqData] = useState([])
    const [message, setMessage] = useState()

    const getFaq = async () => {
        setFetching({ type: 'setLoading', value: true })
        var data = new FormData();
        await axios.post(BaseUrl + "faq.php")
            .then((response) => {
                console.log(response.data, 'faq Api successful')
                setFetching({ type: 'setLoading', value: false })
                if (response.data !== null) {
                    setFaqData(response.data)
                }
            })
            .catch((error) => {
                setMessage('Network issue.')
                console.log(error, 'error while fetching faq api')
                setFetching({ type: 'setLoading', value: false })
            })
    }

    useEffect(() => {
        // getFaq()
    }, [])

    const items = [
        { id: '1', title: "Question here?", },
        { id: '2', title: "Question here?", },
        { id: '3', title: "Question here?", },
        // { id: '4', title: "pqrs" },
    ]

    return (

        <ScrollView style={styles.contentScroll} showsVerticalScrollIndicator={false}>
            {message ?
                <Text style={{ color: 'red', marginVertical: 20 }}>{message}</Text>
                : null}

            <View style={styles.rowAlign}>
                {items.map((item, idx) =>
                    <View style={[styles.cardWrapper,{paddingRight:0}]} key={idx}>
                        <View style={[styles.detailsWrapper,{paddingRight:0}]}>
                            <Text style={styles.txt}>{item.title}</Text>
                            {show === item.id ?
                                <TouchableOpacity
                                    style={{ width:35,justifyContent:'center',alignItems:'center' }}
                                    onPress={() => { setShow('') }}>
                                    <MaterialIcons name="navigate-next"
                                        color="#9B4130"
                                        size={25} />
                                </TouchableOpacity>
                                :
                                <TouchableOpacity
                                    style={{ width:35,justifyContent:'center',alignItems:'center' }}
                                    onPress={() => { setShow(item.id) }}>
                                    <MaterialIcons name="expand-more"
                                        color="#9B4130"
                                        size={25} />
                                </TouchableOpacity>
                            }
                        </View>
                        {show === item.id ?
                            <View style={[styles.detailsWrapper,{backgroundColor:'#F5F5F5'}]}>
                                <Text>Answer here</Text>
                            </View>
                            : null
                        }
                    </View>
                )
                }
            </View>
        </ScrollView>
    )
}

export default Faq

const styles = StyleSheet.create({
    contentScroll: {
        display: 'flex',
        height: '100%',
        width: '100%',
        position: 'relative'
        // borderWidth: 1, borderColor: '#fff'
    },
    userName: {
        fontSize: 16,
        color: '#000',
        // fontFamily: "PTSans-Bold",
    },
    rowAlign: {
        display: 'flex', flexDirection: 'row',
        // justifyContent:'space-between',
        flexWrap: 'wrap',
        alignItems: 'center'
    },
    cardWrapper: {
        // marginBottom: 10,
        display: 'flex', flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center',
        // padding: 10,
        width: '95%',
        // height: 150,
        borderRadius: 5,
        // borderWidth: 1,
        backgroundColor: '#fff',
        borderColor: '#c4c4c4',
        overflow: 'hidden',
        // marginHorizontal: 8,
        // marginVertical:8,
        margin: 8,
        elevation: 3,
        shadowColor: '#999',
        // for ios below 
        shadowOffset: { width: 5, height: 5 }
    },
    heading: {
        fontSize: 18,
        color: '#000',
        fontWeight: '700',
        // marginBottom: 10
    },
    subtitle: {
        fontSize: 14,
        color: '#000'
    },
    desc: {
        marginVertical: 5
    },
    socialBtn: {
        marginVertical: 10,
        alignSelf: 'flex-end',
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        width: 100,
        height: 30,
        borderRadius: 5,
        backgroundColor: '#DE4040',
    },
    solidBtnTxt: {
        fontSize: 14,
        color: '#fff',
        fontWeight: '700',
        // fontFamily: "PTSans-Bold",
    },
    logoImg: {
        height: 70,
        width: 120,
        resizeMode: 'contain'
    },
    imgWrapper: {
        display: 'flex',
        width: '35%',
        // borderWidth: 1,
        // borderColor: '#DE4040',
        height: 140,
    },
    bannerImg: {
        height: 140,
        width: '100%',
        resizeMode: 'contain'
    },
    detailsWrapper: {
        display: 'flex',
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        width: '100%',
        padding:10
    },
    txt: {
        color: '#000'
    },
    discount: {
        color: '#DE4040'
    }
})
