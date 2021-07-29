import React from "react";
import moment from "moment";
import { CurrencyInput, FakeCurrencyInput, formatNumber} from "react-native-currency-input";
import { useState, useEffect} from 'react';
import { Button, Text, StyleSheet, View, SafeAreaView } from 'react-native';
import { TextInput, Surface } from 'react-native-paper';
import { Center } from './styles_component/Center';
import { Border } from './styles_component/Border';
import { RoundedBorder } from './styles_component/RoundedBorder';
import { CenterElements } from './styles_component/CenterElements';

export const OpeningPage = ({navigation}) => {
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
            beginAmount:formatNumber(budget, {delimiter: ",", prefix: "$"}),
            savingsGoal: formatNumber(goal, {delimiter: ",", prefix: "$"}),
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
/*export const SavingOptions = ({navigation}) => {
  return (
  <Center>
    <Button
      title="Financial Goal"
      onPress={() => navigation.push('FinancialGoal') }
    />
    <Button
      title="Reducing Credit Card Debt"
      onPress={() => navigation.push('Debt')}
    />
  </Center>
  );

};*/

export const MonthlyReport = ({route, navigation}) => {
  const[currentDate, setCurrentDate] = useState('');
  const {beginAmount, savingsGoal, subs, creditCard, auto, grocery, living, entertainment} = route.params;

  useEffect(() => {
    let month = moment();
    setCurrentDate(month.format('MMMM'));
  }, []);

  return (
    <SafeAreaView style={{marginTop: 5}}>
      
        <CenterElements>
        <RoundedBorder>
        <Text style={{fontSize: 17, fontWeight: 'bold'}}>{currentDate}'s Budget</Text>
        <Text style={styles.CurrencyStyle}>{beginAmount}</Text>
        <Text style={{fontSize: 11, color: '#1281CB'}}>Add more funds</Text>
        </RoundedBorder>
        </CenterElements>

        <CenterElements>
        <RoundedBorder>
        <Text style={{fontSize: 17, fontWeight: 'bold'}}>Savings Goal</Text>
        <Text style={styles.CurrencyStyle}>{savingsGoal}</Text>
        </RoundedBorder>
        </CenterElements>
      
    </SafeAreaView>
    
  );

};

export const Debt = () => {

  const[amountLeft, setAmountLeft] = useState(0);
  const[apr, setAPR] = useState(0);
  const[minPayment, setMinPayment] = useState(0);
  const[months, setMonths] = useState(0);
  const[monthlyInterest, setMonthlyInterest] = useState(0);
  const[principle, setPrinciple] = useState(0);
  const[finalBalance, setFinalBalace] = useState(0);
  const[interest, setInterest] = useState(0);

  const payOff = () => {
     
  		setMonthlyInterest(amountLeft * ((apr/365) * 30));



  }
    return (
    <Center>
    <Border>
      <Text>Loan Amount</Text>
      <TextInput
        placeholder="0"
        keyboardType={'numeric'}
        onChangeText={num => setAmountLeft(num)}
        value={amountLeft}
      />
      <Text>APR:</Text>
      <TextInput
        placeholder="0"
        keyboardType={'numeric'}
        onChangeText={num => setAPR(num)}
        value={apr}
      />
      <Text>Minimum Monthly Payment</Text>
      <TextInput
        placeholder="0"
        keyboardType={'numeric'}
        onChangeText={num => setMinPayment(num)}
        value={minPayment}
      />

      <Button
      title="Submit"
      onPress={payOff}
       />

      <Text>Total Interest {months}</Text>
    </Border>
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
    width: 200,
    fontSize: 17,
  },

  CurrencyStyle: {
    fontSize: 35, 
    fontWeight: 'bold', 
    color: '#048F1B'
  }

});
