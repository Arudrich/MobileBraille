import { StyleSheet, Text, View } from 'react-native'
import React from 'react'
import { colors } from '../utils/colors';
import { useNavigation } from '@react-navigation/native';
import * as ImagePicker from 'expo-image-picker';
import * as DocumentPicker from 'expo-document-picker';

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

    <View>
      <Text>main</Text>
    </View>

    
  )
}

export default main

const styles = StyleSheet.create({})