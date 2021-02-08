//import liraries
import React, { Component,useState } from 'react';
import { View, Text, StyleSheet,FlatList, TouchableOpacity,Modal,SafeAreaView,PermissionsAndroid, StatusBar } from 'react-native';
import Color from "../../Components/Colors"
import {
    responsiveHeight,
    responsiveWidth,
    responsiveFontSize,
} from 'react-native-responsive-dimensions';
import AntDesign from "react-native-vector-icons/AntDesign";
import Ionicons from "react-native-vector-icons/Ionicons";
import Contacts from 'react-native-contacts'
// create a component
const Index = ({ navigation }) => {
    const [OpenModal, setOpenModal] = useState(false)
    const [GetAllContact, setGetAllContact] = useState([])

       getAllContacts=()=>{
        PermissionsAndroid.request(
            PermissionsAndroid.PERMISSIONS.READ_CONTACTS,
            {
              'title': 'Contacts',
              'message': 'This app would like to view your contacts.',
              'buttonPositive': 'Please accept bare mortal'
            }
          )
          .then(Contacts.getAll)
          .then(contacts => {
            setGetAllContact(contacts)
        
          })


}





    return (
        
            <View style={styles.container}>
                <Modal
                transparent={true}
                animationType='slide'
                visible={OpenModal}>
                    <SafeAreaView>
                    <View style={styles.conatctView}>
                        <View style={styles.headerView}>
                            <TouchableOpacity onPress={()=>setOpenModal(false)}>
                                <AntDesign name='close' size={25}  />
                            </TouchableOpacity>

                        </View>
                        <FlatList
                        data={GetAllContact}
                        style={styles.flatlistView}
                        renderItem={(item)=>{
                            return(
                                <TouchableOpacity onPress={()=>alert('=======your Selection=======',item)}>
                                    <Text>{item}</Text>

                                </TouchableOpacity>
                            )
                        }}
                        
                        
                        
                        />






                    </View>
                    </SafeAreaView>

                </Modal>
                <StatusBar backgroundColor='transparent' barStyle='light-content' translucent />
                <TouchableOpacity style={styles.backButton} onPress={() => navigation.goBack()}>
                    <AntDesign name='arrowleft' size={25} />
                </TouchableOpacity>
                <View style={styles.AddView}>
                    <TouchableOpacity
                        onPress={() => navigation.navigate('Adduser')}
                        style={styles.Addbutton}
                    >
                        <Text style={styles.existingContactText}>Add New Contact</Text>
                    </TouchableOpacity>
                    <TouchableOpacity onPress={()=>setOpenModal(true)}
                        style={styles.Addbutton}>
                        <Text style={styles.existingContactText}>Add Existing Contacts</Text>
                    </TouchableOpacity>
                </View>
            </View>
        
    );
};

// define your styles
const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: Color.White,
    },
    AddView: {
        marginTop: responsiveHeight(10),
        width: responsiveWidth(100),
        justifyContent: 'center',
        alignItems: 'center',
    },
    Addbutton: {
        marginVertical: responsiveHeight(1),
        borderRadius: responsiveWidth(2),
        width: responsiveWidth(90),
        height: responsiveHeight(6),
        borderWidth: .3,
        justifyContent: 'center',
        alignItems: 'center',
    },
    existingContactText: {
        color: Color.iconeColor,
        fontSize: responsiveFontSize(2)
    },
    backButton: {
        marginTop: responsiveHeight(5),
        marginLeft: responsiveWidth(5),

    },
    conatctView:{
        flex:1,
        backgroundColor: Color.White,
    },
    headerView:{
        width:responsiveWidth(90)
    },
    flatlistView:{
        alignSelf: 'center',
    }
});

//make this component available to the app
export default Index;
