import React, { useEffect, useContext, useState } from 'react';
import { View, Text, Image, StyleSheet, TextInput, TouchableOpacity } from 'react-native';
import { Feather } from "@expo/vector-icons";
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { AuthContext } from '../../navigation/AuthProvider';
import { getDoc, doc } from 'firebase/firestore';
import { database } from '../../FirebaseConfig';
import FilterModal from './FilterModal'; // Import FilterModal component

const Home = ({ navigation }) => {
  const { user } = useContext(AuthContext);
  const [userData, setUserData] = useState(null);
  const [modalVisible, setModalVisible] = useState(false);
  const [selectedFilters, setSelectedFilters] = useState([]);

  const getUser = async () => {
    try {
      const userDoc = await getDoc(doc(database, 'users', user.uid));
      if (userDoc.exists()) {
        console.log('User Data', userDoc.data());
        setUserData(userDoc.data());
      } else {
        console.log('User does not exist');
      }
    } catch (error) {
      console.error('Error getting user', error);
    }
  };

  useEffect(() => {
    getUser();
  }, []);

  // Function to handle applying the selected filter
  const applyFilters = () => {
    setModalVisible(false);
    // Perform filtering logic here based on the selected filters
    console.log('Selected filters:', selectedFilters);
  };

  // Function to handle selecting/deselecting filters
  const toggleFilter = (filter) => {
    if (selectedFilters.includes(filter)) {
      setSelectedFilters(selectedFilters.filter(f => f !== filter)); // Deselect filter
    } else {
      setSelectedFilters([...selectedFilters, filter]); // Select filter
    }
  };

  return (
    <View style={{ padding: 30, paddingLeft: 18, backgroundColor: 'white', flex: 1 }}>
      <TouchableOpacity onPress={() => navigation.navigate('Profile')}>
        <View style={styles.Profilecontainer}>
          <Image resizeMode='contain' style={styles.profile} source={{ uri: '' }} />
          <Text style={styles.profileName}>{userData ? userData.fullname : "Loading..."}</Text>
        </View>
      </TouchableOpacity>
      <View style={{ flexDirection: "row", alignItems: "center" }}>
        <View style={styles.searchContainer}>
          <Feather name="search" size={22} color="blue" />
          <TextInput placeholder="Search recent transcription" style={{ marginLeft: 8, flex: 1 }} />
        </View>
        <TouchableOpacity onPress={() => setModalVisible(true)}>
          <MaterialCommunityIcons name="filter" size={40} color="blue" />
        </TouchableOpacity>
      </View>
      {/* Recent items */}
      <View style={styles.recentContainer}>
        <Image resizeMode='contain' style={styles.recentHistory} source={{ uri: '' }} />
        <Text style={styles.recentTitle}>127HEDG.jpg / Jpg To Braille</Text>
      </View>
      <View style={styles.recentContainer}>
        <Image resizeMode='contain' style={styles.recentHistory} source={{ uri: '' }} />
        <Text style={styles.recentTitle}>Narnia.pdf / PDF to Braille</Text>
      </View>
      <View style={styles.recentContainer}>
        <Image resizeMode='contain' style={styles.recentHistory} source={{ uri: '' }} />
        <Text style={styles.recentTitle}>coverHEHE.mp3 / Audio To Braille</Text>
      </View>
      <TouchableOpacity style={styles.seeMore} onPress={() => console.log("See more")}>
        <Text style={{ fontSize: 16, fontWeight: 'bold', color: 'white' }}>See More</Text>
      </TouchableOpacity>
      {/* Filter Modal */}
      <FilterModal
        visible={modalVisible}
        onClose={() => setModalVisible(false)}
        filters={['Date', 'Image to Braille', 'Doc to Braille', 'Audio to Braille']} // Define your filter options
        selectedFilters={selectedFilters} // Pass selected filters
        onSelectFilter={toggleFilter} // Pass function to toggle filter selection
        applyFilters={applyFilters} // Pass function to apply selected filters
      />
    </View>
  );
};

const styles = StyleSheet.create({
  // Profile Container
  Profilecontainer: {
    alignItems: 'center',
    paddingTop: 25,
    paddingLeft: 15,
    paddingBottom: 30,
    gap: 3 // gap of name to profile icon
  },
  profile: {
    width: 100,
    height: 100,
    borderRadius: 8,
    borderWidth: 3,
    borderColor: '#062CD4'
  },
  profileName: {
    fontSize: 24,
    fontWeight: 'bold',
    paddingTop: 12,
  },
  // SEARCH CONTAINER
  searchContainer: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#EBF0F5",
    borderRadius: 8,
    paddingHorizontal: 12,
    paddingVertical: 8,
  },
  // RECENT CONTAINER
  recentContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    alignContent: 'center',
    paddingTop: 30,
    paddingLeft: 15,
    gap: 15, // gap sa text 
    borderRadius: 10
  },
  recentHistory: {
    height: 100,
    width: 100,
    borderRadius: 8,
    borderWidth: 2,
    borderColor: '#062CD4',
    gap: 10,
  },
  recentTitle: {
    fontSize: 15,
    fontWeight: 'bold',
  },
  // ButtonMore
  seeMore: {
    backgroundColor: '#062CD4',
    marginTop: 30,
    height: 48,
    borderRadius: 8,
    alignItems: "center",
    justifyContent: "center",
    paddingHorizontal: 24,
  },
});

export default Home;
