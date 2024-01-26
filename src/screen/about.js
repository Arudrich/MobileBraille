import { View, Text, StyleSheet, Image } from 'react-native'
import { SafeAreaView } from "react-native-safe-area-context";
import { ScrollView } from 'react-native';
import { colors } from '../utils/colors';
import React from 'react'

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

  <View style = {styles.content}>


  </View>


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
    paddingTop: 50,
  
  },
  name: {
  color: 'white',
    alignItems: 'center',
    justifyContent: 'center'

  },
  container: {
    padding: 8,
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



})

export default about