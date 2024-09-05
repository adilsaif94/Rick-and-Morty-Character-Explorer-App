import { StyleSheet, Text, View } from 'react-native'
import React from 'react'
import { NavigationContainer } from '@react-navigation/native';
import Navigators from './Navigation/Navigator';


const App = () => {
  return (
    <NavigationContainer>
      <Navigators />
    </NavigationContainer>
  )
}

export default App

const styles = StyleSheet.create({})