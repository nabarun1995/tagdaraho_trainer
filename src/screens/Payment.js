import React from 'react'
import { StyleSheet, Text, View, ScrollView, Alert } from 'react-native'
import RazorpayCheckout from 'react-native-razorpay';
import Button from '../components/Button'
import BaseScreen from '../components/BaseScreen'
import axios from 'react-native-axios'
import { AuthContext } from '../navigation/AuthProvider'

const BaseUrl = "https://shopninja.in/tagdaraho/api2/public/index.php"

const updateOrder = async (type, order_id, navigation, amount, userDetails, setLoading,razorpay_payment_id, payment_status) => {
    setFetching({ type: 'setLoading', value: true })
    console.log('user id is :', userDetails.cust_id, 'order id:', order_id,'item_type', type)
    if (userDetails.cust_id !== '' && order_id !== '') {
        var data = new FormData();
        data.append('customer_id', userDetails.cust_id)
        data.append('item_type', type)
        data.append('paid_amt', amount)
        data.append('payment_status', payment_status)
        data.append('payment_mode', "Razorpay")
        data.append('tr_order_id', order_id)
        await axios.post(BaseUrl + "/update_order_status", data, {
            headers: { "Content-type": "multipart/form-data" }
        })
            .then((response) => {
                console.log(response.data, 'update_order_status Api successful')
                setFetching({ type: 'setLoading', value: false })
                let arr = response.data
                if (response.data.status === 200) {
                    if (payment_status === 2) {
                        navigation.navigate('Thanku')
                    }
                    else Alert.alert('Payment Failed!')
                }
            })
            .catch((error) => {
                setMessage('Network issue.')
                console.log(error, 'error while fetching update_order_status api')
                setFetching({ type: 'setLoading', value: false })
            })
    }
    else {
        Alert.alert('wrong user id')
    }

}

// 2 = success, 3 = failed

export const handlePayments = (type, order_id, navigation, amount, userDetails, setLoading) => {

    var options = {
        description: 'Order fee',
        image: "https://TagdaRaho.in/android_shop/" + userDetails.profile_pic,
        currency: 'INR',
        key: 'rzp_test_7JFMstTaZGMnre', // Your api key
        amount: amount * 100,//amount in paise
        name: 'TagdaRaho',
        prefill: {
            email: userDetails.cust_email,
            contact: userDetails.cust_mobile,
            name: userDetails.cust_name
        },
        theme: { color: '#F37254' }
    }
    RazorpayCheckout.open(options).then((data) => {
        // handle success
        console.log('Success, payment id:', data.razorpay_payment_id, 'order id:', data.razorpay_order_id, 'signature:', data.razorpay_signature)
        console.log('Success, payment id:', data)
        updateOrder(type, order_id, navigation, amount, userDetails, setLoading, data.razorpay_payment_id, 2)
    }).catch((error) => {
        // handle failure
        // Alert.alert('Error:', error.code, error.description)
        console.log(error)
        updateOrder(type, order_id, navigation, amount, userDetails, setLoading, data.razorpay_payment_id, 3)
    });
}
