import React from "react";
import { Dimensions, View } from 'react-native';

export const SquareRoundedBorderSummary = ({children}) => {
    const { width } = Dimensions.get("window");
    return (
    <View
        style={{
            backgroundColor: 'white',
            justifyContent: 'center',
            alignItems: 'center',
            borderRadius: 10,
            shadowColor: "#000",
            borderStyle: 'solid',
            borderColor: 'white',
            borderWidth: 1,
            margin: 0,
            width: width/2 - 15,
            height: 160,
            elevation: 5
            
        }}>
        {children}
    </View>
    );
    
}