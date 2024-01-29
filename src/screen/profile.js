import {SafeAreaView,View,Text,StyleSheet,Image, TextInput,
} from "react-native";
import { ScrollView } from "react-native";
import { TouchableOpacity } from "react-native";
import React from "react";

//icons import

import FeatherIcon from "react-native-vector-icons/Feather";

import { MaterialIcons } from "@expo/vector-icons";
import { FontAwesome5 } from "@expo/vector-icons";
import { AntDesign } from '@expo/vector-icons';

// sections

const SECTIONS = [
  {
    header: 'Preferences',
    icon: 'settings',
    items: [
      { icon: 'globe', color: '#062CD4' , label: 'Language', type: 'link' },
    ],
  },

  {
    header: 'Help',
    icon: 'help-circle',
    items: [
      { icon: 'flag', color: '#062CD4', label: 'Report Bug', type: 'link' },
      { icon: 'mail', color: '#062CD4' , label: 'Contact Us', type: 'link' },
    ],
  },
  {
    header: 'Other Actions',
    icon: 'align-center',
    items: [
      { icon: 'save', color: '#062CD4', label: 'Saved', type: 'link' },
    ],
  },
];


const profile = ({ navigation }) => {
  return (


    <SafeAreaView style={{ backgroundColor: "white", flex: 1 }}>
      <ScrollView style={styles.container}>

        <Text style = {{fontSize: 20, fontWeight: "bold", alignSelf: "center"}}>EDIT PROFILE</Text>


        <View style={styles.profile}>
          <TouchableOpacity
            onPress={() => {
              // ditoooo handle onPress
            }}
          >
            <View style={styles.profileAvatarWrapper}>
              <Image
                alt=""
                source={{
                  uri: "", // PROFILE
                }}
                style={styles.profileAvatar}
              />

              <TouchableOpacity
                onPress={() => {
                  // handle onPress
                }}
              >
                <View style={styles.profileAction}>
                  <FeatherIcon color="white" name="edit-3" size={15} />
                </View>
              </TouchableOpacity>
            </View>
          </TouchableOpacity>
        </View>


        <View style={styles.changeInfo}>

        <Text
            style={{
              fontSize: 12,
              fontWeight: "500",
              color: "grey",
              marginTop: 15,
              color: "black",
              paddingRight: 215,
              fontWeight: "bold"
            }}
          >
            Change Display Name
          </Text>

          <View
            style={{
              borderColor: "grey",
              height: 45,
              width: 350,
              margin: 2,
              borderRadius: 8,
              paddingHorizontal: 12,
              paddingVertical: 12,
              flexDirection: "row",
              justifyContent: "space-between",
              alignItems: "center",
            }}
          >


            <AntDesign name="user" size={19} color="blue" /> 



          <TouchableOpacity>
          <AntDesign name="edit" size={20} color="black" />
          </TouchableOpacity>


          </View>



          <Text
            style={{
              fontSize: 12,
              fontWeight: "500",
              color: "grey",
              marginTop: 18,
              color: "black",
              paddingRight: 240,
              fontWeight: "bold"
            }}
          >
            Change Password
          </Text>

          <View
            style={{
              borderColor: "grey",
              height: 45,
              width: 350,
              margin: 12,
              borderWidth: 0,
              backgroundColor: 'white',
              borderRadius: 8,
              paddingHorizontal: 12,
              paddingVertical: 12,
              flexDirection: "row",
              justifyContent: "space-between",
              alignItems: "center",
            }}
          >


            <FontAwesome5 name="key" size={18} color= "blue" />  

          <TouchableOpacity>
          <AntDesign name="edit" size={20} color="black" />
          </TouchableOpacity>


          </View>


          <View style = {{ flex: 1}} >

 

          {SECTIONS.map(({ header, items }) => (

          <View style={styles.section} key={header}>
            <Text style={styles.sectionHeader}>{header}</Text>
            {items.map(({ label, icon, type, value, color }, index) => {
              return (
                <TouchableOpacity
                  key={label}
                  onPress={() => {
                    // handle onPress
                  }}>
                  <View style={styles.row}>
                    <View style={[styles.rowIcon, { backgroundColor: color }]}>
                      <FeatherIcon color="white" name={icon} size={15} />
                    </View>

                    <Text style={styles.rowLabel}>{label}</Text>

                    <View style={styles.rowSpacer} />

                    {type === 'boolean' && <Switch value={value} />}

                    {type === 'link' && (
                      <FeatherIcon
                        color="#0c0c0c"
                        name="chevron-right"
                        size={22}
                      />
                    )}

                  </View>
                  
                </TouchableOpacity>

              );
            })}
          </View>
        ))}


        </View>

  
        </View>


        <View style = {{flex: 1, paddingBottom: 100, paddingHorizontal: 50,}}>


          <TouchableOpacity
    
            style={{
              flexDirection: "row" ,
              backgroundColor: '#062CD4',
              marginTop: 15,
              height: 50,
              borderRadius: 8 ,
              alignItems: "center",
              justifyContent: "center",
              }} >

            <Text
              style={{
                fontSize: 19,
                color: 'white',
                fontWeight: "500",
              }} >

              Log Out

            </Text>

          </TouchableOpacity>







        </View>

        


        

      </ScrollView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  // PROFILE CONTAINER

  container: {
    paddingVertical: 25,
    backgroundColor: 'white'

  },
  profile: {
    padding: 30,
    flexDirection: "column",
    alignItems: "center",
    justifyContent: "center",

  },
  profileAvatar: {
    width: 150,
    height: 150,
    borderRadius: 50,
    borderWidth: 2,
    borderColor: '#062CD4'
  },
  profileAvatarWrapper: {
    position: "relative",
  },
  profileAction: {
    position: "absolute",
    right: -4,
    bottom: -10,
    alignItems: "center",
    justifyContent: "center",
    width: 28,
    height: 28,
    borderRadius: 50,
    backgroundColor: "#062CD4",
  },

  // CHANGE INFO

  changeInfo: {
    flex: 1,
    alignItems: "center"


  },

  // SECTION

  section: {
    paddingHorizontal: 24,

  },

  sectionHeader: {

    paddingVertical: 12,
    fontSize: 12,
    fontWeight: '600',
    color: '#000000',
    textTransform: 'uppercase',
    letterSpacing: 5, 
  },

  row: {

    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'flex-start',
    height: 50,
    backgroundColor: 'white',
    borderRadius: 8,
    marginBottom: 12,
    paddingLeft: 12,
    paddingRight: 12,
    
  },

  rowIcon: {
    width: 50,
    height: 32,
    borderRadius: 8,
    marginRight: 12,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
  },
  rowLabel: {
    fontSize: 15,
    fontWeight: '400',
    color: 'black',
    fontWeight: "bold",
    paddingHorizontal: 190,
    paddingLeft: .5
  },
  rowSpacer: {
    flexGrow: 1,
    flexShrink: 1,
    flexBasis: 0,
  },

});

export default profile;
