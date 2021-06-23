import React, { useState, useEffect, useReducer, useCallback } from 'react';
import {
  ScrollView,
  View,
  KeyboardAvoidingView,
  StyleSheet,
  Button,
  ActivityIndicator,
  Alert,
  Text,
  TouchableOpacity
} from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { useDispatch } from 'react-redux';
import * as authActions from '../store/actions/auth';

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




const LoginScreen = props => {


  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState();
  const dispatch = useDispatch();

  const authHandler = async () => {
    console.log("Entering authHandler")
    console.log(formState.inputValues.email)
    console.log(formState.inputValues.password)
    let action = authActions.signIn(
      formState.inputValues.email,
      formState.inputValues.password
    );
    /*NOTE: CHANGE THIS TO THE APPROPRIATE API CALL*/
    setError(null);
    setIsLoading(true);
    try {
      await dispatch(action);
      //props.navigation.navigate('Shop'); *NOTE: Put Events here later once Login is successful.
    } catch (err) {
      setError(err.message);
      setIsLoading(false);
    }
  };

  const [formState, dispatchFormState] = useReducer(formReducer, {
    inputValues: {
      email: '',
      password: ''
    },
    inputValidities: {
      email: false,
      password: false
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
          id="email"
          label="E-mail"
          keyboardType="email-address"
          required
          email
          autoCapitalize="none"
          errorMessage="Please enter a valid email address."
          onInputChange={inputChangeHandler}
          initialValue=""

        />

        <Input
          id="password"
          label="Password"
          keyboardType="default"
          secureTextEntry
          required
          minLength={5}
          autoCapitalize="none"
          errorMessage="Please enter a valid password"
          onInputChange={inputChangeHandler}
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
export default LoginScreen;