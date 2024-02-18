
// Dito yung mga bottom tab nav
import { StyleSheet, Text, View, Modal } from 'react-native'
import React from 'react'

import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { createDrawerNavigator } from '@react-navigation/drawer';
import { colors } from '../src/utils/colors';

// Icons for botnav
import { Ionicons } from '@expo/vector-icons';
import { MaterialCommunityIcons } from '@expo/vector-icons';

// Screens for bot nav import
import Home from '../src/screen/home';
import Main from '../src/screen/main';
import About from '../src/screen/about';
import Profile from '../src/screen/profile';
import Faq from '../src/screen/faq';
import setting from '../src/screen/setting';
import AddPostScreen from '../src/screen/AddPostScreen';
import SubmittedPostScreen from '../src/screen/SubmittedPostScreen';


// icons for drawer hihi

import { AntDesign } from '@expo/vector-icons';
import { Feather } from '@expo/vector-icons'; 
import { SimpleLineIcons } from '@expo/vector-icons';
import historyScreen from '../src/screen/historyScreen';

//testing ng bot nav quoh-dibid 
import { BottomNavigation } from 'react-native-paper';
import { SafeAreaProvider } from 'react-native-safe-area-context';


const Stack = createNativeStackNavigator();
const BotTab = createBottomTabNavigator();
const Drawer = createDrawerNavigator();

// for drawer design -Aru

const homedrawerIcon = ({ focused, color, size }) => <AntDesign name="home" size={25} color="black" />
const maindrawerIcon = ({ focused, color, size }) => <MaterialCommunityIcons name="transcribe" size={25} color="black" />
const profiledrawerIcon = ({ focused, color, size }) => <Feather name="user" size={25} color="black" />
const faqdrawerIcon = ({ focused, color, size }) => <MaterialCommunityIcons name="comment-question-outline" size={25} color="black" />
const aboutdrawerIcon = ({ focused, color, size }) => <Ionicons name="people-outline" size={25} color="black" />
const settingdrawerIcon = ({ focused, color, size }) => <Feather name="settings" size={25} color="black" />
const logoutdrawerIcon = ({ focused, color, size }) => <SimpleLineIcons name="logout" size={25} color="black" />


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
      component={Profile}
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
      name= "History"
      component={historyScreen}
      options={{
        headerShown: true,
      }}
    />
  </Stack.Navigator>
);
///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////


///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
const HomeDrawerStack = ({}) => (
  
  <Drawer.Navigator initialRouteName="Home" screenOptions={{headerShown: false}}>

    <Drawer.Screen name="Home" component={Home} options={{drawerIcon:homedrawerIcon}}  />

    <Drawer.Screen name="Main" component={MainStack} options={{headerShown: true, drawerIcon:maindrawerIcon}}  />
    
    <Drawer.Screen name="Profile" component={Profile} options={{headerShown: true, drawerIcon:profiledrawerIcon}} />

    <Drawer.Screen name="F.A.Q" component={Faq} options={{headerShown: true, drawerIcon:faqdrawerIcon }} />

    <Drawer.Screen name="About" component={About} options={{headerShown: true, drawerIcon:aboutdrawerIcon }}  />

    <Drawer.Screen name="Settings" component={setting} options={{headerShown: true, drawerIcon:settingdrawerIcon }} />

    <Drawer.Screen name="Logout" component={setting} options={{headerShown: true, drawerIcon:logoutdrawerIcon}}  />
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
      component={Faq}
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

//////////////////////////////////////////////////////////////drawer sa gedli ng meralco/////////////////////////////////////////////////////////////////////









//////////////////////////////////////////////////////////////bulutong nav /////////////////////////////////////////////////////////////////////
// const AppStack = () => {
//   const [index, setIndex] = React.useState(0);
//   const [routes] = React.useState([
//     { key: 'home', title: 'Home', icon: 'home', customIcon: AntDesign },
//     { key: 'main', title: 'Main', icon: 'transcribe', customIcon: MaterialCommunityIcons },
//     { key: 'about', title: 'About', icon: 'people-outline', customIcon: Ionicons },
//   ]);
//   const renderScene = BottomNavigation.SceneMap({
//     home: HomeStack,
//     main: Main,
//     about: About,
//   });
//   const renderIcon = ({ route, color, focused }) => {
//     const CustomIcon = route.customIcon;
//     const iconSize = focused ? 25 : 30; // Adjust the sizes based on your preference
//     const iconColor = focused ? '#003153' : color; // Highlight color when pressed
//     return (
//       <CustomIcon
//         name={route.icon}
//         size={iconSize}
//         color={iconColor}
        
//       />
//     );
//   };
//   return (

//     <SafeAreaProvider>
//        <View style={styles.container}>
//     <BottomNavigation
//       navigationState={{ index, routes }}
//       onIndexChange={setIndex}
//       renderScene={renderScene}
//       barStyle={styles.bottomBar}
//       inactiveColor='white'
//       activeColor='white'
//       renderIcon={renderIcon}
//       shifting={true}
//       labelStyle={{ color: 'white' }} // Set label text color to white
      
//     />
//     </View>
//     </SafeAreaProvider>

//   );
// };

// export default AppStack;

////////////////////////////////////////////////////////////LUMANG BOT NAV/////////////////////////////////////////////////////////////////////
const AppStack = () => {
  return (
    <BotTab.Navigator
      screenOptions={{
        headerShown: false,
        tabBarActiveTintColor: colors.secondary,
        tabBarInactiveTintColor: colors.secondary,
        tabBarStyle: { backgroundColor: colors.primary, width: '90%' ,alignSelf: 'center', marginBottom:20, borderTopLeftRadius: 25, borderTopRightRadius: 25, borderBottomLeftRadius: 25, borderBottomRightRadius:25},
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
        component={About}
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



const styles = StyleSheet.create({
  
});
