//import liraries
import React, { Component,useState,useEffect } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Image, TextInput, Alert, StatusBar } from 'react-native';
import { openDatabase } from 'react-native-sqlite-storage';
import Feather from "react-native-vector-icons/Feather";
import EvilIcons from "react-native-vector-icons/EvilIcons";
import Entypo from "react-native-vector-icons/Entypo";
import AntDesign from "react-native-vector-icons/AntDesign";
import Toast from 'react-native-simple-toast';
import ImagePicker from 'react-native-image-picker';
const db = openDatabase({ name: 'ContactBook.db' })
import Color from '../../Components/Colors'
import {
  responsiveHeight,
  responsiveWidth,
  responsiveFontSize,
} from 'react-native-responsive-dimensions';
const options = {
  title: 'Select Photo',
  TakePhotoButton: 'Take Photo From Camera',
  ChoosePhotoFromLibrary: 'Choose Photo From Library',
};

const Index = ({navigation}) => {

const [userimage, setuserimage] = useState('')
const [username, setusername] = useState('')
const [usercontact, setusercontact] = useState('')
const [usernameupdate, setusernameupdate] = useState('')
const [usercontactupdate, setusercontactupdate] = useState('')





    _takingPhoto = () => {
        ImagePicker.showImagePicker(options, (response) => {
    
          if (response.didCancel) {
            console.log('User cancelled image picker');
          } else if (response.error) {
            console.log('ImagePicker Error: ', response.error);
          } else if (response.customButton) {
            console.log('User tapped custom button: ', response.customButton);
          } else {
            let newfile = "file://" + response.path
            this.setState({ userimage: newfile, imagepath: response.uri })
    
    
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

        </View>
        <View style={styles.imageView}>
          <Image
            resizeMode='cover'
            style={styles.imageLogo}
            source={userimage ? { uri: userimage } :

             
                require('../../images/user.png')
            }
          />
          <TouchableOpacity onPress={() => _takingPhoto()} style={styles.browseImage}>
            <Text style={styles.buttonText}>Browse Image</Text>
          </TouchableOpacity>

        </View>
        <Text style={styles.contactText}>Updated Information</Text>
        <View style={styles.inputView}>
          <TextInput
            style={styles.TextInput}
            placeholder='Update Name'
            value={username}
            onChangeText={(username) => setusernameupdate(username )}

          />

        </View>
        <View style={styles.inputView}>
          <TextInput
          placeholder='Update Contact'
            style={styles.TextInput}
            value={usercontact}
            keyboardType='number-pad'
            onChangeText={(usercontact) => setusercontactupdate(usercontact)}
          />
        </View>
        <TouchableOpacity
          onPress={() => this.updateUser()} style={[styles.browseImage, { alignSelf: 'center', marginTop: responsiveHeight(15),width:responsiveWidth(70) }]}>
          <Text style={styles.buttonText}>Update Contact</Text>
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
        width: responsiveWidth(90),
        alignSelf: 'center',
        marginTop: responsiveHeight(3)
      },
      imageView: {
        marginTop: responsiveHeight(5),
        alignSelf: 'center',
        width: responsiveWidth(90),
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
        fontSize:responsiveFontSize(2),
        fontWeight:'700'
      },
      contactText: {
        alignSelf: 'center',
        fontSize: responsiveFontSize(2.5),
        marginVertical: responsiveHeight(4),
      },
      TextInput: {
        height: responsiveHeight(5),
        alignSelf: 'center',
        width: responsiveWidth(80)
      },
      inputView: {
        borderRadius: responsiveWidth(2),
        marginVertical: responsiveHeight(1),
        padding: responsiveWidth(1)
      }
    
});

//make this component available to the app
export default Index;
