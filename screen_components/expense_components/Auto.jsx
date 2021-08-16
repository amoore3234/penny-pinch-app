import React from "react";
import  AsyncStorage  from "@react-native-async-storage/async-storage";
import { useState, useEffect} from 'react';
import { FakeCurrencyInput, formatNumber } from "react-native-currency-input";
import { Text, StyleSheet, View, SafeAreaView, TextInput, FlatList, Dimensions, BackHandler } from 'react-native';
import { CenterElements } from '../../styles_component/CenterElements';
import { RoundedBorderExp } from '../../styles_component/RoundedBorderExp';
import { TouchableHighlight } from "react-native-gesture-handler";

export const Auto = ({ navigation }) => {

    const[items, setItems] = useState([]);
    

    const[addAutoName, setAddAutoName] = useState('');
    const[addAutoCost, setAddAutoCost] = useState(0);

    const[getSum, setGetSum] = useState(0);

    const[isFocused, setIsFocused] = useState(false);
    const[isFocusedName, setIsFocusedName] = useState(false);

    const handleFocusCost = () => setIsFocused(true);

    const handleBlurCost = () => setIsFocused(false);

    const handleFocusName = () => setIsFocusedName(true);

    const handleBlurName = () => setIsFocusedName(false);

    useEffect(() => {
    retrieveData();
    BackHandler.addEventListener('hardwareBackPress', function () {
        return true;
    });
    return () => {}
    },[])

    const handleButton = async () => {
    
    const newItem = {
        id: Math.random(),
        autoName: addAutoName,
        autoCost: addAutoCost
    };

    const newItems = [...items, newItem];

    try {
    await AsyncStorage.setItem('autosList', JSON.stringify(newItems));
    if(newItems !== null) {
        setItems(newItems);
    }
    } catch (err) {
        console.log(err);
    }

    setAddAutoName('');
    setAddAutoCost(0);
    
    calculateSum();
    };

    const calculateSum = () => {
    
    const getSum = items.reduce((total, item) => {
        return total + item.autoCost
    }, addAutoCost);

    setGetSum(getSum);
    setAddAutoCost(0);
    };

    const retrieveData = async () => {
    try {
        const list = await AsyncStorage.getItem('autosList');
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
    await AsyncStorage.setItem('autosList', JSON.stringify(newList));
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
    <View style={styles.AutoBorder}>
    <View style={{flexDirection: 'row', justifyContent: 'space-around'}}>
    <TextInput
        onFocus={handleFocusName}
        onBlur={handleBlurName}
        style={[styles.InputStyle, {borderColor: isFocusedName ? '#0B7E82' : '#807f7d'}]}
        placeholder='Auto Name'
        value={addAutoName}
        onChangeText={val => setAddAutoName(val)}
    />
    <View style={{paddingTop: 3}}>
    <FakeCurrencyInput
        onFocus={handleFocusCost}
        onBlur={handleBlurCost}
        style={[styles.InputStyle, {borderColor: isFocused ? '#0B7E82' : '#807f7d'}]}
        prefix="$ "
        delimiter=","
        separator="."
        precision={2}
        minValue={0}
        onChangeValue={setAddAutoCost}
        value={addAutoCost}
        />
    </View>
    </View>

    <View style={{flexDirection: 'row', justifyContent:'space-around', paddingTop: 15}}>
    <TouchableHighlight
        style={styles.ButtonStyle}
        underlayColor= '#94ABDB'
        disabled={addAutoName === "" ? true : false}
        onPress={handleButton}
    >
        <Text style={styles.TextStyle}>Add To List</Text>
    </TouchableHighlight>

    <TouchableHighlight
        style={styles.ButtonStyle}
        underlayColor= '#94ABDB'
        onPress={()=> {
            navigation.navigate('AddExpenses', {
            autos: getSum,
            })
        }}
    >
        <Text style={styles.TextStyle}>Add More Expenses</Text>
    </TouchableHighlight>
    </View>
    <View style={{alignItems: 'center', paddingTop:15}}>
    <TouchableHighlight
        style={styles.UpdateButtonStyle}
        underlayColor= '#2A9B9F'
        onPress={update}
    >
        <Text style={styles.TextStyle}>{getSum ? "Update Completed": "Please Update"}</Text>
    </TouchableHighlight>
    </View>

    </View>

    <FlatList 
        keyExtractor={(item) => item.id.toString()}
        data={items}
        renderItem={({ item }) => (
        <CenterElements>
        <RoundedBorderExp>
            <View style={{flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', paddingTop: 10, paddingRight: 5}}>
            <Text style={{fontSize: 25, fontWeight: 'bold'}}>{item.autoName}</Text>
            <Text style={{fontSize: 25, fontWeight: 'bold'}}>{formatNumber(item.autoCost, {delimiter: ",", prefix: "$", precision:2, separator: '.'})}</Text>
            </View>
            <View style={{flexDirection: 'row'}}>
            <Text onPress={()=> deleteItem(item.id)} style={{fontSize: 17, color: '#1281CB'}}>Delete</Text> 
            </View>
            
            
        </RoundedBorderExp>
        </CenterElements>
        )}
        
        />

    </SafeAreaView>

    );
};

const { width } = Dimensions.get("window");
const styles = StyleSheet.create({

    InputStyle: {
        borderWidth: 3,
        borderRadius: 10,
        paddingLeft: 10,
        height: 40,
        width: 180,
        fontSize: 17,
    },

    AutoBorder: {
        margin: 10,
        backgroundColor: 'white',
        width: width - 15,
        borderRadius: 10,
        shadowColor: "#000",
        borderStyle: 'solid',
        borderColor: 'white',
        borderWidth: 1,
        paddingTop: 10,
        height: 180,
        elevation: 5
    },

    ButtonStyle: {
        alignItems: 'center',
        justifyContent: 'center',
        width: 170,
        height: 40,
        borderRadius: 5,
        backgroundColor: '#185FEE'
    },

    UpdateButtonStyle: {
        alignItems: 'center',
        justifyContent: 'center',
        width: 310,
        height: 40,
        borderRadius: 5,
        backgroundColor: '#0B7E82'
    },

    TextStyle: {
        color: '#FFFFFF',
        fontSize: 17,
    }
});