import { StatusBar } from 'expo-status-bar';
import React from 'react';
import { StyleSheet, Text, TextInput, Button, View } from 'react-native';

export default function App() {
  return (
    <View style={{padding: 50}}>
      <View style={{flexDirection: 'row', justifyContent:'space-between', alignItems: 'center'}}>
        <TextInput placeholder="Username"
        style={{ width: '80%', borderColor:'black', borderWidth:1, padding:10}} />

       
        <Button title="Login" />
      </View>
      
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
