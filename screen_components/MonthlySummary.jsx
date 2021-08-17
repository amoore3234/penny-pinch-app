import React from "react";
import moment from "moment";
import { VictoryBar, VictoryChart, VictoryTheme, VictoryAxis } from "victory-native";
import { formatNumber, FakeCurrencyInput} from "react-native-currency-input";
import { useState, useEffect } from 'react';
import { Text, StyleSheet, View, SafeAreaView, Image, BackHandler, Dimensions} from 'react-native';
import { SquareRoundedBorderSummary } from '../styles_component/SquareRoundedBorderSummary';
import { CenterElements } from '../styles_component/CenterElements';
import { RoundedBorderSummary } from '../styles_component/RoundedBorderSummary';
import { RoundedBorderChart } from '../styles_component/RoundedBorderChart';
import { TouchableHighlight } from "react-native-gesture-handler";
const { height } = Dimensions.get("window");



export const MonthlySummary = ({route, navigation}) => {

  const { monthlyBudget, savings, subs, creditCard, auto, grocery, living, entertainment } = route.params;
  
  const[currentDate, setCurrentDate] = useState('');
  const[monthBudget, setMonthBudget] = useState(monthlyBudget);
  
  
  const[subsAmount, setSubsAmount] = useState(subs);
  const[savingsTotal, setSavingsTotal] = useState(savings);
  const[cardAmount, setCardAmount] = useState(creditCard);
  const[autoAmount, setAutoAmount] = useState(auto);
  const[groceryAmount, setGroceryAmount] = useState(grocery);
  const[livingAmount, setLivingAmount] = useState(living);
  const[entertainmentAmount, setEntertainmentAmount] = useState(entertainment);

  
  const[editMode, setEditMode] = useState(false);
  const[editModeSavings, setEditModeSavings] = useState(false);
  const[updateBudget, setUpdateBudget] = useState(monthlyBudget);
  const[updateSavings, setUpdateSavings] = useState(savings);
  const[budgetTitle, setBudgetTitle] = useState("Press value to update budget.");
  const[savingsTitle, setSavingsTitle] = useState("Press value to update savings.");

  const[isFocused, setIsFocused] = useState(false);
  const[isFocusedSavings, setIsFocusedSavings] = useState(false);
  
  const handleFocusBudget = () => setIsFocused(true);
  
  const handleBlurBudget = () => setIsFocused(false);

  const handleFocusSavings = () => setIsFocusedSavings(true);
  
  const handleBlurSavings = () => setIsFocusedSavings(false);

  useEffect(() => {
    let month = moment();
    setCurrentDate(month.format('MMMM'));
    add();
    BackHandler.addEventListener('hardwareBackPress', function () {
      return true;
  });
  return () => {}
  }, []);


  const add = () => {
    {
      updateBudget ? setMonthBudget(updateBudget - (subs + creditCard + auto + grocery + living + entertainment)) 
    : setMonthBudget(monthlyBudget - (subs + creditCard + auto + grocery + living + entertainment))
    };
    setSubsAmount(subs);
    setCardAmount(creditCard);
    setAutoAmount(auto);
    setGroceryAmount(grocery);
    setLivingAmount(living);
    setEntertainmentAmount(entertainment);
  }
  const updateEdit = () => {
    setEditMode(false);
    setMonthBudget(updateBudget);
    setBudgetTitle("");
  }

  const defaultEdit = () => {
    setEditMode(!editMode);
    setBudgetTitle("");
  }

  const updateSavingsEdit = () => {
    setEditModeSavings(false);
    setSavingsTotal(updateSavings);
    setSavingsTitle("");
  }

  const defaultSavingsEdit = () => {
    setEditModeSavings(!editModeSavings);
    setSavingsTitle("");
  }

  const data=[
    {x: 1, y: autoAmount},
    {x: 2, y: livingAmount},
    {x: 3, y: groceryAmount},
    {x: 4, y: cardAmount},
    {x: 5, y: subsAmount},
    {x: 6, y: entertainmentAmount}
  ];
  

  return (
    <SafeAreaView style={{flex: 1, marginBottom: 10}}>
        <View style={{flexDirection: 'row', justifyContent: 'center'}}>
        <CenterElements>
          <SquareRoundedBorderSummary>
            <Text style={{fontSize: 13, position: 'absolute', top: 5, fontWeight: 'bold', color: '#1281CB'}}>{budgetTitle}</Text>
            <Text style={{fontSize: 20, fontWeight: 'bold'}}>{currentDate}'s Budget</Text>
            {editMode ? 
            <View>
              <FakeCurrencyInput
              onFocus={handleFocusBudget}
              onBlur={handleBlurBudget}
              style={[styles.InputStyle, {borderColor: isFocused ? '#05CFD6' : '#807f7d'}]}
              prefix="$ "
              delimiter=","
              separator="."
              precision={2}
              minValue={0}
              maxValue={999999}
              onChangeValue={setUpdateBudget}
              value={updateBudget}
            />
            <View style={{flexDirection: 'row', justifyContent: 'space-around', marginTop: 10}}>
            <TouchableHighlight style={styles.ConfirmButton} underlayColor={'#3FB252'} onPress={updateEdit}><Image style={{height: 20, width: 19}} source={require('../assets/images/check.png')} /></TouchableHighlight>
            <TouchableHighlight style={styles.DefaultButton} underlayColor={'#F693A4'} onPress={defaultEdit} ><Text style={{fontSize: 22, color: 'white'}}>X</Text></TouchableHighlight>
            </View>
            </View>
            
              : <Text onPress={defaultEdit} style={[styles.CurrencyStyle, { color: monthBudget < savingsTotal ? '#E20D31': '#048F1B' }]}>{ formatNumber(monthBudget, {delimiter: ",", prefix: "$"})}</Text>
            }
          </SquareRoundedBorderSummary>
        </CenterElements>

        <CenterElements>
          <SquareRoundedBorderSummary>
            <Text style={{fontSize: 13, position: 'absolute', top: 5, fontWeight: 'bold', color: '#1281CB'}}>{savingsTitle}</Text>
            <Text style={{fontSize: 20, fontWeight: 'bold'}}>Savings Goal</Text>
            {editModeSavings ? 
            <View>
              <FakeCurrencyInput
              onFocus={handleFocusSavings}
              onBlur={handleBlurSavings}
              style={[styles.InputStyle, {borderColor: isFocusedSavings ? '#05CFD6' : '#807f7d'}]}
              prefix="$ "
              delimiter=","
              separator="."
              precision={2}
              minValue={0}
              maxValue={999999}
              onChangeValue={setUpdateSavings}
              value={updateSavings}
            />
            <View style={{flexDirection: 'row', justifyContent: 'space-around', marginTop: 10}}>
            <TouchableHighlight onPress={updateSavingsEdit} underlayColor={'#3FB252'} style={styles.ConfirmButton}><Image style={{height: 20, width: 19}} source={require('../assets/images/check.png')} /></TouchableHighlight>
            <TouchableHighlight style={styles.DefaultButton} underlayColor={'#F693A4'} onPress={defaultSavingsEdit}><Text style={{fontSize: 22, color: 'white'}}>X</Text></TouchableHighlight>
            </View>
            </View>

              : <Text onPress={defaultSavingsEdit} style={styles.CurrencyStyle}>{formatNumber(savingsTotal, {delimiter: ",", prefix: "$"})}</Text>
            }
          </SquareRoundedBorderSummary>
        </CenterElements>
        </View>
        <CenterElements>
          <RoundedBorderSummary>

            <Text style={{fontSize: 18, fontWeight: 'bold', textAlign: 'center'}}>Expense Summary</Text>
            
            <View style={{flexDirection: 'row', justifyContent: 'space-around', paddingTop: 17}}>

              <View style={{flexDirection: 'row'}}>
                <Image style={{height: 35, width: 36}} source={require('../assets/images/subscription.png')} />  
                <Text style={styles.ExpenseSummarySub}>{formatNumber(subsAmount, {delimiter: ",", prefix: "$"})}</Text>
              </View>
              
              <View style={{flexDirection: 'row'}}>
                <Image style={{height: 35, width: 36}} source={require('../assets/images/creditCard.png')} />  
                <Text style={styles.ExpenseSummaryCard}>{formatNumber(cardAmount, {delimiter: ",", prefix: "$"})}</Text>
              </View>

              <View style={{flexDirection: 'row'}}>
                <Image style={{height: 35, width: 36}} source={require('../assets/images/car.png')} />  
                <Text style={styles.ExpenseSummaryAuto}>{formatNumber(autoAmount, {delimiter: ",", prefix: "$"})}</Text>
              </View>
            </View>

            <View style={{flexDirection: 'row', justifyContent: 'space-around', paddingTop: 20}}>

              <View style={{flexDirection: 'row'}}>
                <Image style={{height: 35, width: 36}} source={require('../assets/images/groceries.png')} />  
                <Text style={styles.ExpenseSummaryGrocery}>{formatNumber(groceryAmount, {delimiter: ",", prefix: "$"})}</Text>
              </View>

              <View style={{flexDirection: 'row'}}>
                <Image style={{height: 35, width: 36}} source={require('../assets/images/living.png')} />  
                <Text style={styles.ExpenseSummaryLiving}>{formatNumber(livingAmount, {delimiter: ",", prefix: "$"})}</Text>
              </View>

              <View style={{flexDirection: 'row'}}>
                <Image style={{height: 35, width: 36}} source={require('../assets/images/island.png')} />  
                <Text style={styles.ExpenseSummaryEntertainment}>{formatNumber(entertainmentAmount, {delimiter: ",", prefix: "$"})}</Text>
              </View>
            </View>
            
            <View style={{ margin: 17, alignItems: 'center', justifyContent: 'center'}}>
            <TouchableHighlight
                style={styles.ButtonStyle}
                underlayColor= '#94ABDB'
                onPress={()=> {
                navigation.navigate('AddExpenses', {
                    subscribe: subsAmount,
                    creditCards: cardAmount,
                    autos: autoAmount,
                    groceries: groceryAmount,
                    livings: livingAmount,
                    entertainments: entertainmentAmount,
                    })
                }}
                >
                <Text style={styles.TextStyle}>Add Expenses</Text>
            </TouchableHighlight>
            </View>
            
          </RoundedBorderSummary>
        </CenterElements>

    <CenterElements>
        <RoundedBorderChart>
        <Text style={{fontSize: 18, fontWeight: 'bold', textAlign: 'center'}}>Total Expense Chart</Text>
            <View style={{paddingLeft: 25, position: 'relative', bottom: 40}}>
            <VictoryChart height={height - 500} width={412} domainPadding={18} theme={VictoryTheme.material}>
            <VictoryAxis 
                tickValues={[1, 2, 3, 4, 5, 6]} 
                tickFormat={["Auto", "Cards", "Living", "Food", "Subs", "Misc"]} 
                style={{tickLabels: {fontSize: 15, fontWeight: 'bold'}}}
                />
            <VictoryAxis dependentAxis
                tickFormat={(x) => (x >= 1000 ? (`$${x * 0.001}k`) : x < 1 ? (`$${x * 0}`) : (`$${x}`))}
                style={{tickLabels: {fontSize: 15, fontWeight: 'bold'}}}
            />
            
                <VictoryBar
                    style={{
                        parent: {
                            border: "1px solid #ccc"
                          },
                          labels: {fontWeight: 'bold', fontSize: 15},

                        data: { 
                            fill: "#D10023", fillOpacity: 0.5, stroke: "#D10023", strokeWidth: 3
                        }
                      }}
                    barRatio={0.7}
                    data={data}
                    labels={({ datum }) => `$${datum.y}`}
                />  
            </VictoryChart>
            </View>
            <View style={{ position:'absolute', bottom: 7}}>
                <TouchableHighlight
                    style={styles.ButtonStyle}
                    underlayColor= '#94ABDB'
                    onPress={add}
                    >
                    <Text style={styles.TextStyle}>Update Report</Text>
                </TouchableHighlight>
            </View>
        </RoundedBorderChart>
    </CenterElements>
    </SafeAreaView>
    
  );

};

const styles = StyleSheet.create({

    CurrencyStyle: {
        fontSize: 40, 
        fontWeight: 'bold', 
        color: '#048F1B'
    },

    InputStyle: {
      borderBottomWidth:3,
      paddingLeft: 10,
      height: 40,
      width: 140,
      fontSize: 19,
    },

    ExpenseSummarySub: {
        fontSize: 19,
        fontWeight: 'bold',
        color: '#E20D31'
    },

    ExpenseSummaryCard: {
        fontSize: 19,
        fontWeight: 'bold',
        color: '#261FE6'
    },

    ExpenseSummaryAuto: {
        fontSize: 18,
        fontWeight: 'bold',
        color: '#0B7E82'
    },

    ExpenseSummaryGrocery: {
        fontSize: 18,
        fontWeight: 'bold',
        color: '#BF5D11'
    },

    ExpenseSummaryLiving: {
        fontSize: 18,
        fontWeight: 'bold',
        color: '#690BF8'
    },

    ExpenseSummaryEntertainment: {
        fontSize: 18,
        fontWeight: 'bold',
        color: '#0C6705'
    },

    ButtonStyle: {
        alignItems: 'center',
        justifyContent: 'center',
        width: 310,
        height: 35,
        borderRadius: 5,
        backgroundColor: '#185FEE'
    },

    TextStyle: {
        color: '#FFFFFF',
        fontSize: 17,
    },

    DefaultButton: {
      alignItems: 'center',
      justifyContent: 'center',
      borderStyle: 'solid',
      borderRadius: 30,
      backgroundColor: '#E20D31',
      height: 50,
      width: 50,
    },

    ConfirmButton: {
      alignItems: 'center',
      justifyContent: 'center',
      borderStyle: 'solid',
      borderRadius: 30,
      backgroundColor: '#048F1B',
      height: 50,
      width: 50,
    }

});
