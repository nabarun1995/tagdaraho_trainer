import React, { useState, useEffect, useRef, useContext } from 'react'
import { StyleSheet, Text, View, TextInput, TouchableWithoutFeedback, TouchableOpacity, SafeAreaView, Image, ScrollView } from 'react-native'
import MaterialIcons from 'react-native-vector-icons/dist/MaterialIcons'
import Feather from 'react-native-vector-icons/dist/Feather'
import { AuthContext } from '../../navigation/AuthProvider'
import axios from 'react-native-axios'
import Loader from '../../components/Loader'

const SearchScreen = ({ navigation }) => {

    const { logout, userDetails, userToken, BaseUrl, message, setMessage, setLoading, loading, fetching, setFetching } = useContext(AuthContext)

    const [borderColor, setBorderColor] = useState(false)
    const [query, setQuery] = useState('')
    const [showList, setShowList] = useState(false)
    const [suggested, setSuggested] = useState([])
    const [mapArray, setMapArray] = useState(false)
    const [trending, setTrending] = useState()
    const [recent, setRecent] = useState()


    const inputRef = useRef()

    const data = [
        { id: 1, title: 'PRAHAAR-Basic', img: require('../../assets/images/gallary1.png') },
        { id: 2, title: 'Gada/Mace', img: require('../../assets/images/mudgar.png') },
        { id: 5, title: 'Gada', img: require('../../assets/images/mudgar1.png') },
        { id: 3, title: 'PRAHAAR-Basic', img: require('../../assets/images/gallary2.png') },
        { id: 4, title: 'Gada/Mace', img: require('../../assets/images/mudgar2.png') },
    ]

    const getData = async () => {
        if (query.length > 2) {
            // setFetching({ type: 'setLoading',value:true })
            let form = new FormData()
            form.append("cust_id", userToken)
            form.append("term", query)
            await axios.post(BaseUrl + "/autosuggest", form, {
                headers: { "Content-type": "multipart/form-data" }
            })
                .then((response) => {
                    console.log(response.data, 'autosuggest Api successful')
                    // setFetching({ type: 'setLoading',value:false })
                    if (response.data.status === 200) {
                        setSuggested(response.data.msg)
                        setMapArray(true)
                    }
                    // else {
                    //     setFetching({ type: 'setError', value: response.data.msg })
                    // }
                })
                .catch((error) => {
                    setFetching({ type: 'setError', value: 'Network issue.' })
                    console.log(error, 'error while fetching autosuggest api')
                    // setFetching({ type: 'setLoading',value:false })
                })
        }
    }

    const getProduct = async (product_id) => {
        setFetching({ type: 'setLoading' })
        let form = new FormData()
        form.append("product_id", product_id)
        await axios.post(BaseUrl + "/product_details", form, {
            headers: { "Content-type": "multipart/form-data" }
        })
            .then((response) => {
                console.log(response.data, 'product_details Api successful')
                setFetching({ type: 'setLoading' })
                if (response.data.status === 200) {
                    navigation.navigate('ProductDetails', { item: response.data.msg })
                }
            })
            .catch((error) => {
                setFetching({ type: 'setError', value: 'Network issue.' })
                console.log(error, 'error while fetching product_details api')
                setFetching({ type: 'setLoading' })
            })
    }

    const getCourse = async (course_id) => {
        setFetching({ type: 'setLoading' })
        console.log('course_id', course_id)
        let form = new FormData()
        form.append("course_id", course_id)
        await axios.post(BaseUrl + "/course_details", form, {
            headers: { "Content-type": "multipart/form-data" }
        })
            .then((response) => {
                console.log(response.data, 'course_details Api successful')
                setFetching({ type: 'setLoading' })
                if (response.data.status === 200) {
                    navigation.navigate('CourseDetails', { item: response.data.msg })
                }
            })
            .catch((error) => {
                setFetching({ type: 'setError', value: 'Network issue.' })
                console.log(error, 'error while fetching course_details api')
                setFetching({ type: 'setLoading' })
            })
    }


    const getSearched = async () => {
        setFetching({ type: 'setLoading' })
        let form = new FormData()
        console.log("cust_id", userToken)
        form.append("cust_id", userToken)
        await axios.post(BaseUrl + "/load_search_page", form, {
            headers: { "Content-type": "multipart/form-data" }
        })
            .then((response) => {
                console.log(response.data, 'load_search_page Api successful')
                setFetching({ type: 'setLoading' })
                if (response.data.status === 200) {
                    setRecent(response.data.msg.recent_search)
                    setTrending(response.data.msg.trending.items)
                }
            })
            .catch((error) => {
                setFetching({ type: 'setError', value: 'Network issue.' })
                console.log(error, 'error while fetching load_search_page api')
                setFetching({ type: 'setLoading' })
            })
    }

    const clearRecentSearched = async () => {
        setFetching({ type: 'setLoading' })
        let form = new FormData()
        console.log("cust_id", userToken)
        form.append("cust_id", userToken)
        await axios.post(BaseUrl + "/clear_recent_search", form, {
            headers: { "Content-type": "multipart/form-data" }
        })
            .then((response) => {
                console.log(response.data, 'clear_recent_search Api successful')
                setFetching({ type: 'setLoading' })
                if (response.data.status === 200) {
                    setFetching({ type: 'setSuccess', value: 'Search history cleared successfully!' })
                    setRecent()
                }
                else {
                    setFetching({ type: 'setError', value: response.data.msg })
                }
            })
            .catch((error) => {
                setFetching({ type: 'setError', value: 'Network issue.' })
                console.log(error, 'error while fetching clear_recent_search api')
                setFetching({ type: 'setLoading' })
            })
    }

    useEffect(() => {
        inputRef.current.focus()
        getSearched()
    }, [])

    useEffect(() => {
        getData()
    }, [query])

    return (
        <SafeAreaView style={{ flex: 1, backgroundColor: '#fff', padding: 10 }}>
            {fetching.loading === true ? <Loader /> : null}
            <View style={{ display: 'flex', width: '100%', alignItems: 'center', position: 'relative', marginVertical: 10 }}>

                <View style={[styles.inputWrapper, {
                    shadowColor: borderColor ? '#000' : '#777',
                }]}>
                    <TouchableOpacity style={styles.iconWrapper} onPress={() => { navigation.goBack() }}>
                        {/* <Feather name={'search'} size={22} color={'#9E9696'}></Feather> */}
                        <MaterialIcons name="keyboard-backspace" size={22} color='#000'></MaterialIcons>
                    </TouchableOpacity>
                    <TextInput ref={inputRef}
                        name={'query'} value={query} placeholder={'Search'} keyboardType='default'
                        placeholderTextColor='#888'
                        style={[styles.Input,]}
                        onFocus={() => {
                            setBorderColor(true)
                            // setShowList(true)
                        }}
                        onEndEditing={() => {
                            setBorderColor(false)
                            setShowList(false)
                        }}
                        onChangeText={(text) => {
                            setQuery(text)
                            if (text !== "") {
                                if (!showList) setShowList(true)
                            }
                            else { if (showList) setShowList(false) }
                            console.log(query, 'value')
                        }}
                    ></TextInput>
                </View>

                {
                    showList ?
                        <View style={styles.listWrapper}>
                            {/* <TouchableOpacity onPress={() => inputRef.current.blur()}>
                                < MaterialIcons name='close' size={24} color={'#f33'} style={{alignSelf:'flex-end'}}></MaterialIcons>
                            </TouchableOpacity> */}
                            <ScrollView style={styles.contentScroll} showsVerticalScrollIndicator={false} keyboardShouldPersistTaps='handled'>

                                {mapArray ?
                                    suggested.map((item, idx) =>
                                        <TouchableOpacity
                                            key={idx}
                                            style={styles.listItem} onPress={() => {
                                                console.log('suggested item clicked')
                                                setQuery(item.product_name || item.course_name)
                                                setShowList(false)
                                                if (item.type === 'product') {
                                                    getProduct(item.product_id)
                                                } else getCourse(item.course_id)
                                            }}>
                                            <Text style={styles.listItemTxt}>{item.product_name || item.course_name}</Text>
                                            {/* <Text style={{ color: '#777', fontSize: 12 }}>subtitle</Text> */}

                                            < MaterialIcons name='navigate-next' size={24} color={'#fc9918'}></MaterialIcons>

                                        </TouchableOpacity>
                                    ) : null}
                            </ScrollView>
                        </View>
                        : null
                }

            </View>

            <ScrollView style={styles.contentScroll} showsVerticalScrollIndicator={false} keyboardShouldPersistTaps='handled'>

                {fetching.error ? setTimeout(() => { setFetching({ type: 'setError', value: false }) }, 2000) && <Text style={{ color: 'red' }}>{fetching.error}</Text> : null}
                {fetching.success ? setTimeout(() => { setFetching({ type: 'setSuccess', value: false }) }, 2000) && <Text style={{ color: '#0a0' }}>{fetching.success}</Text> : null}

                <View style={styles.rowAlign}>
                    <Text style={styles.subHeading}>Recent Searches</Text>
                    <TouchableOpacity onPress={() => { clearRecentSearched() }}>
                        <Text style={[styles.regTxt, { color: '#f00' }]}>Clear</Text>
                    </TouchableOpacity>
                </View>

                <View style={styles.rowWrap}>
                    {recent ?
                        recent.map((item, index) =>
                            <TouchableOpacity style={[styles.secBtn,]} key={index}
                                onPress={() => {
                                    console.log('recent item clicked')
                                    setQuery(item.search_term)
                                    setShowList(true)
                                }}>
                                <MaterialIcons name="history"
                                    color='#777'
                                    size={20}
                                    style={{ marginRight: 5, marginBottom: 5 }}
                                />
                                <Text style={styles.secBtnTxt}>{item.search_term}</Text>
                            </TouchableOpacity>
                        ) : null}
                </View>

                <View style={[styles.rowAlign, { marginTop: 10 }]}>
                    <Text style={styles.subHeading}>Trending Searches</Text>
                    {/* <TouchableOpacity onPress={() => { }}>
                    <Text style={[styles.regTxt, { color: '#0a0' }]}>Clear</Text>
                </TouchableOpacity> */}
                </View>

                {trending ? trending.map((item, index) =>
                    <TouchableOpacity style={[styles.rowAlign, { justifyContent: 'flex-start', margin: 5 }]} key={index}
                        onPress={() => {
                            console.log('trending item clicked')
                            setQuery(item.product_name || item.course_name)
                            setShowList(false)
                            if (item.type === 'product') {
                                getProduct(item.product_id)
                            } else getCourse(item.course_id)
                        }}>
                        <Image source={{ uri: item.product_img }} style={{ width: 50, height: 50, resizeMode: 'contain', marginRight: 30 }}></Image>
                        <Text style={[styles.smTxt, { 
                            // fontFamily: 'Poppins-Medium' 
                            }]}>{item.product_name}</Text>
                    </TouchableOpacity>
                ) : null}

            </ScrollView>
        </SafeAreaView>
    )
}

export default SearchScreen

const styles = StyleSheet.create({
    contentScroll: {
        display: 'flex',
        height: '100%',
        width: '100%',
        position: 'relative'
        // borderWidth: 1, borderColor: '#fff'
    },
    heading: {
        fontSize: 18,
        color: '#000',
        // fontFamily: "Poppins-Bold",
        marginBottom: 5,
    },
    subHeadingBold: {
        fontSize: 16,
        color: '#000',
        // fontFamily: "Poppins-SemiBold",
    },
    subHeading: {
        fontSize: 16,
        color: '#000',
        // fontFamily: "Poppins-Medium",
    },
    smTxt: {
        fontSize: 12,
        color: '#000',
        // fontFamily: 'Poppins-Regular'
    },
    regTxt: {
        fontSize: 14,
        color: '#000',
        // fontFamily: 'Poppins-Regular'
    },
    fontMedium: {
        // fontFamily: 'Poppins-Medium'
    },
    rowAlign: {
        display: 'flex', flexDirection: 'row',
        width: '100%',
        justifyContent: 'space-between',
        alignItems: 'center'
    },
    rowWrap: {
        display: 'flex',
        flexDirection: 'row',
        // alignItems: 'center',
        flexWrap: 'wrap',
        // justifyContent: 'center',
        width: '100%',
        marginVertical: 10
    },

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
        width: '90%',
        height: '100%',
        paddingLeft: 10,
        fontSize: 14,
        color: '#000',
        // borderWidth:1,
        // fontFamily: "Poppins-Regular",
    },
    secBtn: {
        display: 'flex',
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
        paddingHorizontal: 10,
        paddingVertical: 5,
        margin: 5,
        borderRadius: 10,
        backgroundColor: 'transparent',
        borderWidth: 1,
        borderColor: '#ccc'
    },
    secBtnTxt: {
        fontSize: 12,
        color: '#999',
        // fontFamily: 'Poppins-Medium'
        // fontFamily: "Poppins-Bold",
    },

    listWrapper: {
        backgroundColor: '#fff', zIndex: 1, position: 'absolute', top: 50,
        borderWidth: 1, borderColor: '#eee', width: '99%', alignSelf: 'center'
    },
    listItem: {
        display: 'flex',
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        height: 50,
        width: '100%',
        backgroundColor: '#fff',
        padding: 10,
        // paddingVertical: 15,
        borderRadius: 20,
        // marginTop: 10,
        borderBottomWidth: 1, borderColor: '#eee'
    },
    listItemTxt: {
        fontSize: 14,
        color: '#666',
        // fontFamily: "PTSans-Bold",
    },
})