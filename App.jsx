import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { View, Text } from 'react-native';
import { Center } from './Center';
import {  Border } from './Border';

import { SavingOptions, FinancialGoal, Debt } from './Screens';

const Stack = createStackNavigator();

export default () => {
  return (
  <NavigationContainer>
    <Stack.Navigator>
      <Stack.Screen name="SavingOptions" component={SavingOptions} />
      <Stack.Screen name="FinancialGoal" component={FinancialGoal} />
      <Stack.Screen name="Debt" component={Debt} />
    </Stack.Navigator>
  </NavigationContainer>
  );


}
