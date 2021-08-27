import React from "react";
import { Dimensions, View } from 'react-native';

export const RoundedBorderBudget = ({children}) => {
    

    return (
    <View
        style={{
            margin: 5, 
            alignItems: 'center',
            backgroundColor: 'white',
            borderRadius: 10,
            shadowColor: "#000",
            borderStyle: 'solid',
            borderColor: 'white',
            borderWidth: 1,
            height: 50,
            elevation: 5
            
        }}>
        {children}
    </View>
    );
    
}