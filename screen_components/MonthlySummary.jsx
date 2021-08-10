import React from "react";
import moment from "moment";
import { FakeCurrencyInput, formatNumber} from "react-native-currency-input";
import { useState, useEffect} from 'react';
import { Button, Text, StyleSheet, View, SafeAreaView, Image } from 'react-native';
import { RoundedBorder } from '../styles_component/RoundedBorder';
import { CenterElements } from '../styles_component/CenterElements';
import { RoundedBorderSummary } from '../styles_component/RoundedBorderSummary';


export const MonthlySummary = ({route, navigation}) => {
    
  const {monthlyBudget, subs, savings, creditCard, auto, grocery, living, entertainment} = route.params;
  const[currentDate, setCurrentDate] = useState('');
  const[budget, setBudget] = useState(0);
  const[monthBudget, setMonthBudget] = useState(monthlyBudget);
  
  
  const[subsAmount, setSubsAmount] = useState(subs);
  const[savingsTotal, setSavingsTotal] = useState(savings);
  const[cardAmount, setCardAmount] = useState(creditCard);
  const[autoAmount, setAutoAmount] = useState(auto);
  const[groceryAmount, setGroceryAmount] = useState(grocery);
  const[livingAmount, setLivingAmount] = useState(living);
  const[entertainmentAmount, setEntertainmentAmount] = useState(entertainment);

  const[isFocused, setIsFocused] = useState(false);

  const handleFocusBudget = () => setIsFocused(true);

  const handleBlurBudget = () => setIsFocused(false);
  


  useEffect(() => {
    let month = moment();
    setCurrentDate(month.format('MMMM'));
    setSavingsTotal(savingsTotal);
    add();
  }, []);

  const result = () => {

    setMonthBudget(monthBudget - subs);
    setSubsAmount(subsAmount + subs);
    
  }

  const add = () => {
    setMonthBudget(monthlyBudget - (subs + creditCard + auto + grocery + living + entertainment));
    setSubsAmount(subs);
    setCardAmount(creditCard);
    setAutoAmount(auto);
    setGroceryAmount(grocery);
    setLivingAmount(living);
    setEntertainmentAmount(entertainment);
  }

  

  return (
    <SafeAreaView style={{marginTop: 5}}>

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
        onChange={(e) => setBudget(e)}
        value={budget}
      />
        <CenterElements>
          <RoundedBorder>
            <Text style={{fontSize: 17, fontWeight: 'bold'}}>{currentDate}'s Budget</Text>
            <Text style={[styles.CurrencyStyle, { color: monthBudget < savingsTotal ? '#E20D31': '#048F1B' }]}>{formatNumber(monthBudget, {delimiter: ",", prefix: "$"})}</Text>
            <Text style={{fontSize: 11, color: '#1281CB'}}>Add more funds</Text>
          </RoundedBorder>
        </CenterElements>

        <CenterElements>
          <RoundedBorder>
            <Text style={{fontSize: 17, fontWeight: 'bold'}}>Savings</Text>
            <Text style={styles.CurrencyStyle}>{formatNumber(savingsTotal, {delimiter: ",", prefix: "$"})}</Text>
          </RoundedBorder>
        </CenterElements>

        <CenterElements>
          <RoundedBorderSummary>

            <Text style={{fontSize: 17, fontWeight: 'bold', textAlign: 'center'}}>Expense Summary</Text>
            
            <View style={{flexDirection: 'row', justifyContent: 'space-around', paddingTop: 10}}>

              <View style={{flexDirection: 'row'}}>
                <Image style={{height: 30, width: 31}} source={require('../assets/images/subscription.png')} />  
                <Text style={styles.ExpenseSummarySub}>{formatNumber(subsAmount, {delimiter: ",", prefix: "$"})}</Text>
              </View>
              
              <View style={{flexDirection: 'row'}}>
                <Image style={{height: 30, width: 31}} source={require('../assets/images/creditCard.png')} />  
                <Text style={styles.ExpenseSummaryCard}>{formatNumber(cardAmount, {delimiter: ",", prefix: "$"})}</Text>
              </View>

              <View style={{flexDirection: 'row'}}>
                <Image style={{height: 30, width: 31}} source={require('../assets/images/car.png')} />  
                <Text style={styles.ExpenseSummaryAuto}>{formatNumber(autoAmount, {delimiter: ",", prefix: "$"})}</Text>
              </View>
            </View>

            <View style={{flexDirection: 'row', justifyContent: 'space-around', paddingTop: 12}}>

              <View style={{flexDirection: 'row'}}>
                <Image style={{height: 30, width: 31}} source={require('../assets/images/groceries.png')} />  
                <Text style={styles.ExpenseSummaryGrocery}>{formatNumber(groceryAmount, {delimiter: ",", prefix: "$"})}</Text>
              </View>

              <View style={{flexDirection: 'row'}}>
                <Image style={{height: 30, width: 31}} source={require('../assets/images/living.png')} />  
                <Text style={styles.ExpenseSummaryLiving}>{formatNumber(livingAmount, {delimiter: ",", prefix: "$"})}</Text>
              </View>

              <View style={{flexDirection: 'row'}}>
                <Image style={{height: 30, width: 31}} source={require('../assets/images/island.png')} />  
                <Text style={styles.ExpenseSummaryEntertainment}>{formatNumber(entertainmentAmount, {delimiter: ",", prefix: "$"})}</Text>
              </View>
            </View>
          </RoundedBorderSummary>
        </CenterElements>
      <View style={{margin: 10}}>

        

        <Button
        title="Add Expenses"
        color='#261FE6'
        onPress={()=> {
          navigation.navigate('AddExpenses', {
            subscribe: subsAmount,
            creditCards: cardAmount,
            autos: autoAmount,
            groceries: groceryAmount,
            livings: livingAmount,
            entertainments: entertainmentAmount,
          })
        }}
      />

      <Button 
        title="Storage Page"
        onPress={() => {navigation.navigate('AsyncStoragePage')}}
      />

  <Button
    title="Result"
    color='#261FE6'
    
      />
  <Button
    title="Add Budget Amount"
    color='#261FE6'
    onPress={add}
      />

      
      </View>
    </SafeAreaView>
    
  );

};

const styles = StyleSheet.create({

    CurrencyStyle: {
        fontSize: 35, 
        fontWeight: 'bold', 
        color: '#048F1B'
    },

    ExpenseSummarySub: {
        fontSize: 17,
        fontWeight: 'bold',
        color: '#E20D31'
    },

    ExpenseSummaryCard: {
        fontSize: 17,
        fontWeight: 'bold',
        color: '#261FE6'
    },

    ExpenseSummaryAuto: {
        fontSize: 17,
        fontWeight: 'bold',
        color: '#0B7E82'
    },

    ExpenseSummaryGrocery: {
        fontSize: 17,
        fontWeight: 'bold',
        color: '#BF5D11'
    },

    ExpenseSummaryLiving: {
        fontSize: 17,
        fontWeight: 'bold',
        color: '#690BF8'
    },

    ExpenseSummaryEntertainment: {
        fontSize: 17,
        fontWeight: 'bold',
        color: '#0C6705'
    },

});
