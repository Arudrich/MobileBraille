// dito lalagay yung mga login registration logic ganon

import { StyleSheet, Text, View } from 'react-native'
import React, {createContext, useState} from 'react'

export const AuthContext = createContext();

export const AuthProvider = ({children}) => {
    const [user, setUser] = useState(null);
  return (
    <AuthContext.Provider>
    
    {children}
    </AuthContext.Provider>
  )
};


