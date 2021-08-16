import React from "react";
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
