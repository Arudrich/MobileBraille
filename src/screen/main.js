import { StyleSheet, Text, View, LeftContent, TouchableOpacity, TextInput, Image } from 'react-native'
import React from 'react'
import { colors } from '../utils/colors';
import { useNavigation } from '@react-navigation/native';
import * as ImagePicker from 'expo-image-picker';
import * as DocumentPicker from 'expo-document-picker';
import { SafeAreaView } from 'react-native-safe-area-context';
import { ScrollView } from 'react-native';

// icons

import LottieView from 'lottie-react-native';







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

      console.log("Response for ${fileType}:", responseData);

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

     

  
        <View style  = {{alignContent: 'center', alignItems: 'center', padding: 25}} >

          
          <LottieView style = {{ height: 190, alignItems: 'center', }} source={require('../assets/lottie/main.json')} autoPlay loop />
          <Text style = {{borderRadius: 8, padding: 8, backgroundColor: "#062CD4", color: 'white', paddingTop: 8, fontSize: 15, fontWeight: 'bold'}}> Mobile Braille Transcription</Text>

        </View>


        <View style = {styles.container}>

              <View style = {styles.box}>
                <View style = {styles.inner}>
                <Image style={{ height: 85, width: 100 , borderRadius: 35, backgroundColor: 'white' }} source={require('../assets/maineIcons/text.png')} />
                  <Text style = {styles.text}>TEXT TO BRAILLE</Text>
                  <TouchableOpacity style = {{backgroundColor: '#062CD4', borderRadius: 8, padding: 12}}>

                    <Text style = {{color: 'white', fontWeight: 'bold'}}>TRANSCRIBE</Text>

                  </TouchableOpacity>

                </View>
              </View>

              <View style = {styles.box}>
                <View style = {styles.inner}>
                <Image style={{ height: 85, width: 100 , borderRadius: 12, backgroundColor: 'white' }} source={require('../assets/maineIcons/audio.png')} />
                  <Text style = {styles.text}>AUDIO TO BRAILLE</Text>
                  <TouchableOpacity style = {{backgroundColor: '#062CD4', borderRadius: 8, padding: 12}}>

                    <Text style = {{color: 'white', fontWeight: 'bold'}}>TRANSCRIBE</Text>

                  </TouchableOpacity>

                </View>
              </View>

              <View style = {styles.box}>
                <View style = {styles.inner}>
                <Image style={{ height: 85, width: 100 , borderRadius: 12, backgroundColor: 'white' }} source={require('../assets/maineIcons/picture.png')} />
                  <Text style = {styles.text}>PNG/JPG TO BRAILLE</Text>
                  <TouchableOpacity style = {{backgroundColor: '#062CD4', borderRadius: 8, padding: 12}}>

                    <Text style = {{color: 'white', fontWeight: 'bold'}}>TRANSCRIBE</Text>

                  </TouchableOpacity>

                </View>
              </View>

              <View style = {styles.box}>
                <View style = {styles.inner}>
                <Image style={{ height: 85, width: 100 , borderRadius: 12, backgroundColor: 'white' }} source={require('../assets/maineIcons/video.png')} />
                  <Text style = {styles.text}>VIDEO TO BRAILLE</Text>
                  <TouchableOpacity style = {{backgroundColor: '#062CD4', borderRadius: 8, padding: 12}}>

                    <Text style = {{color: 'white', fontWeight: 'bold'}}>TRANSCRIBE</Text>

                  </TouchableOpacity>

                </View>
              </View>

              <View style = {styles.box}>
                <View style = {styles.inner}>
                <Image style={{ height: 85, width: 100 , borderRadius: 35,backgroundColor: 'white' }} source={require('../assets/maineIcons/text.png')} />
                  <Text style = {styles.text}>? TO BRAILLE</Text>
                  <TouchableOpacity style = {{backgroundColor: '#062CD4', borderRadius: 8, padding: 12}}>

                    <Text style = {{color: 'white', fontWeight: 'bold'}}>TRANSCRIBE</Text>

                  </TouchableOpacity>

                </View>
              </View>

            
        </View>

        

        


    </SafeAreaView>

    
  )
}

export default main

const styles = StyleSheet.create({


// card **************************************

container: {
  width: '100%',
  height: '85%',
  padding: 1,
  flexDirection: 'row',
  flexWrap: 'wrap',


},

box: {

  width: '50%',
  height: '25%',
  padding: 3,
  borderRadius: 8,


  
},

inner: {
  flex: 1,
  backgroundColor: '#EBF0F5',
  alignItems: 'center',
  justifyContent: 'center',
  borderRadius: 8,


},
text: {
  color: "black",
  fontWeight: 'bold',
  paddingTop: 10
}








})