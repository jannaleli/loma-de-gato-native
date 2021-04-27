import React, { useState } from 'react';
import {
    View,
    Button,
    Image,
    Text,
    StyleSheet,
    Alert
} from 'react-native';
import * as ImagePicker from 'expo-image-picker';
import * as Permission from 'expo-permissions';
import { Colors } from 'react-native-paper';

const ImgPicker = props => {
    const [pickedImage, setPickedImage] = useState();

    const verifyPermissions = async() => {
        const result = await Permissions.askAsync(
            Permissions.CAMERA_ROLL,
            Permissions.CAMERA
        );

        if(result.status !== 'granted') {
            //put alert in here
            return false;
        }

        return true;
    };

    const takeImageHandler = async() => {
        const hasPermission = await verifyPermissions ();
        if (!hasPermission) {
            return;
        }

        const image = await ImagePicker.launchCameraAsync({
            allowsEditing: true,
            aspect: [16,9],
            quality: 0.5
        });

        setPickedImage(image.uri);
        props.onImageTaken(image.uri);
        //Need to preview the image upon going back to the previous screen
        //How to upload to AWS S3 bucket after this :)
    };

    return (
        <View style={StyleSheet.imagePicker}>

            <View style={StyleSheet.imagePreview}>

                { !pickedImage ? <Text>No image picked yet</Text> :
                (
                    <Image 
                    style={styles.image}
                    source={{ uri:pickedImage }} />
                )


                }

            </View>
            <Button
            title="Take Image"
            color={Colors.primary}
            onPress={takeImageHandler}
            />
        </View>
    )
};

const styles = StyleSheet.create({
    imagePicker: {
        alignItems: 'center',
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
    }
});

export default ImgPicker;