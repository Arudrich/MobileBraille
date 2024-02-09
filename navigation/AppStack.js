
// Dito yung mga bottom tab nav
import { StyleSheet, Text, View } from 'react-native'
import React from 'react'

import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { createDrawerNavigator } from '@react-navigation/drawer';
import { colors } from '../src/utils/colors';

// Icons for botnav
import { Ionicons } from '@expo/vector-icons';
import { MaterialCommunityIcons } from '@expo/vector-icons';

// Screens for bot nav import
import home from '../src/screen/home';
import Main from '../src/screen/main';
import about from '../src/screen/about';
import profile from '../src/screen/profile';
import faq from '../src/screen/faq';
import AddPostScreen from '../src/screen/AddPostScreen';

const Stack = createNativeStackNavigator();
const BotTab = createBottomTabNavigator();
const Drawer = createDrawerNavigator();

const HomeStack = ({ navigation }) => (
  <Stack.Navigator>
    <Stack.Screen
      name="Home"
      component={HomeDrawerStack}
      options={{
        headerShown: false,

      }}
    />

 
    <Stack.Screen
      name="Profile"
      component={profile}
      options={{
        headerShown: true,
        headerStyle: {
          backgroundColor: '#fff',
          shadowColor: '#fff',
          elevation: 0,
        },
      }}
    />
  </Stack.Navigator>
);

const HomeDrawerStack = () => (
  <Drawer.Navigator initialRouteName="Home" screenOptions={{headerShown: false}}>
    <Drawer.Screen name="Home" component={home} />



    {/* Add other screens you want in the drawer navigator */}
  </Drawer.Navigator>
);

const MainStack = ({ navigation }) => (
  <Stack.Navigator>
    <Stack.Screen
      name="main"
      component={Main}
      options={{
        headerShown: false,
      }}
    />
    <Stack.Screen
      name="Faq"
      component={faq}
      options={{
        headerShown: false,
        headerStyle: {
          backgroundColor: '#fff',
          shadowColor: '#fff',
          elevation: 0,
        },
      }}
    />
    <Stack.Screen
      name="AddPost"
      component={AddPostScreen}
      options={{
        headerShown: true,
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
        tabBarAllowFontScaling: 10 ,
        
      }}
    >
      <BotTab.Screen
        name="Home"
        component={HomeStack}
        options={{
          tabBarIcon: ({ color }) => (
            <Ionicons name="home-outline" size={25} color={color} />
          ),
        }}
      />
      <BotTab.Screen
        name="Main"
        component={MainStack}
        options={{
          tabBarIcon: ({ color }) => (
            <MaterialCommunityIcons name="transcribe" size={25} color={color} />
          ),
        }}
      />
      <BotTab.Screen
        name="About"
        component={about}
        options={{
          tabBarIcon: ({ color }) => (
            <Ionicons name="people-circle-sharp" size={25} color={color} />
          ),
        }}
      />
    </BotTab.Navigator>
  );
}

export default AppStack;



const styles = StyleSheet.create({});
