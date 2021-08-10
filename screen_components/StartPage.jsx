import React from "react";
import { FakeCurrencyInput } from "react-native-currency-input";
import { useState } from 'react';
import { Button, Text, StyleSheet, View } from 'react-native';
import { Center } from '../styles_component/Center';

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
      <Text style={styles.HeadingStyle}>Welcome to Penny Pinch</Text>
      <Text style={{fontSize: 17}}>Please enter the desired budget amount to{"\n\t"}start tracking and saving your expenses.{'\n'}</Text>
      
        <Text style={styles.SubHeadingStyle}>Budget Amount</Text>
        <FakeCurrencyInput
          onFocus={handleFocusBudget}
          onBlur={handleBlurBudget}
          style={[styles.InputStyle, {borderColor: isFocused ? '#a800a0' : '#807f7d'}]}
          prefix="$ "
          delimiter=","
          separator="."
          precision={2}
          minValue={0}
          onChangeValue={setBudget}
          value={budget}
        />
        <View style={{padding: 10}}>
        <Text style={styles.SubHeadingStyle}>Savings Goal</Text>
        <FakeCurrencyInput
          onFocus={handleFocusSavings}
          onBlur={handleBlurSavings}
          style={[styles.InputStyle, {borderColor: isFocusedSavings ? '#a800a0' : '#807f7d'}]}
          prefix="$ "
          delimiter=","
          separator="."
          precision={2}
          minValue={0}
          onChangeValue={setGoal}
          value={goal}
        />
        </View>
        <View style={{paddingTop: 100, width: 300}}>
        <Button
          title="Next"
          color='#261FE6'
          onPress={()=> {
            navigation.navigate('MonthlyReport', {
              monthlyBudget: budget,
              savings: goal,
              subs: 0,
              creditCard: 0,
              auto: 0,
              grocery: 0,
              living: 0,
              entertainment: 0,
            })
          }}
        />
        </View>
      </Center>
  
    );
    
  };

  const styles = StyleSheet.create({

    HeadingStyle: {
      fontWeight: 'bold',
      fontSize: 20,
    },
    
    SubHeadingStyle: {
      textAlign: 'center', 
      paddingBottom: 5, 
      fontWeight: 'bold', 
      fontSize: 17
    },
  
    InputStyle: {
      borderWidth: 3,
      borderRadius: 10,
      paddingLeft: 10,
      height: 40,
      width: 180,
      fontSize: 17,
    },
});