import React from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";
import HomeStackNavigator from '../index'
import Followers from "../Screens/Followers";
import Following from "../Screens/Following";
import ProfileDetails from "../Screens/ProfileDetails";


const Stack = createStackNavigator();

// If you are not familiar with React Navigation, we recommend going through the
// "Fundamentals" guide: https://reactnavigation.org/docs/getting-started
export default function Navigation() {

  return (
    <NavigationContainer>
        <Stack.Navigator screenOptions={{headerShown:false}} initialRouteName='App'>
            <Stack.Screen name="Index" component={HomeStackNavigator}/>
            <Stack.Screen name="Followers" component={Followers}/>
            <Stack.Screen name="Following" component={Following}/>
            <Stack.Screen name="ProfileDetails" component={ProfileDetails}/>
        </Stack.Navigator>
    </NavigationContainer>
  );
}