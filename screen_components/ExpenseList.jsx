import React from "react";
import { formatNumber} from "react-native-currency-input";
import { useState, useEffect} from 'react';
import { Text, View, SafeAreaView, Image } from 'react-native';
import { SquareRoundedBorder } from '../styles_component/SquareRoundedBorder';
import { TouchableOpacity } from "react-native-gesture-handler";

export const ExpenseList = ({ route, navigation}) => {
  const {subscribe, creditCards, autos, groceries, livings, entertainments} = route.params;
  const[subsInfo, setSubsInfo] = useState(subscribe);
  const[cardInfo, setCardInfo] = useState(creditCards);
  const[autosInfo, setAutosInfo] = useState(autos);
  const[groceriesInfo, setGroceriesInfo] = useState(groceries);
  const[livingsInfo, setLivingsInfo] = useState(livings);
  const[entertainmentInfo, setEntertainmentInfo] = useState(entertainments);

  useEffect(() => {
    setSubsInfo(subsInfo);
    setCardInfo(cardInfo);
    setAutosInfo(autosInfo);
    setGroceriesInfo(groceriesInfo);
    setLivingsInfo(livingsInfo);
    setEntertainmentInfo(entertainmentInfo);
  },[])


    return (
    <SafeAreaView>
        <View style={{flexDirection: 'row', justifyContent: 'center'}}>
        <SquareRoundedBorder>
        <TouchableOpacity onPress={() => {
        navigation.navigate('SubscriptionExpense')
      }}>
        <View style={{alignItems: 'center', marginTop: 5}}>
          <Image style={{height: 50, width: 49}} source={require('../assets/images/subscription.png')} />
          <Text style={{fontSize: 20, fontWeight: 'bold', color: '#E20D31'}}>Subscriptions</Text>
          <Text style={{fontSize: 20, fontWeight: 'bold', color: '#E20D31'}}>{formatNumber(subsInfo, {delimiter: ",", prefix: "$"})}</Text>
        </View>
          </TouchableOpacity>
         </SquareRoundedBorder>

         <SquareRoundedBorder>

        <TouchableOpacity onPress={() => {
        navigation.navigate('CreditCardExpense')
      }}>
        <View style={{alignItems: 'center', marginTop: 5}}>
          <Image style={{height: 50, width: 49}} source={require('../assets/images/creditCard.png')} />
          <Text style={{fontSize: 20, fontWeight: 'bold', color: '#261FE6'}}>Credit Cards</Text>
          <Text style={{fontSize: 20, fontWeight: 'bold', color: '#261FE6'}}>{formatNumber(cardInfo, {delimiter: ",", prefix: "$"})}</Text>
        </View>
          </TouchableOpacity>
         </SquareRoundedBorder>
        </View>

        <View style={{flexDirection: 'row', justifyContent: 'center'}}>
        <SquareRoundedBorder>
        <TouchableOpacity onPress={() => {
        navigation.navigate('AutoExpense')
      }}>
        <View style={{alignItems: 'center', marginTop: 5}}>
          <Image style={{height: 50, width: 49}} source={require('../assets/images/car.png')} />
          <Text style={{fontSize: 20, fontWeight: 'bold', color: '#0B7E82'}}>Auto Loan</Text>
          <Text style={{fontSize: 20, fontWeight: 'bold', color: '#0B7E82'}}>{formatNumber(autosInfo, {delimiter: ",", prefix: "$"})}</Text>
        </View>
          </TouchableOpacity>
         </SquareRoundedBorder>

         <SquareRoundedBorder>

        <TouchableOpacity onPress={() => {
        navigation.navigate('GroceryExpense')
      }}>
        <View style={{alignItems: 'center', marginTop: 5}}>
          <Image style={{height: 50, width: 49}} source={require('../assets/images/groceries.png')} />
          <Text style={{fontSize: 20, fontWeight: 'bold', color: '#BF5D11'}}>Groceries</Text>
          <Text style={{fontSize: 20, fontWeight: 'bold', color: '#BF5D11'}}>{formatNumber(groceriesInfo, {delimiter: ",", prefix: "$"})}</Text>
        </View>
          </TouchableOpacity>
         </SquareRoundedBorder>
        </View>

        <View style={{flexDirection: 'row', justifyContent: 'center'}}>
        <SquareRoundedBorder>
        <TouchableOpacity onPress={() => {
        navigation.navigate('LivingExpense')
      }}>
        <View style={{alignItems: 'center', marginTop: 5}}>
          <Image style={{height: 50, width: 49}} source={require('../assets/images/living.png')} />
          <Text style={{fontSize: 20, fontWeight: 'bold', color: '#690BF8'}}>Living</Text>
          <Text style={{fontSize: 20, fontWeight: 'bold', color: '#690BF8'}}>{formatNumber(livingsInfo, {delimiter: ",", prefix: "$"})}</Text>
        </View>
          </TouchableOpacity>
         </SquareRoundedBorder>

         <SquareRoundedBorder>

        <TouchableOpacity onPress={() => {
        navigation.navigate('EntertainmentExpense')
      }}>
        <View style={{alignItems: 'center', marginTop: 5}}>
          <Image style={{height: 50, width: 49}} source={require('../assets/images/island.png')} />
          <Text style={{fontSize: 20, fontWeight: 'bold', color: '#0C6705'}}>Attraction/Misc</Text>
          <Text style={{fontSize: 20, fontWeight: 'bold', color: '#0C6705'}}>{formatNumber(entertainmentInfo, {delimiter: ",", prefix: "$"})}</Text>
        </View>
          </TouchableOpacity>
         </SquareRoundedBorder>
        </View>

    </SafeAreaView>
    );
};