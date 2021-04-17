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
  const ConfirmSignUp = props => {

  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState();
  const dispatch = useDispatch();

  const authHandler = async () => {
        console.log("Entering authHandler")
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
      code: ''
    },
    inputValidities: {
      code: false
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
                    id="code"
                    label="Code"
                    required
                    autoCapitalize="none"
                    errorMessage="Please enter a valid code."
                    onInputChange={inputChangeHandler}
                    initialValue=""
                    
                    />


                    <View style={styles.buttonContainer}>

                        <Button title="Submit"
                        color={Colors.primary}
                        onPress={authHandler} />
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
export default ConfirmSignUp;