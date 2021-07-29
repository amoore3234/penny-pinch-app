import React from "react";
import { View } from 'react-native';
import { Surface } from 'react-native-paper';

export const RoundedBorder = ({children}) => {
    return (
    <Surface
        style={{
            
            borderRadius: 10,
            paddingTop: 10,
            width: 380,
            height: 100,
            alignItems: 'center',
            elevation: 5
            
            
            /*shadowColor: "#000",
            shadowOffset: {
	            width: 0,
	            height: 3,
                },
            shadowOpacity: .30,
            shadowRadius: 11,
            elevation: 2,*/
        }}>
        {children}
    </Surface>
    );
    
}