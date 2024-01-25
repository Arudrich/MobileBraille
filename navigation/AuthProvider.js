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
        signup: (email, password, name) => {
          try {
            const userCredential = createUserWithEmailAndPassword(authentication, email, password);
            const userI = userCredential.user;

            const userDocRef = doc(database, 'users', userI.uid);

            setDoc(userDocRef, {
              fullname: name,
              email: email,
              id: userI.uid,
            });

            Alert.alert("User account successfully created");
          } catch (error) {
            if (error.code === "auth/email-already-in-use") {
              console.log("That email address is already in use!");
              Alert.alert("That email address is already in use!");
            } else if (error.code === "auth/invalid-email") {
              console.log("That email address is invalid!");
              Alert.alert("That email address is invalid!");
            } else {
              console.error(error);
              Alert.alert("An error occurred while creating the user account.");
            }
          }
        }
         
      }}
    >
    
    {children}
    </AuthContext.Provider>
  )
};


