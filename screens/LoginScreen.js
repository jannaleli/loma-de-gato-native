import React, { useState, useEffect, useReducer, useCallback } from 'react';
import {
    ScrollView,
    View,
    KeyboardAvoidingView,
    StyleSheet,
    Button,
    ActivityIndicator,
    Alert
  } from 'react-native';
  import { LinearGradient } from 'expo-linear-gradient';
  import { useDispatch } from 'react-redux';

  
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
  const [isSignup, setIsSignup] = useState(false);
  const dispatch = useDispatch();

  const authHandler = async () => {
    let action;
    if (isSignup) {
      action = authActions.signup(
        formState.inputValues.email,
        formState.inputValues.password
      );
    } else {
      action = authActions.login(
        formState.inputValues.email,
        formState.inputValues.password
      );
    }
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
        <KeyboardAvoidingView 
            behavior="padding"
            keyboardVerticalOffset={50}
            style={styles.screen}>
            
            <LinearGradient colors={['#ffedff', '#ffe3ff']}
            style={styles.gradient}>
                <Card style={styles.authContainer}>
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
                    securetextEntry
                    required
                    minLength={5}
                    autoCapitalize="none"
                    errorMessage="Please enter a alid password"
                    onInputChange={inputChangeHandler}
                    />

                    <View style={styles.buttonContainer}>

                        <Button title="Login"
                        color={Colors.primary}
                        onPress={inputChangeHandler} />
                    </View>

                    </ScrollView>

                </Card>


            </LinearGradient>


        </KeyboardAvoidingView>
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
      width: '80%',
      maxWidth: 400,
      maxHeight: 400,
      padding: 20
    },
    buttonContainer: {
      marginTop: 10
    }
  });
export default LoginScreen;