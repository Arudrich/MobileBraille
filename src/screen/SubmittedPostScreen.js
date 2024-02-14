import React from 'react';
import { View, Text, Image } from 'react-native';
import { ScrollView } from 'react-native';

const SubmittedPostScreen = ({ route }) => {
  const { title, imageUrl, transcription, braille } = route.params;

  return (
    <ScrollView style={{ flex: 1, }}>
      <View style={{ alignItems: 'center', justifyContent: 'center'}}>
        <Text>Title: {title}</Text>
        <Image source = {{ uri: imageUrl }} style = {{ width: 200, height: 200, marginVertical: 20 }} resizeMode = 'contain' />
        <Text>Transcription: {transcription}</Text>
        <Text>Braille: {braille}</Text>
      </View>
    </ScrollView>
  );
};

export default SubmittedPostScreen;
