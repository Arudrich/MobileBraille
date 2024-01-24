import { View, Text, Image, StyleSheet, TextInput } from 'react-native'
import React from 'react'
import { SafeAreaView } from 'react-native-safe-area-context'
import { Feather } from "@expo/vector-icons";
import { responsiveHeight } from "react-native-responsive-dimensions";

const home = () => {
  return (
    <SafeAreaView>



      <View style = {styles.Profilecontainer} >

        <Image resizeMode= 'contain' style = {styles.profile} source = {{ uri: 'https://scontent.fmnl2-2.fna.fbcdn.net/v/t39.30808-6/364163840_1714504549014921_1986141625276929911_n.jpg?_nc_cat=106&ccb=1-7&_nc_sid=efb6e6&_nc_eui2=AeHu0Y1HFrflmfV_gSJeTTR7iq6zHupNJJaKrrMe6k0klnEPVshyU8NVVXw6xuQinpL3kdSNRK-aKdcgqysr44Rp&_nc_ohc=p4rXIGBl0JoAX8kcyUy&_nc_ht=scontent.fmnl2-2.fna&oh=00_AfD0WFLZ_P89XCha7iF3OVoX3s5KQQX_fordPaDhKISO-Q&oe=65B4B99A' }} 
        />
        <Text style = {styles.profileName}> Aldrich Macadangdang </Text>
        
      </View>




      <View style = {styles.searchContainer} >

          <Feather name="search" size={ 20 } color= "blue" />
          <TextInput placeholder = "Search for recent transcription " />
    
      </View>


    </SafeAreaView>
  );
};


const styles = StyleSheet.create({
  Profilecontainer: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingTop: 70,
    paddingBottom: 25,
    gap: 10 // gap of name to profile icon

  },

  profile: {
    width: 100,
    height: 100,
    borderRadius: 50,
    borderWidth: 2,
    borderColor: '#062CD4' 
  },

  profileName: {
    fontSize: 24 ,
    fontWeight: 'bold'
  },

  searchContainer: {
    height: responsiveHeight(6.5),
    paddingHorizontal: 10,
    paddingVertical: 10,
    paddingRight: 10,
    paddingLeft: 10,
    backgroundColor: "#EBF0F5",
    borderRadius: 8 ,
    flexDirection: "row",
    alignItems: "center",
    gap: 9, // gap ng icon
  },

});

export default home

