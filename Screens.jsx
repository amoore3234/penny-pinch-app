import React from "react";
import moment from "moment";
import { FakeCurrencyInput, formatNumber} from "react-native-currency-input";
import AsyncStorage from "react-native-async-storage";
import { useState, useEffect} from 'react';
import { Button, Text, StyleSheet, View, SafeAreaView, Image, TextInput, FlatList, As } from 'react-native';
import { Center } from './styles_component/Center';
import { RoundedBorder } from './styles_component/RoundedBorder';
import { CenterElements } from './styles_component/CenterElements';
import { RoundedBorderSummary } from './styles_component/RoundedBorderSummary';
import { SquareRoundedBorder } from './styles_component/SquareRoundedBorder';
import { TouchableOpacity } from "react-native-gesture-handler";
import { RoundedBorderExp } from './styles_component/RoundedBorderExp';

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
            monthlyBudget: budget,
            subs: 0,
            savings: goal,
            debt: 0,
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
  const {monthlyBudget, subs, savings, debt, creditCard, auto, grocery, living, entertainment} = route.params;
  const[currentDate, setCurrentDate] = useState('');
  const[budget, setBudget] = useState(0);
  const[monthBudget, setMonthBudget] = useState(monthlyBudget);
  
  
  const[subsAmount, setSubsAmount] = useState(subs);
  const[savingsTotal, setSavingsTotal] = useState(savings);
  const[cardAmount, setCardAmount] = useState(0);
  const[autoAmount, setAutoAmount] = useState(0);
  const[groceryAmount, setGroceryAmount] = useState(0);
  const[livingAmount, setLivingAmount] = useState(0);
  const[entertainmentAmount, setEntertainmentAmount] = useState(0);
  const[subItem, setSubItem] = useState([]);

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
    setMonthBudget(monthlyBudget);
    setSubsAmount(subs);
    
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
                <Image style={{height: 30, width: 31}} source={require('./assets/images/subscription.png')} />  
                <Text style={styles.ExpenseSummarySub}>{formatNumber(subsAmount, {delimiter: ",", prefix: "$"})}</Text>
              </View>
              
              <View style={{flexDirection: 'row'}}>
                <Image style={{height: 30, width: 31}} source={require('./assets/images/creditCard.png')} />  
                <Text style={styles.ExpenseSummaryCard}>{formatNumber(cardAmount, {delimiter: ",", prefix: "$"})}</Text>
              </View>

              <View style={{flexDirection: 'row'}}>
                <Image style={{height: 30, width: 31}} source={require('./assets/images/car.png')} />  
                <Text style={styles.ExpenseSummaryAuto}>{formatNumber(autoAmount, {delimiter: ",", prefix: "$"})}</Text>
              </View>
            </View>

            <View style={{flexDirection: 'row', justifyContent: 'space-around', paddingTop: 12}}>

              <View style={{flexDirection: 'row'}}>
                <Image style={{height: 30, width: 31}} source={require('./assets/images/groceries.png')} />  
                <Text style={styles.ExpenseSummaryGrocery}>{formatNumber(groceryAmount, {delimiter: ",", prefix: "$"})}</Text>
              </View>

              <View style={{flexDirection: 'row'}}>
                <Image style={{height: 30, width: 31}} source={require('./assets/images/living.png')} />  
                <Text style={styles.ExpenseSummaryLiving}>{formatNumber(livingAmount, {delimiter: ",", prefix: "$"})}</Text>
              </View>

              <View style={{flexDirection: 'row'}}>
                <Image style={{height: 30, width: 31}} source={require('./assets/images/island.png')} />  
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
            maxBudget: monthBudget,
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

export const AddExpenses = ({route, navigation}) => {
  const {maxBudget, subscribe, creditCards, autos, groceries, livings, entertainments} = route.params;
  const[subsInfo, setSubsInfo] = useState(subscribe);

  useEffect(() => {
    setSubsInfo(subsInfo);
  },[])


    return (
    <SafeAreaView>
      <TouchableOpacity onPress={() => {
        navigation.navigate('SubscriptionExpense', {

          finalBudget: maxBudget,
          finalSubs: subsInfo,
          
        })
      }}>
        <SquareRoundedBorder>
          <Image style={{height: 50, width: 49}} source={require('./assets/images/subscription.png')} />
          <Text>Subscriptions</Text>
          <Text>{subsInfo}</Text>
         </SquareRoundedBorder>
        </TouchableOpacity> 
    </SafeAreaView>
    );
};

export const SubscriptionExpense = ({ route, navigation }) => {
  const { finalBudget, finalSubs } = route.params;

  const[items, setItems] = useState([]);
  

  const[addSubName, setAddSubName] = useState('');
  const[addSubCost, setAddSubCost] = useState(0);

  const[getSum, setGetSum] = useState(0);
  const[num, setNum] = useState(0);

  const[isFocused, setIsFocused] = useState(false);
  const[isFocusedName, setIsFocusedName] = useState(false);

  const handleFocusCost = () => setIsFocused(true);

  const handleBlurCost = () => setIsFocused(false);

  const handleFocusName = () => setIsFocusedName(true);

  const handleBlurName = () => setIsFocusedName(false);

  useEffect(() => {
    retrieveData();
  },[])

  const handleButton = async () => {

    const newItem = {
        id: items.length,
        subName: addSubName,
        subCost: addSubCost
    };

    const newItems = [...items, newItem];

    try {
    AsyncStorage.setItem('list', JSON.stringify(newItems));
    } catch (err) {
      console.log(err);
    }

    setItems(newItems);
    setAddSubName('');
    setAddSubCost(0);
    
    calculateSum();
    
  };

  const calculateSum = () => {
    
    const getSum = items.reduce((total, item) => {
      return total + item.subCost
    }, addSubCost);

    setGetSum(getSum);
    setAddSubCost(0);
  };

  const retrieveData = async () => {
    try {
      const list = await AsyncStorage.getItem('list');
      const listOfExpenses = await JSON.parse(list) || [];
      if (listOfExpenses != null) {
        setItems(listOfExpenses);
      }
    } catch (err) {
      console.log(err);
    }

    
  }
  

  
  return(
  <SafeAreaView>
  <View style={{flexDirection: 'row', justifyContent: 'space-between', margin: 10}}>
    <TextInput
      onFocus={handleFocusName}
      onBlur={handleBlurName}
      style={[styles.InputStyle, {borderColor: isFocusedName ? '#a800a0' : '#807f7d'}]}
      placeholder='Subscription Name'
      value={addSubName}
      onChangeText={val => setAddSubName(val)}
    />
  <View style={{paddingTop: 3}}>
  <FakeCurrencyInput
      onFocus={handleFocusCost}
      onBlur={handleBlurCost}
      style={[styles.InputStyle, {borderColor: isFocused ? '#a800a0' : '#807f7d'}]}
      prefix="$ "
      delimiter=","
      separator="."
      precision={2}
      minValue={0}
      onChangeValue={setAddSubCost}
      value={addSubCost}
      />
    </View>
  </View>
  
  <Button 
    title="Add"
    color='#261FE6'
    onPress={handleButton}
  />

<Button 
    title="Add List"
    color='#261FE6'
    onPress={retrieveData}
  />

  <Button
    title="Add Expenses"
    color='#261FE6'
    onPress={()=> {
    navigation.navigate('AddExpenses', {
    subscribe: getSum,
     })
   }}
  />

<Button
    title="Home"
    color='#261FE6'
    onPress={()=> {
    navigation.navigate('MonthlyReport', {
    monthlyBudget: finalBudget - getSum,
    subs: finalSubs + getSum
     })
   }}
  />
  
    <FlatList 
      keyExtractor={(item) => item.id.toString()}
      data={items}
      renderItem={({ item }) => (
        <CenterElements>
        <RoundedBorderExp>
          <View style={{flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', paddingTop: 10, paddingRight: 5}}>
          <Text style={{fontSize: 20, fontWeight: 'bold'}}>{item.subName}</Text>
          <Text style={{fontSize: 20, fontWeight: 'bold'}}>{formatNumber(item.subCost, {delimiter: ",", prefix: "$", precision:2, separator: '.'})}</Text>
          </View>
          <View style={{flexDirection: 'row'}}>
            <Text>Edit</Text>
            <Text style={{paddingLeft: 10}}>Delete</Text>
          </View>
          
          
        </RoundedBorderExp>
      </CenterElements>
      )}
      
      />


    
    <View><Text></Text></View>

  </SafeAreaView>
  
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
