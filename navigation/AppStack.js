
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
import setting from '../src/screen/setting';
import AddPostScreen from '../src/screen/AddPostScreen';
import SubmittedPostScreen from '../src/screen/SubmittedPostScreen';


// icons for drawer hihi

import { AntDesign } from '@expo/vector-icons';
import { Feather } from '@expo/vector-icons'; 
import { SimpleLineIcons } from '@expo/vector-icons';





const Stack = createNativeStackNavigator();
const BotTab = createBottomTabNavigator();
const Drawer = createDrawerNavigator();

// for drawer design -Aru

const homedrawerIcon = ({ focused, color, size }) => <AntDesign name="home" size={30} color="black" />
const maindrawerIcon = ({ focused, color, size }) => <MaterialCommunityIcons name="transcribe" size={30} color="black" />
const profiledrawerIcon = ({ focused, color, size }) => <Feather name="user" size={30} color="black" />
const faqdrawerIcon = ({ focused, color, size }) => <MaterialCommunityIcons name="comment-question-outline" size={30} color="black" />
const aboutdrawerIcon = ({ focused, color, size }) => <Ionicons name="people-outline" size={30} color="black" />
const settingdrawerIcon = ({ focused, color, size }) => <Feather name="settings" size={24} color="black" />
const logoutdrawerIcon = ({ focused, color, size }) => <SimpleLineIcons name="logout" size={24} color="black" />




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

// nav drawer

const HomeDrawerStack = ({}) => (


  <Drawer.Navigator initialRouteName="Home" screenOptions={{headerShown: false}}>

    <Drawer.Screen name="Home" component={home} options={{drawerIcon:homedrawerIcon}}  />

    <Drawer.Screen name="Main" component={Main} options={{drawerIcon:maindrawerIcon}}  />
    
    <Drawer.Screen name="Profile" component={profile} options={{headerShown: true, drawerIcon:profiledrawerIcon}} />

    <Drawer.Screen name="F.A.Q" component={faq} options={{headerShown: true, drawerIcon:faqdrawerIcon }} />

    <Drawer.Screen name="About" component={about} options={{headerShown: true, drawerIcon:aboutdrawerIcon }}  />

    <Drawer.Screen name="Settings" component={setting} options={{headerShown: true, drawerIcon:settingdrawerIcon }} />

    <Drawer.Screen name="Logout" component={profile} options={{headerShown: true, drawerIcon:logoutdrawerIcon}}  />

    



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
    <Stack.Screen
      name="SubmittedPost"
      component={SubmittedPostScreen}
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
            <AntDesign name="home" size={30} color={color}/>
          ),
        }}
      />
      <BotTab.Screen
        name="Main"
        component={MainStack}
        options={{
          tabBarIcon: ({ color }) => (
            <MaterialCommunityIcons name="transcribe" size={30} color={color} />
          ),
        }}
      />
      <BotTab.Screen
        name="About"
        component={about}
        options={{
          tabBarIcon: ({ color }) => (
            <Ionicons name="people-outline" size={30} color={color} />
          ),
        }}
      />
    </BotTab.Navigator>









  );
}

export default AppStack;



const styles = StyleSheet.create({});
