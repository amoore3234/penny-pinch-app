import React from "react";
import { FakeCurrencyInput } from "react-native-currency-input";
import { useState } from 'react';
import { Text, StyleSheet, View } from 'react-native';
import { Dimensions } from 'react-native';
import { Center } from '../styles_component/Center';
import { TouchableHighlight } from "react-native-gesture-handler";

export const StartPage = ({navigation}) => {
    const[budget, setBudget] = useState(0);
    const[goal, setGoal] = useState(0);
    const[isFocused, setIsFocused] = useState(false);
    const[isFocusedSavings, setIsFocusedSavings] = useState(false);
  
    const handleFocusBudget = () => setIsFocused(true);
  
    const handleBlurBudget = () => setIsFocused(false);
  
    const handleFocusSavings = () => setIsFocusedSavings(true);
  
    const handleBlurSavings = () => setIsFocusedSavings(false);
  
    return (
    <Center>
      
      <Text style={styles.HeadingStyle}>Welcome to Penny Pinch{"\n"}</Text>
      <Text style={{fontSize: 19, paddingBottom: 10}}>Please enter the desired budget amount {"\n"}and savings goal amount to start saving!{'\n'}</Text>
      
      <View>
        <Text style={styles.SubHeadingStyle}>Budget Amount</Text>
        <FakeCurrencyInput
          onFocus={handleFocusBudget}
          onBlur={handleBlurBudget}
          style={[styles.InputStyle, {borderColor: isFocused ? '#05CFD6' : '#807f7d'}]}
          prefix="$ "
          delimiter=","
          separator="."
          precision={2}
          minValue={0}
          maxValue={999999}
          onChangeValue={setBudget}
          value={budget}
        />
        </View>

        <View style={{paddingTop: 20}}>
        <Text style={styles.SubHeadingStyle}>Savings Goal</Text>
        <FakeCurrencyInput
          onFocus={handleFocusSavings}
          onBlur={handleBlurSavings}
          style={[styles.InputStyle, {borderColor: isFocusedSavings ? '#05CFD6' : '#807f7d'}]}
          prefix="$ "
          delimiter=","
          separator="."
          precision={2}
          minValue={0}
          maxValue={999999}
          onChangeValue={setGoal}
          value={goal}
        />
        </View>

        <View style={{position: 'absolute', bottom: 20}}>
    <TouchableHighlight
        style={styles.UpdateButtonStyle}
        underlayColor= '#94ABDB'
        disabled={budget === 0 ? true : false}
        onPress={()=> {
          navigation.navigate('MonthlyReport', {
            monthlyBudget: budget,
            savings: goal,
          })
        }}
    >
        <Text style={styles.TextStyle}>Next</Text>
    </TouchableHighlight>
    </View>
      </Center>
  
    );
    
  };

  const { width } = Dimensions.get("window");
  const styles = StyleSheet.create({

    HeadingStyle: {
      fontWeight: 'bold',
      fontSize: 22,
    },
    
    SubHeadingStyle: {
      paddingLeft: 5,
      paddingBottom: 5, 
      fontWeight: 'bold', 
      fontSize: 17
    },
  
    InputStyle: {
      borderWidth: 3,
      borderRadius: 10,
      paddingLeft: 5,
      height: 45,
      width: width - 100,
      fontSize: 20,
    },

    UpdateButtonStyle: {
      alignItems: 'center',
      justifyContent: 'center',
      width: width - 50,
      height: 40,
      borderRadius: 5,
      backgroundColor: '#261FE6'
  },

  TextStyle: {
    color: '#FFFFFF',
    fontSize: 19,
}
});