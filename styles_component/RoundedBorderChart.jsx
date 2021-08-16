import React from "react";
import { Dimensions, View } from 'react-native';

export const RoundedBorderChart = ({children}) => {
    const { width } = Dimensions.get("window");

    return (
    <View
        style={{
            backgroundColor: 'white',
            width: width - 15,
            alignItems: 'center',
            borderRadius: 10,
            shadowColor: "#000",
            borderStyle: 'solid',
            borderColor: 'white',
            borderWidth: 1,
            paddingTop: 10,
            height: 340,
            elevation: 5
            
        }}>
        {children}
    </View>
    );
    
}