// Dito yung mga bottom tab nav
import { StyleSheet, Text, View } from 'react-native'
import React from 'react'

import { createNativeStackNavigator } from '@react-navigation/native-stack';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import { colors } from '../src/utils/colors';

//icons for botnav
import { Ionicons } from '@expo/vector-icons';
import { MaterialCommunityIcons } from '@expo/vector-icons';

//screens for bot nav import
import home from '../src/screen/home';
import main from '../src/screen/main';
import about from '../src/screen/about';
import profile from '../src/screen/profile';


// needed kung may additional screen sa iisang bottom nav
const Stack = createNativeStackNavigator();
//this is for botnav
const BotTab = createBottomTabNavigator();

// add dito kung may screens within the tab <Stack ang gamitin dito>
const HomeStack = ({navigation}) => (
    <Stack.Navigator>
      <Stack.Screen
          name="Home"
          component={home}
          options={{
            headerShown: false,
          }}
        />
      <Stack.Screen
        name="Profile"
        component={profile}
        options={{
          headerShown: false,
        }}
      />
      {/* <Stack.Screen
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
      /> */}
    </Stack.Navigator>
  );

const AppStack = () => {


  return (
    <BotTab.Navigator 
        screenOptions={{
        headerShown: false,
        tabBarActiveTintColor: colors.primary,
        tabBarAllowFontScaling: 10,
      }}>
      
        <BotTab.Screen 
            name= "Home"
            component={HomeStack}
            options={{
                tabBarIcon:({color}) => (
                  <Ionicons name="home-outline" size={30} color={color}/>
                )
            }}
        />

         <BotTab.Screen 
            name= "Main"
            component={main}
            options={{
                tabBarIcon:({color}) => (
                  <MaterialCommunityIcons name="transcribe" size={30} color= {color} />
                )
            }}
        />

        <BotTab.Screen 
            name= "About"
            component={about}
            options={{
                tabBarIcon:({color}) => (
                  <Ionicons name="people-circle-sharp" size={30} color= {color} />
                )
            }}
        />

          

    </BotTab.Navigator>
  )
}

export default AppStack

const styles = StyleSheet.create({})