import React from 'react';
import { createMaterialBottomTabNavigator } from '@react-navigation/material-bottom-tabs';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';


import { MonthlyReport, AddExpenses } from './Screens';

const Tab = createMaterialBottomTabNavigator();

export const MainBottomTab = () => {

   return(

   <Tab.Navigator
    initialRouteName="MonthlyReport"
    activeColor="#e91e63"
    barStyle={{ backgroundColor: 'tomato' }}
  >
    <Tab.Screen
      name="MonthlyReport"
      component={MonthlyReport}
      options={{
        tabBarLabel: 'Home',
        tabBarIcon: ({ color }) => (
          <MaterialCommunityIcons name="home" color={color} size={26} />
        ),
      }}
    />
    <Tab.Screen
      name="AddExpenses"
      component={AddExpenses}
      options={{
        tabBarLabel: 'Add Expenses',
        tabBarIcon: ({ color }) => (
          <MaterialCommunityIcons name="bell" color={color} size={26} />
        ),
      }}
    />
  </Tab.Navigator>)
}