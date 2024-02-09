import { View, Text, StyleSheet, Image,} from 'react-native'
import React from 'react'
import { SafeAreaView } from 'react-native-safe-area-context'
import { ScrollView } from 'react-native'
import { TouchableOpacity } from 'react-native'
import { counterEvent } from 'react-native/Libraries/Performance/Systrace'

const about = () => {
  return (

    <ScrollView showsVerticalScrollIndicator={false} >

      <View style = {styles.content}>


      <Image
      
          style={styles.background}
          source={require ('../assets/background/aboutbg.png')} 
        />

      </View>

      <View style = {styles.whoarewe}>

        <Text style = {{ textAlign: 'justify', fontWeight: 'bold', fontSize: 20 }}><Text style = {{color: '#062CD4'}}>WHO</Text> ARE WE?</Text>

        <Text style = {{textAlign: 'justify', fontSize: 12, paddingTop: 6, }}>Good day! we are a Computer Engineering Student from Technological Institute of the Philippines.</Text>

        <Text style = {{ paddingTop: 10, textAlign: 'justify', fontWeight: 'bold', fontSize: 20 }}><Text style = {{color: '#062CD4'}}>WHAT</Text> IS MOBILE BRAILLE?</Text>

        <Text style = {{textAlign: 'justify', fontSize: 12, paddingTop: 6, }}>Mobile Braille is an mobile application where we empower users to convert multiple modes of input
          into Braille seamlessly. Our mission is to enhance accessibility for individuals
          with visual impairments by providing a user-friendly and efficient transcription tool.</Text>

        <Text style = {{ paddingTop: 10, textAlign: 'justify', fontWeight: 'bold', fontSize: 20 }}><Text style = {{color: '#062CD4'}}>VISION</Text> AND <Text style = {{color: '#062CD4'}}>MISSION</Text>  </Text>

        <Text style = {{textAlign: 'justify', fontSize: 12, paddingTop: 6, }}>We envision a better life for Filipinos by empowering our students with the best globally competitive technological education in engineering, computing, and allied disciplines.</Text>

        <Text style = {{textAlign: 'justify', fontSize: 12, paddingTop: 6, }}>Through digitalization and innovation in academic design and delivery, T.I.P. students, faculty, staff, and industry partners work together. </Text>
        

      </View>

      <View style = {styles.features}>

        <Text style = {{ paddingTop: 1, textAlign: 'justify', fontWeight: 'bold', fontSize: 20,}}>MBRAILLE <Text style = {{color: '#062CD4'}}> FEATURES</Text></Text>
      
      </View>

      {/*FEAAAAAATURESSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSS*************/}

      <ScrollView 
                    horizontal
                    showsHorizontalScrollIndicator={false}
                    style={{height:250}}
                >         
                    <View
                        style={{
                            height:100,
                            elevation:2,
                            backgroundColor: "#EBF0F5",
                            marginLeft:20,
                            marginTop:20,
                            borderRadius: 8 ,
                            marginBottom: 10,
                            width: 150,
                            alignContent: 'center',
                            alignItems: 'center',
                            alignSelf: 'center',
                            paddingTop: 10,
                            
                        }}
                    >
                        <Image
                            source={require('../assets/maineIcons/multiple.png')}
                            style = {{ width: 50, height: 50, alignSelf: 'center', }}
                        />
                        <View style={{
                            flexDirection:"row",
                            paddingTop:15,
                            paddingHorizontal:10,
                            alignSelf: 'center',

                        }}>
                            <Text style={{
                                fontWeight:"bold",
                                fontSize: 12,
                        
                            
                                
                            }}>Multiple Transcription</Text>          
                        </View>
                    </View>


                    <View
                        style={{
                            height:100,
                            elevation:2,
                            backgroundColor: "#EBF0F5",
                            marginLeft:20,
                            marginTop:20,
                            borderRadius: 8 ,
                            marginBottom:10,
                            width: 150,
                            alignContent: 'center',
                            alignItems: 'center',
                            alignSelf: 'center',
                            paddingTop: 10,
                        }}
                    >
                        <Image
                            source={require('../assets/maineIcons/easytouse.png')}
                            style = {{ width: 50, height: 50, alignSelf: 'center', }}
                        />
                        <View style={{
                            flexDirection:"row",
                            paddingTop:10,
                            paddingHorizontal:10,
                            alignSelf: 'center'
                        }}>
                            <Text style={{
                                fontWeight:"bold",
                                fontSize: 12,
                                paddingTop: 4
                                
                            }}>Easy to Use</Text>          
                        </View>
                    </View>


                    <View
                        style={{
                            height:100,
                            elevation:2,
                            backgroundColor: "#EBF0F5",
                            marginLeft:20,
                            marginTop:20,
                            borderRadius: 8 ,
                            marginBottom:10,
                            width: 150,
                            alignContent: 'center',
                            alignItems: 'center',
                            alignSelf: 'center',
                            paddingTop: 10,
                        }}
                    >
                        <Image
                            source={require('../assets/maineIcons/accurate.png')}
                            style = {{ width: 50, height: 50, alignSelf: 'center',  }}
                        />
                        <View style={{
                            flexDirection:"row",
                            paddingTop:10,
                            paddingHorizontal:10,
                            alignSelf: 'center'
                        }}>
                            <Text style={{
                                fontWeight:"bold",
                                fontSize: 12,
                                paddingTop: 4
                                
                            }}>Accurate</Text>          
                        </View>
                    </View>

      </ScrollView>  


      <View style = {{paddingTop: 5,}}>

      <Text style = {{textAlign: 'justify', fontWeight: 'bold', fontSize: 20, alignSelf: 'center' }}>THE <Text style = {{color: '#062CD4'}}>DEVELOPERS</Text></Text>


      </View>


    



       <View style = {styles.developers}>


  
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






 



      </ScrollView>
    




   
  )
}

const styles = StyleSheet.create({ 

content: {
  alignItems: 'center',
  flex: 1,
  alignContent: 'center',


},

background: {

  height: 250,
  width: 411,
  borderBottomLeftRadius: 22,
  borderBottomRightRadius: 22,

},

whoarewe: {
  padding: 19,


},

features: {
  
  alignSelf: 'center'


},

// developers

developers: {
  width: '100%',
  height: '30%',
  padding: 20,
  flexDirection: 'row',
  flexWrap: 'wrap',
  alignSelf: 'center',
  paddingTop: 35
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