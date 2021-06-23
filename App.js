import React, { useState } from 'react';
import { createStore, combineReducers, applyMiddleware } from 'redux';
import { Provider } from 'react-redux';
import * as Font from 'expo-font';
import AppLoading from 'expo-app-loading';
import { enableScreens } from 'react-native-screens';
import ReduxThunk from 'redux-thunk';
import Amplify, { API } from 'aws-amplify';
import awsExports from './src/aws-exports';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import eventReducer from './store/reducers/events';
import authReducer from './store/reducers/auth';
import BarangayNavigationContainer from './navigation/BarangayController'
import BarangayClearanceScreen from './screens/BarangayClearanceScreen';
import BusinessPermitScreen from './screens/BusinessPermitScreen';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { DefaultTheme, Provider as PaperProvider } from 'react-native-paper';

import { Ionicons } from '@expo/vector-icons';
import Colors from './constants/Colors';
import LoginScreen from './screens/LoginScreen';
import HomeScreen from './screens/HomeScreen';
import RegisterScreen from './screens/RegisterScreen';
import { createDrawerNavigator } from 'react-navigation-drawer';



import ComplaintDetailScreen from './screens/ComplaintDetailScreen';

const rootReducer = combineReducers({

  auth: authReducer,
  events: eventReducer
});

const store = createStore(rootReducer, applyMiddleware(ReduxThunk));
Amplify.configure({
  // OPTIONAL - if your API requires authentication 
  Auth: {
    // REQUIRED - Amazon Cognito Identity Pool ID
    identityPoolId: 'ap-southeast-1:d31cf569-2c5b-42da-b021-185fe95ecc44',
    // REQUIRED - Amazon Cognito Region
    region: 'ap-southeast-1',
    // OPTIONAL - Amazon Cognito User Pool ID
    userPoolId: 'ap-southeast-1_lvUalkT6e',
    // OPTIONAL - Amazon Cognito Web Client ID (26-char alphanumeric string)
    userPoolWebClientId: '3rb0qsnbdgqr5p5v1vsfvc6md',
  },
  API: {
    endpoints: [
      {
        name: "BarangayAPI",
        endpoint: "https://mjdjlvb5x9.execute-api.ap-southeast-1.amazonaws.com/prod"
      }
    ]
  },
  Storage: {
    AWSS3: {
      bucket: 'barangay-api', //REQUIRED -  Amazon S3 bucket
      region: 'ap-southeast-1', //OPTIONAL -  Amazon service region
    }
  }
});

API.configure({
  // OPTIONAL - if your API requires authentication 
  Auth: {
    // REQUIRED - Amazon Cognito Identity Pool ID
    identityPoolId: 'ap-southeast-1:d31cf569-2c5b-42da-b021-185fe95ecc44',
    // REQUIRED - Amazon Cognito Region
    region: 'ap-southeast-1',
    // OPTIONAL - Amazon Cognito User Pool ID
    userPoolId: 'ap-southeast-1_lvUalkT6e',
    // OPTIONAL - Amazon Cognito Web Client ID (26-char alphanumeric string)
    userPoolWebClientId: '3rb0qsnbdgqr5p5v1vsfvc6md',
  },
  API: {
    endpoints: [
      {
        name: "BarangayAPI",
        endpoint: "https://mjdjlvb5x9.execute-api.ap-southeast-1.amazonaws.com/prod"
      }
    ]
  },
  Storage: {
    AWSS3: {
      bucket: 'barangay-api', //REQUIRED -  Amazon S3 bucket
      region: 'ap-southeast-1', //OPTIONAL -  Amazon service region
    }
  }
})


//enableScreens();

const fetchFonts = () => {
  return Font.loadAsync({
    'open-sans': require('./assets/fonts/OpenSans-Regular.ttf'),
    'open-sans-bold': require('./assets/fonts/OpenSans-Bold.ttf')
  });
};

export default function App() {
  const [fontLoaded, setFontLoaded] = useState(false);
  const theme = {
    ...DefaultTheme,
    colors: {
      ...DefaultTheme.colors,
      primary: Colors.primary,
      accent: Colors.accent,
    },
  };
  if (!fontLoaded) {
    return (
      <AppLoading
        startAsync={fetchFonts}
        onFinish={() => setFontLoaded(true)}
        onError={(err) => console.log(err)}
      />
    );
  }


  return (

    <Provider store={store}>
      <PaperProvider theme={theme}>
        <BarangayNavigationContainer />

      </PaperProvider>
    </Provider >

  );
}
