import React, { useState, useEffect, useCallback } from 'react';
import {
    View, 
    ScrollView,
    Text,
    KeyboardAvoidingView,
    TextInput,
    StyleSheet,
    Button,
    Platform
} from 'react-native';
import { HeaderButtons, Items } from 'react-navigation-header-buttons';
//import actions here but we have no actions yet for login. 
//Set this up later


const LoginScreen = props => {
    const dispatch = useDispatch();

    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');

    return (
        <ScrollView>
            <View style={styles.form}>
                <Text style={styles.label}>Username</Text>
                <TextInput
                    style={styles.input}
                    value={title}
                    onChangeText={text => setUsername(text)} />

            </View>
            <View style={styles.formControl}>
                <Text style={styles.label}>Password</Text>
                <TextInput style={styles.input}
                value={description}
                onChangeText={text => setPassword(text)} / >

          

            </View>
        </ScrollView>
    );
};

LoginScreen.navigationOptiopns = navData => {
    const submitFn = navData.navigation.getParam('submit');
    return {
        headerTitle: 'Login'
    
    };
};

const styles = StyleSheet.create({
    form: {
        margin: 20
    },
    formControl: {
        width: '100%'
    },
    label: {
        fontFamily: 'open-sans-bold',
        marginVertical: 8
    },
    input: {
        paddingHorizontal: 2,
        paddingVertical: 5,
        borderBottomColor: '#ccc',
        borderBottomWidth: 1
    }
});

export default LoginScreen;
