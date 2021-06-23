import React from 'react';
import {
    View,
    Text,
    Image,
    StyleSheet,
    TouchableOpacity
} from 'react-native'
import { Entypo } from '@expo/vector-icons';

import Colors from '../../constants/Colors';
import EStyleSheet from 'react-native-extended-stylesheet';
import Card from '../UI/Card';
const EventItem = props => {

    return (
        <TouchableOpacity onPress={props.onSelect} style={styles.eventItem}>
            <Card style={styles.homeContainer}>
                <Image style={styles.imageAlt} source={{ uri: props.image }} />
                <View style={styles.infoContainer}>
                    <Text style={styles.title}>{props.title}</Text>
                </View>
                <View style={styles.dateContainer}>
                    <Entypo name="calendar" size={24} color="black" />
                    <Text style={styles.date}>{props.start_date}</Text>
                </View>
            </Card>
        </TouchableOpacity>


    )
};

const extendedStyles = EStyleSheet.create({
    image: {
        width: '100%'
    }
});

const styles = StyleSheet.create(
    {
        eventItem: {
            borderBottomColor: '#ccc',
            borderBottomWidth: 0,
            paddingVertical: 15,
            paddingHorizontal: 30,
            flexDirection: 'row',
            alignItems: 'center'
        },
        imageAlt: {

            width: 350,
            height: 100,
            resizeMode: 'cover'
        },
        image: {
            width: 70,
            height: 70,
            borderRadius: 35,
            backgroundColor: '#ccc',
            borderColor: Colors.primary,
            borderWidth: 1
        },
        infoContainer: {
            marginLeft: 25,
            width: 250,
            justifyContent: 'center',
            paddingTop: 10
        },
        dateContainer: {
            marginLeft: 25,
            width: '100%',

            flexDirection: 'row',
            paddingBottom: 10
        },
        eventContainer: {
            width: '80%',
            maxWidth: 400,
            maxHeight: 400,
            padding: 20
        },
        title: {
            color: 'black',
            fontSize: 18,
            fontWeight: 'bold',
            marginBottom: 5
        },
        date: {
            color: 'black',
            paddingLeft: 10,
            fontSize: 15,
            marginBottom: 5
        },
        address: {
            color: 'black',
            fontSize: 16
        },
        homeContainer: {
            width: '100%',
            padding: 0,
            flexDirection: 'column'
        }
    }
);
export default EventItem;
