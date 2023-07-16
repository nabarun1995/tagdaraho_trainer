import React, { useState, useContext, useEffect } from 'react'
import { StyleSheet, Text, TouchableOpacity, View, TextInput, Image, ScrollView, ImageBackground, StatusBar } from 'react-native'
import MaterialIcons from 'react-native-vector-icons/dist/MaterialIcons'
import FontAwesome5 from 'react-native-vector-icons/dist/FontAwesome5'
import Feathers from 'react-native-vector-icons/dist/Feather'
import * as Animatable from 'react-native-animatable'
import { AuthContext } from '../../navigation/AuthProvider'
import AgoraUIKit from 'agora-rn-uikit';
import SoundPlayer from 'react-native-sound-player'
import { VideoRenderMode } from 'react-native-agora/src/common/Enums'
import axios from 'react-native-axios'
// import KeepAwake from 'react-native-keep-awake';


const Content = ({ navigation }) => {

    const { notify, setNotify, callData, userToken, BaseUrl, setLoading } = useContext(AuthContext)

    const activeColor = "red"

    const [videoCall, setVideoCall] = useState(false);
    const [play, setPlay] = useState(true)

    const connectionData = {
        appId: '8139420c996f4959a4f3b282e25d235a',
        channel: 'TagdaChannel',
        token: "0068139420c996f4959a4f3b282e25d235aIABpjuZ64/f2UgnGuDLPdFrNnm7quoYef6HcfngM+EugmcXpLwsAAAAAEADBC/XBe7eVYgEAAQB8t5Vi"
    };

    const rtcCallbacks = {
        EndCall: () => {
            setVideoCall(false)
            navigation.navigate('BottomTab')
        },
        UserJoined: () => {
            console.log('trainer joined')
        },
        UserOffline: () => {
            console.log('trainer left the video')
            setVideoCall(false)
            navigation.navigate('BottomTab')
        },
    };

    // const onRejectCall = async () => {
    //     await axios.post(BaseUrl + "get_customer_call_status",
    //         {
    //             appointment_id: callData.field2,
    //             customer_id: userToken,
    //             call_status: 'Rejected'
    //         }
    //     )
    //         .then((response) => {
    //             setFetching({ type: 'setLoading', value: false })
    //             console.log(response.data, 'get_customer_call_status Api successful')
    //             if (response.data.status === 200) {
    //                 console.log(response.data)
    //             }
    //         })
    //         .catch((error) => {
    //             console.log(error, 'error while fetching get_customer_call_status Api')
    //             setFetching({ type: 'setLoading', value: false })
    //         })
    // }

    const playSound = () => {
        try {
            SoundPlayer.playSoundFile('gmail_voice_call', 'mp3')
        } catch (e) {
            // alert('Cannot play the file')
            console.log('cannot play the song file', e)
        }
    }

    const stopSound = async () => {
        // try {
        //   const info = await SoundPlayer.getInfo() // Also, you need to await this because it is async
        //   console.log('getInfo', info) // {duration: 12.416, currentTime: 7.691}
        // } catch (e) {
        //   console.log('There is no song playing', e)
        // }
        try {
            const info = await SoundPlayer.pause()
            console.log('stopped playing')
        } catch (e) {
            console.log('There is no song playing', e)
        }
    }

    useEffect(() => {
        playSound()
    }, [callData])

    // useEffect(() => {
    //     if (videoCall) {
    //         KeepAwake.activate();
    //     }
    //     else {
    //         KeepAwake.deactivate();
    //     }
    // }, [videoCall])

    return (
        <View style={styles.content}>
            <StatusBar backgroundColor={"#000"} translucent />

            {videoCall ?
                <View style={{ position: 'absolute', top: 0, bottom: 0, left: 0, right: 0, zIndex: 999, backgroundColor: '#000' }}>
                    <AgoraUIKit connectionData={connectionData} rtcCallbacks={rtcCallbacks}
                    // styleProps={{
                    //     UIKitContainer: { height: '100%', width: '100%' },
                    //     videoMode: {
                    //         max: VideoRenderMode.Hidden,
                    //         min: VideoRenderMode.Hidden
                    //     },
                    //     localBtnStyles: {
                    //         endCall: {
                    //             width: 50, height: 50,
                    //             borderRadius: 100,
                    //             backgroundColor: '#f33',
                    //             borderWidth: 0, elevation: 3
                    //         },
                    //         switchCamera: {},
                    //         muteLocalVideo: {},
                    //         muteLocalVideo: {}
                    //     },
                    //     localBtnContainer: {
                    //         height: 50,
                    //         width: '75%',
                    //         position: 'absolute',
                    //         bottom: 40,
                    //         left: '30%'
                    //         // bottom: -65,
                    //     },
                    //     maxViewRemoteBtnContainer: {
                    //         display: 'none'
                    //     },
                    //     maxViewStyles: {
                    //         // marginBottom: 100,
                    //         height: '80%', width: '100%',
                    //         alignSelf: 'center',
                    //     },
                    //     minViewContainer: {
                    //         position: 'absolute',
                    //         top: '80%',
                    //         // left:'70%',
                    //         // alignSelf:'flex-end',
                    //         marginVertical: 10
                    //     },
                    //     minViewStyles: {
                    //         height: 100, width: 100,

                    //     },
                    //     iconSize: 30,
                    //     BtnTemplateStyles: {}
                    // }} 
                    />
                </View>
                :
                null
            }

            {/* <Text style={styles.whiteTxt}>{callData.field1.split(",")[0]}</Text> */}
            <Animatable.View animation="flash" easing="ease-in-out" iterationCount='infinite' duration={1000} delay={0} >
                <Text style={styles.whiteTxt}>
                    {/* {notify}  */}
                    Video Call...</Text>
            </Animatable.View>
            <Animatable.View animation="pulse" easing="ease-out" iterationCount='infinite' duration={1000} delay={0} >
                <Feathers name='phone-call' size={85} color='#fff' />
                {/* <MaterialIcons name='phone-in-talk' size={85} color='#fff' /> */}
            </Animatable.View>

            <View style={styles.btnRow}>
                <TouchableOpacity style={[styles.solidBtn, styles.callButton, { backgroundColor: '#3a3' }]}
                    onPress={() => {
                        stopSound()
                        setVideoCall(true)
                    }}>
                    <Text style={styles.solidBtnTxt}>Accept</Text>
                </TouchableOpacity>
                <TouchableOpacity style={[styles.solidBtn, styles.callButton]}
                    onPress={() => {
                        // onRejectCall()
                        stopSound()
                        // setNotify('')
                        console.log(notify, 'notify value')
                        navigation.navigate('BottomTab')
                    }}>
                    <Text style={styles.solidBtnTxt}>Reject</Text>
                </TouchableOpacity>
            </View>
        </View>
    )
}

const IncomingCall = ({ navigation }) => {
    return (
        // <BaseScreen title={'Call Invitation'} navigation={navigation} renderChild={Content({ navigation })} notGoBack={true} />
        <Content navigation={navigation} />
    )
}

export default IncomingCall

const styles = StyleSheet.create({

    whiteTxt: {
        color: '#aaa',
        fontSize: 20,
        marginBottom: 50,
        // fontFamily: "PTSans-Bold",
    },
    aText: {
        fontSize: 20,
        color: '#fff',
        marginBottom: 10,
        // fontFamily: "PTSans-Bold",
    },
    content: {
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        height: '100%',
        width: '100%',
        backgroundColor: '#000'
    },

    solidBtn: {
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        width: '100%',
        height: 40,
        marginVertical: 15,
        borderRadius: 10,
        backgroundColor: '#f33',
    },
    solidBtnTxt: {
        fontSize: 16,
        color: '#fff',
        // fontFamily: "PTSans-Bold",
    },
    rowAlign: {
        display: 'flex', flexDirection: 'row',
        alignItems: 'center'
    },
    callButton: {
        borderRadius: 2,
        width: '40%',
        margin: 0,
    },
    btnRow: {
        marginVertical: 40,
        display: 'flex',
        flexDirection: 'row',
        justifyContent: 'space-around',
        alignItems: 'center',
        width: '100%',
    },
    reviewSubject: {
        color: '#eee',
        fontSize: 26,
        // fontFamily: "PTSans-Bold",
        marginTop: 20,
    },
})
