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

const profile = ({ navigation }) => {
  return (


    <SafeAreaView style={{ backgroundColor: "white", flex: 1 }}>
      <ScrollView style={styles.container}>
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
                  uri: "http://tinyurl.com/bddv8vwp", // Di pa ko alam pano pag local yung lalagay yung link na code nagana e
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



});

export default profile;
