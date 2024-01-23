// Dito yung mga bottom tab nav
import { StyleSheet, Text, View } from 'react-native'
import React from 'react'

import {createStackNavigator} from '@react-navigation/stack';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import { colors } from '../src/utils/colors';

// needed kung may additional screen sa iisang bottom nav
const Stack = createStackNavigator();
//this is for botnav
const BotTab = createBottomTabNavigator();

// add dito kung may screens within the tab <Stack ang gamitin dito>
const ProfileStack = ({navigation}) => (
    <Stack.Navigator>
      <Stack.Screen
        name="Profile"
        component={ProfileScreen}
        options={{
          headerShown: false,
        }}
      />
      <Stack.Screen
        name="EditProfile"
        component={EditProfileScreen}
        options={{
          headerTitle: 'Edit Profile',
          headerBackTitleVisible: false,
          headerTitleAlign: 'center',
          headerStyle: {
            backgroundColor: '#fff',
            shadowColor: '#fff',
            elevation: 0,
          },
        }}
      />
    </Stack.Navigator>
  );

const AppStack = () => {


  return (
    <BotTab.Navigator 
        screenOptions={{
        headerShown: false,
        tabBarActiveTintColor: colors.primary,
      }}>

    </BotTab.Navigator>
  )
}

export default AppStack

const styles = StyleSheet.create({})