import React from "react";
import { View } from 'react-native';

export const CenterBudgetAndSavings = ({children}) => {
    return(
    <View style={{
        margin: 7,
        alignItems: 'center',
        
        }}>
        {children}
    </View>
    );
};