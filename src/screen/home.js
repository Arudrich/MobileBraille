import { View, Text, Image, StyleSheet, TextInput, ImageBackground, Modal } from 'react-native'
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
  const [modalVisible, setModalVisible] = useState(false);
  const [selectedFilter, setSelectedFilter] = useState(null);

  

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
  
  // Function to handle applying the selected filter
  const applyFilter = (filter) => {
    setSelectedFilter(filter);
    setModalVisible(false);
    // Perform filtering logic here based on the selected filter
  };

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




      <View style={{ flexDirection: "row", alignItems: "center" }}>

        <View style={styles.searchContainer}>
          <Feather name="search" size={22} color="blue" />
          <TextInput placeholder="Search recent transcription" style={{ marginLeft: 8, flex: 1 }} />
        </View>

        <TouchableOpacity onPress={() => setModalVisible(true)}>
          <MaterialCommunityIcons name="filter" size={40} color="blue" />
        </TouchableOpacity>

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
      
      {/* Filter Modal */}
      <Modal
        animationType="fade"
        transparent={true}
        visible={modalVisible}
        onRequestClose={() => {
          setModalVisible(false);
        }}
      >
        <TouchableOpacity
          style={styles.modalBackdrop}
          onPress={() => setModalVisible(false)}
        >
          <View style={styles.modalContainer}>
            <View style={styles.modalContent}>
              <TouchableOpacity style={styles.modalButton} onPress={() => applyFilter('date')}>
                <Text style={styles.modalButtonText}>Date</Text>
              </TouchableOpacity>
              <TouchableOpacity style={styles.modalButton} onPress={() => applyFilter('imageToBraille')}>
                <Text style={styles.modalButtonText}>Image to Braille</Text>
              </TouchableOpacity>
              <TouchableOpacity style={styles.modalButton} onPress={() => applyFilter('docToBraille')}>
                <Text style={styles.modalButtonText}>Doc to Braille</Text>
              </TouchableOpacity>
              <TouchableOpacity style={styles.modalButton} onPress={() => applyFilter('audioToBraille')}>
                <Text style={styles.modalButtonText}>Audio to Braille</Text>
              </TouchableOpacity>
            </View>
          </View>
        </TouchableOpacity>
      </Modal>
        
       

    
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
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#EBF0F5",
    borderRadius: 8,
    paddingHorizontal: 12,
    paddingVertical: 8,
  },
  filterIconContainer: {
    justifyContent: "center",
    alignItems: "center",
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

 // Filter *****************************************************************

 modalBackdrop: {
  flex: 1,
  justifyContent: 'center',
  alignItems: 'center',
  backgroundColor: 'rgba(0, 0, 0, 0.5)', // Semi-transparent background
  },
  modalContainer: {
    width: '80%',
    backgroundColor: 'white',
    borderRadius: 10,
    padding: 20,
  },
  modalContent: {
    marginTop: 10,
  },
  modalButton: {
    backgroundColor: '#062CD4',
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 8,
    marginBottom: 10,
  },
  modalButtonText: {
    color: 'white',
    fontWeight: 'bold',
    fontSize: 16,
    textAlign: 'center',
  },


 

  
  



});

export default home

