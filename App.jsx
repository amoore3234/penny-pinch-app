import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';


import { 
  MonthlyReport, 
  AddExpenses, 
  OpeningPage, 
  SubscriptionExpense,
  CreditCardExpense,
  AutoExpense,
  GroceryExpense,
  LivingExpense,
  EntertainmentExpense, 
  } from './Screens';

const Stack = createStackNavigator();

export default () => {

  return (
  <NavigationContainer>
    <Stack.Navigator>
      <Stack.Screen
        name="OpeningPage" 
        component={OpeningPage} 
        options={{
          title: 'Welcome',
          headerTitleAlign: 'center',
          headerStyle: {
            backgroundColor: '#185FEE'
          },
          headerTintColor: '#FFFFFF'
        }}
        />
      <Stack.Screen 
      name="MonthlyReport" 
      component={MonthlyReport} 
      options={{ 
        title: 'My Report', 
        headerLeft: null,
        headerTitleAlign: 'center',
        headerStyle: {
          backgroundColor: '#185FEE'
        },
        headerTintColor: '#FFFFFF'
        }}
      initialParams={{
        subs: 0,
        creditCard: 0,
        auto: 0,
        grocery: 0,
        living: 0,
        entertainment: 0
      }}
      />
      <Stack.Screen 
        name="AddExpenses" 
        component={AddExpenses} 
        options={{
          title: 'Expense List',
          headerLeft: null,
          headerTitleAlign: 'center',
          headerStyle: {
            backgroundColor: '#185FEE'
          },
          headerTintColor: '#FFFFFF'
        }}
        />
      <Stack.Screen 
        name="SubscriptionExpense" 
        component={SubscriptionExpense} 
        options={{
          title: 'Subscriptions',
          headerLeft: null,
          headerTitleAlign: 'center',
          headerStyle: {
            backgroundColor: '#185FEE'
          },
          headerTintColor: '#FFFFFF'
        }}
        />
      <Stack.Screen 
        name="CreditCardExpense" 
        component={CreditCardExpense} 
        options={{
          title: 'Credit Cards',
          headerLeft: null,
          headerTitleAlign: 'center',
          headerStyle: {
            backgroundColor: '#185FEE'
          },
          headerTintColor: '#FFFFFF'
        }}
        />
      <Stack.Screen 
        name="AutoExpense" 
        component={AutoExpense} 
        options={{
          title: 'Auto Payments',
          headerLeft: null,
          headerTitleAlign: 'center',
          headerStyle: {
            backgroundColor: '#185FEE'
          },
          headerTintColor: '#FFFFFF'
        }}
        />
      <Stack.Screen 
        name="GroceryExpense" 
        component={GroceryExpense} 
        options={{
          title: 'Groceries',
          headerLeft: null,
          headerTitleAlign: 'center',
          headerStyle: {
            backgroundColor: '#185FEE'
          },
          headerTintColor: '#FFFFFF'
        }}
        />
      <Stack.Screen
        name="LivingExpense" 
        component={LivingExpense} 
        options={{
          title: 'Living Expenses',
          headerLeft: null,
          headerTitleAlign: 'center',
          headerStyle: {
            backgroundColor: '#185FEE'
          },
          headerTintColor: '#FFFFFF'
        }}
        />
      <Stack.Screen
        name="EntertainmentExpense" 
        component={EntertainmentExpense} 
        options={{
          title: 'Attraction / Misc',
          headerLeft: null,
          headerTitleAlign: 'center',
          headerStyle: {
            backgroundColor: '#185FEE'
          },
          headerTintColor: '#FFFFFF'
        }}
        />
    </Stack.Navigator>
  </NavigationContainer>
  );

}
