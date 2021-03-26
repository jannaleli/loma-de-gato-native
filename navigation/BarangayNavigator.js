import React from 'react';
import {Platform, Text} from 'react-native';
import {
  
    createBottomTabNavigator,
    createAppContainer,
    createSwitchNavigator
} from 'react-navigation';
import {Ionicons} from '@expo/vector-icons';
import {createMaterialBottomTabNavigator} from 'react-navigation-bottom-tabs';
import Colors from '../constants/Colors';
import LoginScreen from '../screens/LoginScreen';
import HomeScreen from '../screens/HomeScreen';
import { createDrawerNavigator } from 'react-navigation-drawer'; 

import { createStackNavigator } from 'react-navigation-stack';

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




// const LoginNavigator = createStackNavigator (
//     {
//         Login: LoginScreen
//     },
//     {
//         navigationOptions: {
//             drawerIcon: drawerConfig => (
//                 <Ionicons
//                     name={Platform.OS === 'android' ? 'md-cart' : 'ios-cart'}
//                     size={23}
//                     color={drawerConfig.tintColor}
//                 />
//             )
//         },
//         defaultNavigationOptions: defaultNavOptions
//     }
// );

const LoginNavigator = createDrawerNavigator(
    {
        Login: LoginScreen
    },
    {
        contentOptions: {
            activeTintColor: Colors.primary
        }
    }
);

const StartNavigator = createDrawerNavigator(
    {
        Home: HomeScreen
    },
    {
        contentOptions: {
            activeTintColor: Colors.primary
        }
    }
);

const MainNavigator = createSwitchNavigator({
    Auth: LoginNavigator,
    Start: StartNavigator
 
  });

export default createAppContainer(MainNavigator);