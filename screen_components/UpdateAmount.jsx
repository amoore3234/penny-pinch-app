import React from "react";
import { FakeCurrencyInput } from "react-native-currency-input";
import { useState, useEffect} from 'react';

const[newAmount, setNewAmount] = useState(0);

const[isFocused, setIsFocused] = useState(false);
  
const handleFocusBudget = () => setIsFocused(true);
  
const handleBlurBudget = () => setIsFocused(false);


export const UpdateAmount = ({ props }) => {
    return (
    <FakeCurrencyInput
      onFocus={handleFocusBudget}
      onBlur={handleBlurBudget}
      style={[styles.InputStyle, {borderColor: isFocused ? '#a800a0' : '#807f7d'}]}
      prefix="$ "
      delimiter=","
      separator="."
      precision={2}
      minValue={0}
      onChangeValue={props.onChangeValue}
      value={props.value}
    />
    );
  };