import { View, Text, StyleSheet, Image } from 'react-native'
import { SafeAreaView } from "react-native-safe-area-context";
import { ScrollView } from 'react-native';
import { colors } from '../utils/colors';
import React from 'react'


//Lottie icon
import LottieView from 'lottie-react-native';

const about = () => {
  return (
<SafeAreaView style = {{flex: 1}}>


    <View style = {{ paddingTop: 40, paddingLeft: 150 }}>

      <Text style = {{ fontWeight: 'bold', fontSize: 20,  }}>DEVELOPERS</Text>

    </View>


<ScrollView horizontal={true} style = { styles.container }>


  <View style = {[styles.card, styles.cardElevated]}>
    <Image style={{ height: 100, width: 100, borderRadius: 100 }} source={require('../assets/MACADANGDANG.jpg')} />
    <Text style = {styles.name}>Aldrich D. Macadangdang</Text>
    <Text style = {{fontSize: 15, fontStyle: 'italic', color: colors.secondary}}>Railway Engineer</Text>

  </View>

  <View style = {[styles.card, styles.cardElevated]}>
    <Image style={{ height: 100, width: 100, borderRadius: 100 }} source={require('../assets/MACADANGDANG.jpg')} />
    <Text style = {styles.name}>David Aguinaldo</Text>
    <Text style = {{fontSize: 15, fontStyle: 'italic', color: colors.secondary}}>Railway Engineer</Text>
  </View>

  <View style = {[styles.card, styles.cardElevated]}>
    <Image style={{ height: 100, width: 100, borderRadius: 100 }} source={require('../assets/MACADANGDANG.jpg')} />
    <Text style = {styles.name}>Mark Pascua</Text>
    <Text style = {{fontSize: 15, fontStyle: 'italic', color: colors.secondary}}>System Administration</Text>
  </View>

  <View style = {[styles.card, styles.cardElevated]}>
    <Image style={{ height: 100, width: 100, borderRadius: 100 }} source={require('../assets/MACADANGDANG.jpg')} />
    <Text style = {styles.name} >Rafael Gomez</Text>
    <Text style = {{fontSize: 15, fontStyle: 'italic', color: colors.secondary}}>Data Science</Text>
  </View>
</ScrollView>


<ScrollView>

  <View style = {styles.content}>

    <Text style = {{ fontWeight: 'bold', fontSize: 20, }}> Mobile Braille </Text>

    <LottieView style = {{ height: 290, alignItems: 'center', alignContent: 'center' }} source={require('../assets/lottie/about.json')} autoPlay loop />

    <Text style = {{ color: colors.secondary ,textAlign: 'justify', fontSize: 14, padding: 10, paddingTop: 10, backgroundColor: colors.primary , borderRadius: 8}}> Welcome to the MBraille app, where we empower users to convert multiple modes of input
          into Braille seamlessly. Our mission is to enhance accessibility for individuals
          with visual impairments by providing a user-friendly and efficient transcription tool. </Text>
  
        <Text style = {{ fontWeight: 'bold', fontSize: 20, paddingTop: 10 }}> Features</Text>

       
  
  </View>

    

  </ScrollView>


</SafeAreaView>
  )
}


const styles = StyleSheet.create ({

  headerContainer: {
    alignItems: "center",
  },

  headingText: {
    fontSize: 25,
    fontWeight: 'bold',
    paddingHorizontal: 8,
    alignItems: 'center',
    justifyContent: 'center',
  
  },
  name: {
  color: 'white',
    alignItems: 'center',
    justifyContent: 'center'

  },
  container: {
    padding: 5,
  },
  card: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    width: 190,
    height: 200,
    borderRadius: 8, 
    margin: 6,

  },
  cardElevated: {
    backgroundColor: colors.primary,
    elevation: 4,
    shadowOffset: {
    width: 1,
    height: 1,

    },

    shadowColor: 'black',
    shadowOpacity: 10 ,
    shadowRadius: 20,

  },

  // content container

  content: {
    paddingBottom: 50,
    paddingTop: 5,
    alignContent: 'center',
    alignItems: 'center'
  }


})

export default about