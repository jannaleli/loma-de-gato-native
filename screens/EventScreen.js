import React, { useEffect } from 'react';
import { View, Text, StyleSheet, Platform, FlastList } from 'react-native';
import { HeaderButtons, Item } from 'react-navigation-header-buttons';
import { useSelector, useDispatch } from 'react-redux';
import * as eventActions from '../store/events-actions.js'
import { FlatList } from 'react-native-gesture-handler';
import EventItem from '../components/UI/EventItem';

const EventScreen = props => {
    const places = useSelector(state => state.places.places);
    //whatever was updated in the other components, event screen will automatically
    //be updated with useSelector
    //places should be replaced with events
    const dispatch = useDispatch();

    useEffect(
    () => {
        //This is where you load the events
        //We will edit this later to actually include the API call itself.
        dispatch(eventActions.loadEvents());
    }, [dispatch]
    );
    //Please change with EventItem
    return (
        <FlatList
            data={places}
            keyExtractor={item=> item.id}
            renderItem={
                itemData => (
                    <EventItem
                    image={itemData.item.imageUri}
                    title={itemData.item.title}
                    address={itemData.item.address}
                    onSelect={() => {
                        props.navigation.navigate('PlaceDetail', {
                          placeTitle: itemData.item.title,
                          placeId: itemData.item.id
                        });
                      }} />
                )
            }
        
        
        />


        
    );
}

