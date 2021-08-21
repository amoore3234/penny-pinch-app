import React from "react";
import  AsyncStorage  from "@react-native-async-storage/async-storage";
import { useState, useEffect} from 'react';
import { FakeCurrencyInput, formatNumber } from "react-native-currency-input";
import { Text, StyleSheet, View, SafeAreaView, TextInput, FlatList, Dimensions, BackHandler } from 'react-native';
import { CenterElements } from '../../styles_component/CenterElements';
import { RoundedBorderExp } from '../../styles_component/RoundedBorderExp';
import { TouchableHighlight } from "react-native-gesture-handler";

export const Entertainment= ({ navigation }) => {

    const[items, setItems] = useState([]);
    const[addEntertainName, setAddEntertainName] = useState('');
    const[addEntertainCost, setAddEntertainCost] = useState(0);
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
            entertainName: addEntertainName,
            entertainCost: addEntertainCost
        };

        const newItems = [...items, newItem];

            try {
                await AsyncStorage.setItem('entertainList', JSON.stringify(newItems));
                    if(newItems !== null) {
                        setItems(newItems);
                    }
                } catch (err) {
                    console.log(err);
                }

        setAddEntertainName('');
        setAddEntertainCost(0);
        
        calculateSum();
    };


    const calculateSum = () => {
        const getSum = items.reduce((total, item) => {
            return total + item.entertainCost
        }, addEntertainCost);

        setGetSum(getSum);
        setAddEntertainCost(0);
    };


    const retrieveData = async () => {
        try {
            const list = await AsyncStorage.getItem('entertainList');
            const listOfExpenses = await JSON.parse(list);
                if (listOfExpenses !== null) {
                setItems(listOfExpenses);
                }
        } catch (err) {
            console.log(err);
        } 
    };


    const deleteItem = async (id) => {
        try{
            const newList = items.filter(n => n.id !== id);
                await AsyncStorage.setItem('entertainList', JSON.stringify(newList));
                    if (newList !== null) {
                    setItems(newList);
                    }
            } catch (err) {
            console.log(err);
            }
    };

    const update = () => {
        calculateSum();
    }

    return(
        <SafeAreaView>
            <View style={styles.EntertainmentBorder}>
                <View style={{flexDirection: 'row', justifyContent: 'space-around'}}>
                    <TextInput
                        onFocus={handleFocusName}
                        onBlur={handleBlurName}
                        style={[styles.InputStyle, {borderColor: isFocusedName ? '#0C6705' : '#807f7d'}]}
                        placeholder='Attraction Name'
                        value={addEntertainName}
                        onChangeText={val => setAddEntertainName(val)}
                    />
                    <View style={{paddingTop: 3}}>
                    <FakeCurrencyInput
                        onFocus={handleFocusCost}
                        onBlur={handleBlurCost}
                        style={[styles.InputStyle, {borderColor: isFocused ? '#0C6705' : '#807f7d'}]}
                        prefix="$ "
                        delimiter=","
                        separator="."
                        precision={2}
                        minValue={0}
                        onChangeValue={setAddEntertainCost}
                        value={addEntertainCost}
                    />
                    </View>
                </View>

                <View style={{flexDirection: 'row', justifyContent:'space-around', paddingTop: 15}}>
                    <TouchableHighlight
                        style={styles.ButtonStyle}
                        underlayColor= '#94ABDB'
                        disabled={addEntertainName === "" ? true : false}
                        onPress={handleButton}>
                            <Text style={styles.TextStyle}>Add To List</Text>
                    </TouchableHighlight>

                    <TouchableHighlight
                        style={styles.ButtonStyle}
                        underlayColor= '#94ABDB'
                        onPress={()=> {
                            navigation.navigate('AddExpenses', {
                            entertainments: getSum,
                            })
                        }}>
                            <Text style={styles.TextStyle}>Add More Expenses</Text>
                    </TouchableHighlight>
                </View>

                <View style={{alignItems: 'center', paddingTop:15}}>
                    <TouchableHighlight
                        style={styles.UpdateButtonStyle}
                        underlayColor= '#65B45F'
                        onPress={update}>
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
                                <Text style={{fontSize: 25, fontWeight: 'bold'}}>{item.entertainName}</Text>
                                <Text style={{fontSize: 25, fontWeight: 'bold'}}>{formatNumber(item.entertainCost, {delimiter: ",", prefix: "$", precision:2, separator: '.'})}</Text>
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

    EntertainmentBorder: {
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
        backgroundColor: '#0C6705'
    },

    TextStyle: {
        color: '#FFFFFF',
        fontSize: 17,
    }
});