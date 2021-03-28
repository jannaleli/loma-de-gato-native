import React, { useEffect, useRef } from 'react';
import {
  ScrollView,
  View,
  KeyboardAvoidingView,
  StyleSheet,
  Button,
  ActivityIndicator,
  Alert,
  Image
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
   <LinearGradient colors={['#4c669f', '#3b5998', '#192f6a']}
            style={styles.gradient}> 
    <Card style={styles.homeContainer} >
      
             <ScrollView  >
 
                          <Image source={require('../assets/barangay.jpg')}
                          style={{width: 200, height: 200}} />
                          <View style={styles.buttonContainer}>
                        <Button title="Register"
                        color={Colors.primary}
                        onPress={() => 
                         props.navigation.navigate('Register')
                        
                       
                        } />   
                        </View>
                        <View style={styles.buttonContainer}>
                        <Button title="Login"
                        color={Colors.primary}
                        onPress={ () => 
                          props.navigation.navigate('Auth')
                        
                        } />  
                        </View>
                        <View style={styles.buttonContainer}>
                        <Button title="Tutorial"
                        color={Colors.primary}
                        
                        /*onPress={}*/ />  
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
  homeContainer: {
    width: '80%',
    maxWidth: 400,
    maxHeight: 400,
    padding: 20
  },
  buttonContainer: {
    marginTop: 10
  }
});
export default HomeScreen;

