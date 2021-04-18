import React, { useReducer , useEffect } from 'react';
import DropDownPicker from 'react-native-dropdown-picker';
import {View, Text, TextInput, StyleSheet} from 'react-native';

const INPUT_CHANGE = 'INPUT_CHANGE';
const INPUT_BLUR = 'INPUT_BLUR';

const inputReducer = (state, action) => {
    switch(action.type) {
        case INPUT_CHANGE: 
        return {
            ...state,
            value: action.value,
            isValid: action.isValid
        };
        case INPUT_BLUR: 
        return {
            ...state,
            touched: true
        }
        default: 
        return state;
    }
};

const Dropdown = props => {

    const [inputState, dispatch] = useReducer(
        inputReducer, {
            value: props.initialValue ? props.initialValue: '',
            isValid: true,
            touched: false
        }
    );

    const {onInputChange, id} = props;

    useEffect( () => {
        if(inputState.touched) {
            onInputChange(id, inputState.value, inputState.isValid)
        }
    } , [inputState, onInputChange, id]


    );


    const itemChangeHandler = item => {
  

        dispatch({type: INPUT_CHANGE, value: item.value, isValid: true});
    };
    return (
        <View style={styles.formControl}>
            <Text style={styles.label}>{props.label}</Text>
            <DropDownPicker
            items={props.initialValue}
            defaultValue={props.defaultValue}
            containerStyle={{height: 40}}
            style={{backgroundColor: '#fafafa'}}
            itemStyle={{
                justifyContent: 'flex-start'
            }}
            dropDownStyle={{backgroundColor: '#fafafa'}}
            onChangeItem={itemChangeHandler}
             />

            {!inputState.isValid && inputState.touched && (
                <View style={styles.errorContainer}>
                    <Text style={styles.errorText}> {props.errorText}
                    </Text>
                </View>

            )}
        </View>
    );

};

const styles = StyleSheet.create({
    formControl: {
        width: '100%'
    },
    label: {
        fontFamily: 'open-sans-bold',
        marginVertical: 8
    },
    input: {
        paddingHorizontal: 2,
        paddingVertical: 5,
        borderBottomColor: '#ccc',
        borderBottomWidth: 1
    },
    errorContainer: {
        marginVertical : 5
    },
    errorText: {
        fontFamily: 'open-sans',
        color: 'red',
        fontSize: 13
    }
}
);

export default Dropdown;
