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
  //import * as permitActions from '../store/actions/permit';
  import Input from '../components/UI/Input';
  import Card from '../components/UI/Card';
  import Colors from '../constants/Colors';
  import Permit from '../models/Permit';
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



  const BusinessPermitScreen = props => {
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState();
    const [isSignup, setIsSignup] = useState(false);
    const dispatch = useDispatch();
  
    const authHandler = async () => {
      let user_id = Random.getRandomBytes(16)
      let username = "randomUser" /*NOTE: Change this later*/
      let ctc_no = Random.getRandomBytes(16)
      let status = "NEW"
      let approval_date = "Pending"

      console.log(formState.inputValues.sec_number)
      console.log(formState.inputValues.business_name)
      console.log(formState.inputValues.business_activity)
      console.log(formState.inputValues.no_of_units)
      console.log(formState.inputValues.street)
      console.log(formState.inputValues.building_number)
      console.log(formState.inputValues.capitalization)
      console.log(formState.inputValues.gross_sale)
      console.log(formState.inputValues.lessor_name)
      console.log(formState.inputValues.lessor_email)
      console.log(formState.inputValues.lessor_building_number)
      console.log(formState.inputValues.lessor_city)
      console.log(formState.inputValues.lessor_subdivision)
      console.log(formState.inputValues.lessor_street)
      console.log(formState.inputValues.lessor_barangay)
      console.log(formState.inputValues.lessor_province)
      console.log(formState.inputValues.monthly_rental)

      let permit = new Permit( 
        username, 
        user_id, 
        approval_date, 
        formState.inputValues.business_activity, 
        formState.inputValues.business_building_no, 
        formState.inputValues.business_name, 
        formState.inputValues.business_street, 
        formState.inputValues.capitalization,
        ctc_no, 
        formState.inputValues.gross_sale,
        formState.inputValues.lessor_barangay, 
        formState.inputValues.lessor_bldg_no,
        formState.inputValues.lessor_city,
        formState.inputValues.lessor_emailaddr,
        formState.inputValues.lessor_name,
        formState.inputValues.lessor_province,
        formState.inputValues.lessor_street,
        formState.inputValues.lessor_subdv, 
        formState.inputValues.monthly_rental,
        formState.inputValues.sec_no,
        status)

      let action = permitActions.callPostPermit(
        permit
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
        sec_number: '',
        business_name: '',
        business_activity: '',
        no_of_units: '',
        street: '',
        building_number:'',
        capitalization: '',
        gross_sale: '',
        lessor_name: '',
        lessor_email: '',
        lessor_building_number: '',
        lessor_city: '',
        lessor_subdivision: '',
        lessor_street: '',
        lessor_barangay: '',
        lessor_province: '',
        monthly_rental: ''
      },
      inputValidities: {
        sec_number: false,
        business_name: false,
        business_activity: false,
        no_of_units: false,
        street: false,
        building_number:false,
        capitalization: false,
        gross_sale: false,
        lessor_name: false,
        lessor_email: false,
        lessor_building_number: false,
        lessor_city: false,
        lessor_subdivision: false,
        lessor_street: false,
        lessor_barangay: false,
        lessor_province: false,
        monthly_rental: false
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
                        id="sec_no"
                        label="SEC No."
                        keyboardType="default"
                        required
                        email
                        autoCapitalize="none"
                        errorMessage="Please enter a valid value."
                        onInputChange={inputChangeHandler}
                        initialValue=""
                        
                        />

                        <Input
                        id="business_building_no"
                        label="Business Building Np."
                        keyboardType="default"
                        required
                        minLength={5}
                        autoCapitalize="none"
                        errorMessage="Please enter a valid value."
                        onInputChange={inputChangeHandler}
                        />
                        <Input 
                        id="business_street"
                        label="Business Street"
                        keyboardType="default"
                        required
                        email
                        autoCapitalize="none"
                        errorMessage="Please enter a valid value."
                        onInputChange={inputChangeHandler}
                        initialValue=""
                        
                        />


                        <Input 
                        id="business_name"
                        label="Business Name"
                        keyboardType="default"
                        required
                        email
                        autoCapitalize="none"
                        errorMessage="Please enter a valid value."
                        onInputChange={inputChangeHandler}
                        initialValue=""
                        
                        />
                        <Input 
                        id="capitalization"
                        label="Capitalization"
                        keyboardType="default"
                        required
                        autoCapitalize="none"
                        errorMessage="Please enter a valid value."
                        onInputChange={inputChangeHandler}
                        initialValue=""
                        
                        />
                        <Input 
                        id="ctc_no"
                        label="CTC No."
                        keyboardType="default"
                        required
                        autoCapitalize="none"
                        errorMessage="Please enter a valid value."
                        onInputChange={inputChangeHandler}
                        initialValue=""
                        
                        />
                        <Input 
                        id="lessor_barangay"
                        label="Lessor Barangay"
                        keyboardType="default"
                        required
                        autoCapitalize="none"
                        errorMessage="Please enter a valid value."
                        onInputChange={inputChangeHandler}
                        initialValue=""
                        
                        />
                        <Input 
                        id="lessor_bldg_no"
                        label="Lessor Building Number"
                        keyboardType="default"
                        required
                        autoCapitalize="none"
                        errorMessage="Please enter a valid value."
                        onInputChange={inputChangeHandler}
                        initialValue=""
                        
                        />
                        <Input 
                        id="lessor_emailaddr"
                        label="Lessor Email-Address"
                        keyboardType="default"
                        required
                        autoCapitalize="none"
                        errorMessage="Please enter a valid value."
                        onInputChange={inputChangeHandler}
                        initialValue=""
                        
                        />
                        <Input 
                        id="lessor_name"
                        label="Lessor Name"
                        keyboardType="default"
                        required
                        autoCapitalize="none"
                        errorMessage="Please enter a valid value."
                        onInputChange={inputChangeHandler}
                        initialValue=""
                        
                        />
                        <Input 
                        id="lessor_province"
                        label="Lessor Province"
                        keyboardType="default"
                        required
                        autoCapitalize="none"
                        errorMessage="Please enter a valid value."
                        onInputChange={inputChangeHandler}
                        initialValue=""
                        
                        />
                        <Input 
                        id="lessor_street"
                        label="Lessor Street"
                        keyboardType="default"
                        required
                        autoCapitalize="none"
                        errorMessage="Please enter a valid value.."
                        onInputChange={inputChangeHandler}
                        initialValue=""
                        
                        />
                        <Input 
                        id="lessor_subdv"
                        label="Lessor Subdivision"
                        keyboardType="default"
                        required
                        autoCapitalize="none"
                        errorMessage="Please enter a valid value.."
                        onInputChange={inputChangeHandler}
                        initialValue=""
                        
                        />
                        <Input 
                        id="monthly_rental"
                        label="Monthly Rental"
                        keyboardType="default"
                        required
                        autoCapitalize="none"
                        errorMessage="Please enter a valid value."
                        onInputChange={inputChangeHandler}
                        initialValue=""
                        
                        />
                        <Input 
                        id="no_units"
                        label="No. of Uinits"
                        keyboardType="default"
                        required
                        autoCapitalize="none"
                        errorMessage="Please enter a valid value.."
                        onInputChange={inputChangeHandler}
                        initialValue=""
                        
                        />
                        <Input 
                        id="status"
                        label="Status"
                        keyboardType="default"
                        required
                        autoCapitalize="none"
                        errorMessage="Please enter a valid value."
                        onInputChange={inputChangeHandler}
                        initialValue=""
                        
                        />
                        <Input 
                        id="gross_sale"
                        label="Gross Sale"
                        keyboardType="default"
                        required
                        autoCapitalize="none"
                        errorMessage="Please enter a valid value."
                        onInputChange={inputChangeHandler}
                        initialValue=""
                        
                        />
                        <Input 
                        id="email"
                        label="E-mail"
                        keyboardType="default"
                        required
                        autoCapitalize="none"
                        errorMessage="Please enter a valid value.."
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