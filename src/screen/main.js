import { StyleSheet, Text, View, LeftContent, TouchableOpacity, TextInput, Image } from 'react-native'
import React from 'react'
import { colors } from '../utils/colors';
import { useNavigation } from '@react-navigation/native';
import * as ImagePicker from 'expo-image-picker';
import * as DocumentPicker from 'expo-document-picker';
import { SafeAreaView } from 'react-native-safe-area-context';
import { ScrollView } from 'react-native';

// icons









//************************************************

const main = () => {
  const uploadFile = async (file, fileType) => {
    const formData = new FormData();
    const apiEndpoint = `http://192.168.0.2:8000/transcribe/${fileType}`;

    formData.append('file', {
      uri: file.uri,
      type: fileType === 'image' ? 'image/jpeg' : (fileType === 'video' ? 'video/mp4' : 'audio/mp3'),
      name: fileType === 'image' ? 'image.jpg' : (fileType === 'video' ? 'video.mp4' : 'audio.mp3'),
    });

    try {
      const response = await fetch(apiEndpoint, {
        method: 'POST',
        headers: {
          'Content-Type': 'multipart/form-data',
        },
        body: formData,
      });
  
      // Assuming that the server returns JSON, you can parse the response
      const responseData = await response.json();

      console.log(`Response for ${fileType}:`, responseData);
      console.log("Transcription: ", )

      if (response.status === 200) {
        console.log("Success");
      } else {
        console.error("Error Status:", response.status);
        console.error("Error Data:", response.data);
      }

    } catch (error) {
      console.error(error);
    }
  };

  const selectImage = async () => {
    try {
      await ImagePicker.getMediaLibraryPermissionsAsync();
      const image = await ImagePicker.launchImageLibraryAsync({
        mediaTypes: ImagePicker.MediaTypeOptions.Images,
      });

      if (!image.canceled) {
        await uploadFile(image.assets[0], 'image');
      } else {
        console.log("User Cancelled the upload");
      }

    } catch (error) {
      console.error(error);
    }
  };

  const selectVid = async () => {
    try {
      await ImagePicker.getMediaLibraryPermissionsAsync();
      const video = await ImagePicker.launchImageLibraryAsync({
        mediaTypes: ImagePicker.MediaTypeOptions.Videos,
      });

      if (!video.canceled) {
        console.log('VideoINFO:', video.assets[0])
        await uploadFile(video.assets[0], 'video');
      } else {
        console.log("User Cancelled the upload");
      }

    } catch (error) {
      console.error(error);
    }
  };

  const selectAudio = async () => {
    try {
      const audio = await DocumentPicker.getDocumentAsync({
        type: 'audio/*',
      });
  
      if (!audio.canceled) {
        console.log('AudioINFO:', audio.assets[0]);
        // await uploadFile(audio, 'audio');
      } else {
        console.log("User Cancelled the upload");
      }
    } catch (error) {
      console.error(error);
    }
  };

  return (


    <SafeAreaView style = {{ backgroundColor: 'white', flex: 1}}>

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
          <Text style={styles.subtitle}>Empowering Access. Transforming Documents.</Text>
        </View>

  






        <View style = {styles.container}>

  
              <TouchableOpacity style = {styles.box}>
                <View style = {styles.inner}>
                <Image style={{ height: 55, width: 55 , backgroundColor: 'white' }} source={require('../assets/maineIcons/text.png')} />
                  <Text style = {styles.text}>TEXT TO BRAILLE</Text>
                </View>
              </TouchableOpacity>


              <TouchableOpacity style = {styles.box} onPress={selectAudio}>
                <View style = {styles.inner}>
                <Image style={{ height: 55, width: 55  ,  }} source={require('../assets/maineIcons/audio.png')} />
                  <Text style = {styles.text}>AUDIO TO BRAILLE</Text>
                </View>
              </TouchableOpacity>


              <TouchableOpacity style = {styles.box} onPress={selectImage}>
                <View style = {styles.inner}>
                <Image style={{ height: 55, width: 55 , }} source={require('../assets/maineIcons/picture.png')} />
                  <Text style = {styles.text}>IMAGE TO BRAILLE</Text>
                </View>
              </TouchableOpacity>


              <TouchableOpacity style = {styles.box} onPress={selectVid}>
                <View style = {styles.inner}>
                <Image style={{ height: 55, width: 55 ,  }} source={require('../assets/maineIcons/video.png')} />
                  <Text style = {styles.text}>VIDEO TO BRAILLE</Text>

                </View>
              </TouchableOpacity>


              <TouchableOpacity style = {styles.box}>
                <View style = {styles.inner}>
                <Image style={{ height: 55, width: 55 ,  }} source={require('../assets/maineIcons/file.png')} />
                  <Text style = {styles.text}>FILE TO BRAILLE</Text>
                </View>
              </TouchableOpacity>

              <TouchableOpacity style = {styles.box}>
                <View style = {styles.faq}>
                <Image style={{ height: 55, width: 55 ,  }} source={require('../assets/maineIcons/faq.png')} />
                  <Text style = {{color: "black", fontWeight: 'bold', paddingTop: 15,}}>F.A.Q</Text>
                </View>
              </TouchableOpacity>




            
        </View>


        {/*FAQ HEHEHEHEHEHEHEHE*/ }


        <View>



        </View>


          
        

        


    </SafeAreaView>

    
  )
}

export default main

const styles = StyleSheet.create({

// LOGO ***********************

logoContainer: {
  alignItems: 'center',
},
logo: {
  width: 110, // Adjust the width as needed
  height: 180, // Adjust the height as needed
},
title: {
  fontSize: 30,
  fontWeight: 'bold',
  marginTop: -35,
},

blackText: {
  color: 'black',
},
blueText: {
  color: '#062CD4',
},
subtitle: {
  fontSize: 12,
  textAlign: 'center',
  marginTop: 5,
  color: 'black',
},


// card **************************************

container: {
  width: '60%',
  height: '40%',
  padding: 8,
  flexDirection: 'row',
  flexWrap: 'wrap',
  alignSelf: 'center',

},

box: {

  width: '50%',
  height: '45%',
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

faq: {
  flex: 1,
  backgroundColor: "#EBF0F5",
  alignItems: 'center',
  justifyContent: 'center',
  borderRadius: 8,

},


text: {
  color: "white",
  fontWeight: 'bold',
  paddingTop: 15,

},

})