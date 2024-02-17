import { View, Text, ScrollView, StyleSheet, Image, TextInput} from 'react-native'
import { TouchableOpacity } from 'react-native';
import { Searchbar } from 'react-native-paper';

import React from 'react'


// navigation to another screen
import { useNavigation } from '@react-navigation/native';
import { AuthContext } from '../../navigation/AuthProvider';

// DIMENSION COMPATIBILITY

import { ScaledSheet } from 'react-native-size-matters';








const historyScreen = () => { 
    

  return (

    <View style = {styles.mainContainer}>

      <View>

        <Text style = {styles.header}>Recent Transcription</Text>

          <Searchbar style = {styles.search} placeholder="Search Transcription Here"/>

      </View>

     

  


  <View style = {styles.latestContainer}>
        <View style = {styles.historyVertical}>

      <ScrollView>       
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

          
          
          

        
      
         </ScrollView>        
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