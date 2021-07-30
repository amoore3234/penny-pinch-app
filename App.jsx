import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { View, Text } from 'react-native';
import { Center } from './styles_component/Center';
import {  Border } from './styles_component/Border';

import { MonthlyReport, AddExpenses, OpeningPage, SubscriptionExpense } from './Screens';

const Stack = createStackNavigator();

export default () => {
  return (
  <NavigationContainer>
    <Stack.Navigator>
      <Stack.Screen name="OpeningPage" component={OpeningPage} />
      <Stack.Screen name="MonthlyReport" component={MonthlyReport} />
      <Stack.Screen name="AddExpenses" component={AddExpenses} />
      <Stack.Screen name="SubscriptionExpense" component={SubscriptionExpense} />
    </Stack.Navigator>
  </NavigationContainer>
  );


}
