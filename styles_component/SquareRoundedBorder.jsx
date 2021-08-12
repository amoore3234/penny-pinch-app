import React from "react";
import { Surface } from 'react-native-paper';
import { Dimensions } from 'react-native';

export const SquareRoundedBorder = ({children}) => {
    const { width, height } = Dimensions.get("window");
    return (
    <Surface
        style={{
            alignItems: 'center',
            borderRadius: 10,
            paddingTop: 10,
            margin: 7,
            width: width/2 - 20,
            height: 160,
            elevation: 5
            
        }}>
        {children}
    </Surface>
    );
    
}