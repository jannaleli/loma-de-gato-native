import React, { useEffect, useRef } from 'react';
import {
    ScrollView,
    View,
    KeyboardAvoidingView,
    StyleSheet,
    Button
} from 'react-native';

import { LinearGradient } from 'expo-linear-gradient';
import Colors from '../constants/Colors';
import Card from '../components/UI/Card';


const DocumentScreen = props => {
    return (
        <KeyboardAvoidingView
            behavior="padding"
            keyboardVerticalOffset={50}
            style={styles.screen}>

            <LinearGradient colors={['#4c669f', '#3b5998', '#192f6a']}
                style={styles.gradient}>

                <Card style={styles.homeContainer}>

                    <ScrollView>
                        <View style={styles.buttonContainer}>

                            <Button title="Apply Clearance"
                                color={Colors.primary}
                                onPress={
                                    () =>
                                        props.navigation.navigate('Apply Clearance')
                                } />
                        </View>
                        <View style={styles.buttonContainer}>
                            <Button title="Apply Permit"
                                color={Colors.primary}
                                onPress={
                                    () =>
                                        props.navigation.navigate('Apply Permit')
                                } />
                        </View>
                        <View style={styles.buttonContainer}>
                            <Button title="Check Status"
                                color={Colors.primary}
                                onPress={
                                    () =>
                                        props.navigation.navigate('Auth')
                                } />
                        </View>
                        <View style={styles.buttonContainer}>
                            <Button title="Post Complaint temp"
                                color={Colors.primary}
                                onPress={
                                    () =>
                                        props.navigation.navigate('Complaint', { pickedLocation: { lat: 14.7731, lng: 121.0183 } })
                                } />
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
export default DocumentScreen;
