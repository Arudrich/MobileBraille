import React from 'react';
import { View, Text, Image } from 'react-native';
import { ScrollView } from 'react-native';
import { Audio, Video } from 'expo-av';
//scaledshitts
import { ScaledSheet } from 'react-native-size-matters';
import { Button } from 'react-native-paper';


const SubmittedPostScreen = ({ route }) => {
  const { title, imageUrl, transcription, braille, transcriptionType} = route.params;

   return (
    <ScrollView style={{ flex: 1 }}>
      <View style={{ alignItems: 'center', justifyContent: 'center' }}>
        <Text style={styles.textStyle}>Title: {title}</Text>

        {transcriptionType === 'video' && <Video source={{ uri: imageUrl }} style={{ width: 300, height: 200 }} useNativeControls />}
        {transcriptionType === 'image' && <Image source={{ uri: imageUrl }} style={{ width: 200, height: 200, marginVertical: 20 }} resizeMode='contain' />}
        {transcriptionType === 'audio' && <Audio source={{ uri: imageUrl }} />}

        <ScrollView contentContainerStyle={styles.resultBox}>
          <Text style={styles.textStyleOne}>Transcription:{'\n'}{'\n'} {transcription}</Text>
          <Text style={styles.textStyleOne}>Braille:{'\n'}{'\n'} {braille}</Text>
        </ScrollView>

        <View style={styles.buttonContainer}>
          <Button icon="download" mode="elevated" onPress={() => console.log('Pressed')} style={{ width: 125 }} textColor="#003153">
            Transcript
          </Button>
          <Button icon="download" mode="elevated" onPress={() => console.log('Pressed')} style={{ width: 100 }} textColor="#003153">
            BRF
          </Button>
          <Button icon="download" mode="elevated" onPress={() => console.log('Pressed')} style={{ width: 100 }} textColor="#003153">
            PEF
          </Button>
        </View>
      </View>
    </ScrollView>
  );
};

/////////////////////////////////////////////////////////////BUTTON STYLES/////////////////////////////////////////////////////////////////////////////////////
const styles = ScaledSheet.create({
  buttonContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginVertical: '7@s', 
    paddingHorizontal: '30@s', 
  },
  resultBox: {
    borderWidth: 3,
    borderColor: '#003153',
    padding: 10,
    borderRadius: 8,
    width: '90%', // Adjust the width as needed
    alignItems: 'left',
  },
  textStyle:{
    fontSize: '14@s',
    fontWeight: 'bold',
  },
  textStyleOne:{
    fontSize: '12@s',
    fontStyle: 'italic',
    fontWeight: 'bold',
  }
});

export default SubmittedPostScreen;
