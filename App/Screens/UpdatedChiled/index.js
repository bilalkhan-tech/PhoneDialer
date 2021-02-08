//import liraries
import React, { Component, useState, useEffect, useCallback } from 'react';
import {
    View,
    StyleSheet,
    Image,
    Text,
    SafeAreaView,
    TouchableOpacity,
    TextInput,
    FlatList,
    StatusBar
} from 'react-native';

import {
    responsiveHeight,
    responsiveWidth,
    responsiveFontSize,
} from 'react-native-responsive-dimensions';
import { useFocusEffect } from '@react-navigation/native'
import AntDesign from 'react-native-vector-icons/AntDesign';
import Ionicons from 'react-native-vector-icons/Ionicons';
import Feather from 'react-native-vector-icons/Feather';
import { openDatabase } from 'react-native-sqlite-storage';
import Toast from 'react-native-simple-toast';
import ImagePicker from 'react-native-image-picker';
const options = {
    title: 'Select Photo',
    TakePhotoButton: 'Take Photo From Camera',
    ChoosePhotoFromLibrary: 'Choose Photo From Library',
};
const db = openDatabase({ name: 'ContactsBooks.db' });
console.disableYellowBox = true

import Color from '../../Components/Colors';
// create a component


const Index = ({ navigation, route }) => {


    const { user_id, user_name, user_image, user_relation, user_contact } = route.params.Mydata.data
    // const image=route.params.Mydata.UserImage


    const [ParentId, setParentId] = useState('')
    const [ParentImage, setParentImage] = useState('')
    const [chiledImage, setchiledImage] = useState(user_image)
    const [chiledName, setchiledName] = useState(user_name)
    const [ChiledContact, setChiledContact] = useState(user_contact)
    const [chiledRelation, setchiledRelation] = useState(user_relation)

const SaveDAta = () => {

    db.transaction((tx) => {
        tx.executeSql(
          'UPDATE FamilyWindow set user_name=?, user_contact=? , user_relation=? , user_image=? where user_id=?',
          [chiledName,ChiledContact,chiledRelation,chiledImage,user_id],
          (tx, results) => {
            console.log('Results', results.rowsAffected);
            if (results.rowsAffected > 0) {
              alert(
                'Success',
                'User updated successfully',
                [
                  {
                    text: 'Ok',
                    onPress: () => navigation.goBack(),
                  },
                ],
                { cancelable: false }
              );
            } else alert('Updation Failed');
          }
        );
      });
}
    _takingPhoto = () => {


        ImagePicker.showImagePicker(options, (response) => {

            if (response.didCancel) {
                console.log('User cancelled image picker');
            } else if (response.error) {
                console.log('ImagePicker Error: ', response.error);
            } else if (response.customButton) {
                console.log('User tapped custom button: ', response.customButton);
            } else {
                let newfile = response.uri
                console.log("========== response =======", response);

                setchiledImage(response.uri)


            }
        });
    }


    return (
        <View style={styles.container}>
            <StatusBar backgroundColor='transparent' barStyle='light-content' translucent />
            <View style={styles.headerView}>
                <TouchableOpacity onPress={() => navigation.goBack()}>
                    <AntDesign name='arrowleft' size={25} />
                </TouchableOpacity>

                <Image
                    resizeMode='cover'
                    style={styles.userImage}
                    source={ParentImage ? { uri: ParentImage } : require('../../images/user.png')}
                />
            </View>


            <View style={styles.imageView}>
                <Image
                    resizeMode='cover'
                    style={styles.imageLogo}
                    source={chiledImage ? { uri: chiledImage } :

                        require('../../images/user.png')}
                />
                <TouchableOpacity onPress={() => _takingPhoto()} style={styles.browseImage}>
                    <Text style={styles.buttonText}>Browse Image</Text>
                </TouchableOpacity>

            </View>

            <Text style={styles.contactText}>Contact Information</Text>
            <View style={styles.inputView}>
                <TextInput
                    style={styles.TextInput}
                    placeholder='Enter Name'
                    value={chiledName}
                    autoCorrect={false}

                    onChangeText={(text) => setchiledName(text)}

                />

            </View>
            <View style={styles.inputView}>
                <TextInput
                    style={styles.TextInput}
                    keyboardType='number-pad'
                    value={ChiledContact}
                    placeholder='Mobile Number'
                    onChangeText={(text) => setChiledContact(text)}

                />

            </View>
            <View style={styles.inputView}>
                <TextInput
                    style={styles.TextInput}
                    placeholder='Enter Relation'
                    value={chiledRelation}
                    onChangeText={(text) => setchiledRelation(text)}

                />

            </View>


            <TouchableOpacity onPress={()=>SaveDAta()} style={[styles.browseImage, { alignSelf: 'center', marginTop: responsiveHeight(5), width: responsiveWidth(70) }]}>
                <Text style={styles.buttonText}>Save</Text>
            </TouchableOpacity>





        </View>
    );
};

// define your styles
const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: Color.White,
    },
    headerView: {
        marginLeft: responsiveWidth(2),
        marginTop: responsiveHeight(5),
        width: responsiveWidth(30),
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-evenly',
    },
    imageLogo: {
        width: responsiveWidth(30),
        height: responsiveWidth(30),
        borderRadius: responsiveWidth(2),
    },
    browseImage: {
        width: responsiveWidth(40),
        height: responsiveHeight(5),
        backgroundColor: Color.buttonBackgroundColor,
        justifyContent: 'center',
        alignItems: 'center',
        borderRadius: responsiveWidth(2),
    },
    buttonText: {
        color: '#FFFFFF',
        fontSize: responsiveFontSize(2),
        fontWeight: '700'
    },
    contactText: {
        alignSelf: 'center',
        fontSize: responsiveFontSize(2.5),
        marginVertical: responsiveHeight(4),
    },
    TextInput: {
        height: responsiveHeight(5),
        alignSelf: 'center',
        width: responsiveWidth(70)
    },
    inputView: {
        borderRadius: responsiveWidth(2),
        marginVertical: responsiveHeight(1),
        padding: responsiveWidth(2)
    },
    imageView: {
        alignSelf: 'center',
        width: responsiveWidth(90),
        flexDirection: 'row',
        marginTop: responsiveHeight(5),
        justifyContent: 'space-around',
        alignItems: 'center',
    },
    userImage: {
        width: responsiveWidth(10),
        height: responsiveWidth(10),
        borderRadius: responsiveWidth(10 / 2)
    }
});

//make this component available to the app
export default Index;
