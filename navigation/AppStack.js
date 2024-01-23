// Dito yung mga bottom tab nav
import { StyleSheet, Text, View } from 'react-native'
import React from 'react'

import { createNativeStackNavigator } from '@react-navigation/native-stack';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import { colors } from '../src/utils/colors';
import home from '../src/screen/home';

// needed kung may additional screen sa iisang bottom nav
const Stack = createNativeStackNavigator();
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
        <BotTab.Screen 
            name= "Home"
            component={home}
            options={{
                tabBarIcon:({color}) => (
                    <Ionicons />
                )
            }}
        />
    </BotTab.Navigator>
  )
}

export default AppStack

const styles = StyleSheet.create({})