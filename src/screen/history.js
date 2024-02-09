// for see more history

import { View, Text } from 'react-native'
import React from 'react'
import { ScrollView } from 'react-native-web'

const history = () => {
  return (

    <ScrollView 
                    showsVerticalScrollIndicator={false}
                    style={{height:200}}
                >         
                    <TouchableOpacity 
                        style={{
                            height:170,
                            elevation:2,
                            backgroundColor: "#EBF0F5",
                            marginLeft:20,
                            marginTop:20,
                            borderRadius: 8 ,
                            marginBottom:10,
                            width: 190,
                        }}
                    >
                        <Image
                            source={require('../assets/maineIcons/audio.png')}
                            style = {{ width: 100, height: 100, alignSelf: 'center', }}
                        />
                        <View style={{
                            flexDirection:"row",
                            paddingTop:10,
                            paddingHorizontal:10
                        }}>
                            <Text style={{
                                fontWeight:"bold"
                            }}>Audio to Braille</Text>
                            <Text style={{
                                fontWeight:"bold",
                                color:'#062CD4',
                                paddingLeft:20,
                                fontStyle: 'italic'
                            }}>02/22/24</Text>
                        </View>
                        <Text style={{
                            paddingHorizontal:10 ,
                            color: '#062CD4' ,
                            paddingTop:3
                        }}>
                            Lyrics.mp4
                        </Text>
                    </TouchableOpacity>
    </ScrollView>
  )
}

export default history
