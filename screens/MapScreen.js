import React, { useState, useEffect, useCallback } from 'react';
import {
    View,
    Text,
    StyleSheet,
    TouchableOpacity,
    Platform
} from 'react-native';
import MapView, { Marker } from 'react-native-maps';
import Colors from '../constants/Colors';
import { Ionicons } from '@expo/vector-icons';
import {
    HeaderButtons,
    HeaderButton,
    Item,
    HiddenItem,
    OverflowMenu,
} from 'react-navigation-header-buttons';
const MapScreen = props => {

    const initialPickedLocation = props.route.params.initialLocation;//props.navigation.getParam('initialLocation');
    //This one should obviously be in Marilao, Bulacan.
    //props.route.params.initialLocation;//
    let markerCoordinates;
    let stringNow = "hello Mam";
    const [selectedLocation, setSelectedLocation] = useState(initialPickedLocation);
    console.log("refrsh");
    console.log(selectedLocation);

    //Where do we get this data tho
    //Research for it or watch udemy video again 
    // This variable is important for later 
    const mapRegion = {
        latitude: initialPickedLocation ? initialPickedLocation.lat : 37.78,
        longitude: initialPickedLocation ? initialPickedLocation.lng : -122.43,
        latitudeDelta: 0.0922,
        longitudeDelta: 0.0421
    };
    //this function we're just getting the events
    const selectLocationHandler = event => {
        console.log("changes in location");
        console.log(event.nativeEvent.coordinate.latitude);
        console.log(event.nativeEvent.coordinate.longitude);
        stringNow = "hello Sir";
        setSelectedLocation({
            lat: event.nativeEvent.coordinate.latitude,
            lng: event.nativeEvent.coordinate.longitude
        });
        console.log("reflected changes in location");
        console.log(selectedLocation);
        props.route.params.onLocationHandler(selectedLocation);
    };
    const ReusableItem = ({ onPress }) => <Item title="Edit" onPress={onPress} />;

    const ReusableHiddenItem = ({ onPress }) => <HiddenItem title="hidden2" onPress={onPress} />;

    const IoniconsHeaderButton = (props) => (
        // the `props` here come from <Item ... />
        // you may access them and pass something else to `HeaderButton` if you like
        <HeaderButton IconComponent={Ionicons} iconSize={23} {...props} />
    );
    React.useLayoutEffect(() => props.navigation.setOptions({
        headerRight: () => (
            <HeaderButtons HeaderButtonComponent={IoniconsHeaderButton}>
                <Item title="search" iconName="ios-checkmark-circle" onPress={savePickedLocationHandler} />

            </HeaderButtons>
        )

    }), []);

    const savePickedLocationHandler = useCallback(() => {

        console.log("now going back 1");
        console.log(selectedLocation);

        if (!selectedLocation) {
            //we could show an alert here 
            return;
        }
        console.log("now going back");

        props.navigation.navigate('Complaint');
    }, [selectedLocation]);

    useEffect(() => {


    }, [savePickedLocationHandler]

    );

    //if Selected Location actually changed, change the marker coordinates. 

    if (selectedLocation) {
        markerCoordinates = {
            latitude: selectedLocation.lat,
            longitude: selectedLocation.lng
        };
    }

    return (

        <MapView
            style={styles.map}
            region={mapRegion}
            onPress={selectLocationHandler}
        >
            {
                markerCoordinates && (
                    <Marker title="Picked Location" coordinate={markerCoordinates} />
                )

            }


        </MapView>
    );
};



const styles = StyleSheet.create({


    map: {
        flex: 1
    },
    headerButton: {
        marginHorizontal: 20
    },
    headerButtonText: {
        fontSize: 16,
        color: Platform.OS === 'android' ? 'white' : Colors.primary
    }
})

export default MapScreen;