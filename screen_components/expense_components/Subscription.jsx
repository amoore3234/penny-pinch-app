import React from "react";
import  AsyncStorage  from "@react-native-async-storage/async-storage";
import { useState, useEffect} from 'react';
import { FakeCurrencyInput, formatNumber } from "react-native-currency-input";
import { StyleSheet, Text, View, SafeAreaView, TextInput, FlatList, Dimensions, BackHandler, Keyboard } from 'react-native';
import { CenterElements } from '../../styles_component/CenterElements';
import { RoundedBorderExp } from '../../styles_component/RoundedBorderExp';
import { TouchableHighlight } from "react-native-gesture-handler";

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
    BackHandler.addEventListener('hardwareBackPress', function () {
          return true;
    });
    return () => {}
    },[])

    const handleButton = async () => {
    
     const newItem = {
        id: Math.random(),
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
    Keyboard.dismiss();
    };

    const calculateSum = async () => {
    
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
    <SafeAreaView style={{}}>
    <View style={styles.SubscriptionBorder}>
    <View style={{flexDirection: 'row', justifyContent: 'space-around'}}>
    
    <TextInput
        onFocus={handleFocusName}
        onBlur={handleBlurName}
        style={[styles.InputStyle, {borderColor: isFocusedName ? '#E20D31' : '#807f7d'}]}
        placeholder='Subscription Name'
        value={addSubName}
        onChangeText={val => setAddSubName(val)}
    />
    <View style={{paddingTop: 3}}>
    <FakeCurrencyInput
        onFocus={handleFocusCost}
        onBlur={handleBlurCost}
        style={[styles.InputStyle, {borderColor: isFocused ? '#E20D31' : '#807f7d'}]}
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
    <View style={{flexDirection: 'row', justifyContent:'space-around', paddingTop: 15}}>
    <TouchableHighlight
        style={styles.ButtonStyle}
        underlayColor= '#94ABDB'
        disabled={addSubName === "" ? true : false}
        onPress={handleButton}
    >
        <Text style={styles.TextStyle}>Add To List</Text>
    </TouchableHighlight>

    <TouchableHighlight
        style={styles.ButtonStyle}
        underlayColor= '#94ABDB'
        onPress={()=> {
            navigation.navigate('AddExpenses', {
            subscribe: getSum,
            })
        }}
    >
        <Text style={styles.TextStyle}>Add More Expenses</Text>
    </TouchableHighlight>
    </View>
    <View style={{alignItems: 'center', paddingTop:15}}>
    <TouchableHighlight
        style={styles.UpdateButtonStyle}
        underlayColor= '#F693A4'
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

    SubscriptionBorder: {
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
        backgroundColor: '#E20D31'
    },

    

    TextStyle: {
        color: '#FFFFFF',
        fontSize: 17,
    }
});