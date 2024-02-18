import React, { useEffect } from 'react';
import { View, Text, Image, StyleSheet, SafeAreaView, ActivityIndicator } from 'react-native';
import { useNavigation } from '@react-navigation/native';

const Splash = () => {
  const nav = useNavigation();

  useEffect(() => {
    setTimeout(() => {
      nav.replace('login');
    }, 5000);
  }, []);

  return (
    
    <SafeAreaView style={styles.container}>
      
      <View style={styles.logoContainer}>
        <Image
          source={require('../assets/MBraillelogo.png')}
          style={styles.logo}
          resizeMode="contain"
        />
        <Text style={styles.title}>
          <Text style={styles.blackText}>M.</Text>
          <Text style={styles.blueText}>BRAILLE</Text>
        </Text>
        <Text style={styles.subtitle}>Empowering Access. Transforming Documents.</Text>
      </View>


      <View style = {{ paddingTop: 10 }}>

        <ActivityIndicator/>

      </View>

    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'white',
    flex: 1
  },
  logoContainer: {
    alignItems: 'center',
  },
  logo: {
    width: 186, // Adjust the width as needed
    height: 180, // Adjust the height as needed
    tintColor: '#003153'
  },
  title: {
    fontSize: 40,
    fontWeight: 'bold',
    marginTop: 10,
  },
  blackText: {
    color: 'black',
  },
  blueText: {
    color: '#003153',
    fontWeight: 'bold'

  },
  subtitle: {
    fontSize: 15,
    textAlign: 'center',
    marginTop: 5,
    color: 'black',
  },
});

export default Splash;
