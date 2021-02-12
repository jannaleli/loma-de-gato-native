import React from 'react';
import {
    ScrollView,
    View,
    KeyboardAvoidingView,
    StyleSheet,
    Button
} from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';

import Input from '../../components/UI/Input';
import Card from '../../components/UI/Card';
import Colors from '../../constants/Colors';


const LoginScreen = props => {
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
                    id="email"
                    label="E-mail"
                    keyboardType="email-address"
                    required
                    email
                    autoCapitalize="none"
                    errorMessage="Please enter a valid email address."
                    onInputChange={() => {}}
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
                    onInputChange={() => }
                    />

                    <View style={styles.buttonContainer}>

                        <Button title="Login"
                        color={Colors.primary}
                        onPress={() => {}} />
                    </View>
                    <View style={styles.buttonContainer}>
                        <Button 
                            title="Switch to Sign Up"
                            color={Colors.accent}
                            onPress={()=>{}}
                        
                        />
                    </View>
                    </ScrollView>

                </Card>


            </LinearGradient>


        </KeyboardAvoidingView>
    );
};