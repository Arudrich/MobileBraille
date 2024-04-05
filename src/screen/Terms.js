import { SafeAreaView, StyleSheet, Text, View } from 'react-native'
import React from 'react'
import { ScrollView } from 'react-native'




const Terms = () => {
  return (
    <SafeAreaView>

      <ScrollView  showsVerticalScrollIndicator={false} >
      
              <Text style = {styles.Header}>Terms and Condition</Text>

              <Text style = {styles.text}>

                These Terms and Conditions Terms and Conditions govern your use of our mobile application Service operated by M.braille Company

                Your access to and use of the Service is conditioned on your acceptance of and compliance with these Terms. These Terms apply to all visitors, users, and others who access or use the Service.

                By accessing or using the Service you agree to be bound by these Terms. If you disagree with any part of the terms then you may not access the Service.
                {'\n'}
              </Text>
           
            <Text style = {styles.Header}>Content</Text>

              <Text style = {styles.text}>

                Our Service allows you to post, link, store, share, and otherwise make available certain information, text, graphics, videos, or other material ("Content"). You are responsible for the Content that you post on or through the Service, including its legality, reliability, and appropriateness.

                By posting Content on or through the Service, You represent and warrant that: (i) the Content is yours (you own it) and/or you have the right to use it and the right to grant us the rights and license as provided in these Terms, and (ii) that the posting of your Content on or through the Service does not violate the privacy rights, publicity rights, copyrights, contract rights or any other rights of any person or entity. We reserve the right to terminate the account of anyone found to be infringing on a copyright.
              
              </Text>
              
            <Text style = {styles.Header}>Changes</Text>

              <Text style = {styles.text}>

              We reserve the right, at our sole discretion, to modify or replace these Terms at any time. If a revision is material, we will try to provide at least 30 days' notice prior to any new terms taking effect. What constitutes a material change will be determined at our sole discretion.
              {'\n'}
              </Text>

            <Text style = {styles.Header}>Contact Us</Text>

              <Text style = {styles.text}>

              If you have any questions about these Terms, please email and contact us at rbi.pdproject@gmail.com / 09454310672.

              </Text>

     
      </ScrollView>


    </SafeAreaView>
  )
}

export default Terms

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: 20,
  },
  text: {
    textAlign: 'justify',
    fontSize: 14,
    marginLeft: 15,
    marginRight: 20
  },

  Title: {

  },

  Header: {
    fontSize: 16,
    fontWeight: 'bold',
    marginBottom: 10,
    marginLeft: 5,

  },



})