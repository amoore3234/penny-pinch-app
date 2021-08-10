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
  AsyncStoragePage 
  } from './Screens';

const Stack = createStackNavigator();

export default () => {
  return (
  <NavigationContainer>
    <Stack.Navigator>
      <Stack.Screen name="OpeningPage" component={OpeningPage} />
      <Stack.Screen name="MonthlyReport" component={MonthlyReport} />
      <Stack.Screen name="AddExpenses" component={AddExpenses} />
      <Stack.Screen name="SubscriptionExpense" component={SubscriptionExpense} />
      <Stack.Screen name="CreditCardExpense" component={CreditCardExpense} />
      <Stack.Screen name="AutoExpense" component={AutoExpense} />
      <Stack.Screen name="GroceryExpense" component={GroceryExpense} />
      <Stack.Screen name="LivingExpense" component={LivingExpense} />
      <Stack.Screen name="EntertainmentExpense" component={EntertainmentExpense} />
      <Stack.Screen name="AsyncStoragePage" component={AsyncStoragePage} />
    </Stack.Navigator>
  </NavigationContainer>
  );


}
