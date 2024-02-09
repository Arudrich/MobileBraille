import React from 'react';
import { TouchableOpacity, Image, Text, View } from 'react-native';

const HistoryCard = ({ item }) => {
  // Function to select the icon based on transcription type
  const selectIcon = (transcriptionType) => {
    switch (transcriptionType) {
      case 'audio':
        return require('../maineIcons/audio.png');
      case 'image':
        return require('../maineIcons/picture.png');
      case 'document': // Changed from 'pdf' to 'document'
        return require('../maineIcons/file.png'); // Using the file icon for documents
      default:
        return null;
    }
  };

  const icon = selectIcon(item.transcriptionType);

  return (
    <TouchableOpacity 
      style={{
        height: 170,
        elevation: 2,
        backgroundColor: "#EBF0F5",
        marginLeft: 20,
        marginTop: 20,
        borderRadius: 8,
        marginBottom: 10,
        width: 190,
      }}
    >
      <Image
        source={icon}
        style={{ width: 100, height: 100, alignSelf: 'center' }}
      />
      <View style={{ flexDirection: "row", paddingTop: 10, paddingHorizontal: 10 }}>
        <Text style={{ fontWeight: "bold" }}>{item.title}</Text>
        <Text style={{ fontWeight: "bold", color: '#062CD4', paddingLeft: 20, fontStyle: 'italic' }}>{item.date}</Text>
      </View>
      <Text style={{ paddingHorizontal: 10, color: '#062CD4', paddingTop: 3 }}>{item.fileName}</Text>
    </TouchableOpacity>
  );
};

export default HistoryCard;