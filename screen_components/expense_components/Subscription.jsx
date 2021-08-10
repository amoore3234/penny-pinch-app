import React from "react";
import  AsyncStorage  from "@react-native-async-storage/async-storage";
import { useState, useEffect} from 'react';
import { FakeCurrencyInput, formatNumber } from "react-native-currency-input";
import { Button, StyleSheet, Text, View, SafeAreaView, TextInput, FlatList } from 'react-native';
import { CenterElements } from '../../styles_component/CenterElements';
import { RoundedBorderExp } from '../../styles_component/RoundedBorderExp';

export const Subscription = ({ navigation }) => {

    const[items, setItems] = useState([]);
    

    const[addSubName, setAddSubName] = useState('');
    const[addSubCost, setAddSubCost] = useState(0);

    const[getSum, setGetSum] = useState(0);

    const[isFocused, setIsFocused] = useState(false);
    const[isFocusedName, setIsFocusedName] = useState(false);

    const handleFocusCost = () => setIsFocused(true);

    const handleBlurCost = () => setIsFocused(false);

    const handleFocusName = () => setIsFocusedName(true);

    const handleBlurName = () => setIsFocusedName(false);

    useEffect(() => {
    retrieveData();
    },[])

    const handleButton = async () => {
    
    const newItem = {
        id: items.length,
        subName: addSubName,
        subCost: addSubCost
    };

    const newItems = [...items, newItem];

    try {
    await AsyncStorage.setItem('subsList', JSON.stringify(newItems));
    if(newItems !== null) {
        setItems(newItems);
    }
    } catch (err) {
        console.log(err);
    }

    setAddSubName('');
    setAddSubCost(0);
    
    calculateSum();
    };

    const calculateSum = () => {
    
    const getSum = items.reduce((total, item) => {
        return total + item.subCost
    }, addSubCost);

    setGetSum(getSum);
    setAddSubCost(0);
    };

    const retrieveData = async () => {
    try {
        const list = await AsyncStorage.getItem('subsList');
        const listOfExpenses = await JSON.parse(list);
        if (listOfExpenses !== null) {
        setItems(listOfExpenses);
        }
    } catch (err) {
        console.log(err);
    } 
    }

    const deleteItem = async (id) => {
    try{
    
    const newList = items.filter(n => n.id !== id);
    await AsyncStorage.setItem('subsList', JSON.stringify(newList));
    if (newList !== null) {
    setItems(newList);
    }
    } catch (err) {
    console.log(err);
    }
    }

    const update = () => {
    calculateSum();
    }

    return(
    <SafeAreaView>
    <View style={{flexDirection: 'row', justifyContent: 'space-between', margin: 10}}>
    <TextInput
        onFocus={handleFocusName}
        onBlur={handleBlurName}
        style={[styles.InputStyle, {borderColor: isFocusedName ? '#a800a0' : '#807f7d'}]}
        placeholder='Subscription Name'
        value={addSubName}
        onChangeText={val => setAddSubName(val)}
    />
    <View style={{paddingTop: 3}}>
    <FakeCurrencyInput
        onFocus={handleFocusCost}
        onBlur={handleBlurCost}
        style={[styles.InputStyle, {borderColor: isFocused ? '#a800a0' : '#807f7d'}]}
        prefix="$ "
        delimiter=","
        separator="."
        precision={2}
        minValue={0}
        onChangeValue={setAddSubCost}
        value={addSubCost}
        />
    </View>
    </View>

    <Button 
    title="Add"
    color='#261FE6'
    onPress={handleButton}
    />

    <Button 
    title={getSum ? "Updated Completed": "Update"}
    color='#261FE6'
    onPress={update}
    />

    <Button
    title="Add Expenses"
    color='#261FE6'
    onPress={()=> {
    navigation.navigate('AddExpenses', {
    subscribe: getSum,
    })
    }}
    />

    <Button
    title="Home"
    color='#261FE6'
    onPress={()=> {
    navigation.navigate('MonthlyReport', {
    
    subs: getSum
    })
    }}
    />

    <FlatList 
        keyExtractor={(item) => item.id.toString()}
        data={items}
        renderItem={({ item }) => (
        <CenterElements>
        <RoundedBorderExp>
            <View style={{flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', paddingTop: 10, paddingRight: 5}}>
            <Text style={{fontSize: 25, fontWeight: 'bold'}}>{item.subName}</Text>
            <Text style={{fontSize: 25, fontWeight: 'bold'}}>{formatNumber(item.subCost, {delimiter: ",", prefix: "$", precision:2, separator: '.'})}</Text>
            </View>
            <View style={{flexDirection: 'row'}}>
            <Text onPress={()=> deleteItem(item.id)} style={{fontSize: 17, color: '#1281CB'}}>Delete</Text> 
            </View>
            
            
        </RoundedBorderExp>
        </CenterElements>
        )}
        
        />


    
    <View><Text></Text></View>

    </SafeAreaView>

    );
};

const styles = StyleSheet.create({

    InputStyle: {
        borderWidth: 3,
        borderRadius: 10,
        paddingLeft: 10,
        height: 40,
        width: 180,
        fontSize: 17,
    },
});