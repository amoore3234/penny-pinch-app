import React from "react";
import moment from "moment";
import { FakeCurrencyInput, formatNumber} from "react-native-currency-input";
import { useState, useEffect} from 'react';
import { Button, Text, StyleSheet, View, SafeAreaView, Image } from 'react-native';
import { Center } from './styles_component/Center';
import { RoundedBorder } from './styles_component/RoundedBorder';
import { CenterElements } from './styles_component/CenterElements';
import { RoundedBorderSummary } from './styles_component/RoundedBorderSummary';
import { SquareRoundedBorder } from './styles_component/SquareRoundedBorder';
import { TouchableOpacity } from "react-native-gesture-handler";

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

export const MonthlyReport = ({route, navigation}) => {
  const[currentDate, setCurrentDate] = useState('');
  const[subsAmount, setSubsAmount] = useState(78);
  const {beginAmount, savingsGoal, subs, creditCard, auto, grocery, living, entertainment} = route.params;

  useEffect(() => {
    let month = moment();
    setCurrentDate(month.format('MMMM'));
    setSubsAmount(subsAmount);
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

        <CenterElements>
          <RoundedBorderSummary>

            <Text style={{fontSize: 17, fontWeight: 'bold', textAlign: 'center'}}>Expense Summary</Text>
            
            <View style={{flexDirection: 'row', justifyContent: 'space-around', paddingTop: 10}}>

              <View style={{flexDirection: 'row'}}>
                <Image style={{height: 30, width: 31}} source={require('./assets/images/subscription.png')} />  
                <Text style={styles.ExpenseSummarySub}>{formatNumber(subsAmount, {delimiter: ",", prefix: "$"})}</Text>
              </View>
              
              <View style={{flexDirection: 'row'}}>
                <Image style={{height: 30, width: 31}} source={require('./assets/images/creditCard.png')} />  
                <Text style={styles.ExpenseSummaryCard}>{formatNumber(creditCard, {delimiter: ",", prefix: "$"})}</Text>
              </View>

              <View style={{flexDirection: 'row'}}>
                <Image style={{height: 30, width: 31}} source={require('./assets/images/car.png')} />  
                <Text style={styles.ExpenseSummaryAuto}>{formatNumber(auto, {delimiter: ",", prefix: "$"})}</Text>
              </View>
            </View>

            <View style={{flexDirection: 'row', justifyContent: 'space-around', paddingTop: 12}}>

              <View style={{flexDirection: 'row'}}>
                <Image style={{height: 30, width: 31}} source={require('./assets/images/groceries.png')} />  
                <Text style={styles.ExpenseSummaryGrocery}>{formatNumber(grocery, {delimiter: ",", prefix: "$"})}</Text>
              </View>

              <View style={{flexDirection: 'row'}}>
                <Image style={{height: 30, width: 31}} source={require('./assets/images/living.png')} />  
                <Text style={styles.ExpenseSummaryLiving}>{formatNumber(living, {delimiter: ",", prefix: "$"})}</Text>
              </View>

              <View style={{flexDirection: 'row'}}>
                <Image style={{height: 30, width: 31}} source={require('./assets/images/island.png')} />  
                <Text style={styles.ExpenseSummaryEntertainment}>{formatNumber(entertainment, {delimiter: ",", prefix: "$"})}</Text>
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
            creditCards: creditCard,
            autos: auto,
            groceries: grocery,
            livings: living,
            entertainments: entertainment,
          })
        }}
      />
      </View>
    </SafeAreaView>
    
  );

};

export const AddExpenses = ({route, navigation}) => {
  const {subscribe, creditCards, autos, groceries, livings, entertainments} = route.params;
  


    return (
    <SafeAreaView>
      <TouchableOpacity onPress={() => {
        navigation.navigate('SubscriptionExpense', {
          subExpense: subscribe
        })
      }}>
        <SquareRoundedBorder>
          <Image style={{height: 50, width: 49}} source={require('./assets/images/subscription.png')} />
          <Text>Subscriptions</Text>
          <Text>{subscribe}</Text>
         </SquareRoundedBorder>
        </TouchableOpacity> 
    </SafeAreaView>
    );
};

export const SubscriptionExpense = ({route, navigation}) => {
  const {subExpense} = route.params;

  const[items, setItems] = useState([
    { subName: '', subCost: subExpense}
  ]);

  const[addSubName, setAddSubName] = useState('');
  const[addSubCost, setAddSubCost] = useState(0);

  const handleButton = () => {

    const newItem = {
        subName: addSubName,
        subCost: addSubCost
    }

    const newItems = [...items, newItem];

    setItems(newItems);
    setAddSubName('');
    setAddSubCost('');
    
  }
  return(<View></View>);
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
