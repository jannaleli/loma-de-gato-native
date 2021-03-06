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
import User from '../models/User'
import {
  TextInput
} from 'react-native-paper';
import DropDown from "react-native-paper-dropdown";
import Input from '../components/UI/Input';
import Card from '../components/UI/Card';
import Colors from '../constants/Colors';
import Dropdown from '../components/UI/Dropdown';
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
const RegisterScreen = props => {
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState();
  const [isSignup, setIsSignup] = useState(false);
  const dispatch = useDispatch();
  const [showDropDown, setShowDropDown] = useState(false);

  const [gender, setGender] = useState();

  const genderList = [{ label: 'Male', value: 'male' },
  { label: 'Female', value: 'female' }];
  const authHandler = async () => {

    let user_id = formState.inputValues.email
    let username = formState.inputValues.email
    let createdate = new Date().getDate
    let attachment_id = "for editing later"

    console.log(formState.inputValues.email)
    console.log(formState.inputValues.password)
    console.log(formState.inputValues.firstName)
    console.log(formState.inputValues.lastName)
    console.log(formState.inputValues.phone)
    console.log(formState.inputValues.birthDate)
    console.log(formState.inputValues.birthPlace)
    console.log(formState.inputValues.gender)
    console.log(formState.inputValues.civilStatus)
    console.log(formState.inputValues.address)
    console.log(formState.inputValues.zipNumber)
    console.log(formState.inputValues.grossIncome)
    console.log(formState.inputValues.tinNumber)
    console.log(formState.inputValues.profession)
    console.log(formState.inputValues.weight)
    console.log(formState.inputValues.height)

    /*NOTE: Just make sure that everything is printed out accordingly before we finish the POST process*/
    let user = new User(
      user_id,
      address,
      attachment_id,
      birthdate,
      civil_status,
      contact_no,
      control_no,
      createdate,
      firstname,
      gender,
      gross_income,
      height,
      lastname,
      mobilenumber,
      password,
      place_of_birth,
      profession,
      tin_no,
      username,
      weight,
      zipcode


    )
    let action = authActions.signup(
      user
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
      email: '',
      password: '',
      firstName: '',
      lastName: '',
      phone: '',
      birthDate: '',
      birthPlace: '',
      gender: '',
      civilStatus: '',
      address: '',
      zipNumber: '',
      grossIncome: '',
      tinNumber: '',
      profession: '',
      weight: '',
      height: ''
    },
    inputValidities: {
      email: false,
      password: false,
      firstName: false,
      lastName: false,
      phone: false,
      birthDate: false,
      birthPlace: false,
      gender: false,
      civilStatus: false,
      address: false,
      zipNumber: false,
      grossIncome: false,
      tinNumber: false,
      profession: false,
      weight: false,
      height: false,
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
    // <KeyboardAvoidingView
    //   behavior="padding"
    //   keyboardVerticalOffset={50}
    //   style={styles.screen}>



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
          securetextEntry
          required
          minLength={5}
          autoCapitalize="none"
          errorMessage="Please enter a alid password"
          onInputChange={inputChangeHandler}
        />
        <Input
          id="birthdate"
          label="Birth Date"
          keyboardType="default"
          securetextEntry
          required
          minLength={5}
          autoCapitalize="none"
          errorMessage="Please enter a valid Birth Date"
          onInputChange={inputChangeHandler}
        />
        <Input
          id="firstname"
          label="First Name"
          keyboardType="default"
          securetextEntry
          required
          minLength={5}
          autoCapitalize="none"
          errorMessage="Please enter a valid First Name"
          onInputChange={inputChangeHandler}
        />
        <Input
          id="lastname"
          label="Last Name"
          keyboardType="default"
          securetextEntry
          required
          minLength={5}
          autoCapitalize="none"
          errorMessage="Please enter a valid Last Name"
          onInputChange={inputChangeHandler}
        />
        <Input
          id="mobilenumber"
          label="Mobile Number"
          keyboardType="default"
          securetextEntry
          required
          minLength={5}
          autoCapitalize="none"
          errorMessage="Please enter a valid Mobile Number"
          onInputChange={inputChangeHandler}
        />
        <Input
          id="zipcode"
          label="Zip Code"
          keyboardType="default"
          securetextEntry
          required
          minLength={5}
          autoCapitalize="none"
          errorMessage="Please enter a valid Zip Code"
          onInputChange={inputChangeHandler}
        />
        <Input
          id="civilStatus"
          label="Civil Status"
          keyboardType="default"
          securetextEntry
          required
          minLength={5}
          autoCapitalize="none"
          errorMessage="Please enter a valid Civil Status"
          onInputChange={inputChangeHandler}
        />
        <Input
          id="tinno"
          label="Tin No."
          keyboardType="default"
          securetextEntry
          required
          minLength={5}
          autoCapitalize="none"
          errorMessage="Please enter a valid Tin Number"
          onInputChange={inputChangeHandler}
        />
        <Input
          id="placeofbirth"
          label="Place of Birth"
          keyboardType="default"
          securetextEntry
          required
          minLength={5}
          autoCapitalize="none"
          errorMessage="Please enter a valid Place of Birth"
          onInputChange={inputChangeHandler}
        />
        <Input
          id="weight"
          label="Weight"
          keyboardType="default"
          securetextEntry
          required
          minLength={5}
          autoCapitalize="none"
          errorMessage="Please enter a valid Weight"
          onInputChange={inputChangeHandler}
        />
        <Input
          id="height"
          label="Height"
          keyboardType="default"
          securetextEntry
          required
          minLength={5}
          autoCapitalize="none"
          errorMessage="Please enter a valid Height"
          onInputChange={inputChangeHandler}
        />
        <Input
          id="profession"
          label="Profession"
          keyboardType="default"
          securetextEntry
          required
          minLength={5}
          autoCapitalize="none"
          errorMessage="Please enter a valid Profession"
          onInputChange={inputChangeHandler}
        />
        <Input
          id="grossincome"
          label="Gross Income"
          keyboardType="default"
          securetextEntry
          required
          minLength={5}
          autoCapitalize="none"
          errorMessage="Please enter a valid Gross Income"
          onInputChange={inputChangeHandler}
        />

        <DropDown
          label={"Gender"}
          mode={"outlined"}
          value={gender}
          setValue={setGender}
          list={genderList}
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
            <Text style={styles.appButtonText}>Register</Text>
          </TouchableOpacity>
        </View>

      </ScrollView>


    </View>






    // </KeyboardAvoidingView>
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
export default RegisterScreen;