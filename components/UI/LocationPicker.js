import React, { useState, useEffect } from 'react';
import {
    View,
    Button,
    Text,
    ActivityIndicator,
    Alert,
    StyleSheet
} from 'react-native';
import * as Location from 'expo-location';
import * as Permission from 'expo-permissions';

import Colors from '../../constants/Colors';


const LocationPicker = props => {

    const [pickedLocation, setPickedLocation] = useState();



    const mapPickedLocation = props.route.params.pickedLocation;//('pickedLocation');

    const { onLocationPicked } = props.route.params;

    useEffect(() => {
        console.log(mapPickedLocation)
        console.log(onLocationPicked);
        if (mapPickedLocation) {
            setPickedLocation(mapPickedLocation);
            onLocationPicked(mapPickedLocation);

        }
    }, [mapPickedLocation, onLocationPicked]

    );




    const pickOnMapHandler = () => {
        props.navigation.navigate('Map', { initialLocation: { mapPickedLocation } });
    }

    return (
        <View style={StyleSheet.LocationPicker} >

            <View style={styles.actions}>
                <Button
                    title="Pick on Map"
                    color={Colors.primary}
                    onPress={pickOnMapHandler}

                />

            </View>
        </View>
    );
};

const styles = StyleSheet.create({
    locationPicker: {
        marginBottom: 15
    },
    actions: {
        flexDirection: 'row',
        justifyContent: 'space-around',
        width: '100%'
    }
});

export default LocationPicker;

