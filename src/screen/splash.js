import React, { useEffect } from 'react';
import { View, Text, Image, StyleSheet, SafeAreaView } from 'react-native';
import { useNavigation } from '@react-navigation/native';

const splash = () => {
  const nav = useNavigation();

  useEffect(() => {
    setTimeout(() => {
      nav.replace('Login');
    }, 5000);
  }, []);

  return (
    
    <SafeAreaView style={styles.container}>
      
      <View style={styles.logoContainer}>
        <Image
          source={require('../utils/MBraillelogo.png')}
          style={styles.logo}
          resizeMode="contain"
        />
        <Text style={styles.title}>
          <Text style={styles.blackText}>M.</Text>
          <Text style={styles.blueText}>Braille</Text>
        </Text>
        <Text style={styles.subtitle}>Empowering Access. Transforming Documents.</Text>
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  logoContainer: {
    alignItems: 'center',
  },
  logo: {
    width: 186, // Adjust the width as needed
    height: 180, // Adjust the height as needed
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
    color: '#062CD4',
  },
  subtitle: {
    fontSize: 15,
    textAlign: 'center',
    marginTop: 5,
    color: '#B6B6B6',
  },
});

export default splash;
