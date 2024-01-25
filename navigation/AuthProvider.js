// dito lalagay yung mga login registration logic ganon

import { Alert, StyleSheet, Text, View } from 'react-native'
import React, {createContext, useState} from 'react'
import { createUserWithEmailAndPassword, signInWithEmailAndPassword } from "firebase/auth";
import { authentication, database } from '../FirebaseConfig';
import { useNavigation } from "@react-navigation/native";
import { setDoc, doc } from 'firebase/firestore';

export const AuthContext = createContext();

export const AuthProvider = ({children}) => {
    const [user, setUser] = useState(null);
    // const nav = useNavigation();
  return (
    <AuthContext.Provider 
      value={{
        user,
        setUser,
        login: async (email, password) => {
          try {
            await signInWithEmailAndPassword(authentication, email, password);
          } catch (e) {
            console.log(e);
          }
        },
        signup: async (email, password, name) => {
          createUserWithEmailAndPassword(authentication, email, password) /* RN FIREBASE*/
          .then(() => {
            // nav.navigate('Login')
            Alert.alert("User account succesfully created!");
            setDoc( doc(database, "users", authentication.currentUser.uid ), {
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
        }
         
      }}
    >
    
    {children}
    </AuthContext.Provider>
  )
};


