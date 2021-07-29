import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { View, Text } from 'react-native';
import { Center } from './styles_component/Center';
import {  Border } from './styles_component/Border';

import { MonthlyReport, Debt, OpeningPage } from './Screens';

const Stack = createStackNavigator();

export default () => {
  return (
  <NavigationContainer>
    <Stack.Navigator>
      <Stack.Screen name="OpeningPage" component={OpeningPage} />
      <Stack.Screen name="MonthlyReport" component={MonthlyReport} />
      <Stack.Screen name="Debt" component={Debt} />
    </Stack.Navigator>
  </NavigationContainer>
  );


}
