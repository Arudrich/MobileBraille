import { View, Text , SafeAreaView } from 'react-native'
import React, { useEffect } from 'react';
import { useNavigation } from '@react-navigation/native';


const splash = () => {

    const nav = useNavigation()

    useEffect(() => {
        setTimeout(() => {
           nav.replace('Login')
        }, 5000);
       }, []);


  return (




    <SafeAreaView>
      <Text>Splash Screen</Text>
    </SafeAreaView>
  )
}

export default splash