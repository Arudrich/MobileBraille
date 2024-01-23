import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View, } from 'react-native';
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import splash from "./src/screen/splash";
import login from "./src/screen/login";
import register from "./src/screen/register";
import home from "./src/screen/home";

const Stack = createNativeStackNavigator();

export default function App() {
  return (
    <NavigationContainer independent= { true }>
    <Stack.Navigator initialRouteName= "splash" screenOptions={{ headerShown: false, }}>
      
      <Stack.Screen name="splash" component={ splash } />
      <Stack.Screen name="login" component={ login } />
      <Stack.Screen name="register" component={ register } />
      <Stack.Screen name="home" component={ home } />

      
    </Stack.Navigator>
  </NavigationContainer>
   
  );
} ;

