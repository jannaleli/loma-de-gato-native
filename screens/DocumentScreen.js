import React, { useEffect, useRef } from 'react';
import {
    ScrollView,
    View,
    KeyboardAvoidingView,
    StyleSheet,
    Button,
    TouchableOpacity,
    Text
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

            <LinearGradient colors={['#a8baab', '#ebedd0', '#fdfefd']}
                style={styles.gradient}>

                <Card style={styles.homeContainer}>

                    <ScrollView>
                        <View style={styles.buttonContainer}>
                            <TouchableOpacity onPress={
                                () =>
                                    props.navigation.navigate('Apply Clearance')
                            } style={styles.appButtonContainer}>
                                <Text style={styles.appButtonText}>Apply Clearance</Text>
                            </TouchableOpacity>


                        </View>
                        <View style={styles.buttonContainer}>
                            <TouchableOpacity onPress={
                                () =>
                                    props.navigation.navigate('Apply Permit')
                            } style={styles.appButtonContainer}>
                                <Text style={styles.appButtonText}>Apply Permit</Text>
                            </TouchableOpacity>

                        </View>
                        <View style={styles.buttonContainer}>

                            <TouchableOpacity onPress={
                                () =>
                                    props.navigation.navigate('Auth')
                            } style={styles.appButtonContainer}>
                                <Text style={styles.appButtonText}>Check Status</Text>
                            </TouchableOpacity>
                        </View>
                        <View style={styles.buttonContainer}>
                            <TouchableOpacity onPress={
                                () =>
                                    props.navigation.navigate('Complaint', { pickedLocation: { lat: 14.7731, lng: 121.0183 } })
                            } style={styles.appButtonContainer}>
                                <Text style={styles.appButtonText}>Post Complaint temp</Text>
                            </TouchableOpacity>

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
export default DocumentScreen;
