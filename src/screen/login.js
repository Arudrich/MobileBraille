import {View,Text,ScrollView,TouchableOpacity,TextInput,Image,Alert,KeyboardAvoidingView,Platform, StatusBar } from "react-native";
import React, { useState } from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import { Ionicons } from "@expo/vector-icons";
import { useNavigation } from "@react-navigation/native";
import { signInWithEmailAndPassword } from "firebase/auth";
import { authentication } from "../../firebaseconfig";

const Login = () => {
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



      <SafeAreaView>

      <ScrollView>

      <Text style={{ fontWeight: 'bold', fontSize: 28, color: '#062CD4', fontSize: 24, paddingTop: 71, paddingLeft: 165 }}> LOGIN
      
      </Text>

        <View style={{ paddingHorizontal: 20, marginTop: 25, }}>
         
          <Text
            style={{
              fontSize: 16,
              fontWeight: "400",
              color: "black",
              marginTop: 71,
              
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
            }}
          >
            Email
          </Text>
          <TextInput
            value={email}
            onChangeText={(value) =>
              setloginCredentials({ ...loginCredentials, email: value })
            }
            keyboardType="email-address"
            style={{
              borderColor: "black",
              borderBottomWidth: 0.9 ,
              fontSize: 16,
              marginTop: 15,
              borderRadius: 25
            }}
          />

          <Text
            style={{
              fontSize: 16,
              fontWeight: "500",
              color: "grey",
              marginTop: 40,
            }}
          >
            Password
          </Text>

          <View
            style={{
              borderCOlor: "black",
              borderBottomWidth: 0.9 ,
              flexDirection: "row",
              justifyContent: "space-between",
              alignItems: "center",
            }}
          >
            <TextInput
              value={password}
              onChangeText={(value) => {
                setloginCredentials({ ...loginCredentials, password: value });
              }}
              secureTextEntry={isVisbile}
              maxLength={20}
              keyboardType="ascii-capable"
              style={{
                fontSize: 17,
                marginTop: 15,
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
            }}
          >
            Forgot Password?
          </Text>
          <TouchableOpacity
            onPress={loginUser}
            style={{
              backgroundColor: '#062CD4',
              marginTop: 30,
              height: 70,
              borderRadius: 50 ,
              alignItems: "center",
              justifyContent: "center",
            }}
          >
            <Text
              style={{
                fontSize: 19,
                color: 'white',
                fontWeight: "500",
              }}
            >
              Log In
            </Text>
          </TouchableOpacity>
          <View
            style={{
              flexDirection: "row",
              justifyContent: "center",
              alignItems: "center",
              marginTop: 20,
              gap: 5,
            }}
          >
            <Text style={{ fontSize: 16 }}>Don't have an Account?</Text>
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
