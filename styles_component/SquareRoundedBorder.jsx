import React from "react";
import { Surface } from 'react-native-paper';

export const SquareRoundedBorder = ({children}) => {
    return (
    <Surface
        style={{
            alignItems: 'center',
            borderRadius: 10,
            paddingTop: 10,
            margin: 10,
            width: 146,
            height: 146,
            elevation: 5
            
        }}>
        {children}
    </Surface>
    );
    
}