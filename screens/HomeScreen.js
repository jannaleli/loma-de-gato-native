import React from 'react';
import { Button, Platform, Alert } from 'react-native';
import { useSelector, useDispatch } from 'react-redux';
import { HeaderButtons, Item } from 'react-navigation-header-buttons';
import HeaderButton from '../../components/UI/HeaderButton';
import ProductItem from '../../components/shop/ProductItem';
import Colors from '../../constants/Colors';
import * as productActions from '../../store/actions/products';
import Input from '../components/UI/Input';
import Card from '../components/UI/Card';
import Colors from '../constants/Colors';

//We're just going to put three buttons in here for the Home Screen
const HomeScreen = props => {


  const registerHandler = useCallback(
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
    <ScrollView>
      <Card style={styles.homeContainer}>
      <LinearGradient colors={['#4c669f', '#3b5998', '#192f6a']}
            style={styles.gradient}>

                        <Button title="Register"
                        color={Colors.primary}
                        onPress={registerHandler} />     

      </LinearGradient>

      </Card>
        
    </ScrollView>
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

