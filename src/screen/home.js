import React, { useEffect, useContext, useState } from 'react';
import { RefreshControl } from 'react-native';
import { DrawerActions } from '@react-navigation/native';
import { SafeAreaView } from "react-native-safe-area-context";
import { View, Text, Image, StyleSheet, TextInput, TouchableOpacity, ScrollView, FlatList } from 'react-native';
import { Feather } from "@expo/vector-icons";
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { AuthContext } from '../../navigation/AuthProvider';
import { getDoc, doc } from 'firebase/firestore';
import { getDocs, collection, query, orderBy } from 'firebase/firestore';
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

  const [historyData, setHistoryData] = useState([]);

  const fetchHistoryData = async () => {
    try {
      const q = query(collection(database, 'posts'), orderBy('postTime', 'desc'));
      const querySnapshot = await getDocs(q);
      const data = querySnapshot.docs.map(doc => ({ ...doc.data(), id: doc.id }));
      setHistoryData(data);
    } catch (error) {
      console.error('Error fetching history data:', error);
    }
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
    fetchHistoryData();
  }, []);

  const onRefresh = async () => {
    setRefreshing(true); // Set refreshing state to true
    try {
      await getUser(); // Refresh user data or perform any other refresh action
      await fetchHistoryData();
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


            {/***************** carddddddddddddddddd ************************/}


               <View style = {styles.cardShowcase}>

              <Card>
                <Card.Cover source={ require('../assets/background/aboutbg.png')}/>
               </Card>

           </View>

           {/***************** favorites ************************/}

           <View style = {styles.mostlyUsedContainer}>

            <Text style = {styles.mostlyUsedHeader}>Mostly Used Transcription</Text>

            {/***************** SCROLLVIEW HORIZONTAL CARD FOR FAVORITES ************************/}

            <ScrollView showsHorizontalScrollIndicator={false} horizontal={true} >


                <View style = {[styles.card, styles.cardElevated]}>
                  <Image style= {styles.cardfavorites} source={require('../assets/maineIcons/picture.png')} />
                  <Text style = {styles.name}>Image</Text>
                </View>

                <View style = {[styles.card, styles.cardElevated]}>
                  <Image style= {styles.cardfavorites} source={require('../assets/maineIcons/text.png')} />
                  <Text style = {styles.name}>Text</Text>
                </View>

                <View style = {[styles.card, styles.cardElevated]}>
                  <Image style= {styles.cardfavorites} source={require('../assets/maineIcons/file.png')} />
                  <Text style = {styles.name}>File</Text>
                </View>

                <View style = {[styles.card, styles.cardElevated]}>
                  <Image style={styles.cardfavorites} source={require('../assets/maineIcons/video.png')} />
                  <Text style = {styles.name}>Video</Text>
                </View>

                <View style = {[styles.card, styles.cardElevated]}>
                  <Image style={styles.cardfavorites} source={require('../assets/maineIcons/video.png')} />
                  <Text style = {styles.name}>Video</Text>
                </View>
   
            </ScrollView>
           </View>


           {/********************** LATEST TRANSCRIPTION ***************************/ }


            <View style = {styles.containerforHeader}>

              <Text style = {styles.latestHeader}>Latest Transcription</Text>
              <TouchableOpacity 
                onPress={() => navigation.navigate('History')}
                style = {{ backgroundColor: '#003153', borderRadius: 8,}}>
                <Text style = {styles.latestSubheader}>View All</Text>
              </TouchableOpacity>

            </View>
             


            <View style = {styles.latestContainer}>
                <View style = {styles.historyVertical}>

            {/********************** cards latest transcription ***************************/ }

            {/* <ScrollView>               */}
                  {/* <TouchableOpacity style = {styles.historyColorButon}>


                    <Image style={styles.historyPics} source={require('../assets/maineIcons/picture.png')} ></Image>   
                    <Text style = {styles.historyTextTitle}>Audio to Braille</Text>

                    <Text style = {styles.historydateTitle}> 01 / 11 / 2024 </Text>
                    

                  </TouchableOpacity>

                  <TouchableOpacity style = {styles.historyColorButon}>


                    <Image style={styles.historyPics} source={require('../assets/maineIcons/audio.png')} ></Image>   
                    <Text style = {styles.historyTextTitle}>Hatdog to Braille</Text>

                    <Text style = {styles.historydateTitle}> 01 / 11 / 2024 </Text>
                    

                  </TouchableOpacity>

                  <TouchableOpacity style = {styles.historyColorButon}>


                    <Image style={styles.historyPics} source={require('../assets/maineIcons/video.png')} ></Image>   
                    <Text style = {styles.historyTextTitle}>Video to Braille</Text>

                    <Text style = {styles.historydateTitle}> 01 / 11 / 2024 </Text>
                    

                  </TouchableOpacity> */}
                  
                  <FlatList
                    data={historyData.slice(0, 5)} // Slice the array to display only the first 5 items
                    showsVerticalScrollIndicator={false}
                    // style={{ flex: 1}}
                    keyExtractor={item => item.id}
                    renderItem={({ item }) => <HistoryCard item={item} />} // Using HistoryCard component
                  />
                  


                  {/* </ScrollView>        */}
                </View>




              

            </View>
            

           

           </View>

  )
}




const styles = ScaledSheet.create({ 

  /***************** HEADER ************************/

headerContainer: {
  height:"30%",
  padding: '12@s',
  flex: 1,
  // borderColor: 'red',
  // borderWidth: 1,
},
   /***************** CARD SHOWCASE ************************/
cardShowcase: {
  padding: '10@s',
  shadowColor: '#003153',
  shadowOffset: 100,
  
},
   /***************** moslty Useeed Transciption ************************/

  mostlyUsedContainer: {
    paddingTop: '8@s',
    
  },

  mostlyUsedHeader: {
    fontWeight: 'bold',
    fontSize: '17@s'

  },

  /***************** FAVORITES cardddddddddddddddddd ************************/

  name: {
    fontSize: "8@s",
    fontWeight: 'bold', 
    paddingHorizontal: "10@s",
    color: 'white'
  
  },

  cardfavorites: {
    height: '20@s',
    width: '20@s',
    borderRadius: 8,
    tintColor: 'white'

  },

  card: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    width: '50@s',
    height: '70@s',
    borderRadius: 8, 
    margin: "8@s",
    gap: '3@s',
    

  },

  cardElevated: {
    backgroundColor:  '#003153', // bg color of card hehe
    elevation: 5,
    shadowOffset: {
    width: '10@s',
    height: '10@s',

    },

    shadowColor: 'black',
    shadowOpacity: 10 ,
    shadowRadius: 50,

  },

  /***************** LATEST TRANSCRIPTION cardddddddddddddddddd ************************/

  containerforHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingTop: '12@s',
    

  },

  latestContainer: {
    flex: 1,
    paddingTop: '8@s',
    // borderColor: 'red',
    // borderWidth: 1,
  },

  latestHeader: {
    fontWeight: 'bold',
    fontSize: '17@s',
    top: '4@s',
  
  },

  latestSubheader:{
    color: 'white',
    fontSize: '12@s',
    padding: '5@s',

    


  },
  

  /****************** History card vertical **********************/

  historyVertical: {
    overflow: 'scroll',
    paddingTop: '12@s',
    marginBottom: '5@s',
    // borderColor: 'red',
    // borderWidth: 1,

 
  },

  historyColorButon: {
    flexDirection: 'row',
    justifyContent: 'flex-start',
    backgroundColor: "#EBF0F5",
    borderRadius: 8,
    padding: '10@s',
    margin: '5@s',
    
  },

  historyTextTitle: {
    fontSize: '12@s',
    fontWeight: 'bold',
    paddingLeft: '30@s',
    paddingTop: '5@s',
    
  
  },

  historydateTitle: {
    fontSize: '12@s',
    fontStyle: 'italic',
    paddingTop: '4@s',
    marginLeft: 'auto'

  },

  historyPics: {
    height: '30@s',
    width: '30@s',
    tintColor: '#003153', 

  }



})



export default home