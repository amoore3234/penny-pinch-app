import React from "react";
import { View } from 'react-native';

export const CenterElements = ({children}) => {
    return(
    <View style={{
        margin: 7,
        alignItems: 'center',
        justifyContent: 'center'
        }}>
        {children}
    </View>
    );
};