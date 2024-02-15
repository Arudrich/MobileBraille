// ThemeProvider.js
import React from 'react';
import { Provider as PaperProvider } from 'react-native-paper';

const ThemeProvider = ({ children }) => {
  // Customize the theme here if needed
  const theme = {
    // Global styles for components -david
    colors: {
      primary: '#062CD4',
      accent: '#4D90FE', 
      background: '#ffffff',
    },
    // material design ng box na touchables to sa main.js -david
    box: {
      backgroundColor: '#3498db', // Example box background color
      borderRadius: 8, // Example border radius
      padding: 10, // Example padding
      margin: 10, // Example margin
      elevation: 2, // Example shadow 
      alignItems: 'center', // Example centering horizontally
      justifyContent: 'center', // Example centering vertically
    },
  };

  return <PaperProvider theme={theme}>{children}</PaperProvider>;
};

export default ThemeProvider;
