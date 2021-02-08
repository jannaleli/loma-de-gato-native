import React, {useState} from 'react';
import {Text, View} from 'react-native';
import * as Font from 'expo-font';
import { AppLoading } from 'expo';
import { enableScreens, useScreens } from 'react-native-screens';


enableScreens();

const fetchFonts = () => {
  return Font.loadAsync({
    'open-sans': require('./assets/fonts/OpenSans-Regular.ttf'),
    'open-sans-bold': require('./assets/fonts/OpenSan-Bold.ttf')
  });
};

export default function App() {
  const [fontLoaded, setFontLoaded] = useState(false);

  if(!fontLoaded){
    return (
      <AppLoading
      startAsync={fetchFonts}
      onFinish={() => setFontLoaded(true)}
      />
    );
  }
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
