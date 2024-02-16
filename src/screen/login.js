import {View, Text, StyleSheet, ScrollView, TouchableOpacity, TextInput, Image, Alert, KeyboardAvoidingView, Platform, StatusBar } from "react-native";
import React, { useContext, useState } from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import { Ionicons } from "@expo/vector-icons";
import { useNavigation } from "@react-navigation/native";
import { signInWithEmailAndPassword } from "firebase/auth";
import { authentication } from "../../FirebaseConfig";
import { AuthContext } from "../../navigation/AuthProvider";
// icons

// import { MaterialIcons, FontAwesome5 } from '@expo/vector-icons';

//mats -david
import { TextInput as PaperTextInput, Button } from 'react-native-paper';

// dimension fix
import { ScaledSheet } from 'react-native-size-matters';







const Login = () => {
  const {login} = useContext(AuthContext);
  const nav = useNavigation();
  const [loginCredentials, setloginCredentials] = useState({
    email: "",
    password: "",
  });
  
  const [isVisible, setisVisible] = useState(true);

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
      // <SafeAreaView style = {{ backgroundColor: 'white', flex: 1 }}>
      <ScrollView style = {{backgroundColor: 'white', flex: 1}}>
      <Text style={{ textAlign: 'center',fontWeight: 'bold', fontSize: 48, color: '#062CD4', paddingTop: 100 }}> LOGIN </Text>
        <View style={{ paddingHorizontal: 20, marginTop: 15, }}>
          <Text style={{justifyContent: 'center', fontSize: 16, fontWeight: '400', color: 'black', marginTop: 5, marginLeft: 15}}>
           Please enter your login information below to access your account
           </Text>
           <Text style={styles.emailLabel}>Email</Text>
<PaperTextInput
  label="Please enter your email"
  value={email}
  onChangeText={(value) => setloginCredentials({ ...loginCredentials, email: value })}
  mode="outlined"
  style={styles.textInput}
/>

<Text style={[styles.emailLabel, { marginTop: 10 }]}>Password</Text>
<PaperTextInput
  label="Enter your password"
  value={password}
  onChangeText={(value) => setloginCredentials({ ...loginCredentials, password: value })}
  secureTextEntry={isVisible}
  mode="outlined"
  style={styles.textInput}
  
  // right={
  //   <PaperTextInput.Icon
  //     name={isVisible ? 'eye-off-outline' : 'eye-outline'}
  //     onPress={() => setisVisible(!isVisible)}
  //     color="black"
  //   />
  // }
/>
          <TouchableOpacity
           onPress={() => {
            // Handle forgot password
             }}
           >
            <Text style={{ fontSize: 16, fontWeight: 'bold', color: 'black', marginTop: 15, width: '95%', paddingLeft: 12, color: '#062CD4', fontWeight: 'bold' }}>
            Forgot Password?
          </Text>
           </TouchableOpacity>

           <Button
          mode="contained"
          onPress={() => login(email, password)}
          style={{ marginTop: 15, height: 50, borderRadius: 100, backgroundColor: '#062CD4', justifyContent: 'center', alignItems: 'center' }}
        >
          Log In
        </Button>

        <View style={{ flexDirection: 'row', justifyContent: 'center', alignItems: 'center', marginTop: 20, gap: 5 }}>
          <Text style={{ fontSize: 16, color: 'black' }}>Don't have an account yet?</Text>
          <TouchableOpacity onPress={() => nav.navigate('register')}>
          <Text style={{ fontSize: 15, color: '#062CD4', fontWeight: 'bold' }}>Register here</Text>
          </TouchableOpacity>
          </View>
          {/* <TouchableOpacity
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
              }} > */}

            {/* <Text
              style={{
                fontSize: 19,
                color: 'white',
                fontWeight: "500",
              }} >
              Log In
            </Text>

          </TouchableOpacity> */}
          {/* <View
            style={{
              flexDirection: "row" ,
              justifyContent: "center",
              alignItems: "center",
              marginTop: 20,
              gap: 5,
              paddingTop: 24,
            }}
          > */}
            {/* <Text style={{ fontSize: 16, color: "black" }} >Don't have an Account?</Text>
            <TouchableOpacity
              onPress={() => {
                nav.navigate("register");
              }}
            > */}
              {/* <Text
                style={{
                  fontSize: 15,
                  color: '#062CD4',
                  fontWeight: "600",
                }}
              >
                Sign Up
              </Text>
            </TouchableOpacity> */}
      
        </View>
        {/* </View> */}
      </ScrollView>
      // </SafeAreaView>

  );
};

// label design -david -------------------------
const styles = ScaledSheet.create({
  emailLabel: {
    fontSize: 16,
    fontWeight: "500",
    color: 'black',
    marginTop: 40,
    paddingLeft: 15,
  },

  textInput: {
    marginTop: 5,
    backgroundColor: 'white',
    width: '305@s',
    margin: 10,
  },
});

export default Login;

