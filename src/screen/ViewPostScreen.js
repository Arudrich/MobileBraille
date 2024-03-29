import React, { useState, useEffect } from 'react';
import { View, Text, Image, Linking, ScrollView, ActivityIndicator, TouchableOpacity} from 'react-native';
import { Button } from 'react-native-paper';
import { Video, Audio } from 'expo-av';
import AudioPlayerView from '../assets/Cards/AudioPlayerView';

import { ScaledSheet } from 'react-native-size-matters';

// Custom Fonts ********************

import { useFonts } from 'expo-font'

// zoommm
import { ReactNativeZoomableView } from '@openspacelabs/react-native-zoomable-view';

const ViewPostScreen = ({ route }) => {
  const { title, imageUrl, transcription, braille, braille_g2, transcriptionType, downloadLinks, date } = route.params;

  // Define states to handle audio playback
  const [sound, setSound] = useState(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [duration, setDuration] = useState(0);
  const [position, setPosition] = useState(0);
  const [brailleMode, setBrailleMode] = useState('G1'); // Initial mode is Grade 1 Braille

  // Function to toggle between G1 and G2 Braille
  const toggleBrailleMode = () => {
    setBrailleMode(brailleMode === 'G1' ? 'G2' : 'G1');
  };

  // Text for the button based on the current Braille mode
  const buttonText = brailleMode === 'G1' ? 'Set to G2' : 'Set to G1';

  // Braille output text based on the current Braille mode
  const brailleOutputText = brailleMode === 'G1' ? braille : braille_g2;


  // Function to play the audio
  const playAudio = async () => {
    try {
      if (sound) {
        await sound.playAsync();
        setIsPlaying(true);
      }
    } catch (error) {
      console.log('Error playing audio:', error);
    }
  };

  // Function to pause the audio
  const pauseAudio = async () => {
    try {
      if (sound) {
        await sound.pauseAsync();
        setIsPlaying(false);
      }
    } catch (error) {
      console.log('Error pausing audio:', error);
    }
  };

  // Function to handle seeking audio
  const seekAudio = async (value) => {
    try {
      if (sound) {
        await sound.setPositionAsync(value);
        setPosition(value);
      }
    } catch (error) {
      console.log('Error seeking audio:', error);
    }
  };

  // Load audio file
  const loadAudio = async () => {
    try {
      setIsLoading(true);
      const { sound } = await Audio.Sound.createAsync({ uri: imageUrl });
      setSound(sound);
      setIsLoading(false);
      
      // Get total duration of audio

      const status = await sound.getStatusAsync();
      setDuration(status.durationMillis);
    } catch (error) {
      console.log('Error loading audio:', error);
    }
  };

  // Load audio when component mounts

  {transcriptionType === 'audio' ? useEffect(() => {
    loadAudio();
    return sound ? () => {
      sound.unloadAsync();
    } : undefined;
  }, []) : null }

  // Check if title exceeds 20 characters
  let formattedTitle = title.length > 20 ? title.slice(0, 20) + '...' : title;

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
      <TouchableOpacity style={styles.brailleButtonContainer} onPress={toggleBrailleMode}>
        <Text style={styles.brailleButtonText}>{buttonText}</Text>
      </TouchableOpacity>
      <View style={{ alignItems: 'center', justifyContent: 'center' }}>

        <Text style = {styles.header}>Latest Transcriptions</Text>


        <Text style={styles.textStyle}>Title: <Text style = {styles.Title}>{formattedTitle}</Text></Text>
        

        {transcriptionType === 'video' && <Video source={{ uri: imageUrl }} style={styles.videoContainer} resizeMode= 'contain' useNativeControls />}
        {transcriptionType === 'image' && <Image source={{ uri: imageUrl }} style={styles.imageContainer} resizeMode= 'contain' />}
        {transcriptionType === 'audio' && (
          <AudioPlayerView 
            active={!isLoading}
            playable={!isLoading}
            loading={isLoading}
            isPlaying={isPlaying}
            playAudio={playAudio}
            pauseAudio={pauseAudio}
            totalDuration={duration}
            seekAudio={seekAudio}
            duration={position}
          />
        )}

        <View style = {styles.containerhehe}>

          <Text style={styles.textStyleType}>Type of Transcription: <Text style = {styles.transcriptionType}>{transcriptionType}</Text></Text> 
          <Text style={styles.textStyleDate}>Date: <Text style = {styles.dateType}>{formattedDateString}</Text></Text>

        </View>
       
          
              <ScrollView contentContainerStyle={styles.resultBoxInput}>
                <ReactNativeZoomableView
                   maxZoom={1.5}
                   minZoom={0.5}
                   zoomStep={0.5}
                   initialZoom={1}
                   doubleTapZoomToCenter
                   bindToBorders={true}
                   onZoomAfter={this.logOutZoomState}
                   style={{
                      padding: 10,
                   }}
                  >
                  <Text style={styles.textStyleOne}>Transcription Input:{'\n'}{'\n'} {transcription}</Text>
                </ReactNativeZoomableView>
              </ScrollView>

         

        <ScrollView contentContainerStyle={styles.resultBoxOutput}>
          <ReactNativeZoomableView
                    maxZoom={1.5}
                    minZoom={0.5}
                    zoomStep={0.5}
                    initialZoom={1}
                    doubleTapZoomToCenter
                    bindToBorders={true}
                    onZoomAfter={this.logOutZoomState}
                    style={{
                        padding: 10,
                    }}
                    >
         
          {/* <Text style={styles.textStyleTwo}>Braille Output:{'\n'}{'\n'} {braille}</Text> */}
            <Text style={styles.textStyleTwo}>Braille Output:{'\n'}{'\n'} {brailleMode === 'G1' ? braille : braille_g2}</Text>
          </ReactNativeZoomableView>
        </ScrollView>

        <View style={styles.buttonContainer}>
          <Button icon="download" mode="elevated" onPress={() => Linking.openURL(downloadLinks.docx)} style={[styles.button, { width: 125 }]} textColor="#003153">
            <Text style = {styles.fontDownload}>Transcript</Text>
          </Button>
          <Button icon="download" mode="elevated" onPress={() => {
              const downloadLink = brailleMode === 'G1' ? downloadLinks.brf_g1 || downloadLinks.brf : downloadLinks.brf_g2;
              Linking.openURL(downloadLink);
              }}  
              style={[styles.button, { width: 100 }]} textColor="#003153"
              disabled={brailleMode === 'G1' ? !(downloadLinks.brf_g1 || downloadLinks.brf) : !(downloadLinks.brf_g2)} >
            <Text style = {styles.fontDownload}>BRF</Text>
          </Button>
          <Button icon="download" mode="elevated" onPress={() => {
              const downloadLink = brailleMode === 'G1' ? downloadLinks.pef_g1 || downloadLinks.pef : downloadLinks.pef_g2;
              Linking.openURL(downloadLink); }}
              style={[styles.button, { width: 100 }]} textColor="#003153"
              disabled={brailleMode === 'G1' ? !(downloadLinks.pef_g1 || downloadLinks.pef) : !(downloadLinks.pef_g2)}>
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

    // for input
    resultBoxInput: {
      borderWidth: 3.5,
      borderColor: '#003153',
      padding: '12@s',
      borderRadius: 8,
      width: '80%', // Adjust the width as needed
      alignItems: 'flex-start',
      top: '12@s',
      margin: '15@s',
    },

        // for output


    resultBoxOutput: {
      borderWidth: 3.5,
      backgroundColor: '#003153',
      borderColor: '#003153',
      padding: '12@s',
      borderRadius: 8,
      width: '80%', // Adjust the width as needed
      alignItems: 'flex-start',
      top: '12@s',
      margin: '15@s',
    },



    // style to sa text like sa title and dates pati pala type of transciropotion hehe

    containerhehe: {
      flexDirection: 'row',
      alignSelf: 'flex-start',
      marginLeft: '25@s',
      marginTop: '12@s'

    },


    textStyleDate: {
      fontSize: '12@s',
      fontFamily: "PTSans-BoldItalic",
      paddingLeft: '18@s',
      bottom: '9@s',
    },

    textStyleType: {
      fontSize: '12@s',
      fontFamily: "PTSans-Bold",
      bottom: '9@s'
    },
    


    textStyleOne: {
      fontSize: '11@s',
      fontFamily: "PTSans-Bold",
      textAlign: 'justify'

    },

    textStyleTwo: {
      fontSize: '12@s',
      fontFamily: "PTSans-Bold",
      textAlign: 'justify',
      color: 'white'

    },
  
    videoContainer: {
      width: '300@s',
      height: '250@s',
      alignSelf: 'center',
      borderWidth: 3,
      borderColor: '#003153',
      borderRadius: 8, 
     
    },
    imageContainer: {
      width: '300@s',
      height: '250@s',  
      borderWidth: 3,
      borderColor: '#003153',
      borderRadius: 8, 
    },

 

    //header *************************************
    
    header: {
      fontSize: '25@s',
      fontFamily: "PTSans-Bold",
      alignSelf: 'flex-start', 
      padding: 20
    },

    fontDownload: {
      fontSize: '12@s',
      fontFamily: "PTSans-Bold",

    },

   textStyle: {

    fontSize: '14@s',
    fontFamily: "PTSans-Bold",
    bottom: '12@s',
    paddingTop: '12@s',
    paddingLeft: '25@s',
    alignSelf: 'flex-start',
    color: '#003153',
  

   },

   dateType: {
    fontSize: '12@s',
    color: 'black',
    textTransform: 'uppercase',
    fontFamily: "PTSans-Italic"
    
   },

   transcriptionType: {
    fontSize: '12@s',
    color: 'black',
    textTransform: 'uppercase',
    fontFamily: "PTSans-Bold"


   },
   Title: {
    textTransform: 'uppercase',
    fontSize: '16@s',
    color: 'black',

   },

   // Braille Button

   brailleButtonContainer: {
    position: 'absolute',
    top: '20@s',
    right: '20@s',
    backgroundColor: '#003153',
    padding: '8@s',
    borderRadius: '50@s',
    zIndex: 999,
  },
  brailleButtonText: {
    color: 'white',
    fontFamily: "PTSans-Bold",
    fontSize: '14@s',
  },





  });

  export default ViewPostScreen;