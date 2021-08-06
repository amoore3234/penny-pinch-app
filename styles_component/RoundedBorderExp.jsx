import React from "react";
import { Surface } from 'react-native-paper';

export const RoundedBorderExp = ({children}) => {
    return (
    <Surface
        style={{
            borderRadius: 10,
            paddingLeft: 5,
            width: 380,
            height: 60,
            elevation: 5
        
        }}>
        {children}
    </Surface>
    );
    
}