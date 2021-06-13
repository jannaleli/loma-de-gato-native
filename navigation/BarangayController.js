import React, { useEffect, useRef } from 'react';
import { useSelector } from 'react-redux';
import { NavigationActions } from 'react-navigation';

import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';

import { createStackNavigator } from '@react-navigation/stack';
import { NavigationContainer } from '@react-navigation/native';
import { Ionicons } from '@expo/vector-icons';
import Colors from '../constants/Colors';
import LoginScreen from '../screens/LoginScreen';
import HomeScreen from '../screens/HomeScreen';
import RegisterScreen from '../screens/RegisterScreen';
import DocumentScreen from '../screens/DocumentScreen';
import { createDrawerNavigator } from 'react-navigation-drawer';


import BarangayClearanceScreen from '../screens/BarangayClearanceScreen';
import BusinessPermitScreen from '../screens/BusinessPermitScreen';
import MapScreen from '../screens/MapScreen';
import ComplaintDetailScreen from '../screens/ComplaintDetailScreen';
import LocationPicker from '../components/UI/LocationPicker';


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
const AuthStack = createStackNavigator();

function MyAuthStack() {
    return (
        <AuthStack.Navigator
            screenOptions={{
                headerStyle: {
                    backgroundColor: Colors.primary,
                },
                headerTintColor: '#fff',
                headerTitleStyle: {
                    fontWeight: 'bold',
                },
            }}>

            <AuthStack.Screen
                name="Home"
                component={HomeScreen}
                options={{
                    headerShown: false
                }}
            />
            <AuthStack.Screen
                name="Login"
                component={LoginScreen}
                options={{
                    title: 'Login'
                }} />
            <AuthStack.Screen
                name="Register"
                component={RegisterScreen}
                options={{
                    title: 'Register'
                }} />
        </AuthStack.Navigator>
    );
}

const DocumentStack = createStackNavigator();

function MyDocumentStack() {
    return (
        <DocumentStack.Navigator
            screenOptions={{
                headerStyle: {
                    backgroundColor: Colors.primary,
                },
                headerTintColor: '#fff',
                headerTitleStyle: {
                    fontWeight: 'bold',
                },
            }}>
            <DocumentStack.Screen
                name="Documents"
                component={DocumentScreen}

                options={{
                    headerShown: false
                }}
            />
            <DocumentStack.Screen name="Apply Clearance"
                component={BarangayClearanceScreen}
                options={{
                    title: 'Clearance'
                }}
            />
            <DocumentStack.Screen name="Apply Permit"
                component={BusinessPermitScreen}
                options={{
                    title: 'Permit'
                }} />
            <DocumentStack.Screen name="Check Status"
                component={RegisterScreen} />
            <DocumentStack.Screen name="Complaint"
                component={ComplaintDetailScreen}
                options={{
                    title: 'Post Complaint'
                }} />
            <DocumentStack.Screen name="Location"
                component={LocationPicker}
                options={{
                    title: 'Location Picker'
                }} />
            <DocumentStack.Screen name="Map"
                component={MapScreen}
                options={{
                    title: 'Map Screen'
                }} />
        </DocumentStack.Navigator>
    );
}

const Tab = createBottomTabNavigator();

function MyTabs() {
    return (
        <Tab.Navigator>
            <Tab.Screen name="Event" component={MyAuthStack} />
            <Tab.Screen name="Documents" component={MyDocumentStack} />
        </Tab.Navigator>
    );
}

const BarangayNavigationContainer = props => {
    //const navRef = useRef();
    const isAuth = true;//useSelector(state => !!state.auth.token)
    //    const isAuth = useSelector(state => !!state.auth.access_token);
    // useEffect( () => {

    //     if(!isAuth) {
    //         console.log('enters here');
    //         navRef.current.dispatch(
    //             NavigationActions.navigate({ routeName: 'Home' })
    //         );
    //         console.log(navRef.current)
    //     }

    // }, [isAuth]);




    return (

        <NavigationContainer>
            {isAuth && <MyTabs />}
            {!isAuth && <MyAuthStack />}
        </NavigationContainer>

    );
}

export default BarangayNavigationContainer;