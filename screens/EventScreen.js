import React, { useEffect, Fragment } from 'react';
import { View, Text, StyleSheet, Platform, FlastList, SafeAreaView, StatusBar } from 'react-native';
import { HeaderButtons, Item } from 'react-navigation-header-buttons';
import { useSelector, useDispatch } from 'react-redux';
import * as eventActions from '../store/actions/events'
import { FlatList } from 'react-native-gesture-handler';
import EventItem from '../components/UI/EventItem';
import { LinearGradient } from 'expo-linear-gradient';
import { Button } from 'react-native-paper';

const EventScreen = props => {
    //const places = useSelector(state => state.places.places);
    //whatever was updated in the other components, event screen will automatically
    //be updated with useSelector
    //places should be replaced with events
    const dispatch = useDispatch();
    const events = useSelector(state => state.events.events);
    useEffect(
        () => {
            //This is where you load the events
            //We will edit this later to actually include the API call itself.
            dispatch(eventActions.callGetEvents()).then(() => {
                console.log("It's done")
            });

        }, [dispatch]
    );
    const newText = "Test text";
    console.log("Here are the new events");
    console.log(events);
    //Please change with EventItem
    return (

        <LinearGradient colors={['#a8baab', '#ebedd0', '#fdfefd']}
            style={styles.gradient}>
            <View styles={styles.authContainer}>
                <FlatList

                    data={events}
                    keyExtractor={item => item.event_id}
                    renderItem={itemData => (

                        <EventItem
                            image={itemData.item.attachment_id}
                            title={itemData.item.event_title}
                            description={itemData.item.event_desc}
                            start_date={itemData.item.start_date}
                            onSelect={() => {
                                props.navigation.navigate('Event Detail', {
                                    title: itemData.item.event_title,
                                    desc: itemData.item.event_desc,
                                    date: itemData.item.start_date
                                });
                            }} />
                    )}
                />
            </View>
        </LinearGradient>

        // <FlatList
        //     data={places}
        //     keyExtractor={item => item.id}
        //     renderItem={
        //         itemData => (
        //             console.log(itemDatas)
        //             <EventItem
        //                 image={itemData.item.imageUri}
        //                 title={itemData.item.title}
        //                 address={itemData.item.address}
        //                 onSelect={() => {
        //                     props.navigation.navigate('PlaceDetail', {
        //                         placeTitle: itemData.item.title,
        //                         placeId: itemData.item.id
        //                     });
        //                 }} />
        //         )
        //     }


        // />



    );
};
const styles = StyleSheet.create({
    centered: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center'
    },
    authContainer: {
        width: '100%',
        padding: 20,
        marginTop: 100
    },
    container: {
        flex: 2,
        marginTop: 20
    }, gradient: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center'
    },
});
export default EventScreen;