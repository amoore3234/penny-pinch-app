import React from 'react';
import { View } from 'react-native';

export const Border = ({children}) => {
  return (
    <View
    style={{
      borderWidth: 1,
      borderRadius: 10,
      padding: 5 
  }}>
    {children}
  </View>

);

}
