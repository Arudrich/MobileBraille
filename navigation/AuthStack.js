//dito yung stack nav ng login and splash


import { StyleSheet, Text, View } from 'react-native'
import {createStackNavigator} from '@react-navigation/stack';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import React from 'react'
import Splash from '../src/screen/splash';
import Login from '../src/screen/login';
import Register from '../src/screen/register';
import Home from '../src/screen/home';
import Faq from '../src/screen/faq';

const Stack = createStackNavigator();

const AuthStack = () => {
  return (
    
    <Stack.Navigator initialRouteName="splash" screenOptions={{ headerShown: false}} >
      <Stack.Screen name="splash" component={ Splash } />
      <Stack.Screen name="login" component={ Login } />
      <Stack.Screen name="register" component={ Register } />
      <Stack.Screen name="home" component={ Home } /> 
      <Stack.Screen name="faq" component={ Faq } /> 

    </Stack.Navigator>
  )
}

export default AuthStack

const styles = StyleSheet.create({})