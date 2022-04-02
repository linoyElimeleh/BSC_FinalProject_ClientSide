import React, { useEffect, useState } from 'react';
import { StyleSheet, View, Pressable, ActivityIndicator, TextInput } from 'react-native';
import { Button, Text, Image, useTheme, Input } from 'react-native-elements';
import { Login } from '../../services/AuthServices'
import AsyncStorage from "@react-native-async-storage/async-storage";
import groupScreenStyles from "./groupScreenStyles";
import { ScrollView } from 'react-native-web';

export default function GroupPage({navigation}) {
    const { theme } = useTheme();
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [isDisable, setIsDisable] = useState(true);
    const [errorMessage, setErrorMessage] = useState("");
    const [isLoading, setIsLoading] = useState(false);

    useEffect(() => {
        //bring group details
        //bring tasks
    })

    
    return (
        <ScrollView>
         <view><Text>hii</Text></view>
        </ScrollView>
    )
}


