import { View, Text, SafeAreaView, StyleSheet, Image, TouchableOpacity, TextInput } from 'react-native'
import React from 'react'
import { responsiveHeight } from "react-native-responsive-dimensions";
import { Feather } from "@expo/vector-icons";


const home = () => {
  return (


    <SafeAreaView>

      <View style = {{ paddingTop: 80, left: 30 }}>

        <View style={styles.profileAvatarWrapper}>
                <Image
                  alt=""
                  source={{
                    uri: 'http://tinyurl.com/bddv8vwp', // Di pa ko alam pano pag local yung lalagay yung link na code nagana e
                  }}
                  style={styles.profileAvatar}
                />

        </View>
        

        <Text style={{ paddingHorizontal: 10, paddingBottom: 8, paddingTop: 24, color:"gray",left: 25 }} >
          Search for Braille Transcription History
        </Text>

        <View style = {styles.search} >

          <Feather name="search" size={ 30 } color= "black" />
          <TextInput style={{ flex: 1 }} placeholder="Search for recent " />

        </View>
      </View>          
      






     
    </SafeAreaView>




  )
}

const styles = StyleSheet.create({

  profileAvatar: {
    width: 80,
    height: 80,
    borderRadius: 50,
  },

  profileAvatarWrapper: {
  position: 'relative',
  },

  search: {
    paddingHorizontal: 18,
    paddingVertical: 10,
    paddingLeft: 17,
    backgroundColor: "#EBF0F5",
    height: responsiveHeight(6.5),
    borderRadius: 8 ,
    flexDirection: "row",
    alignItems: "center",
    gap: 9,
  }







 })

export default home