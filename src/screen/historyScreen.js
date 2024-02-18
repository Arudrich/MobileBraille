import { View, Text, ScrollView, StyleSheet, Image, TextInput, RefreshControl} from 'react-native'
import { TouchableOpacity } from 'react-native';
import { Searchbar } from 'react-native-paper';
import { FlatList } from 'react-native'; 

import HistoryCard from '../assets/Cards/HistoryCard';

import React, { useEffect, useContext, useState } from 'react'

//Firebase call
import { getDocs, collection, query, orderBy } from 'firebase/firestore';
import { database } from '../../FirebaseConfig'; 


// navigation to another screen
import { useNavigation } from '@react-navigation/native';
import { AuthContext } from '../../navigation/AuthProvider';

// DIMENSION COMPATIBILITY

import { ScaledSheet } from 'react-native-size-matters';








const historyScreen = () => {
  const [refreshing, setRefreshing] = useState(false);
  const [filteredData, setFilteredData] = useState([]);
  const [historyData, setHistoryData] = useState([]);
  const [searchQuery, setSearchQuery] = React.useState('');

  const fetchHistoryData = async () => {
    try {
      const q = query(collection(database, 'posts'), orderBy('postTime', 'desc'));
      const querySnapshot = await getDocs(q);
      const data = querySnapshot.docs.map(doc => ({ ...doc.data(), id: doc.id }));
      setHistoryData(data);
      setFilteredData(data);
    } catch (error) {
      console.error('Error fetching history data:', error);
    }
  };
  
  useEffect(() => {
    fetchHistoryData();
  }, []);

  const onRefresh = async () => {
    setRefreshing(true); // Set refreshing state to true
    try {
      await fetchHistoryData();
    } catch (error) {
      console.error('Error refreshing data:', error);
      // Handle error
    } finally {
      setRefreshing(false); // Set refreshing state back to false after refreshing
    }
  };

  const handleSearch = query => {
    setSearchQuery(query);
    const filtered = historyData.filter(item => 
      item.title && item.title.toLowerCase().includes(query.toLowerCase())
    );
    setFilteredData(filtered);
  };
  return (

    <View style = {styles.mainContainer}>

      <View>

        <Text style = {styles.header}>Recent Transcription</Text>

          <Searchbar 
            style = {styles.search} 
            placeholder="Search Transcription Here" 
            onChangeText={handleSearch}
            value={searchQuery}/>

      </View>

     

  


  <View style = {styles.latestContainer}>
      <View style = {styles.historyVertical}>
        <FlatList
          data={filteredData}
          showsVerticalScrollIndicator={false}
          // style={{ flex: 1}}
          keyExtractor={item => item.id}
          renderItem={({ item }) => <HistoryCard item={item} />} // Using HistoryCard component
          refreshControl={
              <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
            }
        />
        {/* <ScrollView>       
          <TouchableOpacity style = {styles.historyColorButon}>


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
              

            </TouchableOpacity>

            <TouchableOpacity style = {styles.historyColorButon}>


              <Image style={styles.historyPics} source={require('../assets/maineIcons/video.png')} ></Image>   
              <Text style = {styles.historyTextTitle}>Video to Braille</Text>

              <Text style = {styles.historydateTitle}> 01 / 11 / 2024 </Text>
            

            </TouchableOpacity>

            <TouchableOpacity style = {styles.historyColorButon}>


              <Image style={styles.historyPics} source={require('../assets/maineIcons/video.png')} ></Image>   
              <Text style = {styles.historyTextTitle}>Video to Braille</Text>

              <Text style = {styles.historydateTitle}> 01 / 11 / 2024 </Text>
              

          </TouchableOpacity>

           <TouchableOpacity style = {styles.historyColorButon}>


              <Image style={styles.historyPics} source={require('../assets/maineIcons/video.png')} ></Image>   
              <Text style = {styles.historyTextTitle}>Video to Braille</Text>

              <Text style = {styles.historydateTitle}> 01 / 11 / 2024 </Text>
              

          </TouchableOpacity>

           <TouchableOpacity style = {styles.historyColorButon}>


              <Image style={styles.historyPics} source={require('../assets/maineIcons/video.png')} ></Image>   
              <Text style = {styles.historyTextTitle}>Video to Braille</Text>

              <Text style = {styles.historydateTitle}> 01 / 11 / 2024 </Text>
              

          </TouchableOpacity>

          <TouchableOpacity style = {styles.historyColorButon}>


              <Image style={styles.historyPics} source={require('../assets/maineIcons/video.png')} ></Image>   
              <Text style = {styles.historyTextTitle}>Video to Braille</Text>

              <Text style = {styles.historydateTitle}> 01 / 11 / 2024 </Text>
              

          </TouchableOpacity>

          <TouchableOpacity style = {styles.historyColorButon}>


              <Image style={styles.historyPics} source={require('../assets/maineIcons/video.png')} ></Image>   
              <Text style = {styles.historyTextTitle}>Video to Braille</Text>

              <Text style = {styles.historydateTitle}> 01 / 11 / 2024 </Text>
              

          </TouchableOpacity>

          
          
          

        
      
        </ScrollView>         */}
      </View>
  </View>
  </View>



  )
}

const styles = ScaledSheet.create({

  mainContainer: {
    backgroundColor: 'white',
    flex: 1,
    padding: '12@s'
  },

  // SEARCH **************

  search: {
    backgroundColor: "#EBF0F5",
    height: '52@s',
    borderRadius: 8,
  },

  // HEADER *****************
 header: {
  fontSize: '20@s',
  marginBottom: '8@s',
  fontWeight: 'bold'
 },

 // HISTORY **********************

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
    
  
  

export default historyScreen