import { View, Text, StyleSheet, Image, TouchableOpacity } from 'react-native'
import React from 'react'
import { SafeAreaView } from 'react-native-safe-area-context'
import { ScrollView } from 'react-native'

const about = () => {
  return (



    <SafeAreaView style = {{ backgroundColor: "white", flex: 1}}>
      



       <View style={styles.logoContainer}>
        
   
          <Image
            source={require('../assets/MBraillelogo.png')}
            style={styles.logo}
            resizeMode="contain"
          />
          <Text style={styles.title}>
            <Text style={styles.blackText}>M.</Text>
            <Text style={styles.blueText}>Braille</Text>
          </Text>
        </View>


        <View style = {styles.mbraille}>

          <Text style ={{fontWeight: 'bold', padding: 15}}> What is Mobile Braille? </Text>

          <Text style = {{ color: 'white' ,textAlign: 'justify', fontSize: 14, padding: 12, paddingTop: 10, paddingHorizontal: 25, backgroundColor: '#062CD4' , borderRadius: 8}}> Welcome to the MBraille app, where we empower users to convert multiple modes of input
          into Braille seamlessly. Our mission is to enhance accessibility for individuals
          with visual impairments by providing a user-friendly and efficient transcription tool. </Text>

          <Text style ={{fontWeight: 'bold', padding: 15}}> Mobile Braille Developers: </Text>

        </View>

         <View style = {styles.container}>

  
              <View style = {styles.box}>
                <View style = {styles.inner}>
                <Image style={{ height: 55, width: 55 , borderRadius: 50  }} source={require('../assets/DEVELOPERS/GOMEZ.jpg')} />
                  <Text style = {styles.text}>Rafael Gomez</Text>
                  <Text style = {{ fontStyle: 'italic', color: 'white', fontSize: 12}}>Data Science</Text>
                </View>
              </View>


              <View style = {styles.box}>
                <View style = {styles.inner}>
                <Image style={{ height: 55, width: 55, borderRadius: 50  }} source={require('../assets/DEVELOPERS/MACADANGDANG.jpg')} />
                  <Text style = {styles.text}>Aldrich Macadangdang</Text>
                  <Text style = {{ fontStyle: 'italic', color: 'white', fontSize: 12}}>Railway Engineering</Text>
                </View>
              </View>


              <View style = {styles.box}>
                <View style = {styles.inner}>
                <Image style={{ height: 55, width: 55 , borderRadius: 50  }} source={require('../assets/DEVELOPERS/AGUINALDO.jpg')} />
                <Text style = {styles.text}>David Aguinaldo</Text>
                <Text style = {{ fontStyle: 'italic', color: 'white', fontSize: 12}}>Railway Engineering</Text>
                  
                </View>
                </View>


              <View style = {styles.box}>
                <View style = {styles.inner}>
                <Image style={{ height: 55, width: 55 , borderRadius: 50  }} source={require('../assets/DEVELOPERS/PASCUA.jpg')} />
                  <Text style = {styles.text}>Mark Pascua</Text>
                  <Text style = {{ fontStyle: 'italic', color: 'white', fontSize: 12}}>System Adminitration</Text>

                </View>
              </View>


            
        </View>




     


      

  

    </SafeAreaView>
    
    

  )
}

const styles = StyleSheet.create({

  // LOGO ***********************
  
  logoContainer: {
    alignItems: 'center',
    paddingTop: 15,
  },
  logo: {
    width: 180, // Adjust the width as needed
    height: 180, // Adjust the height as needed
  },
  title: {
    fontSize: 30,
    fontWeight: 'bold',
    marginTop: 15
  },
  
  blackText: {
    color: 'black',
  },
  blueText: {
    color: '#062CD4',
  },

  // mbraille ***********************


  mbraille: {

    paddingLeft: 8,
    paddingRight: 8,



  },


  // card developers

  container: {
    width: '80%',
    height: '40%',
    padding: 20,
    flexDirection: 'row',
    flexWrap: 'wrap',
    alignSelf: 'center',
    paddingTop: 1,
  },
  
  box: {
  
    width: '50%',
    height: '50%',
    padding: 5,
    borderRadius: 8, 
  
  
  },
  
  inner: {
    flex: 1,
    backgroundColor: '#062CD4',
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 8,
  
  
  },

  text: {

    color: 'white',
    fontWeight: 'bold',
    fontSize: 12,
 

  }

  
  
})

export default about