import 'react-native-gesture-handler';
import { StyleSheet, Text, View, StatusBar } from 'react-native'
import React from 'react'
import MaterialIcons from 'react-native-vector-icons/dist/MaterialIcons'
import Providers from './src/navigation/Index'

const App = () => {
  return (
    <>
      <StatusBar backgroundColor="#fff"
        // translucent={true}
        barStyle='dark-content'
      ></StatusBar>
      <Providers />
    </>
  )
}

export default App

const styles = StyleSheet.create({})