import React from "react";
import  AsyncStorage  from "@react-native-async-storage/async-storage";
import { useState, useEffect} from 'react';
import { Button, Text, View, SafeAreaView, TextInput } from 'react-native';
import { StartPage } from "./screen_components/StartPage";
import { MonthlySummary } from "./screen_components/MonthlySummary";
import { ExpenseList } from "./screen_components/ExpenseList";
import { Subscription } from "./screen_components/expense_components/Subscription";
import { CreditCard } from "./screen_components/expense_components/CreditCard";
import { Auto } from "./screen_components/expense_components/Auto";
import { Grocery } from "./screen_components/expense_components/Grocery";
import { Living } from "./screen_components/expense_components/Living";
import { Entertainment } from "./screen_components/expense_components/Entertainment";

export const OpeningPage = ({ navigation }) => {
  return <StartPage navigation={navigation}/>;
}

export const MonthlyReport = ({route, navigation}) => {
  return <MonthlySummary route={route} navigation={navigation} />
};

export const AddExpenses = ({route, navigation}) => {
  return <ExpenseList route={route} navigation={navigation} />
};

export const SubscriptionExpense = ({ navigation }) => {
  return <Subscription navigation={navigation} />
};

export const CreditCardExpense = ({ navigation }) => {
  return <CreditCard navigation={navigation} />
};

export const AutoExpense = ({ navigation }) => {
  return <Auto navigation={navigation} />
};

export const GroceryExpense = ({ navigation }) => {
  return <Grocery navigation={navigation} />
};

export const LivingExpense = ({ navigation }) => {
  return <Living navigation={navigation} />
};

export const EntertainmentExpense = ({ navigation }) => {
  return <Entertainment navigation={navigation} />
}; 


export const AsyncStoragePage = () => {
  const[namesArray, setNamesArray] = useState([]);
  const[names, setNames] = useState('');
  useEffect(() => {
    fetch();
  },[]);

  const add = async () => {
  
    const items = {
      id: namesArray.length,
      name: names
    };
    try {
    const newItems = [...namesArray, items];
    
    await AsyncStorage.setItem('store', JSON.stringify(newItems));
    setNamesArray(newItems);
      } catch (error) {
        console.log(error);
      }
    
    
    setNames('');
    
  }

  const remove = id => {
    const filterData = namesArray.filter(item => item.id !== id);
    setNamesArray(filterData);
  }
  
  const fetch = async () => {
    try {
      const person = await AsyncStorage.getItem('store');
      const parsed = JSON.parse(person);
      if (parsed != null) {
      setNamesArray(parsed);
      }
    } catch(error) {
      console.log(error);
    }
  }

  const clear = async () => {
    await AsyncStorage.clear();
    
  }

  return (
  <SafeAreaView>
    <TextInput 
      placeholder="Enter here"
      value={names}
      onChangeText={val => setNames(val)}
    />
  
    <Button 
      title="Submit"
      onPress={add}
    />

    <Button 
      title="Fetch"
      
    />
    

    <Button 
      title='Clear'
      onPress={clear}
    />
  
    <View>
      {namesArray.map((nameArray, index) => (
        <View key={index}>
          <Text>{nameArray.name}</Text>
          
        </View>
      ))}
    </View>
  
    </SafeAreaView>
    );

};
