import React from "react";
import { useState } from 'react';
import { Button, Text, StyleSheet, TextInput } from 'react-native';
import { RadioButton } from 'react-native-paper';
import { Center } from './Center';
import { Border } from './Border';


export const SavingOptions = ({navigation}) => {
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

};

export const FinancialGoal = () => {
  const[targetGoal, setTargetGoal] = useState(0);
  const[savings, setSavings] = useState(0);
  const[numDuration, setNumDuration] = useState(0);
  const[duration, setDuration] = useState('');

  const total = () => {
    if (duration === 'month') {
      setSavings(targetGoal/numDuration/12);
    } else if (duration === 'year') {
      setSavings((targetGoal/numDuration));
    } else {
      setSavings(0);
    }
  }
  return (
  <Center>
    <Border>

      <Text>Please enter target value:</Text>
      <TextInput
        placeholder="$0.00"
        keyboardType={'numeric'}
        onChangeText={num => setTargetGoal(num)}
        value={targetGoal}
      />
      <TextInput
        placeholder="0"
        keyboardType={'numeric'}
        onChangeText={num => setNumDuration(num)}
        value={numDuration}
      />
      <Text>Months</Text>
      <RadioButton
        value="month"
        status={duration === 'month' ? 'checked': 'unchecked'}
        onPress={() => setDuration('month')}
       />

       <Text>Years</Text>
       <RadioButton
         value="year"
         status={duration === 'year' ? 'checked': 'unchecked'}
         onPress={() => setDuration('year')}
        />
        <Button
        title="Submit"
        onPress={total}
         />

        <Text>You would have to save {savings} per {duration}.</Text>
    </Border>
  </Center>
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
  TextInputStyle: {
    borderRadius: 10,
    borderWidth: 2,
    borderColor: '#009688'
  }
});
