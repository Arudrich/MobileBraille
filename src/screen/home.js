import React, { useEffect, useContext, useState } from 'react';
import { RefreshControl } from 'react-native';
import { DrawerActions } from '@react-navigation/native';
import { SafeAreaView } from "react-native-safe-area-context";
import { View, Text, Image, StyleSheet, TextInput, TouchableOpacity, ScrollView, FlatList } from 'react-native';
import { Feather } from "@expo/vector-icons";
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { AuthContext } from '../../navigation/AuthProvider';
import { getDoc, doc } from 'firebase/firestore';
import { database } from '../../FirebaseConfig';
import FilterModal from './FilterModal';
import HistoryCard from '../assets/Cards/HistoryCard';

import { Card } from 'react-native-paper';

// DIMENSION COMPATIBILITY

import { ScaledSheet } from 'react-native-size-matters';


// **********************************************************

const home = ({ navigation }) => {
  const { user } = useContext(AuthContext);
  const [userData, setUserData] = useState(null);
  const [modalVisible, setModalVisible] = useState(false);
  const [selectedFilters, setSelectedFilters] = useState([]);
  const [refreshing, setRefreshing] = useState(false);


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

  const onRefresh = async () => {
    setRefreshing(true); // Set refreshing state to true
    try {
      await getUser(); // Refresh user data or perform any other refresh action
    } catch (error) {
      console.error('Error refreshing data:', error);
      // Handle error
    } finally {
      setRefreshing(false); // Set refreshing state back to false after refreshing
    }
  };
  

  // Function to handle applying the selected filter
  const applyFilters = () => {
    setModalVisible(false);
    
    // Perform filtering logic here based on the selected filters
    console.log('Selected filters:', selectedFilters);
  };

  // Function to handle selecting/deselecting filters
  const toggleFilter = (filter) => {
    if (selectedFilters.includes(filter)) {
      setSelectedFilters(selectedFilters.filter(f => f !== filter)); // Deselect filter
    } else {
      setSelectedFilters([...selectedFilters, filter]); // Select filter
    }
  };



  // **********************************************************


  return (
    <SafeAreaView style = {{ backgroundColor: 'white', flex: 1}}>

      {/***************** HEADER ************************/}

      <View style = {styles.headerContainer}>
        <TouchableOpacity
                  onPress={() => navigation.dispatch(DrawerActions.toggleDrawer())}
                >
                  <Image
                    source={require('../iconPNG/homeMenuBar.png')}
                    style={{
                      
                      height: 18,
                      width: 18,
                      marginTop: 28,
                      tintColor: '#003153'
                    }}
                  />
                </TouchableOpacity>

                <View style={{
                   flexDirection:"row",
                   alignItems:"center",
                   marginTop: 10 ,
                   width:"100%"
               }}>

                {/***************** PROFILE ************************/}
              

                   <View style={{ width:"75%" }}>
                        <Text style={{
                            fontSize: 18,
                            color:"#003153",
                            fontWeight:"300"


                        }}>Welcome ,  </Text>
                        <Text style = {{ fontSize: 17, color:'#003153', fontWeight: "500" }}>{userData ? userData.fullname : "Loading..."}</Text>
                   </View>

                   <View style={{ alignItems:"flex-end", }}>
                        <TouchableOpacity onPress={() => navigation.navigate('Profile')}>
                        <Image
                            source={{
                              uri: userData ? userData.userImg ||
                                  'https://firebasestorage.googleapis.com/v0/b/mbraille-54f34.appspot.com/o/profileImage%2FProfilePlaceholder.png?alt=media&token=3c29faf9-dd75-4f3e-b62a-0615db9e7ebc'
                                : 'https://firebasestorage.googleapis.com/v0/b/mbraille-54f34.appspot.com/o/profileImage%2FProfilePlaceholder.png?alt=media&token=3c29faf9-dd75-4f3e-b62a-0615db9e7ebc',
                            }}

                            style={{height: 80 ,width:80, borderRadius: 8, borderWidth: 3, borderColor: '#003153'}}
                            resizeMode='contain' 

                        />  
                        </TouchableOpacity>
                   </View>
               </View>

               <View style = {styles.cardShowcase}>

              <Card>
                <Card.Cover source={{ uri: 'https://picsum.photos/700' }} />
               </Card>

           </View>

           {/***************** favorites ************************/}

           <View style = {styles.favoritesContainer}>

            <Text style = {styles.favoritesHeader}>Favorites</Text>




           </View>



           </View>
    </SafeAreaView>
  )
}




const styles = ScaledSheet.create({ 

  /***************** HEADER ************************/

headerContainer: {
  height:"30%",
  padding: '12@s'

},
   /***************** CARD ************************/
cardShowcase: {
  padding: '12@s',
  shadowColor: '#003153',
  shadowOffset: 100,
  
},
   /***************** FAVORITES ************************/

  favoritesContainer: {
    
  },

  favoritesHeader: {
    fontWeight: '500',
    fontSize: 50
  },


})



export default home