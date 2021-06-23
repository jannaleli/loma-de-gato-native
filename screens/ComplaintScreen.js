import React, { useState, useEffect, useCallback, Fragment } from 'react';
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
import { set } from 'react-native-reanimated';
const ComplaintScreen = props => {



  // const markerLocation = props.route.params.markerLocations;
  //This should be an array from what we know. 
  //This one should obviously be in Marilao, Bulacan.
  //props.route.params.initialLocation;//

  let initialPickedLocation = props.route.params.initialPickedLocation ? props.route.params.initialPickedLocation : { lat: 14.7731, lng: 121.0183 };

  console.log(props.route.params.initialPickedLocation);


  const [selectedLocation, setSelectedLocation] = useState(initialPickedLocation);
  const [markerCoordinates, setMarkerCoordinates] = useState([])
  console.log(selectedLocation);
  console.log(markerCoordinates);
  // //Where do we get this data tho
  // //Research for it or watch udemy video again 
  // // This variable is important for later 
  const mapRegion = {
    latitude: initialPickedLocation ? initialPickedLocation.lat : 14.7755362672862,
    longitude: initialPickedLocation ? initialPickedLocation.lng : 121.01306913921539,
    latitudeDelta: 0.0922,
    longitudeDelta: 0.0421
  };
  console.log(mapRegion);
  // //this function we're just getting the events
  const selectLocationHandler = event => {

    setSelectedLocation({
      lat: event.nativeEvent.coordinate.latitude,
      lng: event.nativeEvent.coordinate.longitude
    });

  };
  let markerTemp = [];
  const markerLocation = [
    { lat: 14.7755362672862, lng: 121.01306913921539 },
    { lat: 14.775712531934921, lng: 121.01747405684247 },
    { lat: 14.775411684269452, lng: 121.018031956266 },
    { lat: 14.775012282414663, lng: 121.01870787287527 }
  ];


  console.log(markerLocation);
  const IoniconsHeaderButton = (props) => (
    // the `props` here come from <Item ... />
    // you may access them and pass something else to `HeaderButton` if you like
    <HeaderButton IconComponent={Ionicons} iconSize={23} {...props} />
  );
  React.useLayoutEffect(() => props.navigation.setOptions({
    headerRight: () => (
      <HeaderButtons HeaderButtonComponent={IoniconsHeaderButton}>
        <Item title="search" iconName="ellipsis-horizontal-circle-outline" onPress={() => props.navigation.navigate('Post Complaint', { pickedLocation: { lat: 14.7731, lng: 121.0183 } })} />


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
    console.log("Marker Location mapping")
    markerLocation.map((location) => markerTemp.push({
      latitude: location.lat,
      longitude: location.lng
    })

    );
    setMarkerCoordinates(markerTemp);
    //console.log(markerCoordinates)


  }, [props]

  );

  // console.log("Marker Location mapping")
  // markerLocation.map((location) => markerTemp.push({
  //   latitude: location.lat,
  //   longitude: location.lng
  // })

  // );

  //console.log(markerCoordinates)

  console.log(markerTemp)
  console.log("markerTemp");
  return (



    <MapView
      style={styles.map}
      region={mapRegion}
      onPress={selectLocationHandler}
    >
      {

        markerCoordinates && (

          markerCoordinates.map((location) => <Marker key={location.latitude} title="Picked Location" coordinate={location} />)

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
export default ComplaintScreen;