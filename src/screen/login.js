import {View, Text, ScrollView, TouchableOpacity, Alert} from "react-native";
import React, { useContext, useState } from "react";
import { useNavigation } from "@react-navigation/native";
import { signInWithEmailAndPassword } from "firebase/auth";
import { authentication } from "../../FirebaseConfig";
import { AuthContext } from "../../navigation/AuthProvider";

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
      <ScrollView style = {{backgroundColor: 'white', flex: 1}}>
        <View style={{ paddingHorizontal: 20, marginTop: 15, }}>
        <Text style={{ textAlign: 'center',fontWeight: 'bold', fontSize: 45, color: '#062CD4', paddingTop: 100 }}> Hey there! </Text>
          {/* <Text style={{justifyContent: 'center', fontSize: 16, fontWeight: '400', color: 'black', marginTop: 5, marginLeft: 15}}> */}
          <Text style={styles.screenTexts}>
            Welcome, please enter your credentials.
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
          />
          <TouchableOpacity
           onPress={() => {
             }}
           >
            <Text style={styles.textClickable}>
            Forgot Password?
          </Text> 
           </TouchableOpacity>
           <Button
            mode="contained"
            onPress={() => login(email, password)}
            style={styles.buttonStyle}
            >
              Log In
          </Button>

          <View style={styles.lineContainer}>
            <View style={styles.line} />
           <Text style={styles.orText}>or</Text>
           <View style={styles.line} />
           </View>

        <View style={{ flexDirection: 'row', justifyContent: 'center', alignItems: 'center', marginTop: 5, gap: 5 }}>
          <Text style={styles.screenTexts}>Don't have an account yet?</Text>
          <TouchableOpacity onPress={() => nav.navigate('register')}>
          <Text style={styles.textClickable}>Register here</Text>
          </TouchableOpacity>
          </View>
        </View>
      </ScrollView>
  );
};

// mga design to call ko nalang -david -------------------------
const styles = ScaledSheet.create({
  screenTexts:{
    textAlign: 'center',
    fontSize: 16, 
    color: 'black' 
  },
  emailLabel: {
    fontSize: 16,
    fontWeight: "500",
    color: 'black',
    marginTop: 40,
    paddingLeft: 15,
  },

  lineContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginVertical: 10,
  },
  orText: {
    marginHorizontal: 10,
    fontSize: 16,
  },
  line: {
    flex: 1,
    height: 1,
    backgroundColor: 'black',
  },

  textInput: {
    marginTop: 5,
    backgroundColor: 'white',
    width: '305@s',
    margin: 10,
  },

  textClickable:{
    fontSize: 15, 
    color: '#062CD4', 
    fontWeight: 'bold' 
  },
  
  screenHeading:{
    fontWeight: 'bold', 
    fontSize: 48, 
    color: '#062CD4',
    paddingTop: 100
  },
  buttonStyle:{
     marginTop: 15,
      height: 50, 
      borderRadius: 100,
      backgroundColor: '#062CD4',
      justifyContent: 'center',
      alignItems: 'center',
  }

});

export default Login;

