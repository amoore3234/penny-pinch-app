import React from 'react';
import { View } from 'react-native';

export const Center = ({children}) => {
  return (
    <View
    style={{
      marginTop: 60,
      marginLeft: 10,
      marginRight: 10,
      flex: 1,
      alignItems: 'center',
      
  }}>
    {children}
  </View>

);

}
