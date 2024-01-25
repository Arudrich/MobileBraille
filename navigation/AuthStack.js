//dito yung stack nav ng login and splash


import { StyleSheet, Text, View } from 'react-native'
import {createStackNavigator} from '@react-navigation/stack';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import React from 'react'
import splash from '../src/screen/splash';
import Login from '../src/screen/login';
import register from '../src/screen/register';
import home from '../src/screen/home';

const Stack = createStackNavigator();

const AuthStack = () => {
  return (
    <Stack.Navigator initialRouteName="splash" screenOptions={{ headerShown: false}} >
      <Stack.Screen name="splash" component={ splash } />
      <Stack.Screen name="login" component={ Login } />
      <Stack.Screen name="register" component={ register } />
       <Stack.Screen name="home" component={ home } /> 
    </Stack.Navigator>
  )
}

export default AuthStack

const styles = StyleSheet.create({})