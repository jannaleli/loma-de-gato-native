import React, {useState} from 'react';
import { createStore, combineReducers, applyMiddleware } from 'redux';
import { Provider } from 'react-redux';
import {Text, View} from 'react-native';
import * as Font from 'expo-font';
import { AppLoading } from 'expo';
import { enableScreens, useScreens } from 'react-native-screens';
import ReduxThunk from 'redux-thunk';
import Amplify from 'aws-amplify';
import awsExports from './aws-exports';

import authReducer from './store/reducers/auth';
import BarangayNavigationContainer from './navigation/BarangayController'

const rootReducer = combineReducers({

        auth: authReducer
});

const store = createStore(rootReducer, applyMiddleware(ReduxThunk));
Amplify.configure(awsExports);


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
    <Provider store={store}>
      <BarangayNavigationContainer />
    </Provider>
  );
}
