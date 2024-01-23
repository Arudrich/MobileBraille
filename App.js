import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View, } from 'react-native';
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import splash from "./src/screen/splash";

const Stack = createNativeStackNavigator();

export default function App() {
  return (
    <NavigationContainer independent= { true }>
    <Stack.Navigator initialRouteName= "splash" screenOptions={{ headerShown: false, }}>
      <Stack.Screen name="splash" component={ splash } />
      
    </Stack.Navigator>
  </NavigationContainer>
   
  );
} ;

