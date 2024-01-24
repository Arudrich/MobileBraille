// dito lalagay yung mga login registration logic ganon

import { StyleSheet, Text, View } from 'react-native'
import React, {createContext, useState} from 'react'
import { signInWithEmailAndPassword } from "firebase/auth";
import { authentication } from '../firebaseconfig';

export const AuthContext = createContext();

export const AuthProvider = ({children}) => {
    const [user, setUser] = useState(null);
    
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
      }}
    >
    
    {children}
    </AuthContext.Provider>
  )
};


