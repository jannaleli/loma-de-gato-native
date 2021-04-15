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
import RegisterScreen from '../screens/RegisterScreen';
import { createDrawerNavigator } from 'react-navigation-drawer'; 

import { createStackNavigator } from 'react-navigation-stack';
import BarangayClearanceScreen from '../screens/BarangayClearanceScreen';
import BusinessPermitScreen from '../screens/BusinessPermitScreen';
import ComplaintDetailScreen from '../screens/ComplaintDetailScreen';

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

const RegisterNavigator = createDrawerNavigator(
    {
        Home: RegisterScreen
    },
    {
        contentOptions: {
            activeTintColor: Colors.primary
        }
    }
);

const BarangayClearance = createDrawerNavigator(
    {
        Home: BarangayClearanceScreen
    },
    {
        contentOptions: {
            activeTintColor: Colors.primary
        }
    }
);

const BusinessPermit = createDrawerNavigator(
    {
        Home: BusinessPermitScreen
    },
    {
        contentOptions: {
            activeTintColor: Colors.primary
        }
    }
);

const ComplaintDetail = createDrawerNavigator(
    {
        Home: ComplaintDetailScreen
    },
    {
        contentOptions: {
            activeTintColor: Colors.primary
        }
    }
);

const MainNavigator = createSwitchNavigator({
    Auth: LoginNavigator,
    Start: StartNavigator,
    Register: RegisterNavigator,
    Permit: BusinessPermit,
    Clearance: BarangayClearance,
    Complaint: ComplaintDetail

 
  });

export default createAppContainer(MainNavigator);