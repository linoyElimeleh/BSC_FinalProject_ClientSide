import React, {useEffect, useState} from 'react';
import { StyleSheet, View, Pressable, ActivityIndicator } from 'react-native';
import { Button, Text, Dialog, useTheme } from 'react-native-elements';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import {Profile} from "../index";
import ChangePassword from "../../SignUp/ChangePassword";

const Stack = createNativeStackNavigator();

export default function ProfileStack({navigation}) {
    const { theme } = useTheme();
    const [dialogOpen,setDialogOpen] = useState(false);
    const toggleDialog = () => {
        setDialogOpen(!dialogOpen);
    }
    return (
        <Stack.Navigator
            screenOptions={{
                headerStyle: {
                    backgroundColor: '#2089dc'
                },
                headerTintColor: '#fff',
                headerTitleStyle: {
                    fontWeight: 'bold',
                },
            }}
        >
            <Stack.Screen
                name="Profile"
                component={Profile}
            />
            <Stack.Screen
                name="ChangePassword"
                component={ChangePassword}
                options={{title: "Change Password"}}
            />
        </Stack.Navigator>

    )
}


const styles = StyleSheet.create({
    image: {
        flex:1,
        resizeMode: 'contain'
    },
    text: {
        textAlign: 'center',
        padding: 2,
    },
    container: {
        display: 'flex',
        alignItems: 'center',
        marginTop:'10%',
        height: '100%',
        width: '100%',

    },
    imageContainer:{
        height: '100%',
        width:'100%'
    },
    imageView:{
        height: '50%',
        width:'80%'
    }
});



