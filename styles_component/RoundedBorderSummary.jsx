import React from "react";
import { Surface } from 'react-native-paper';

export const RoundedBorderSummary = ({children}) => {
    return (
    <Surface
        style={{
            borderRadius: 10,
            paddingTop: 10,
            width: 400,
            height: 130,
            elevation: 5
            
        }}>
        {children}
    </Surface>
    );
    
}