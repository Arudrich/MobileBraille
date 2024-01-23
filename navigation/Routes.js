// will decide whether it will go to AppStack or AuthStack
import { StyleSheet, Text, View } from 'react-native'
import React, {useContext, useState, useEffect} from 'react'
import {NavigationContainer} from '@react-navigation/native';

import AuthStack from './AuthStack';
import AppStack from './AppStack';

const Routes = () => {
  return (
    <NavigationContainer>
      <Text>Routes</Text>
    </NavigationContainer>
  )
}

export default Routes

