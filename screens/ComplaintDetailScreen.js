import React, { useState, useEffect, useReducer, useCallback } from 'react';
import {
  ScrollView,
  View,
  KeyboardAvoidingView,
  StyleSheet,
  Image,
  ActivityIndicator,
  Alert,
  Text,
  TouchableOpacity

} from 'react-native';

import { Button } from 'react-native-paper';
import { LinearGradient } from 'expo-linear-gradient';
import { useDispatch } from 'react-redux';
import * as ImagePicker from 'expo-image-picker';
import * as Permissions from 'expo-permissions';

import Input from '../components/UI/Input';
import Card from '../components/UI/Card';
import Colors from '../constants/Colors';
import MapPreview from '../components/MapPreview';


const FORM_INPUT_UPDATE = 'FORM_INPUT_UPDATE';
const formReducer = (state, action) => {
  if (action.type === FORM_INPUT_UPDATE) {
    const updatedValues = {
      ...state.inputValues,
      [action.input]: action.value
    };
    const updatedValidities = {
      ...state.inputValidities,
      [action.input]: action.isValid
    };
    let updatedFormIsValid = true;
    for (const key in updatedValidities) {
      updatedFormIsValid = updatedFormIsValid && updatedValidities[key];
    }
    return {
      formIsValid: updatedFormIsValid,
      inputValidities: updatedValidities,
      inputValues: updatedValues
    };
  }
  return state;
};



const ComplaintDetailScreen = props => {
  const pickedLocation = props.route.params.pickedLocation ? props.route.params.pickedLocation : { lat: 14.7731, lng: 121.0183 };



  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState();
  const [isSignup, setIsSignup] = useState(false);
  const dispatch = useDispatch();
  const [selectedLocation, setSelectedLocation] = useState(pickedLocation);
  const [pickedImage, setPickedImage] = useState();
  const [latitude, setLatitude] = useState(pickedLocation.lat);
  const [longitude, setLongitude] = useState(pickedLocation.lng);

  const locationPickedHandler = useCallback(location => {
    console.log("we've gone back");
    console.log(location.lat);
    console.log(location.lng);
    setSelectedLocation(location);
  }, []);
  const verifyPermissions = async () => {
    const result = await Permissions.askAsync(
      Permissions.CAMERA_ROLL,
      Permissions.CAMERA
    );

    if (result.status !== 'granted') {
      Alert.alert(
        'Insufficient permissions!',
        'You need to grant caemra permissions to use this app',
        [{ text: 'Okay' }]
      );
      return false;
    }
    return true;
  };

  const takeImageHandler = async () => {
    const hasPermission = await verifyPermissions();
    if (!hasPermission) {
      return;
    }



    const image = await ImagePicker.launchCameraAsync({
      allowsEditing: true,
      aspect: [16, 9],
      quality: 0.5
    });
    setPickedImage(image.uri);
    //props.onImageTaken(image.uri);
  }

  const authHandler = async () => {
    let action;
    if (isSignup) {
      action = authActions.signup(
        formState.inputValues.email,
        formState.inputValues.password
      );
    } else {
      action = authActions.login(
        formState.inputValues.email,
        formState.inputValues.password
      );
    }
    setError(null);
    setIsLoading(true);
    try {
      await dispatch(action);
      props.navigation.navigate('Shop');
    } catch (err) {
      setError(err.message);
      setIsLoading(false);
    }
  };


  const [formState, dispatchFormState] = useReducer(formReducer, {
    inputValues: {
      email: '',
      password: ''
    },
    inputValidities: {
      email: false,
      password: false
    },
    formIsValid: false
  });

  useEffect(() => {

    if (selectedLocation) {

      setLatitude(selectedLocation.lat)
      setLongitude(selectedLocation.lng)



    }
    if (error) {
      Alert.alert('An Error Occurred!', error, [{ text: 'Okay' }]);
    }
  }, [error, selectedLocation]);




  const inputChangeHandler = useCallback(
    (inputIdentifier, inputValue, inputValidity) => {
      dispatchFormState(
        {
          type: FORM_INPUT_UPDATE,
          value: inputValue,
          isValid: inputValidity,
          input: inputIdentifier
        }
      );
    }, [dispatchFormState]
  );

  return (



    <View style={styles.authContainer}>
      <ScrollView>

        <View style={styles.imagePicker}>
          <View style={styles.imagePreview}>
            {!pickedImage ? (
              <Button icon="camera" onPress={takeImageHandler}>
                Press to choose image
             </Button>
            ) : (
                <Image style={styles.image} source={{ uri: pickedImage }} />
              )}
          </View>
          {/* <View style={styles.buttonContainer}>
              <TouchableOpacity onPress={takeImageHandler} style={styles.appButtonContainer}>
                <Text style={styles.appButtonText}>Take Image</Text>
              </TouchableOpacity>
            </View> */}
        </View>
        <Input
          id="complaint_desc"
          label="Complaint Description"
          initialValue="hello"
          keyboardType="default"
          required
          email
          autoCapitalize="none"
          errorMessage="Please enter a valid value."
          onInputChange={inputChangeHandler}


        />

        <View style={styles.locationBox}>
          <View style={styles.subIconBox}>
            <Button icon="map-marker" ></Button>
          </View>
          <View style={styles.subTextBox}>
            <Text>{latitude ? '' + latitude : "Get Location first"}</Text>
            <Text>{longitude ? '' + longitude : "Get Location first"}</Text>
          </View>
        </View>
        {/* <MapPreview
            style={styles.mapPreview}
            location={pickedLocation}
            onPress={
              () =>
                props.navigation.navigate('Map', { initialLocation: pickedLocation, onLocationHandler: locationPickedHandler })

              //   props.navigation.navigate('Location', { onLocationPicked: locationPickedHandler, pickedLocation: pickedLocation })
            }
          /> */}
        <View style={styles.buttonContainer}>
          <TouchableOpacity onPress={
            () =>
              props.navigation.navigate('Map', { initialLocation: pickedLocation, onLocationHandler: locationPickedHandler })

            //   props.navigation.navigate('Location', { onLocationPicked: locationPickedHandler, pickedLocation: pickedLocation })
          } style={styles.appButtonContainer}>
            <Text style={styles.appButtonText}>Get Longitude/Latitude</Text>
          </TouchableOpacity>

        </View>
        <Input
          id="type"
          label="Complaint Type"
          keyboardType="default"
          required
          email
          autoCapitalize="none"
          errorMessage="Please enter a valid value."
          onInputChange={inputChangeHandler}
          initialValue=""

        />

        <View style={styles.buttonContainer}>

          <TouchableOpacity onPress={authHandler} style={styles.appButtonContainer}>
            <Text style={styles.appButtonText}>Submit</Text>
          </TouchableOpacity>
        </View>



      </ScrollView>

    </View>






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
  authContainer: {
    width: '100%',
    padding: 20
  },
  buttonContainer: {
    marginTop: 10
  },
  imagePicker: {

    marginBottom: 15
  },
  imagePreview: {
    width: '100%',
    height: 200,
    marginBottom: 10,
    justifyContent: 'center',
    alignItems: 'center',
    borderColor: '#ccc',
    borderWidth: 1
  },
  image: {
    width: '100%',
    height: '100%'
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
  },
  mapPreview: {
    width: '100%',
    maxWidth: 350,
    height: 300,
    borderBottomLeftRadius: 10,
    borderBottomRightRadius: 10
  },
  locationBox: {
    flex: 1,
    padding: 24,
    flexDirection: 'row'
  },
  subIconBox: {
    flex: 1,

  },
  subTextBox: {
    flex: 1
  },
  buttonIcon: {

    width: 200,
    height: 200
  }
});
export default ComplaintDetailScreen;