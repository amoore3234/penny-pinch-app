import React from "react";
import { formatNumber} from "react-native-currency-input";
import { useState, useEffect} from 'react';
import { Text, View, StyleSheet, SafeAreaView, Image, Dimensions, BackHandler} from 'react-native';
import { TouchableOpacity, TouchableHighlight } from "react-native-gesture-handler";

export const ExpenseList = ({ route, navigation}) => {
  
  const {subscribe, creditCards, autos, groceries, livings, entertainments} = route.params;

  useEffect(() => {
    BackHandler.addEventListener('hardwareBackPress', function () {
      return true;
  });
  return () => {}
  },[]);

    return (
    <SafeAreaView>
        <View style={{flexDirection: 'row', justifyContent: 'center', marginTop: 8}}>
          <TouchableOpacity 
            style={styles.SquareRoundedBorders} 
            activeOpacity={0.8} 
            onPress={() => {
              navigation.navigate('SubscriptionExpense');
            }}>
              <View style={{alignItems: 'center', marginTop: 5}}>
                <Image style={{height: 50, width: 49}} source={require('../assets/images/subscription.png')} />
                <Text style={styles.SubsrictionsStyle}>Subscriptions</Text>
                <Text style={styles.SubsrictionsStyle}>{formatNumber(subscribe, {delimiter: ",", prefix: "$"})}</Text>
              </View>
          </TouchableOpacity>

          <TouchableOpacity 
            style={styles.SquareRoundedBorders} 
            activeOpacity={0.8} 
            onPress={() => {
              navigation.navigate('CreditCardExpense');
            }}>
              <View style={{alignItems: 'center', marginTop: 5}}>
                <Image style={{height: 50, width: 49}} source={require('../assets/images/creditCard.png')} />
                <Text style={styles.CreditCardStyle}>Credit Cards</Text>
                <Text style={styles.CreditCardStyle}>{formatNumber(creditCards, {delimiter: ",", prefix: "$"})}</Text>
              </View>
          </TouchableOpacity>
        </View>


        <View style={{flexDirection: 'row', justifyContent: 'center'}}>
          <TouchableOpacity 
            style={styles.SquareRoundedBorders} 
            activeOpacity={0.8} 
            onPress={() => {
              navigation.navigate('AutoExpense');
            }}>
              <View style={{alignItems: 'center', marginTop: 5}}>
                <Image style={{height: 50, width: 49}} source={require('../assets/images/car.png')} />
                <Text style={styles.AutoLoanStyle}>Auto Loan</Text>
                <Text style={styles.AutoLoanStyle}>{formatNumber(autos, {delimiter: ",", prefix: "$"})}</Text>
              </View>
          </TouchableOpacity>

          <TouchableOpacity 
            style={styles.SquareRoundedBorders} 
            activeOpacity={0.8} onPress={() => {
              navigation.navigate('GroceryExpense');
              }}>
                <View style={{alignItems: 'center', marginTop: 5}}>
                  <Image style={{height: 50, width: 49}} source={require('../assets/images/groceries.png')} />
                  <Text style={styles.GroceryStyle}>Groceries</Text>
                  <Text style={styles.GroceryStyle}>{formatNumber(groceries, {delimiter: ",", prefix: "$"})}</Text>
                </View>
          </TouchableOpacity>
        </View>


        <View style={{flexDirection: 'row', justifyContent: 'center'}}>
          <TouchableOpacity 
            style={styles.SquareRoundedBorders} 
            activeOpacity={0.8} 
            onPress={() => {
              navigation.navigate('LivingExpense');
            }}>
              <View style={{alignItems: 'center', marginTop: 5}}>
                <Image style={{height: 50, width: 49}} source={require('../assets/images/living.png')} />
                <Text style={styles.LivingStyle}>Living</Text>
                <Text style={styles.LivingStyle}>{formatNumber(livings, {delimiter: ",", prefix: "$"})}</Text>
              </View>
          </TouchableOpacity>

          <TouchableOpacity 
            style={styles.SquareRoundedBorders} 
            activeOpacity={0.8} onPress={() => {
              navigation.navigate('EntertainmentExpense');
            }}>
            <View style={{alignItems: 'center', marginTop: 5}}>
              <Image style={{height: 50, width: 49}} source={require('../assets/images/island.png')} />
              <Text style={styles.EntertainmentStyle}>Attraction/Misc</Text>
              <Text style={styles.EntertainmentStyle}>{formatNumber(entertainments, {delimiter: ",", prefix: "$"})}</Text>
            </View>
          </TouchableOpacity>
        </View>

        <View style={styles.DashboardButtonStyle}>
          <TouchableHighlight
            style={styles.ButtonStyle}
            underlayColor= '#94ABDB'
            onPress={() => {
              navigation.navigate('MonthlyReport', {
                  subs: subscribe,
                  creditCard: creditCards,
                  auto: autos,
                  grocery: groceries,
                  living: livings,
                  entertainment: entertainments
              })
            }}>
              <Text style={styles.TextStyle}>Go To Dashboard</Text>
          </TouchableHighlight>
        </View>
    </SafeAreaView>
    );
};

const { width, height } = Dimensions.get("window");

const styles = StyleSheet.create({
  
  SquareRoundedBorders: {
    backgroundColor: 'white',
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 10,
    shadowColor: "#000",
    borderStyle: 'solid',
    borderColor: 'white',
    borderWidth: 1,
    margin: 7,
    width: width/2 - 20,
    height: 160,
    elevation: 5,
  },

  SubsrictionsStyle: {
    fontSize: 20, 
    fontWeight: 'bold', 
    color: '#E20D31'
  },

  CreditCardStyle: {
    fontSize: 20, 
    fontWeight: 'bold', 
    color: '#261FE6'
  },

  AutoLoanStyle: {
    fontSize: 20, 
    fontWeight: 'bold', 
    color: '#0B7E82'
  },

  GroceryStyle: {
    fontSize: 20, 
    fontWeight: 'bold', 
    color: '#BF5D11'
  },

  LivingStyle: {
    fontSize: 20, 
    fontWeight: 'bold', 
    color: '#690BF8'
  },

  EntertainmentStyle: {
    fontSize: 20, 
    fontWeight: 'bold', 
    color: '#0C6705'
  },

  ButtonStyle: {
    alignItems: 'center',
    justifyContent: 'center',
    width: width - 20,
    height: 40,
    borderRadius: 5,
    backgroundColor: '#185FEE'
  },

  TextStyle: {
    color: '#FFFFFF',
    fontSize: 17,
  },

  DashboardButtonStyle: {
    alignItems: 'center', 
    justifyContent: 'center', 
    marginTop: height - 660
  }
});