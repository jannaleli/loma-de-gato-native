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

const MapScreen = props => {
    const initialLocation = props.navigation.getParam('initialLocation');
    //This one should obviously be in Marilao, Bulacan.

    const [ selectedLocation, setSelectedLocation ] = useState(initialLocation);

    //Where do we get this data tho
    //Research for it or watch udemy video again 
    // This variable is important for later 
    const mapRegion = {
        latitude: initialLocation ? initialLocation.lat : 37.78,
        longitude: initialLocation ? initialLocation.lng : -122.43,
        latitudeDelta: 0.0922,
        longitudeDelta: 0.0421
    };
    //this function we're just getting the events
    const selectLocationHandler = event => {
        setSelectedLocation({
            lat:event.nativeEvent.coordinate.latitude,
            lng: event.nativeEvent.coordinate.longitude
        });
    };

    const savePickedLocationHandler = useCallback( () => 
      {
        if( !selectedLocation ) {
            //we could show an alert here 
            return;
        }
        //go back to another screen?
        //props.navigation.navigate('NewPlace', {pickedLocation: selectedLocation})
      }, [selectedLocation]  
    );

    useEffect(() => {
        props.navigation.setParams({ saveLocation: savePickedLocationHandler });
    }, [savePickedLocationHandker]

    );
    //if Selected Location actually changed, change the marker coordinates. 
    if(selectedLocation) {
        markerCoordinates = {
            latitude: selectedLocation.lat,
            longitude: selectedLocation.lng
        };
    }

    return (
        <MapView
            style={styles.map}
            region={mapRegion}
            onPress={selectedLocationHandler}
        >
            { 
            markerCoordinates && (
                <Marker title="Picked Location" coordinate={markerCoordinates} />
            )

            }


        </MapView>
    );
};

MapScreen.navigationOptions = navData => {
    const saveFn = navData.navigation.getParam('saveLocation');
    return {
        headerRight: (
            <TouchableOpacity style={styles.headerButton} onPress={saveFn}>
              <Text style={styles.headerButtonText}>Save</Text>
            </TouchableOpacity>
          )
    }
}

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