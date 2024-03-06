// import React from 'react';
// import { View, Text, Image, Platform } from 'react-native';
// import { ScrollView } from 'react-native';
// import { Audio, Video } from 'expo-av';
// import * as FileSystem from 'expo-file-system';
// import * as MediaLibrary from 'expo-media-library';
// //scaledshitts
// import { ScaledSheet } from 'react-native-size-matters';
// import { Button } from 'react-native-paper';

// const SubmittedPostScreen = ({ route }) => {
//   const { title, imageUrl, transcription, braille, transcriptionType, downloadLinks } = route.params;

//   const downloadFile = async (url, fileType) => {
//     try {
//       const downloadResumable = FileSystem.createDownloadResumable(
//         url,
//         FileSystem.documentDirectory + `${title}.${fileType}`
//       );

//       const { uri } = await downloadResumable.downloadAsync();

//       if (Platform.OS === 'ios') {
//         await MediaLibrary.saveToLibraryAsync(uri);
//       } else {
//         await MediaLibrary.createAssetAsync(uri);
//       }

//       console.log('Download complete');
//     } catch (error) {
//       console.error('Download error:', error);
//     }
//   };

//   return (
//     <ScrollView style={{ flex: 1 }}>
//       <View style={{ alignItems: 'center', justifyContent: 'center' }}>
//         <Text style={styles.textStyle}>Title: {title}</Text>

//         {transcriptionType === 'video' && <Video source={{ uri: imageUrl }} style={styles.videoContainer} useNativeControls />}
//         {transcriptionType === 'image' && <Image source={{ uri: imageUrl }} style={styles.imageContainer} resizeMode='contain' />}
//         {/* {transcriptionType === 'audio' && <Audio source={{ uri: imageUrl }} />} */}

//         <ScrollView contentContainerStyle={styles.resultBox}>
//           <Text style={styles.textStyleOne}>Transcription:{'\n'}{'\n'} {transcription}</Text>
//           <Text style={styles.textStyleOne}>Braille:{'\n'}{'\n'} {braille}</Text>
//         </ScrollView>

//         <View style={styles.buttonContainer}>
//           <Button icon="download" mode="elevated" onPress={() => downloadFile(downloadLinks.docx, 'docx')} style={[styles.button, { width: 125 }]} textColor="#003153">
//             Transcript
//           </Button>
//           <Button icon="download" mode="elevated" onPress={() => downloadFile(downloadLinks.brf, 'brf')} style={[styles.button, { width: 100 }]} textColor="#003153">
//             BRF
//           </Button>
//           <Button icon="download" mode="elevated" onPress={() => downloadFile(downloadLinks.pef, 'pef')} style={[styles.button, { width: 100 }]} textColor="#003153">
//             PEF
//           </Button>
//         </View>
//       </View>
//     </ScrollView>
//   );
// };

// // Button Styles
// const styles = ScaledSheet.create({
//   buttonContainer: {
//     flexDirection: 'row',
//     justifyContent: 'space-between',
//     alignItems: 'center',
//     marginVertical: '15@s',
//     paddingHorizontal: 10,
//   },
//   button: {
//     marginRight: '10@s', // Adjust the margin as needed
//   },
//   resultBox: {
//     borderWidth: 3,
//     borderColor: '#003153',
//     padding: 10,
//     borderRadius: 8,
//     width: '90%', // Adjust the width as needed
//     alignItems: 'flex-start',
//   },
//   textStyle: {
//     fontSize: '14@s',
//     fontWeight: 'bold',
//   },
//   textStyleOne: {
//     fontSize: '12@s',
//   },
//   videoContainer: {
//     width: '300@s',
//     height: '200@s',
//   },
//   imageContainer: {
//     width: '200@s',
//     height: '200@s',
//     marginVertical: '20@s'
//   },
// });

// export default SubmittedPostScreen;

import React from 'react';
import { View, Text, Image, Linking } from 'react-native';
import { ScrollView } from 'react-native';
import { Audio, Video } from 'expo-av';
//Scaledshitts
import { ScaledSheet } from 'react-native-size-matters';
import { Button } from 'react-native-paper';

// Custom Fonts ********************

import { useFonts } from 'expo-font'

const SubmittedPostScreen = ({ route }) => {
  const { title, imageUrl, transcription, braille, transcriptionType, downloadLinks } = route.params;

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


  return (
    <ScrollView style={{ flex: 1 }}>
      <View style={{ alignItems: 'center', justifyContent: 'center' }}>

        <Text style = {styles.header}>Transcription Results</Text>


        <Text style={styles.textStyle}>Title: {title}</Text>
        <Text style={styles.textStyle}>Date: March 10, 2024 </Text>
        <Text style={styles.textStyle}>Type of Transcription: Mark Pascua to David Aguinaldo  </Text> 

        {transcriptionType === 'video' && <Video source={{ uri: imageUrl }} style={styles.videoContainer} useNativeControls />}
        {transcriptionType === 'image' && <Image source={{ uri: imageUrl }} style={styles.imageContainer} resizeMode='contain' />}

        <ScrollView contentContainerStyle={styles.resultBoxInput}>
          <Text style={styles.textStyleOne}>Transcription Input:{'\n'}{'\n'} {transcription}</Text>
        </ScrollView>

        <ScrollView contentContainerStyle={styles.resultBoxOutput}>
         
          <Text style={styles.textStyleTwo}>Braille Output:{'\n'}{'\n'} {braille}</Text>
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

// Button Styles

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

  textStyleTwo: {
    fontSize: '12@s',
    fontFamily: "PTSans-Bold",
    textAlign: 'justify',
    color: 'white'

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

export default SubmittedPostScreen;
