import {View,Text,ScrollView,Image,TextInput,TouchableOpacity, Alert, KeyboardAvoidingView, Platform } from "react-native";
import React, { useState } from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import { StatusBar } from "expo-status-bar";
import { Ionicons } from "@expo/vector-icons"; /* link for expo vector icons lang to*/
import { useNavigation } from "@react-navigation/native";
import { authentication, database } from "./../../firebaseconfig";
import { createUserWithEmailAndPassword } from "firebase/auth";
import { setDoc, doc } from "firebase/firestore";
import uuid from 'react-native-uuid';

const register = () => {
  const [isVisbile, setisVisbile] =
    useState(true); /* gamit for toggle ng eye yung sa password */
  const nav = useNavigation(); /* for navigation */

  const [userCredentials, setuserCredentials] = useState({
    name: "", 
    email: "",
    password: "",
  });

  const { email, password, name } = userCredentials;

  const uid=uuid.v4()
  const userAccountSignup = () => {
    createUserWithEmailAndPassword(authentication, email, password) /* RN FIREBASE*/
      .then(() => {
        nav.navigate('Login')
        Alert.alert("User account succesfully created!");
        setDoc( doc(database, "users", uid ), {
          fullname: name,
          email: email,
          id: authentication.currentUser.uid, 
        });
      })
      .catch((error) => {
        if (error.code === "auth/email-already-in-use") {
          console.log("That email address is already in use!");
          Alert.alert("That email address is already in use!");
        }

        if (error.code === "auth/invalid-email") {
          console.log("That email address is invalid!");
          Alert.alert("That email address is invalid!");
        }

        console.error(error);
      });
  };



  return (

        <SafeAreaView style = {{ backgroundColor: 'white', flex: 1 }}>
        <ScrollView>


        <Text style={{ fontWeight: 'bold', fontSize: 28, color: '#062CD4', paddingTop: 71, paddingLeft: 15 }}> Register here
      
        </Text>

        

       

        <View style={{ paddingHorizontal: 20, marginTop: 10 }}>
         
          <Text
            style={{
              fontSize: 16,
              fontWeight: "400",
              color: "black",
              marginTop: 10,
            }}
          >
            {" "}

            Please enter your data to complete your

          </Text>

          <Text
            style={{
              fontSize: 16,
              fontWeight: "400",
              color: "black",
            }}
          >
            {" "}

            account registration process

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
            Full Name
          </Text>
          <TextInput
            maxLength={30}
            value= {name}
            onChangeText={(value) => 
            setuserCredentials({...userCredentials, name: value})

            }
            keyboardType="name-phone-pad"
            style={{
              borderColor: "grey",
              height: 59,
              width: 339,
              margin: 12,
              borderWidth: 1,
              fontSize: 16,
              marginTop: 15,
              borderRadius: 8,
              paddingHorizontal: 12,
              paddingVertical: 12,
            }}
          />

          <Text
            style={{
              fontSize: 16,
              fontWeight: "500",
              color: "grey",
              marginTop: 18,
              color: "black",
              paddingLeft: 12
            }}
          >
            Email
          </Text>
          <TextInput
            value={email}
            onChangeText={(value) => {
              setuserCredentials({ ...userCredentials, email: value });
            }}
            keyboardType="email-address"
            style={{
              borderColor: "grey",
              height: 59,
              width: 339,
              margin: 12,
              borderWidth: 1,
              fontSize: 16,
              marginTop: 15,
              borderRadius: 8,
              paddingHorizontal: 12,
              paddingVertical: 12,
            }}
          />

          <Text
            style={{
              fontSize: 16,
              fontWeight: "500",
              color: "grey",
              marginTop: 18,
              color: "black",
              paddingLeft: 12
            }}
          >
            Password
          </Text>

          <View
            style={{
              borderColor: "grey",
              height: 59,
              width: 339,
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
            <TextInput
              value={password}
              onChangeText={(value) => {
                setuserCredentials({ ...userCredentials, password: value });
              }}
              secureTextEntry={isVisbile}
              maxLength={20}
              keyboardType="ascii-capable"
              style={{
                fontSize: 17,
                marginTop: 15,
                flex: 0.8,
          
                
            }} />


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
            numberOfLines={2}
            /* no of lines lang kahit ano mangyare tayo paden */ style={{
              fontSize: 14,
              fontWeight: "400",
              color: "black",
              marginTop: 15,
              letterSpacing: 0.6,
              lineHeight: 25,
              width: "95%",
              opacity: 0.7,
            }}
          >
            By continuing you agree to our <Text style = {{color: '#062CD4', fontWeight: 'bold'}}> Terms of Service  </Text> and <Text style = {{color: '#062CD4', fontWeight: 'bold' }}>Privacy Policy</Text>
          </Text>
          <TouchableOpacity
            onPress={userAccountSignup}
            style={{
              backgroundColor: '#062CD4',
              marginTop: 30,
              height: 70,
              borderRadius: 8 ,
              alignItems: "center",
              justifyContent: "center",
              color: 'white'
            }}
          >
            <Text
              style={{
                fontSize: 19,
                color: 'white',
                fontWeight: "500",
              }}
            >
              Sign Up
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
            <Text style={{ fontSize: 16 }}>Already have an Account?</Text>
            <TouchableOpacity
              onPress={() => {
                nav.navigate("login");
              }}
            >
              <Text
                style={{
                  fontSize: 15,
                  color: '#062CD4',
                  fontWeight: "600",
                }}
              >
                Sign In
              </Text>

              
            </TouchableOpacity>
          </View>
        </View>

        </ScrollView>

        </SafeAreaView>


  );
};

export default register;
