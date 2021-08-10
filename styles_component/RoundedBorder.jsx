import React from "react";
import { Surface } from 'react-native-paper';
import { Dimensions } from 'react-native';

export const RoundedBorder = ({children}) => {
    const { width } = Dimensions.get("window");

    return (
    <Surface
        style={{
            width: width - 10,
            borderRadius: 10,
            paddingTop: 10,
            width: 400,
            height: 100,
            alignItems: 'center',
            elevation: 5
        
        }}>
        {children}
    </Surface>
    );
    
}