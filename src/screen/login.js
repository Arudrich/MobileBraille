import {View, Text, ScrollView, TouchableOpacity, TextInput, Image, Alert, KeyboardAvoidingView, Platform, StatusBar } from "react-native";
import React, { useContext, useState } from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import { Ionicons } from "@expo/vector-icons";
import { useNavigation } from "@react-navigation/native";
import { signInWithEmailAndPassword } from "firebase/auth";
import { authentication } from "../../FirebaseConfig";
import { AuthContext } from "../../navigation/AuthProvider";

// icons

import { MaterialIcons } from '@expo/vector-icons';
import { FontAwesome5 } from '@expo/vector-icons';





const Login = () => {
  const {login} = useContext(AuthContext);

  const nav = useNavigation();

  const [loginCredentials, setloginCredentials] = useState({
    email: "",
    password: "",
  });
  
  const [isVisbile, setisVisbile] = useState(true);

  const { email, password } = loginCredentials;

  const loginUser = () => {
    signInWithEmailAndPassword(authentication, email, password)
      .then((value) => {
        nav.replace('home')
      })
      .catch((err) => {
        Alert.alert(err.message);
      });
  };

  return (


      <SafeAreaView style = {{ backgroundColor: 'white', flex: 1 }}>
        
      <ScrollView>

      <Text style={{ fontWeight: 'bold', fontSize: 48, color: '#062CD4', paddingTop: 71, paddingLeft: 130 }}> LOGIN
      
      </Text>

        <View style={{ paddingHorizontal: 20, marginTop: 15, }}>
         
          <Text
            style={{
              fontSize: 16,
              fontWeight: "400",
              color: "black",
              marginTop: 30,
              paddingLeft: 12
            }}
          >
            {" "}
            Please enter your login information below
          </Text>

          <Text
            style={{
              fontSize: 16,
              fontWeight: "400",
              color: "black",
              paddingLeft: 12
              
            }}
          >
            {" "}
           to access your account
          </Text>

          <Text
            style={{
              fontSize: 16,
              fontWeight: "500",
              color: "black",
              marginTop: 40,
              paddingLeft: 12
            }}
          >
            Email
          </Text>
          
          <View
            style={{
              borderColor: "grey",
              height: 59,
              width: 340,
              margin: 12,
              borderWidth: 1,
              borderRadius: 8,
              paddingHorizontal: 12,
              paddingVertical: 12,
              flexDirection: "row",
              justifyContent: "space-between",
              alignItems: "center",
            }}
          >

          <MaterialIcons name="email" size={24} color= "blue" />

          <TextInput
            mode = "flat"
            value={email}
            onChangeText={(value) =>
              setloginCredentials({ ...loginCredentials, email: value })
            }
            keyboardType="email-address"
            style={{
                fontSize: 16,
                marginTop: 1,
                flex: 0.9,
  
            }}
          />

          </View>


          

          <Text
            style={{
              fontSize: 16,
              fontWeight: "500",
              color: "black",
              marginTop: 10,
              paddingLeft: 12
            }}
          >
            Password
          </Text>

         
          
          <View
            style={{
              borderColor: "grey",
              height: 60,
              width: 340,
              margin: 12,
              borderWidth: 1,
              borderRadius: 8,
              paddingHorizontal: 12,
              paddingVertical: 12,
              flexDirection: "row",
              justifyContent: "space-between",
              alignItems: "center",
            }}
          >

            <FontAwesome5 name="key" size={24} color= "blue" />  

            <TextInput
              value={password}
              onChangeText={(value) => {
                setloginCredentials({ ...loginCredentials, password: value });
              }}
              secureTextEntry={isVisbile}
              maxLength={20}
              keyboardType="ascii-capable"
              style={{
                fontSize: 16,
                marginTop: 1,
                flex: 0.8,
              }}
            />
            <Ionicons
              onPress={() => {
                setisVisbile(!isVisbile);
              }}
              name={
                isVisbile == true
                  ? "eye-off-outline"
                  : "eye-outline" /* JS if else chuchu */
              }
              size={24}
              color="black"
            />
          </View>

          <Text
            style={{
              fontSize: 14,
              fontWeight: "400",
              color: "black",
              marginTop: 15,
              width: "95%",
              paddingLeft: 12,
              color: '#062CD4',
              fontWeight: 'bold',

            }} >

            Forgot Password?
          </Text>

          <TouchableOpacity
            // onPress={loginUser}
            onPress={() => login(email, password)} //Use this Pag Providers na gamit sa App.js
            style={{
              flexDirection: "row" ,
              backgroundColor: '#062CD4',
              marginTop: 30,
              height: 70,
              borderRadius: 8 ,
              alignItems: "center",
              justifyContent: "center",
              }} >

            <Text
              style={{
                fontSize: 19,
                color: 'white',
                fontWeight: "500",
              }} >
              Log In
            </Text>

          </TouchableOpacity>
          <View
            style={{
              flexDirection: "row" ,
              justifyContent: "center",
              alignItems: "center",
              marginTop: 20,
              gap: 5,
              paddingTop: 24,
            }}
          >
            <Text style={{ fontSize: 16, color: "black" }} >Don't have an Account?</Text>
            <TouchableOpacity
              onPress={() => {
                nav.navigate("register");
              }}
            >
              <Text
                style={{
                  fontSize: 15,
                  color: '#062CD4',
                  fontWeight: "600",
                }}
              >
                Sign Up
              </Text>
            </TouchableOpacity>
          </View>
        </View>
      </ScrollView>
      </SafeAreaView>

  );
};

export default Login;

