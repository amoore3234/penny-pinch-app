import React from "react";
import { Surface } from 'react-native-paper';
import { Dimensions } from 'react-native';

export const RoundedBorderExp = ({children}) => {
    const { width } = Dimensions.get("window");

    return (
    <Surface
        style={{
            borderRadius: 10,
            paddingLeft: 5,
            width: width - 10,
            height: 70,
            elevation: 5
        
        }}>
        {children}
    </Surface>
    );
    
}