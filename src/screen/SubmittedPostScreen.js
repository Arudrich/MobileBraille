import React from 'react';
import { View, Text, Image } from 'react-native';
import { ScrollView } from 'react-native';
import { Audio, Video } from 'expo-av';


const SubmittedPostScreen = ({ route }) => {
  const { title, imageUrl, transcription, braille, transcriptionType} = route.params;

  return (
    <ScrollView style={{ flex: 1, }}>
      <View style={{ alignItems: 'center', justifyContent: 'center'}}>
        <Text>Title: {title}</Text>
        {transcriptionType === 'video' && <Video source={{ uri: imageUrl }} style={{ width: 300, height: 200 }} useNativeControls />}
        {transcriptionType === 'image' && <Image source={{ uri: imageUrl }} style={{ width: 200, height: 200, marginVertical: 20 }} resizeMode='contain' />}
        {transcriptionType === 'audio' && <Audio source={{ uri: imageUrl }} />}
        <Text>Transcription: {transcription}</Text>
        <Text>Braille: {braille}</Text>
      </View>
    </ScrollView>
  );
};

export default SubmittedPostScreen;
