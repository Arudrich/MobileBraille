import { View, Text } from 'react-native'
import React from 'react'


// preferences area

const SECTIONS = [
    {
      header: 'Preferences',
      icon: 'settings',
      items: [
        { icon: 'globe', color: '#062CD4' , label: 'Language', type: 'link' },
      ],
    },
    {
      header: 'Help',
      icon: 'help-circle',
      items: [
        { icon: 'flag', color: '#062CD4', label: 'Report Bug', type: 'link' },
        { icon: 'mail', color: '#062CD4' , label: 'Contact Us', type: 'link' },
      ],
    },
    {
      header: 'Other Actions',
      icon: 'align-center',
      items: [
        { icon: 'save', color: '#062CD4', label: 'Saved', type: 'link' },
      ],
    },
  ];

const setting = () => {
  return (
    <View>
      <Text>setting</Text>
    </View>
  )
}

export default setting