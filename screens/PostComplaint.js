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
  import * as Random from 'expo-random';
  import * as complaintActions from '../store/actions/complaint';
  import Complaint from '../models/Complaint'
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



  const BusinessPermitScreen = props => {
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState();
    const [isSignup, setIsSignup] = useState(false);
    const dispatch = useDispatch();
  
    const authHandler = async () => {

      let complaint_id = Random.getRandomBytes(byteCount);
      let create_date = new Date().getDate();
      let status = "New"
      console.log(formState.inputValues.attachment_id)
      console.log(formState.inputValues.complaint_desc)
      console.log(formState.inputValues.latitude)
      console.log(formState.inputValues.longitude)
      console.log(formState.inputValues.status)
      console.log(formState.inputValues.type)

      console.log(formState.inputValues.user_id)

      let complaint = new Complaint(
        complaint_id, 
        attachment_id, 
        complaint_desc, 
        create_date, 
        latitude, 
        longitude, 
        status, 
        type, 
        user_id
      )

      let action = complaintActions.callPostComplaint(
          complaint
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
        complaint_id: '',
        attachment_id: '',
        complaint_desc: '',
        create_date: '',
        latitude: '',
        longitude: '',
        status: '',
        type: '',
        user_id: ''
      },
      inputValidities: {
        complaint_id: false,
        attachment_id: false,
        complaint_desc: false,
        create_date: false,
        latitude: false,
        longitude: false,
        status: false,
        type: false,
        user_id: false
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
                        id="type"
                        label="Type"
                        keyboardType="default"
                        required
                        autoCapitalize="none"
                        errorMessage="Please enter a valid value."
                        onInputChange={inputChangeHandler}
                        initialValue=""
                        
                        />

                        <Input
                        id="complaint_desc"
                        label="Complaint Description"
                        keyboardType="default"
                        required
                        minLength={5}
                        autoCapitalize="none"
                        errorMessage="Please enter a valid value."
                        onInputChange={inputChangeHandler}
                        />
                        <Input 
                        id="latitude"
                        label="Latitude"
                        keyboardType="default"
                        required
                        email
                        autoCapitalize="none"
                        errorMessage="Please enter a valid value."
                        onInputChange={inputChangeHandler}
                        initialValue=""
                        
                        />
                        <Input 
                        id="longitude"
                        label="Longitude"
                        keyboardType="default"
                        required
                        email
                        autoCapitalize="none"
                        errorMessage="Please enter a valid value."
                        onInputChange={inputChangeHandler}
                        initialValue=""
                        
                        />
                        <Input 
                        id="Attachment"
                        label="Attachment"
                        keyboardType="default"
                        required
                        autoCapitalize="none"
                        errorMessage="Please enter a valid value."
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
export default BusinessPermitScreen;