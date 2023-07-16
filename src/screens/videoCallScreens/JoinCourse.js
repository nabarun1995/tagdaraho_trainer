import { StyleSheet, Text, View, StatusBar, SafeAreaView } from 'react-native'
import React, { useState, useEffect, useRef, useContext } from 'react'
import AgoraUIKit from 'agora-rn-uikit';
import Button from '../../components/Button'
import * as Animatable from 'react-native-animatable';
import Timer from './Timer';
import { AuthContext } from '../../navigation/AuthProvider';
import axios from 'react-native-axios'

const JoinCourse = ({ navigation, route }) => {

    const { channel, token, callTiming, callId } = route.params

    const { setFetching, BaseUrl } = useContext(AuthContext)

    const [connected, setConnected] = useState(false)
    const [videoCall, setVideoCall] = useState(true)
    const [counter, setCounter] = useState(callTiming)
    const [startTime, setStartTime] = useState()
    const refTimer = useRef()
    const connectionData = {
        appId: '8139420c996f4959a4f3b282e25d235a',
        channel: channel,
        token: token
        // channel: 'TagdaChannel',
        // token: "007eJxTYPipcsD8YlDHHl/nKfcZjrql8Dn/1JdfrWBbl8yQOiNzLa8Cg4WhsaWJkUGypaVZmomlqWWiSZpxkpGFUaqRaYqRsWnilUUsycFfWJM/7ljGwAiFID4PQ0hiekqic0ZiXl5qDgMDAMu4IhE=",
    };

    useEffect(() => {
        const startDate = new Date()
        // toTimeString()
        const strtTime = startDate.toLocaleTimeString()
        console.log(channel, token, 'params here')
        setStartTime(strtTime)
    }, [channel])

    const rtcCallbacks = {
        EndCall: () => {
            setVideoCall(false)
            updateVideoCallTiming()
            // navigation.navigate('BottomTab')
        },
        UserJoined: () => {
            console.log('some user joined')
            setConnected(true)
        },
        UserOffline: () => {
            console.log('some user left the video')
            // setVideoCall(false)
            // navigation.navigate('BottomTab')
        },
    };

    const timerCallbackFunc = timerFlag => {
        setVideoCall(false)
        setConnected(false)
        // setFetching({ type: 'setSuccess', value: 'Meeting Successfull!' })
        updateVideoCallTiming()
        navigation.navigate('Home')
    };

    const updateVideoCallTiming = async () => {
        setFetching({ type: 'setLoading', value: true })
        const crrDate = new Date()
        const crrTime = crrDate.toLocaleTimeString()
        console.log('start time is:', startTime, 'end time is:', crrTime)
        var data = new FormData()
        data.append('group_call_id', callId)
        data.append('call_start_time', startTime)
        data.append('call_end_time', crrTime)
        //1 = success, 2 = failed
        data.append('call_status', '1')
        await axios.post(BaseUrl + "/update_group_call_status", data, {
            headers: { "Content-type": "multipart/form-data" }
        })
            .then((response) => {
                console.log(response.data, 'update_group_call_status Api successful')
                setFetching({ type: 'setLoading', value: false })
                if (response.data.status === 200) {
                    setFetching({ type: 'setSuccess', value: 'Meeting Successfull!' })
                }
                else {
                    setFetching({ type: 'setError', value: response.data.msg })
                }
            })
            .catch((error) => {
                setFetching({ type: 'setError', value: error.message })
                console.log(error, 'error while fetching update_group_call_status api')
                setFetching({ type: 'setLoading', value: false })
            })

    }

    return (
        <View style={{ justifyContent: 'center', flex: 1, backgroundColor: '#000' }}>
            <StatusBar backgroundColor={"#000"} barStyle={'light-content'} translucent />
            <View style={{ alignSelf: 'center', flexDirection: 'row', justifyContent: 'flex-end', alignItems: 'flex-end', position: 'absolute', bottom: 120, zIndex: 1 }}>
                {!connected ?
                    <>
                        <Text style={{ color: '#fff', fontSize: 18, }}>
                            Connecting
                        </Text>
                        <Animatable.Text animation="flash" easing="ease-in-out" iterationCount="infinite" duration={2000} delay={0} style={{ color: '#fff', fontSize: 24, }}> ...</Animatable.Text>
                    </> :
                    <Timer
                        ref={refTimer}
                        timestamp={counter}
                        timerCallback={timerCallbackFunc}
                        textStyle={{ color: '#fff', }}
                    />
                }
            </View>
            {videoCall ?
                <AgoraUIKit connectionData={connectionData} rtcCallbacks={rtcCallbacks} />
                :
                // <Text onPress={() => setVideoCall(true)}>Start Call</Text>
                <View style={{ width: "100%", height: "100%", justifyContent: 'center', alignItems: 'center' }}>
                    <Button title="Join call again" width={'80%'} onPress={() => setVideoCall(true)} />
                    <Button title="Leave" width={'80%'} onPress={() => navigation.navigate('Home')} />
                </View>
            }
        </View>
    )
}

export default JoinCourse

const styles = StyleSheet.create({})