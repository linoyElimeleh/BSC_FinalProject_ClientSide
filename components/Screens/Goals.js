import React, {useEffect, useState} from 'react';
import { StyleSheet, View, Pressable, ActivityIndicator } from 'react-native';
import { Button, Text, Image, useTheme } from 'react-native-elements';
import {getData} from "../../utils/asyncStorageUtils";


export default function Goals({navigation}) {
    const { theme } = useTheme();
    useEffect(async ()=>{
        const loggedInUser = await getData("Access Token");
        if(loggedInUser){
            navigation.navigate('Groups');
        }
    })

    return (
        <View style={styles.container}>
            <Text
                style={styles.text}
                h1
                h1Style={{ color: theme?.colors?.primary }}
            >
                Goals
            </Text>
        </View>
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


