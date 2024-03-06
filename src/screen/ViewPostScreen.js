import React from 'react';
import { View, Text, Image, Linking, ScrollView } from 'react-native';
import { Button } from 'react-native-paper';
import { Video } from 'expo-av';

import { ScaledSheet } from 'react-native-size-matters';

// Custom Fonts ********************

import { useFonts } from 'expo-font'

const ViewPostScreen = ({ route }) => {
  const { title, imageUrl, transcription, braille, transcriptionType, downloadLinks, date } = route.params;

  // fonts*******************************************************

  const [ fontsLoaded ] = useFonts({
    'PTSans-Bold' : require ('../assets/fonts/PTSans-Bold.ttf'),
    'PTSans-BoldItalic' : require ('../assets/fonts/PTSans-BoldItalic.ttf'),
    'PTSans-Italic' : require ('../assets/fonts/PTSans-Italic.ttf'),
    'PTSans-Regular' : require ('../assets/fonts/PTSans-Regular.ttf'),


  })

  if (!fontsLoaded){
    return undefined ;
  }

  const formattedDate = new Date(date.seconds * 1000 + date.nanoseconds / 1000000); // Convert nanoseconds to milliseconds

  const options = { year: 'numeric', month: 'long', day: 'numeric' };
  const formattedDateString = formattedDate.toLocaleDateString(undefined, options);


  return (

    <ScrollView style={{ flex: 1 }}>
      <View style={{ alignItems: 'center', justifyContent: 'center' }}>

        <Text style = {styles.header}>Latest Transcription</Text>


        <Text style={styles.textStyle}>Title: {title} </Text>
        <Text style={styles.textStyle}>Date: {formattedDateString} </Text>
        <Text style={styles.textStyle}>Type of Transcription: {transcriptionType}  </Text> 

        {transcriptionType === 'video' && <Video source={{ uri: imageUrl }} style={styles.videoContainer} resizeMode= 'contain' useNativeControls />}
        {transcriptionType === 'image' && <Image source={{ uri: imageUrl }} style={styles.imageContainer} resizeMode= 'contain' />}

        <ScrollView contentContainerStyle={styles.resultBox}>
          <Text style={styles.textStyleOne}>Transcription Input:{'\n'}{'\n'} {transcription}</Text>
        </ScrollView>

        <ScrollView contentContainerStyle={styles.resultBox}>
         
          <Text style={styles.textStyleOne}>Braille Output:{'\n'}{'\n'} {braille}</Text>

        </ScrollView>

        <View style={styles.buttonContainer}>
          <Button icon="download" mode="elevated" onPress={() => Linking.openURL(downloadLinks.doc)} style={[styles.button, { width: 125 }]} textColor="#003153">
            <Text style = {styles.fontDownload}>Transcript</Text>
          </Button>
          <Button icon="download" mode="elevated" onPress={() => Linking.openURL(downloadLinks.brf)} style={[styles.button, { width: 100 }]} textColor="#003153">
            <Text style = {styles.fontDownload}>BRF</Text>
          </Button>
          <Button icon="download" mode="elevated" onPress={() => Linking.openURL(downloadLinks.pef)} style={[styles.button, { width: 100 }]} textColor="#003153">
            <Text style = {styles.fontDownload}>PEF</Text>
          </Button>
        </View>
      </View>
    </ScrollView>
  );
};

const styles = ScaledSheet.create({
    buttonContainer: {
      flexDirection: 'row',
      justifyContent: 'space-between',
      alignItems: 'center',
      marginVertical: '15@s',
    },
    button: {
      marginRight: '8@s', // Adjust the margin as needed
    },
    resultBox: {
      borderWidth: 3.5,
      borderColor: '#003153',
      padding: '12@s',
      borderRadius: 8,
      width: '80%', // Adjust the width as needed
      alignItems: 'flex-start',
      top: '12@s',
      margin: '15@s',
    },

    // style to sa text liek title and dates pati pala type of transciropotion hehe
    textStyle: {
      fontSize: '14@s',
      fontFamily: "PTSans-Regular",
      alignSelf: 'flex-start',
      padding: 8
    },
    


    textStyleOne: {
      fontSize: '11@s',
      fontFamily: "PTSans-Regular",
      textAlign: 'justify'

    },
    videoContainer: {
      width: '300@s',
      height: '200@s',
      alignSelf: 'center',
      borderWidth: 3,
      borderColor: '#003153',
      borderRadius: 8, 
     
    },
    imageContainer: {
      width: '300@s',
      height: '250@s',
      marginVertical: '20@s',
      borderWidth: 3,
      borderColor: '#003153',
      borderRadius: 8, 
    },

    //header ************
    
    header: {
      fontSize: '25@s',
      fontFamily: "PTSans-Bold",
      alignSelf: 'flex-start', 
      padding: 8
    },

    fontDownload: {
      fontSize: '12@s',
      fontFamily: "PTSans-Bold",

    }





  });

  export default ViewPostScreen;