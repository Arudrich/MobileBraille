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
} from 'react-native';
import ActionButton from 'react-native-action-button';
import Icon from 'react-native-vector-icons/Ionicons';
// import ImagePicker from 'react-native-image-crop-picker';
import * as ImagePicker from 'expo-image-picker';

import { getStorage, ref, uploadBytesResumable, getDownloadURL } from 'firebase/storage';
import { getFirestore, collection, addDoc, Timestamp } from 'firebase/firestore';
import { database, storage } from '../../FirebaseConfig';

import { AuthContext } from '../../navigation/AuthProvider';
import * as DocumentPicker from 'expo-document-picker';

const AddPostScreen = ({ route }) => {
  const { user, logout } = useContext(AuthContext);

  const [fileType, setFileType] = useState(null);

  useEffect(() => {
    if (route.params && route.params.fileType) {
      setFileType(route.params.fileType);
    }
  }, [route.params]);

  const [image, setImage] = useState(null);
  const [uploading, setUploading] = useState(false);
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
      });

      if (!video.canceled) {
        console.log('Selected video:', video.assets[0]);
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
    const imageUrl = await uploadImage();
    console.log('Image Url: ', imageUrl);
    console.log('Post: ', post);

    // const db = getFirestore();
    addDoc(collection(database, 'posts'), {
      userId: user.uid,
      title: post,
      postImg: imageUrl,
      postTime: Timestamp.fromDate(new Date()),
    })
      .then(() => {
        console.log('Post Added!');
        Alert.alert('Post published!', 'Your post has been published Successfully!');
        setPost(null);
      })
      .catch((error) => {
        console.log('Something went wrong with added post to firestore.', error);
      });
  };

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

    const metadata = {
      contentType: 'image/jpeg', // Set the correct content type here
      // Other metadata properties can be set here if needed
    };

    const storageRef = ref(storage, `photos/${filename}`);
    const task = uploadBytesResumable(storageRef, uploadUri, metadata);

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

  return (
    <View style={styles.container}>
      <View style={styles.inputWrapper}>
        {image != null ? <Image source={{ uri: image }} style={styles.addImage} resizeMode='contain' /> : null}

        <TextInput
          style={styles.inputField}
          placeholder="What's on your mind?"
          multiline
          numberOfLines={4}
          value={post}
          onChangeText={(content) => setPost(content)}
        />
        {uploading ? (
          <View style={styles.statusWrapper}>
            <Text>{transferred} % Completed!</Text>
            <ActivityIndicator size="large" color="#0000ff" />
          </View>
        ) : (
          <TouchableOpacity style={styles.submitBtn} onPress={submitPost}>
            <Text style={styles.submitBtnText}>Post</Text>
          </TouchableOpacity>
        )}
      </View>
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
});
