import React from 'react'
import { View, Text , ActivityIndicator,StyleSheet } from 'react-native'

const Loader = () => {
    return (
        <View style={styles.container}>
            <ActivityIndicator size='large' color="#fc9918" />
        </View>
    )
}

const styles = StyleSheet.create({
    container:{
        position: 'absolute',top:0,bottom:0,left:0,right:0,
        flex:1,
        backgroundColor: '#0009',
        zIndex:100,
        justifyContent:'center',alignItems:'center'
    }
})
export default Loader
