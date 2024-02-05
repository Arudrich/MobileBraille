import {ScrollView, TextInput,
} from "react-native";
import { SafeAreaView, View, Text, StyleSheet, Image, TouchableOpacity, Modal } from "react-native";
import React, { useContext, useState, useEffect } from "react";
import * as ImagePicker from 'expo-image-picker';


//icons import

import FeatherIcon from "react-native-vector-icons/Feather";
import { Feather } from '@expo/vector-icons'; // Import Feather icons
import { MaterialIcons } from "@expo/vector-icons";
import { FontAwesome5 } from "@expo/vector-icons";
import { AntDesign } from '@expo/vector-icons';
import { AuthContext } from "../../navigation/AuthProvider";
import { database } from "../../FirebaseConfig";
import { DocumentSnapshot, collection, doc, getDoc } from 'firebase/firestore';

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
  const { user, logout } = useContext(AuthContext);
  const [image, setImage] = useState(null);
  const [userData, setUserData] = useState(null);
  const [isEditing, setIsEditing] = useState(false);
  const [name, setName] = useState("Name"); // Initialize with a default value
  const [showLogoutModal, setShowLogoutModal] = useState(false);
  const [modalVisible, setModalVisible] = useState(false);

  const handleEditPress = () => {
    setIsEditing(true);
  };

  const handleSave = () => {
    // Perform save action to firebase
    setIsEditing(false);
  };

  const handleLogout = () => {
    setShowLogoutModal(true);
  };

  const confirmLogout = () => {
    logout();
  };

  const cancelLogout = () => {
    setShowLogoutModal(false);
  };

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

  useEffect(() => {
    if (userData) {
      setName(userData.fullname || "Name"); // Update name when userData changes
    }
  }, [userData]);

  const pickImageFromGallery = async () => {
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: true,
      aspect: [1 , 1],
      quality: 1,
    });

    if (!result.canceled) {
      setImage(result.assets[0].uri);
      setModalVisible(false);
    }
  };

  const takeImageFromCamera = async () => {
    let result = await ImagePicker.launchCameraAsync({
      allowsEditing: true,
      aspect: [1, 1],
      quality: 1,
    });

    if (!result.canceled) {
      setImage(result.assets[0].uri);
      setModalVisible(false);
    }
  };

  return (


    <SafeAreaView style={{ backgroundColor: "white", flex: 1 }}>
      <ScrollView style={styles.container}>

        <Text style = {{fontSize: 20, fontWeight: "bold", alignSelf: "center"}}>EDIT PROFILE</Text>


        <View style={styles.profile}>
          <TouchableOpacity
            onPress={() => { 
              setModalVisible(true)// ditoooo handle onPress
            }}
            >
            <View style={styles.profileAvatarWrapper}>
              <Image
                alt=""
                source={{
                  uri: image ? image 
                    : userData ? userData.userImg ||
                      'https://firebasestorage.googleapis.com/v0/b/mbraille-54f34.appspot.com/o/profileImage%2FProfilePlaceholder.png?alt=media&token=3c29faf9-dd75-4f3e-b62a-0615db9e7ebc'
                    : 'https://firebasestorage.googleapis.com/v0/b/mbraille-54f34.appspot.com/o/profileImage%2FProfilePlaceholder.png?alt=media&token=3c29faf9-dd75-4f3e-b62a-0615db9e7ebc', // PROFILE
                }}
                style={styles.profileAvatar}
                resizeMode='contain'
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
              <Modal
                animationType="slide"
                transparent={true}
                visible={modalVisible}
                onRequestClose={() => {
                  setModalVisible(!modalVisible);
                }}
              >
                <View style={styles.modalContainerProfile}>
                  <View style={styles.modalContentProfile}>
                    <TouchableOpacity style={styles.iconContainer} onPress={pickImageFromGallery}>
                      <Feather name="folder" size={24} color="grey" />
                      <Text style={styles.iconText}>Gallery</Text>
                    </TouchableOpacity>
                    <TouchableOpacity style={styles.iconContainer} onPress={takeImageFromCamera}>
                      <Feather name="camera" size={24} color="grey" />
                      <Text style={styles.iconText}>Camera</Text>
                    </TouchableOpacity>
                    <TouchableOpacity style={styles.iconContainer} onPress={() => setModalVisible(false)}>
                      <Feather name="x" size={24} color="grey" />
                      <Text style={styles.iconText}>Cancel</Text>
                    </TouchableOpacity>
                  </View>
                </View>
              </Modal>
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
              // borderWidth: 1
            }}
            >


            <AntDesign name="user" size={19} color="blue" style={{ paddingRight: 12 }} />
            {isEditing ? (
              <TextInput
                style={styles.rowSpacer}
                onChangeText={(text) => setName(text)}
                value={name}
              />
            ) : (
              <Text style={[styles.rowSpacer, { fontSize: 13, color: 'grey', fontWeight: 'normal' }]}>
                {name}
              </Text>
            )}
            <TouchableOpacity onPress={isEditing ? handleSave : handleEditPress}>
              <AntDesign name={isEditing ? "save" : "edit"} size={20} color="black" />
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
            onPress={handleLogout}
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
          <Modal
          animationType="fade"
          transparent={true}
          visible={showLogoutModal}
          onRequestClose={() => setShowLogoutModal(false)}
          >
            <View style={styles.modalContainer}>
              <View style={styles.modalContent}>
                <Text style={styles.modalText}>Are you sure you want to log out?</Text>
                <View style={styles.modalButtons}>
                  <TouchableOpacity
                    style={[styles.modalButton, styles.cancelButton]}
                    onPress={cancelLogout}
                  >
                    <Text style={styles.modalButtonText}>Cancel</Text>
                  </TouchableOpacity>
                  <TouchableOpacity
                    style={[styles.modalButton, styles.confirmButton]}
                    onPress={confirmLogout}
                  >
                    <Text style={styles.modalButtonText}>Confirm</Text>
                  </TouchableOpacity>
                </View>
              </View>
            </View>
          </Modal>


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
    borderRadius: 8,
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
  // for Logout modal

  modalContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "rgba(0, 0, 0, 0.5)",
  },
  modalContent: {
    backgroundColor: "white",
    padding: 20,
    borderRadius: 8,
    alignItems: "center",
  },
  modalText: {
    fontSize: 17,
    marginBottom: 25,
  },
  modalButtons: {
    flexDirection: "row",
    justifyContent: "center",
  },
  modalButton: {
    paddingVertical: 10,
    paddingHorizontal: 20,
    marginHorizontal: 10,
    borderRadius: 8,
  },
  cancelButton: {
    backgroundColor: "#062CD4",
  },
  confirmButton: {
    backgroundColor: "#062CD4",
  },
  modalButtonText: {
    fontSize: 14,
    color: "white",
  },
  modalContainerProfile: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
  },
  modalContentProfile: {
    backgroundColor: 'white',
    padding: 20,
    borderRadius: 10,
    flexDirection: 'row',
    gap: 10
  },
  iconContainer: {
    borderColor: 'grey',
    borderWidth: 1,
    borderRadius: 25,
    padding: 10,
    flexDirection: 'column',
    alignItems: 'center',
    marginVertical: 10,
    // justifyContent: 'center', // Center the content horizontally
  },
  iconText: {
    // marginLeft: 10,
    color: 'grey'
  },

});

export default profile;
