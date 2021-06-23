import React, { useEffect, useRef } from 'react';
import {
  ScrollView,
  View,
  KeyboardAvoidingView,
  StyleSheet,
  Button,
  ActivityIndicator,
  Alert,
  Image,
  TouchableOpacity,
  Text
} from 'react-native';

import { LinearGradient } from 'expo-linear-gradient';
import { useSelector, useDispatch } from 'react-redux';

//import { HeaderButtons, Item } from 'react-navigation-header-buttons';
//import HeaderButton from '../../components/UI/HeaderButton';
//import ProductItem from '../../components/shop/ProductItem';
import Colors from '../constants/Colors';
//import * as productActions from '../../store/actions/products';
import Input from '../components/UI/Input';
import Card from '../components/UI/Card';


//We're just going to put three buttons in here for the Home Screen
const HomeScreen = props => {


  //   const registerHandler = useCallback(
  //     (inputIdentifier, inputValue, inputValidity) => {
  //         dispatchFormState(
  //             {
  //                 type: FORM_INPUT_UPDATE,
  //                 value: inputValue,
  //                 isValid: inputValidity,
  //                 input: inputIdentifier
  //             }
  //         );
  //     }, [dispatchFormState]
  // );



  return (
    <KeyboardAvoidingView
      behavior="padding"
      keyboardVerticalOffset={50}
      style={styles.screen}>
      <LinearGradient colors={['#a8baab', '#ebedd0', '#fdfefd']}
        style={styles.gradient}>
        <View style={styles.homeContainer} >

          <ScrollView  >

            <Image source={require('../assets/barangay.png')}
              style={{ width: 200, height: 200, alignSelf: 'center' }} />
            <View style={styles.buttonContainer}>


              <TouchableOpacity onPress={() =>
                props.navigation.navigate('Register')


              } style={styles.appButtonContainer}>
                <Text style={styles.appButtonText}>Register</Text>
              </TouchableOpacity>

            </View>
            <View style={styles.buttonContainer}>


              <TouchableOpacity onPress={() =>
                props.navigation.navigate('Login')

              } style={styles.appButtonContainer}>
                <Text style={styles.appButtonText}>Login</Text>
              </TouchableOpacity>
            </View>
            <View style={styles.buttonContainer}>

              <TouchableOpacity onPress={() =>
                props.navigation.navigate('Clearance')
              } style={styles.appButtonContainer}>
                <Text style={styles.appButtonText}>Tutorial</Text>
              </TouchableOpacity>
            </View>
          </ScrollView>


        </View>
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
  homeContainer: {
    width: '80%',
    maxWidth: 400,
    maxHeight: 400,
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
  }
});
export default HomeScreen;

