import React, { useState, useEffect, useReducer, useCallback } from 'react';
import {
  ScrollView,
  View,
  KeyboardAvoidingView,
  StyleSheet,
  ActivityIndicator,
  Alert,
  Text,
  TouchableOpacity
} from 'react-native';

import { LinearGradient } from 'expo-linear-gradient';
import { useDispatch } from 'react-redux';
import Dropdown from '../components/UI/Dropdown';
import {
  TextInput
} from 'react-native-paper';
import DropDown from "react-native-paper-dropdown";
import Input from '../components/UI/Input';
import Card from '../components/UI/Card';
import Colors from '../constants/Colors';



const FORM_INPUT_UPDATE = 'FORM_INPUT_UPDATE';

const formReducer = (state, action) => {
  if (action.type === FORM_INPUT_UPDATE) {
    const updatedValues = {
      ...state.inputValues,
      [action.input]: action.value
    };
    const updatedValidities = {
      ...state.inputValidities,
      [action.input]: action.isValid
    };
    let updatedFormIsValid = true;
    for (const key in updatedValidities) {
      updatedFormIsValid = updatedFormIsValid && updatedValidities[key];
    }
    return {
      formIsValid: updatedFormIsValid,
      inputValidities: updatedValidities,
      inputValues: updatedValues
    };
  }
  return state;
};

const BarangayClearanceScreen = props => {
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState();
  const [isSignup, setIsSignup] = useState(false);
  const dispatch = useDispatch();

  const [showDropDown, setShowDropDown] = useState(false);

  const [clearance, setClearance] = useState();

  const clearanceList = [{ label: 'Employment', value: 'employment' },
  { label: 'Personal', value: 'personal' }];


  const authHandler = async () => {
    console.log(formState.inputValues.reason)
    console.log(formState.inputValues.governmentId)
    let action = authActions.login(
      formState.inputValues.email,
      formState.inputValues.password
    );
    /*NOTE: CHANGE THIS TO THE APPROPRIATE API CALL*/

    setError(null);
    setIsLoading(true);
    try {
      await dispatch(action);
      props.navigation.navigate('Shop');
    } catch (err) {
      setError(err.message);
      setIsLoading(false);
    }
  };

  const [formState, dispatchFormState] = useReducer(formReducer, {
    inputValues: {
      reason: '',
      governmentId: ''
    },
    inputValidities: {
      reason: false,
      governmentId: false
    },
    formIsValid: false
  });

  useEffect(() => {
    if (error) {
      Alert.alert('An Error Occurred!', error, [{ text: 'Okay' }]);
    }
  }, [error]);
  const inputChangeHandler = useCallback(
    (inputIdentifier, inputValue, inputValidity) => {
      dispatchFormState(
        {
          type: FORM_INPUT_UPDATE,
          value: inputValue,
          isValid: inputValidity,
          input: inputIdentifier
        }
      );
    }, [dispatchFormState]
  );

  return (


    <View style={styles.authContainer}>
      <ScrollView>
        <Input
          id="governmentId"
          label="Government ID"
          keyboardType="default"
          required
          autoCapitalize="none"
          errorMessage="Please enter a valid Government ID."
          onInputChange={inputChangeHandler}
          initialValue=""

        />



        <DropDown
          label={"Reason"}
          mode={"outlined"}
          value={clearance}
          setValue={setClearance}
          list={clearanceList}
          visible={showDropDown}
          showDropDown={() => setShowDropDown(true)}
          onDismiss={() => setShowDropDown(false)}
          inputProps={{
            right: <TextInput.Icon name={"menu-down"} />
            ,
          }}
        />

        <View style={styles.buttonContainer}>



          <TouchableOpacity onPress={authHandler} style={styles.appButtonContainer}>
            <Text style={styles.appButtonText}>Submit</Text>
          </TouchableOpacity>
        </View>

      </ScrollView>

    </View>






  );

};

const styles = StyleSheet.create({
  screen: {
    flex: 1
  },
  gradient: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center'
  },
  authContainer: {
    width: '100%',
    padding: 20
  },
  buttonContainer: {
    marginTop: 10
  },
  appButtonContainer: {
    elevation: 8,
    backgroundColor: Colors.primary,
    borderRadius: 10,
    paddingVertical: 10,
    paddingHorizontal: 12
  },
  appButtonText: {
    fontSize: 15,
    color: "#fff",
    alignSelf: "center",
    textTransform: "uppercase"
  },
});
export default BarangayClearanceScreen;