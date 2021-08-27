import React from 'react';
import { View } from 'react-native';

export const Center = ({children}) => {
  return (
    <View
    style={{
      padding: 40,
      flex: 1,
      alignItems: 'center',
      
  }}>
    {children}
  </View>

);

}
