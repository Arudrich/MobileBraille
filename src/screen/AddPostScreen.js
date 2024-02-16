import React, { useState, useContext, useEffect } from 'react';
import {
  View,
  Text,
  Platform,
  StyleSheet,
  Alert,
  ActivityIndicator,
  TouchableOpacity,
  TextInput,
  Image,
  TouchableWithoutFeedback,
  Keyboard,
} from 'react-native';
import { Video } from 'expo-av';
import { useNavigation } from '@react-navigation/native';
import ActionButton from 'react-native-action-button';
import Icon from 'react-native-vector-icons/Ionicons';
// import ImagePicker from 'react-native-image-crop-picker';
import * as ImagePicker from 'expo-image-picker';

import { getStorage, ref, uploadBytesResumable, getDownloadURL } from 'firebase/storage';
import { getFirestore, collection, addDoc, Timestamp } from 'firebase/firestore';
import { database, storage } from '../../FirebaseConfig';

import { AuthContext } from '../../navigation/AuthProvider';
import * as DocumentPicker from 'expo-document-picker';


// Add your transcribeFile function here
const transcribeFile = async (file, fileType, fileName) => {

  console.log(file);  

  const formData = new FormData();
  const apiEndpoint = `http://34.142.200.21:8000/transcribe/${fileType}`;

  formData.append('file', {
    uri: file,
    type: fileType === 'image' ? 'image/jpeg' : (fileType === 'video' ? 'video/mp4' : 'audio/mp3'),
    name: fileType === 'image' ? 'image.jpg' : (fileType === 'video' ? 'video.mp4' : 'audio.mp3'),
    // name: fileName,
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

    // console.log(`Response for ${fileType}:`, responseData);
    console.log("Transcription: ", responseData.Transcription);
    console.log("Braille: ", responseData.Braille)

    
    return responseData;
  } catch (error) {
    console.error(error);
    return null;
  }
};

const AddPostScreen = ({ route }) => {
  const navigation = useNavigation();

  const { user, logout } = useContext(AuthContext);

  const [fileType, setFileType] = useState(null);

  useEffect(() => {
    if (route.params && route.params.fileType) {
      setFileType(route.params.fileType);
    }
  }, [route.params]);

  const [image, setImage] = useState(null);
  const [fileName, setFilename] = useState(null)
  const [uploading, setUploading] = useState(false);
  const [transcribing, setTranscribing] = useState(false);
  const [transferred, setTransferred] = useState(0);
  const [post, setPost] = useState(null);

  const takePhotoFromCamera = async() => {
    let result = await ImagePicker.launchCameraAsync({
        allowsEditing: true,
        // aspect: [4, 3],
        quality: 1,
      });
  
      console.log(result.assets[0]);
  
      if (!result.canceled) {
        setImage(result.assets[0].uri);
      } else {
        console.log("User Cancelled the upload");
      }
  };

  const choosePhotoFromLibrary = async() => {
    let result = await ImagePicker.launchImageLibraryAsync({
        mediaTypes: ImagePicker.MediaTypeOptions.Images,
        allowsEditing: true,
        // aspect: [4, 3],
        quality: 1,
      });
  
      console.log(result.assets[0]);
  
      if (!result.canceled) {
        setImage(result.assets[0].uri);
      } else {
        console.log("User Cancelled the upload");
      }
  };
  const selectFile = async () => {
    if (fileType === 'audio') {
      await selectAudio();
    } else if (fileType === 'video') {
      await selectVideo();
    } else if (fileType === 'document') {
      await selectDocument();
    }
  };

  const selectVideo = async () => {
    // Implement logic from selectVid in Main component
    try {
      await ImagePicker.getMediaLibraryPermissionsAsync();
      const video = await ImagePicker.launchImageLibraryAsync({
        mediaTypes: ImagePicker.MediaTypeOptions.Videos,
        allowsEditing: true,
      });

      if (!video.canceled) {
        console.log('Selected video:', video.assets[0]);
        setImage(video.assets[0].uri)
        const videoUri = video.assets[0].uri;
        const fileName = videoUri.substring(videoUri.lastIndexOf('/') + 1);
        setFilename(fileName);
        // Handle the selected video
      } else {
        console.log("User Cancelled the upload");
      }

    } catch (error) {
      console.error(error);
    }
  };

  const selectAudio = async () => {
    // Implement logic from selectAudio in Main component
    try {
      const audio = await DocumentPicker.getDocumentAsync({
        type: 'audio/*',
      });
  
      if (!audio.canceled) {
        console.log('Selected audio:', audio.assets[0]);
        // Handle the selected audio
        setImage(audio.assets[0].uri);
        // Set the filename here
        // setFilename(audio.assets[0].name);
      } else {
        console.log("User Cancelled the upload");
      }
    } catch (error) {
      console.error(error);
    }
  };

  const selectDocument = async () => {
    // Implement logic from selectDocument in Main component
    try {
      const document = await DocumentPicker.getDocumentAsync();
    
      if (!document.canceled) {
        const allowedTypes = ['pdf', 'doc', 'txt'];
        const fileName = document.assets[0].name;
        const fileExtension = fileName.split('.').pop().toLowerCase();
        
        if (allowedTypes.includes(fileExtension)) {
          console.log('Selected document:', document);
          // Handle the selected document
          setFilename(fileName);
          setImage(document.assets[0].uri)
        } else {
          console.log("Selected file format is not allowed");
        }
      } else {
        console.log("User Cancelled the upload");
      }
    } catch (error) {
      console.error(error);
    }
  };

  
  const renderActionButtons = () => {
    if (fileType === 'audio') {
      return (
        <ActionButton buttonColor="#3498db" useNativeDriver={true}>
          <ActionButton.Item buttonColor="#9b59b6" title="Select Audio" onPress={selectFile}>
            <Icon name="md-mic-outline" style={styles.actionButtonIcon} />
          </ActionButton.Item>
        </ActionButton>
      );
    } else if (fileType === 'video') {
      return (
        <ActionButton buttonColor="#3498db" useNativeDriver={true}>
          <ActionButton.Item buttonColor="#9b59b6" title="Select Video" onPress={selectFile}>
            <Icon name="md-videocam-outline" style={styles.actionButtonIcon} />
          </ActionButton.Item>
        </ActionButton>
      );
    } else if (fileType === 'document') {
      return (
        <ActionButton buttonColor="#3498db" useNativeDriver={true}>
          <ActionButton.Item buttonColor="#9b59b6" title="Select Document" onPress={selectFile}>
            <Icon name="md-document-outline" style={styles.actionButtonIcon} />
          </ActionButton.Item>
        </ActionButton>
      );
    } else if (fileType === 'image') {
      return (
        <ActionButton buttonColor="#3498db" useNativeDriver={true}>
          <ActionButton.Item buttonColor="#9b59b6" title="Take Photo" onPress={takePhotoFromCamera}>
            <Icon name="md-camera-outline" style={styles.actionButtonIcon} />
          </ActionButton.Item>
          <ActionButton.Item buttonColor="#3498db" title="Select Photo" onPress={choosePhotoFromLibrary}>
            <Icon name="md-images-outline" style={styles.actionButtonIcon} />
          </ActionButton.Item>
        </ActionButton>
      );

    } else {
      // Default action button when no file type is selected
      return (
        <ActionButton buttonColor="#3498db" useNativeDriver={true}>
          <ActionButton.Item buttonColor="#9b59b6" title="Take Photo" onPress={takePhotoFromCamera}>
            <Icon name="md-camera-outline" style={styles.actionButtonIcon} />
          </ActionButton.Item>
          <ActionButton.Item buttonColor="#3498db" title="Select Photo" onPress={choosePhotoFromLibrary}>
            <Icon name="md-images-outline" style={styles.actionButtonIcon} />
          </ActionButton.Item>
        </ActionButton>
      );
    }
  };

  const submitPost = async () => {
    const fileUrl = await uploadFile(image, fileType);

    
    console.log('File Url: ', fileUrl);
    console.log('Post: ', post);

    // transcribeFile function goes here
    setTranscribing(true);
    const transcriptionData = await transcribeFile(image, fileType, fileName);
    setTranscribing(false);

    // const db = getFirestore();
    addDoc(collection(database, 'posts'), {
      userId: user.uid,
      title: post,
      postUrl: fileUrl,
      postTime: Timestamp.fromDate(new Date()),
      transcriptionType: fileType,
      Transcription: transcriptionData ? transcriptionData.Transcription : '',
      Braille: transcriptionData ? transcriptionData.Braille : '',
    })
    .then(() => {
      console.log('Post Added!');
      Alert.alert('Post published!', 'Your post has been published Successfully!', [
        {
          text: 'OK',
          onPress: () => navigation.navigate('SubmittedPost', {
            title: post,
            imageUrl: fileUrl,
            transcription: transcriptionData ? transcriptionData.Transcription : '',
            braille: transcriptionData ? transcriptionData.Braille : '',
            transcriptionType: fileType,
          }),
        },
      ]);
      setPost(null);
      setImage(null);
    })
      .catch((error) => {
        console.log('Something went wrong with added post to firestore.', error);
      });
  };

  // const submitPost = async () => {
  //   try {
  //     const fileUrl = await uploadFile(image, fileType);
  //     if (!fileUrl) {
  //       throw new Error("Failed to upload file. File URL is null.");
  //     }
  //     console.log('File Url: ', fileUrl);
  //     console.log('Post: ', post);
  
  //     setTranscribing(true);
  //     const transcriptionData = await transcribeFile(image, fileType, fileName);
  //     setTranscribing(false);
  
  //     await addDoc(collection(database, 'posts'), {
  //       userId: user.uid,
  //       title: post,
  //       postUrl: fileUrl,
  //       postTime: Timestamp.fromDate(new Date()),
  //       transcriptionType: fileType,
  //       Transcription: transcriptionData ? transcriptionData.Transcription : '',
  //       Braille: transcriptionData ? transcriptionData.Braille : '',
  //     });
  
  //     console.log('Post Added!');
  //     Alert.alert('Post published!', 'Your post has been published Successfully!', [
  //       {
  //         text: 'OK',
  //         onPress: () => navigation.navigate('SubmittedPost', {
  //           title: post,
  //           imageUrl: fileUrl,
  //           transcription: transcriptionData ? transcriptionData.Transcription : '',
  //           braille: transcriptionData ? transcriptionData.Braille : '',
  //           transcriptionType: fileType,
  //         }),
  //       },
  //     ]);
  //   } catch (error) {
  //     console.log('Error submitting post:', error);
  //     // Handle error, e.g., show an alert to the user
  //     Alert.alert('Error', 'Failed to publish post. Please try again later.');
  //   }
  // };
  


  const uploadImage = async () => {
    if (image == null) {
      return null;
    }
    const uploadUri = image;
    console.log('Upload URI:', uploadUri); // Add this line to check uploadUri
    let filename = uploadUri.substring(uploadUri.lastIndexOf('/') + 1);
    console.log('Filename:', filename);
    // Add timestamp to File Name
    const extension = filename.split('.').pop();
    const name = filename.split('.').slice(0, -1).join('.');
    filename = name + Date.now() + '.' + extension;

    setUploading(true);
    setTransferred(0);

    const response = await fetch(uploadUri);
    const blob = await response.blob();
    const storageRef = ref(storage, `photos/${filename}`);
    const task = uploadBytesResumable(storageRef, blob);

    // Set transferred state
    task.on('state_changed', (taskSnapshot) => {
      console.log(
        `${taskSnapshot.bytesTransferred} transferred out of ${taskSnapshot.totalBytes}`,
      );

      setTransferred(
        Math.round((taskSnapshot.bytesTransferred / taskSnapshot.totalBytes) * 100),
      );
    });

    try {
      await task;

      const url = await getDownloadURL(storageRef);

      setUploading(false);
      setImage(null);

      return url;
    } catch (e) {
      console.log(e);
      return null;
    }
  };
  const uploadFile = async (fileUri, fileType) => {
    
    if (fileUri == null) {
      return null;
    }
  
    const uploadUri = fileUri;
    console.log('Upload URI:', uploadUri); // Add this line to check uploadUri
    let filename = uploadUri.substring(uploadUri.lastIndexOf('/') + 1);
    console.log('Filename:', filename);
    // Add timestamp to File Name
    const extension = filename.split('.').pop();
    const name = filename.split('.').slice(0, -1).join('.');
    filename = name + Date.now() + '.' + extension;
    setFilename(filename);
  
    setUploading(true);
    setTransferred(0);
  
    const response = await fetch(uploadUri);
    const blob = await response.blob();
  
    let storageRef;
    switch (fileType) {
      case 'image':
        storageRef = ref(storage, `photos/${filename}`);
        break;
      case 'audio':
        storageRef = ref(storage, `audios/${filename}`);
        break;
      case 'video':
        storageRef = ref(storage, `videos/${filename}`);
        break;
      case 'document':
        storageRef = ref(storage, `documents/${filename}`);
        break;
      default:
        console.log('Unsupported file type');
        return null;
    }
  
    const task = uploadBytesResumable(storageRef, blob);
  
    // Set transferred state
    task.on('state_changed', (taskSnapshot) => {
      console.log(
        `${taskSnapshot.bytesTransferred} transferred out of ${taskSnapshot.totalBytes}  bytes`,
      );
  
      setTransferred(
        Math.round((taskSnapshot.bytesTransferred / taskSnapshot.totalBytes) * 100),
      );
    });
  
    try {
      await task;
  
      const url = await getDownloadURL(storageRef);
  
      setUploading(false);
      setImage(null);
      setPost(null);
  
      return url;
    } catch (e) {
      console.log(e);
      return null;
    }
  };
  

  return (
    <View style={styles.container}>
      <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
      <View style={styles.inputWrapper}>
      {fileType === 'video' && image != null ? (
            <Video
              source={{ uri: image }}
              style={styles.video}
              useNativeControls
              resizeMode="contain"
            />
          ) : null}
      {fileType === 'image' && image != null ? (
        <Image source={{ uri: image }} style={styles.addImage} resizeMode='contain' />
      ) : (
        <Text style={styles.fileName}>{image != null ? fileName : null}</Text>
      )}

        <TextInput
          style={styles.inputField}
          placeholder="Input Transcription title here"
          multiline
          numberOfLines={4}
          value={post}
          onChangeText={(content) => setPost(content)}
        />
        
        {uploading || transcribing ? (
          <View style={styles.statusWrapper}>
            <Text>{transcribing ? "Transcribing file..." : `${transferred} % Completed!`}</Text>
            <ActivityIndicator size="large" color="#0000ff" />
          </View>
        ) : (
          <TouchableOpacity style={styles.submitBtn} onPress={submitPost}>
            <Text style={styles.submitBtnText}>Transcribe</Text>
          </TouchableOpacity>
        )}
      </View>
      </TouchableWithoutFeedback>
      {renderActionButtons()}
    </View>
  );
};

export default AddPostScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  inputWrapper: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    width: '100%',
    backgroundColor: 'white',
  },
  inputField: {
    justifyContent: 'center',
    alignItems: 'center',
    fontSize: 24,
    textAlign: 'center',
    width: '90%',
    marginBottom: 15,
  },
  addImage: {
    width: '100%',
    height: 250,
    marginBottom: 15,
    // resizeMode:'contain', 
  },
  statusWrapper: {
    justifyContent: 'center',
    alignItems: 'center',
  },
  submitBtn: {
    flexDirection: 'row',
    justifyContent: 'center',
    backgroundColor: '#062CD4',
    borderRadius: 8,
    padding: 10,
  },
  submitBtnText: {
    fontSize: 18,
    fontWeight: 'bold',
    color: 'white',
  },
  actionButtonIcon: {
    fontSize: 20,
    height: 22,
    color: 'white',
  },
  fileName: {
    fontSize: 18,
    marginBottom: 10,
    textAlign: 'center',
  },
  video: {
    width: '100%',
    height: 250,
    marginBottom: 15,
  },
});
