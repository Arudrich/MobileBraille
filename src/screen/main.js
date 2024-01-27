import { StyleSheet, Text, View, LeftContent, TouchableOpacity, TextInput } from 'react-native'
import React from 'react'
import { colors } from '../utils/colors';
import { useNavigation } from '@react-navigation/native';
import * as ImagePicker from 'expo-image-picker';
import * as DocumentPicker from 'expo-document-picker';
import { SafeAreaView } from 'react-native-safe-area-context';
import { ScrollView } from 'react-native';

// icons

import { Feather } from "@expo/vector-icons";

import LottieView from 'lottie-react-native';


import { responsiveHeight } from "react-native-responsive-dimensions";

//react native paper

import { Avatar, Button, Card } from 'react-native-paper';



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

      <View style = {{paddingTop: 25, padding: 50, paddingBottom: 10,}}>
        <View style = {styles.searchContainer} >

          <Feather name="search" size={ 30 } color= "blue" />
          <TextInput placeholder = "Search type of Transcription " />

        </View>

      </View>


      <ScrollView>

      <View style  = {{alignItems: 'center', padding: 25}} >

        
        <LottieView style = {{ height: 170, alignItems: 'center', }} source={require('../assets/lottie/main.json')} autoPlay loop />
        <Text style = {{paddingTop: 5, fontSize: 15, fontWeight: 'bold'}}>Welcome to Mobile Braille Transcription</Text>


      </View>




        <Card style = {styles.cardcontainer}>

            <Card.Title style = {styles.cardTitle} title="Text to Braille" />
              <Card.Content>
                  <Text style = {{paddingBottom: 10}} variant="bodyMedium"> Description </Text>
            </Card.Content>
            <Card.Cover style ={{padding: 10}}  source={{ uri: 'http://tinyurl.com/3zkfjh7s' }} />
            <Card.Actions>

                <TouchableOpacity style = {{
                  borderWidth: 1,
                  borderColor: "white",
                  backgroundColor: '#062CD4',
                  height: 45,
                  padding: 10,
                  borderRadius: 8 ,
                  alignItems: "center",
                  justifyContent: "center"}}>


                <Text
                 style={{
                fontSize: 19,
                color: 'white',
                fontWeight: "500",
                  }} >
                    Transcribe
                </Text>
                </TouchableOpacity>
            </Card.Actions>
        </Card>


        <Card style = {styles.cardcontainer}>

            <Card.Title style = {styles.cardTitle} title="Audio to Braille" />
              <Card.Content>
                  <Text style = {{paddingBottom: 10}} variant="bodyMedium"> Description </Text>
            </Card.Content>
            <Card.Cover style ={{padding: 10}}  source={{ uri: 'http://tinyurl.com/3zkfjh7s' }} />
            <Card.Actions>

                <TouchableOpacity style = {{
                  borderWidth: 1,
                  borderColor: "white",
                  backgroundColor: '#062CD4',
                  height: 45,
                  padding: 10,
                  borderRadius: 8 ,
                  alignItems: "center",
                  justifyContent: "center"}}>


                <Text
                 style={{
                fontSize: 19,
                color: 'white',
                fontWeight: "500",
                  }} >
                    Transcribe
                </Text>
                </TouchableOpacity>
            </Card.Actions>
        </Card>


        <Card style = {styles.cardcontainer}>

            <Card.Title style = {styles.cardTitle} title="Image to Braille" />
              <Card.Content>
                  <Text style = {{paddingBottom: 10}} variant="bodyMedium"> Description </Text>
            </Card.Content>
            <Card.Cover style ={{padding: 10,}}  source={{ uri: 'http://tinyurl.com/3zkfjh7s' }} />
            <Card.Actions>

                <TouchableOpacity style = {{
                  borderWidth: 1,
                  borderColor: "white",
                  backgroundColor: '#062CD4',
                  height: 45,
                  padding: 10,
                  borderRadius: 8 ,
                  alignItems: "center",
                  justifyContent: "center"}}>


                <Text
                 style={{
                fontSize: 19,
                color: 'white',
                fontWeight: "500",
                  }} >
                    Transcribe
                </Text>
                </TouchableOpacity>
            </Card.Actions>
        </Card>


        <Card style = {styles.cardcontainer}>

            <Card.Title style = {styles.cardTitle} title="Video to Braille" />
              <Card.Content>
                  <Text style = {{paddingBottom: 10}} variant="bodyMedium"> Description </Text>
            </Card.Content>
            <Card.Cover style ={{padding: 10,}}  source={{ uri: 'http://tinyurl.com/3zkfjh7s' }} />
            <Card.Actions>

                <TouchableOpacity style = {{
                  borderWidth: 1,
                  borderColor: "white",
                  backgroundColor: '#062CD4',
                  height: 45,
                  padding: 10,
                  borderRadius: 8 ,
                  alignItems: "center",
                  justifyContent: "center"}}>


                <Text
                 style={{
                fontSize: 19,
                color: 'white',
                fontWeight: "500",
                  }} >
                    Transcribe
                </Text>
                </TouchableOpacity>
            </Card.Actions>
        </Card>
        

        <Card style = {styles.cardcontainer}>

            <Card.Title style = {styles.cardTitle} title="Files to Braille" />
              <Card.Content>
                  <Text style = {{paddingBottom: 10}} variant="bodyMedium"> Description </Text>
            </Card.Content>
            <Card.Cover style ={{padding: 10,}}  source={{ uri: 'http://tinyurl.com/3zkfjh7s' }} />
            <Card.Actions>

                <TouchableOpacity style = {{
                  borderWidth: 1,
                  borderColor: "white",
                  backgroundColor: '#062CD4',
                  height: 45,
                  padding: 10,
                  borderRadius: 8 ,
                  alignItems: "center",
                  justifyContent: "center"}}>


                <Text
                 style={{
                fontSize: 19,
                color: 'white',
                fontWeight: "500",
                  }} >
                    Transcribe
                </Text>
                </TouchableOpacity>
            </Card.Actions>
        </Card>


      </ScrollView>
      
    </SafeAreaView>

    
  )
}

export default main

const styles = StyleSheet.create({


cardcontainer: {
  borderColor: '#062CD4',
  padding: 1,
  paddingTop: 25,
  backgroundColor: "white",
  borderRadius: 8
},
cardTitle: {
  paddingTop: 15,

},

//search container

searchContainer: {
  height: 30,
  paddingLeft: 15,
  height: responsiveHeight(6.5),
  backgroundColor: "#EBF0F5",
  borderRadius: 8 ,
  flexDirection: "row",
  alignItems: "center",
  gap: 10, // gap ng icon

},




})