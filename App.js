//import liraries
import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs'
import Ionicons from 'react-native-vector-icons/Ionicons'
import AntDesign from 'react-native-vector-icons/AntDesign'
import AddUser from './App/Screens/Adduser'
import Home from "./App/Screens/Home";
import Search from "./App/Screens/Search";
import ViewSingleUser from "./App/Screens/ViewSingleUser";
import FamilyWindow from "./App/Screens/FamilyWindow";
import AddContacts from "./App/Screens/AddContacts";
import ChiledContacts from "./App/Screens/ChiledContacts";
import UpdateUser from "./App/Screens/UpdateUser";
import UpdatedChiled from "./App/Screens/UpdatedChiled";



const Stack=createStackNavigator();
const Tab=createBottomTabNavigator();
export default myStack=()=>{
    return(
      <NavigationContainer>
        <Stack.Navigator initialRouteName='home' headerMode='none'>
            
            <Stack.Screen name='Adduser' component={AddUser}/>
            <Stack.Screen name='FamilyWindow' component={FamilyWindow}/>
            <Stack.Screen name='ViewSingleUser' component={ViewSingleUser}/>
            <Stack.Screen name='AddContacts' component={AddContacts}/>
            <Stack.Screen name='ChiledContacts' component={ChiledContacts}/>
            <Stack.Screen name='UpdateUser' component={UpdateUser}/>
            <Stack.Screen name='UpdatedChiled' component={UpdatedChiled}/>
        <Stack.Screen name='home' component={tabBar}/> 
        </Stack.Navigator>
      </NavigationContainer>
    )
  }

const tabBar=()=>{
    return(
      <Tab.Navigator
         screenOptions={({ route }) => ({
        tabBarIcon: ({ focused }) => {
          if (route.name === 'Home') {
            return focused? <Ionicons name='ios-people' size={30}  /> : <Ionicons name='ios-people' size={20}  color={'grey'}/>
             
          } else if (route.name === 'Search') {
            return focused? <AntDesign name='search1' size={30}  />:<AntDesign name='search1' size={20} color={'grey'}/>
          }
  
         
        },
      })}
      tabBarOptions={{
       
        inactiveTintColor: 'gray',
        showLabel:false
      
        
      }}
      
      
      initialRouteName='Home' headerMode='none'>
        <Tab.Screen name='Home' component={Home}/>
        <Tab.Screen name='Search' component={Search}/>
  
       </Tab.Navigator>
    )
  }




