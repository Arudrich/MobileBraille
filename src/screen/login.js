import {View, Text, ScrollView, TouchableOpacity, Alert} from "react-native";
import React, { useContext, useState } from "react";
import { useNavigation } from "@react-navigation/native";
import { signInWithEmailAndPassword } from "firebase/auth";
import { authentication } from "../../FirebaseConfig";
import { AuthContext } from "../../navigation/AuthProvider";

//mats -david
import { TextInput as PaperTextInput, Button } from 'react-native-paper';
import { MaterialIcons } from '@expo/vector-icons';
import { FontAwesome5 } from '@expo/vector-icons';
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
        <Text style={styles.screenHeading}> Hey there! </Text>
          {/* <Text style={{justifyContent: 'center', fontSize: 16, fontWeight: '400', color: 'black', marginTop: 5, marginLeft: 15}}> */}
          <Text style={styles.screenTexts}>
            Welcome, please enter your credentials.
           </Text>

          <Text style={styles.placeholderLabel}>Email</Text>

          <View>
          <View style={styles.iconContainer}>
          <MaterialIcons name="email" size={25} color='#003153' />
          </View>
          <PaperTextInput //7 spaces para sakto lang -david 
            label="       Please enter your email"
            value={email}
            onChangeText={(value) => setloginCredentials({ ...loginCredentials, email: value })}
            mode="outlined"
            style={styles.textInput}
            left={ <MaterialIcons name="email"/>}
          />
          </View>

          <Text style={[styles.placeholderLabel, { marginTop: 10 }]}>Password</Text>
          <View>
          <View style={styles.iconContainer}>
          <FontAwesome5 name="key" size={25} color= '#003153' />
          </View>
          <PaperTextInput
            label="       Enter your password"
            value={password}
            onChangeText={(value) => setloginCredentials({ ...loginCredentials, password: value })}
            secureTextEntry={isVisible}
            mode="outlined"
            style={styles.textInput}
            left={<FontAwesome5 name="key"/>}
          />
          </View>
          

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
  iconContainer: {
    position: 'absolute',
    top: '20@s', // Adjust as needed
    left: '20@s', // Adjust as needed
    zIndex: '1@s',
  },
  screenTexts:{
    textAlign: 'center',
    fontSize: '16@s', 
    color: '#003153', 
  },
  placeholderLabel: {
    fontSize: '16@s',
    fontWeight: "500",
    color: '#003153',
    marginTop: '20@s',
    paddingLeft: '15@s',
  },
  lineContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginVertical: '10@s',
  },
  orText: {
    marginHorizontal: "10@s",
    fontSize: '16@s',
  },
  line: {
    flex: 1,
    height: 1,
    backgroundColor: 'black',
  },

  textInput: {
    marginTop: '5@s',
    backgroundColor: 'white',
    width: '305@s',
    margin: '10@s',
  },

  textClickable:{
    fontSize: '15@s', 
    color: '#003153', 
    fontWeight: 'bold' 
  },
  
  screenHeading:{
    textAlign:'center',
    fontWeight: 'bold', 
    fontSize: '48@s', 
    color: '#003153',
    paddingTop: '100@s',
    alignSelf: "center"
  },

  buttonStyle:{
     marginTop: '15@s',
      height: '50@s', 
      borderRadius: 30 ,
      backgroundColor: '#003153',
      justifyContent: 'center',
      alignItems: 'center',
  },

  

});

export default Login;

