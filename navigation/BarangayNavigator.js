import React from 'react';
import {Platform, Text} from 'react-native';
import {
    createStackNavigator,
    createBottomTabNavigator,
    createAppContainer,
    createDrawerNavigator
} from 'react-navigation';
import {Ionicons} from '@expo/vector-icons';
import {createMaterialBottomTabNavigator} from 'react-navigation-bottom-tabs';
import Colors from '../constants/Colors';




const defaultNavOptions = {
    headerStyle: {
        backgroundColor: Platform.OS === '.android' ? Colors.primaryColor: '' 
    },
    headerTitleStyle: {
            fontFamily: 'open-sans-bold'
    },
    headerBackTitleStyle: {
            fontFamily: 'open-sans'
    },
    headerTintColor: Platform.OS=== 'android' ? 'white' : Colors.primaryColor,
    
};


const LoginNavigator = createStackNavigator (
    {
        Login: LoginScreen
    },
    {
        navigationOptions: {
            drawerIcon: drawerConfig => (
                <Ionicons
                    name={Platform.OS === 'android' ? 'md-cart' : 'ios-cart'}
                    size={23}
                    color={drawerConfig.tintColor}
                />
            )
        },
        defaultNavigationOptions: defaultNavOptions
    }
);

const BarangayNavigator = createDrawerNavigator(
    {
        Login: LoginNavigator
    },
    {
        contentOptions: {
            activeTintColor: Colors.primary
        }
    }
);

export default createAppContainer(BarangayNavigator);