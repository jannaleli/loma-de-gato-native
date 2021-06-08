import React, { useState } from 'react';
import { createStore, combineReducers, applyMiddleware } from 'redux';
import { Provider } from 'react-redux';
import * as Font from 'expo-font';
import AppLoading from 'expo-app-loading';
import { enableScreens } from 'react-native-screens';
import ReduxThunk from 'redux-thunk';
import Amplify from 'aws-amplify';
import awsExports from './src/aws-exports';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import authReducer from './store/reducers/auth';
import BarangayNavigationContainer from './navigation/BarangayController'
import BarangayClearanceScreen from './screens/BarangayClearanceScreen';
import BusinessPermitScreen from './screens/BusinessPermitScreen';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';

import { ThemeProvider } from '@material-ui/core/styles';
import { Ionicons } from '@expo/vector-icons';
import Colors from './constants/Colors';
import LoginScreen from './screens/LoginScreen';
import HomeScreen from './screens/HomeScreen';
import RegisterScreen from './screens/RegisterScreen';
import { createDrawerNavigator } from 'react-navigation-drawer';




import ComplaintDetailScreen from './screens/ComplaintDetailScreen';

const rootReducer = combineReducers({

  auth: authReducer
});

const store = createStore(rootReducer, applyMiddleware(ReduxThunk));
Amplify.configure(awsExports);

const theme = createMuiTheme({
  palette: {
    primary: {
      main: '#a8baab',
    },
    secondary: {
      main: '#153b35',
    },
  },
});
//enableScreens();

const fetchFonts = () => {
  return Font.loadAsync({
    'open-sans': require('./assets/fonts/OpenSans-Regular.ttf'),
    'open-sans-bold': require('./assets/fonts/OpenSans-Bold.ttf')
  });
};

export default function App() {
  const [fontLoaded, setFontLoaded] = useState(false);

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
      <ThemeProvider theme={theme}>
        <BarangayNavigationContainer />
      </ThemeProvider>

    </Provider>
  );
}
