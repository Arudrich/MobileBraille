import { View, Text, Image, StyleSheet, TextInput, ImageBackground } from 'react-native'
import React, { useEffect, useContext, useState } from 'react'
import { SafeAreaView } from 'react-native-safe-area-context'
import { Feather } from "@expo/vector-icons";
import { responsiveHeight } from "react-native-responsive-dimensions";
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { TouchableOpacity } from 'react-native';
import { AuthContext } from '../../navigation/AuthProvider';
import { DocumentSnapshot, collection, doc, getDoc } from 'firebase/firestore';
import { database } from '../../FirebaseConfig';




const home = ({navigation}) => {
  const {user} = useContext(AuthContext);
  // console.log(user.uid)
  const [userData, setUserData] = useState(null);

  const getUser = async () => {
    try {
      const userDoc = await getDoc(doc(database, 'users', user.uid));
      if (userDoc.exists()) {
        console.log('User Data', userDoc.data());
        setUserData(userDoc.data());
      } else {
        console.log('User does not exist');
      }
    } catch (error) {
      console.error('Error getting user', error);
    }
  };

  useEffect(() => {
    getUser();
  }, []);

  return (

    <SafeAreaView style = {{ padding: 30, paddingLeft: 18, backgroundColor: 'white', flex: 1 }}>



 
      <TouchableOpacity onPress={() => 
          navigation.navigate('Profile')}>
        <View style = {styles.Profilecontainer} >
          
          <Image resizeMode= 'contain' style = {styles.profile} source = {{ uri: '' }} 
          />
          <Text style = {styles.profileName}> {userData ? userData.fullname : "Loading..."} </Text>
          
        </View>
      </TouchableOpacity>




      <View style = {styles.searchContainer} >

          <Feather name="search" size={ 22 } color= "blue" />
          <TextInput placeholder = "Search recent transcription " />

      <View style = {{ paddingLeft: 112 }}> 


        <TouchableOpacity>

          <MaterialCommunityIcons name="filter" size={ 40 } color= "blue"  />

        </TouchableOpacity>


      </View>
 
      </View>


    
      <View style = { styles.recentContainer }>

      <Image resizeMode= 'contain' style = {styles.recentHistory} source = {{ uri: '' }} 
        />
        <Text style =  {styles.recentTitle}> 127HEDG.jpg / Jpg To Braille </Text> 
        
      </View>

      <View style = { styles.recentContainer }>

      <Image resizeMode= 'contain' style = {styles.recentHistory} source = {{ uri: '' }} 
        />
        <Text style =  {styles.recentTitle}> Narnia.pdf / PDF to Braille </Text> 
        
        
      </View>

      <View style = { styles.recentContainer }>

      <Image resizeMode= 'contain' style = {styles.recentHistory} source = {{ uri: '' }} 
        />
        <Text style =  {styles.recentTitle}> coverHEHE.mp3 / Audio To Braille </Text> 
        
        
      </View>


      <View style = {[styles.seeMore]}>

      <TouchableOpacity onPress={()=> console.log("See more")} >
        <Text style = {{fontSize: 16, fontWeight: 'bold', color: 'white', alignContent: 'center', alignItems: 'center'}}> See More </Text>
        
        
        
        
      </TouchableOpacity>

      </View>

        
       

    
    </SafeAreaView>

  );
};


const styles = StyleSheet.create({

  // Profile Container *********************************************************************



  Profilecontainer: {
    alignItems: 'center',
    paddingTop: 25,
    paddingLeft: 15,
    paddingBottom: 30,
    gap: 3 // gap of name to profile icon

  },

  profile: {
    width: 100,
    height: 100,
    borderRadius: 8,
    borderWidth: 3,
    borderColor: '#062CD4' 
  },

  profileName: {
    fontSize: 24 ,
    fontWeight: 'bold',
    paddingTop: 12,
  },


  // SEARCH CONTAINER *********************************************************************

  searchContainer: {
    width: 330,
    height: 44,
    paddingLeft: 12,
    height: responsiveHeight(6.5),
    backgroundColor: "#EBF0F5",
    borderRadius: 8 ,
    flexDirection: "row",
    alignItems: "center",
    gap: 10, // gap ng icon

  },


  // RECENT CONTAINER *********************************************************************

  recentContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    alignContent: 'center',
    paddingTop: 30,
    bottom: -10, 
    paddingLeft: 15,
    gap: 15, // gap sa text 
    borderRadius: 10


  },

  recentHistory: {
    
    height: 100, 
    width: 100,
    borderRadius: 8,
    borderWidth: 2 , 
    borderColor: '#062CD4' ,
    gap: 10,
  



  },

  recentTitle: {
    fontSize: 15,
    fontWeight: 'bold',

  },

  // ButtonMore *********************************************************************

 seeMore: {
    backgroundColor: '#062CD4',
    marginTop: 30,
    height: 48,
    borderRadius: 8 ,
    alignItems: "center",
    justifyContent: "center",
    borderWidth: 2,
    borderColor: '#062CD4',
    paddingHorizontal: 24,
    paddingVertical: 11,
    



 },




});

export default home

