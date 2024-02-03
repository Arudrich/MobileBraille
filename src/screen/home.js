import React, { useEffect, useContext, useState } from 'react';
import { SafeAreaView } from "react-native-safe-area-context";
import { View, Text, Image, StyleSheet, TextInput, TouchableOpacity, ScrollView } from 'react-native';
import { Feather } from "@expo/vector-icons";
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { AuthContext } from '../../navigation/AuthProvider';
import { getDoc, doc } from 'firebase/firestore';
import { database } from '../../FirebaseConfig';
import FilterModal from './FilterModal'; // Import FilterModal component

//hehe



const Home = ({ navigation }) => {
  const { user } = useContext(AuthContext);
  const [userData, setUserData] = useState(null);
  const [modalVisible, setModalVisible] = useState(false);
  const [selectedFilters, setSelectedFilters] = useState([]);

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

  return (

    <ScrollView>


      <View style={{
            backgroundColor:"#FFF",
            flex:1
        }}>
           <View style={{
               backgroundColor: '#062CD4',
               height:"28%",
               borderBottomLeftRadius:20,
               borderBottomRightRadius:20,
               paddingHorizontal:20
           }}>
              <TouchableOpacity>
               <Image
                    source={require('../iconPNG/homeMenuBar.png')}
                    style={{
                        height:12,
                        width: 20,
                        marginTop:50
                    }}
               />
               </TouchableOpacity>

               <View style={{
                   flexDirection:"row",
                   alignItems:"center",
                   marginTop:25,
                   width:"100%"
               }}>

                {/* PROFILE---------------------------------------------------------- */}
              

                   <View style={{width:"50%"}}>
                        <Text style={{
                            fontSize: 20,
                            color:"#FFF",
                            fontWeight:"bold"


                        }}>HELLO,  </Text>
                        <Text style = {{ fontSize: 17, color:"#FFF", fontWeight:"bold" }}>{userData ? userData.fullname : "Loading..."}</Text>
                   </View>

                   <View style={{width:"50%",top: -15, alignItems:"flex-end", }}>
                        <TouchableOpacity onPress={() => navigation.navigate('Profile')}>
                        <Image
                            source={require('../assets/DEVELOPERS/MACADANGDANG.jpg')}

                            style={{height:100 ,width:100, borderRadius: 50, borderWidth: 1, borderColor: 'white'}}
                        />
                        </TouchableOpacity>
                   </View>
               </View>
           </View>



                {/* SEARCH --------------------------------------------------------- */}        

               <View style={{
                   backgroundColor: "#EBF0F5" ,
                   paddingVertical:8,
                   paddingHorizontal:20,
                   marginHorizontal:20,
                   borderWidth: .2,
                   borderColor: "black",
                   borderRadius: 8,
                   marginTop:25,
                   flexDirection:"row",
                   alignItems:"center"
               }}>
                   <TextInput
                        placeholder="Search Transcription Here"
                        placeholderTextColor= 'grey'
                        style={{
                            fontSize:12,
                            width:260
                        }}
                   />
                   <Image
                    source={require('../iconPNG/search.png')}
                    
                    style={{ height:20, width:20, left: 50}}
                   />
               </View>

              {/* HISTORY--------------------------------------------------------- */}   
              

               <View style={{
                   flexDirection:"row",
                   paddingTop: 15,
                   paddingHorizontal:20,
                   width:"100%",
                   alignItems:"center"
               }}>
                   <View style={{width:"50%"}}>
                        <Text style={{
                            fontWeight: "bold",
                            fontSize: 15,
                            color: '#062CD4'
                        }}> History </Text>
                        <View style={{
                            height:4,
                            width:115,
                            marginTop:-5
                        }}>

                        </View>
                   </View>

              {/* SEE MOREE--------------------------------------------------------- */}   



                   <View style={{width:"50%", alignItems:"flex-end"}}>
                        <TouchableOpacity>
                        <View style={{
                            backgroundColor: '#062CD4',
                            paddingHorizontal:20,
                            paddingVertical:5,
                            borderRadius: 8
                        }}>

                            <Text style={{
                                fontWeight:"bold",
                                fontSize:13,
                                color:"#FFF"
                            }}>See More</Text>

                        </View>
                        </TouchableOpacity>
                   </View>
               </View>



                {/* CARD VIEW --------------------------------------------------------- */}   

          
                <ScrollView 
                    horizontal
                    showsHorizontalScrollIndicator={false}
                    style={{height:200}}
                >         
                    <TouchableOpacity 
                        style={{
                            height:170,
                            elevation:2,
                            backgroundColor: "#EBF0F5",
                            marginLeft:20,
                            marginTop:20,
                            borderRadius: 8 ,
                            marginBottom:10,
                            width: 190,
                        }}
                    >
                        <Image
                            source={require('../assets/maineIcons/audio.png')}
                            style = {{ width: 100, height: 100, alignSelf: 'center', }}
                        />
                        <View style={{
                            flexDirection:"row",
                            paddingTop:10,
                            paddingHorizontal:10
                        }}>
                            <Text style={{
                                fontWeight:"bold"
                            }}>Audio to Braille</Text>
                            <Text style={{
                                fontWeight:"bold",
                                color:'#062CD4',
                                paddingLeft:20,
                                fontStyle: 'italic'
                            }}>02/22/24</Text>
                        </View>
                        <Text style={{
                            paddingHorizontal:10 ,
                            color: '#062CD4' ,
                            paddingTop:3
                        }}>
                            Lyrics.mp4
                        </Text>
                    </TouchableOpacity>

                    <TouchableOpacity 
                        style={{
                            height:170,
                            elevation:2,
                            backgroundColor: "#EBF0F5",
                            marginLeft:20,
                            marginTop:20,
                            borderRadius:15,
                            marginBottom:10,
                            width: 190
                        }}
                    >
                        <Image
                            source={require('../assets/maineIcons/picture.png')}
                            style = {{ width: 100, height: 100, alignSelf: 'center'}}
                        />
                        <View style={{
                            flexDirection:"row",
                            paddingTop:10,
                            paddingHorizontal:10
                        }}>
                            <Text style={{
                                fontWeight:"bold"
                            }}>Image to Braille</Text>
                            <Text style={{
                                fontWeight:"bold",
                                color:'#062CD4',
                                paddingLeft:20,
                                fontStyle: 'italic'
                            }}>02/21/24</Text>
                        </View>
                        <Text style={{
                            paddingHorizontal:10 ,
                            color: '#062CD4' ,
                            paddingTop:3
                        }}>
                            CamScanner.jpg
                        </Text>
                    </TouchableOpacity>

                    <TouchableOpacity 
                        style={{
                            height:170,
                            elevation:2,
                            backgroundColor: "#EBF0F5",
                            marginLeft:20,
                            marginTop:20,
                            borderRadius:15,
                            marginBottom:10,
                            width: 190
                        }}
                    >
                        <Image
                            source={require('../assets/maineIcons/file.png')}
                            style = {{ width: 100, height: 100, alignSelf: 'center'}}
                        />
                        <View style={{
                            flexDirection:"row",
                            paddingTop:10,
                            paddingHorizontal:10
                        }}>
                            <Text style={{
                                fontWeight:"bold"
                            }}>PDF to Braille</Text>
                            <Text style={{
                                fontWeight:"bold",
                                color:'#062CD4',
                                paddingLeft:20,
                                fontStyle: 'italic'
                            }}>02/02/24</Text>
                        </View>
                        <Text style={{
                            paddingHorizontal:10 ,
                            color: '#062CD4' ,
                            paddingTop:3
                        }}>
                            CALCULUS1.PDF
                        </Text>
                    </TouchableOpacity>

                   

                </ScrollView>   


                 {/* FAVORITES --------------------------------------------------------- */}            

              
               <View style={{
                   flexDirection:"row",
                   paddingHorizontal: 20,
                   width:"100%",
                   alignItems:"center",
                   top: 10
               }}>
                   <View style={{width:"50%",}}>
                        <Text style={{
                            fontWeight:"bold",
                            fontSize:17,
                            color: '#062CD4'
                        }}>Favorites Transcription </Text>
                        <View style={{
                            height:4,
                            width:115,
                        }}>

                        </View>

                   </View>

                   <View style={{width:"50%", alignItems:"flex-end"}}>
                        <TouchableOpacity>
                        <View style={{
                            backgroundColor: '#062CD4',
                            paddingHorizontal:20,
                            paddingVertical:5,
                            borderRadius: 8
                        }}>
                            <Text style={{
                                fontWeight:"bold",
                                fontSize:13,
                                color:"#FFF"
                            }}>View Favorites</Text>
                        </View>
                      </TouchableOpacity>
                   </View>
               </View>

                <ScrollView  showsHorizontalScrollIndicator={false} horizontal={true} style = { styles.container }>


                <View style = {[styles.card, styles.cardElevated]}>
                  <Image style={{ height: 100, width: 100, borderRadius: 8}} source={require('../assets/maineIcons/picture.png')} />
                  <Text style = {styles.name}>Image to Braille</Text>
                </View>

                <View style = {[styles.card, styles.cardElevated]}>
                  <Image style={{ height: 100, width: 100, borderRadius: 8}} source={require('../assets/maineIcons/text.png')} />
                  <Text style = {styles.name}>Text to Braille</Text>
                </View>

                <View style = {[styles.card, styles.cardElevated]}>
                  <Image style={{ height: 100, width: 100, borderRadius: 8}} source={require('../assets/maineIcons/file.png')} />
                  <Text style = {styles.name}>Audio to Braille</Text>
                </View>

                <View style = {[styles.card, styles.cardElevated]}>
                  <Image style={{ height: 100, width: 100, borderRadius: 8}} source={require('../assets/maineIcons/video.png')} />
                  <Text style = {styles.name}>Video to Braille</Text>
                </View>


            

              </ScrollView>

                   
        </View>


        </ScrollView>
        



   
 );
};

const styles = StyleSheet.create({


  //favorites icon scrollview hori ************************************

  container: {
   top: 15,
  },
  
 name: {
    fontSize: 11,
    fontWeight: 'bold',
    paddingHorizontal: 8,
    alignItems: 'center',
    justifyContent: 'center',
  
  },

  card: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    width: 110,
    height: 120,
    borderRadius: 8, 
    margin: 25
    

  },
  cardElevated: {
    backgroundColor: "#EBF0F5", // bg color of card hehe
    elevation: 4,
    shadowOffset: {
    width: 10,
    height: 10,

    },

    shadowColor: 'black',
    shadowOpacity: 10 ,
    shadowRadius: 50,

  },

  


  
  
});

export default Home;
