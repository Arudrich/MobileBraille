import { View, Text, StyleSheet, Image } from 'react-native'
import React from 'react'
import { ScrollView } from 'react-native';

// dimension fix
import { ScaledSheet } from 'react-native-size-matters';

const about = () => {
  return (

    <View style = {styles.mainContainer}>


      
        <View style = {styles.headerContainer}>
        <View style={styles.logoContainer}>
            
            <Image
              source={require('../assets/MBraillelogo.png')}
              style={styles.logo}
              resizeMode="contain"
            />
            <Text style = {styles.headerAboutUs}>About Us</Text>
            <Text style = {styles.subheaderAboutUs}>MEET THE DEVELOPERS OF MOBILE BRAILLE</Text>
        </View>
      </View>

      <View style = {styles.developers}>


  
              <View style = {styles.box}>
                <View style = {styles.inner}>
                <Image style={styles.imagesCard} source={require('../assets/DEVELOPERS/GOMEZ.jpg')} />
                  <Text style = {styles.text}>Rafael Gomez</Text>
                  <Text style = {styles.electives}>Data Science</Text>
                </View>
              </View>


              <View style = {styles.box}>
                <View style = {styles.inner}>
                <Image style={styles.imagesCard} source={require('../assets/DEVELOPERS/MACADANGDANG.jpg')} />
                  <Text style = {styles.text}>Aldrich Macadangdang</Text>
                  <Text style = {styles.electives}>Railway Engineering</Text>
                </View>
              </View>


              <View style = {styles.box}>
                <View style = {styles.inner}>
                <Image style={styles.imagesCard} source={require('../assets/DEVELOPERS/AGUINALDO.jpg')} />
                <Text style = {styles.text}>David Aguinaldo</Text>
                <Text style = {styles.electives}>Railway Engineering</Text>
                  
                </View>
                </View>


              <View style = {styles.box}>
                <View style = {styles.inner}>
                <Image style={styles.imagesCard} source={require('../assets/DEVELOPERS/PASCUA.jpg')} />
                  <Text style = {styles.text}>Mark Pascua</Text>
                  <Text style = {styles.electives}>System Administration</Text>

                </View>
              </View>


            
        </View>





      


       

    </View>

  )
}


const styles = ScaledSheet.create({

  // MAIN*****************************************


  mainContainer: {
   
  },

  // headerrrrrrrrrrrrrr COntainer ***********

  headerContainer: {
    padding: 12,
    alignContent: 'center',
    alignItems: 'center'


  },

  //Logo *******************************************

  logo: {
    bottom: '20@s',
    width: '80@s', // Adjust the width as needed
    height: '180@s', // Adjust the height as needed
    tintColor: 'white',
    alignSelf: 'center',
    

  
  },

  // HEADER*****************************************


  headerContainer: {
    backgroundColor: '#003153',
    borderBottomLeftRadius: 8,
    borderBottomRightRadius: 8, 
    height: '35%',
    padding: '12@s',
    alignItems: 'center'
 
  },

  headerAboutUs: {
    fontSize: '30@s',
    fontWeight: 'bold',
    bottom: '60@s',
    color: 'white',
    alignItems: 'center',
    alignSelf: 'center'


  },

  subheaderAboutUs: {
    fontSize: '10@s',
    bottom: '60@s',
    color: 'white',
    alignItems: 'center',
    alignSelf: 'center'


  },

  // developers ***********************************

  developers: {
    width: '100%',
    height: '45%',
    padding: '20@s',
    flexDirection: 'row',
    flexWrap: 'wrap',
    alignSelf: 'center',
    paddingTop: '15@s'
  },

  imagesCard: {
    height: '55@s',
    width: '55@s' , 
    borderRadius: 8,
    borderWidth: 1,
    borderColor: '#003153',
  },

  box: {
  
    width: '50%',
    height: '50%',
    padding: '5@s',
    borderRadius: 8, 
  
  },
  
  inner: {
    flex: 1,
    backgroundColor: "#EBF0F5",
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 8,
    borderWidth: 2,
    borderColor: '#003153'

  },
  
  text: {
  
    color: '#003153',
    fontWeight: 'bold',
    fontSize: '12@s',
  
  },

  electives: {
    fontStyle: 'italic', 
    color: '#003153',
    fontSize: '12@s'
  },


})




export default about