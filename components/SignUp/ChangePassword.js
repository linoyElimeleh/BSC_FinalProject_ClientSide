import React, {useEffect, useLayoutEffect, useState} from 'react';
import { StyleSheet, View, Pressable, ActivityIndicator } from 'react-native';
import {Button, Text, Dialog, useTheme, Avatar, Input} from 'react-native-elements';
import Icon from "react-native-vector-icons/MaterialCommunityIcons";
import {removeData} from "../../utils/asyncStorageUtils";
import {GetMeDetails} from "../../services/userService";
import {useIsFocused} from "@react-navigation/native";


export default function ChangePassword({navigation}) {
    const { theme } = useTheme();
    const [disabled,setDisabled] = useState(true);
    const [currentPassword,setCurrentPassword] = useState("");
    const [newPassword,setNewPassword] = useState("");
    const [confPassword,setConfPassword] = useState("");
    const isFocused = useIsFocused();

    useEffect(() => {
        currentPassword.length > 6 && newPassword.length > 6 &&  newPassword == confPassword ?
            setDisabled(false) : setDisabled(true)
    }, [currentPassword, newPassword, confPassword])


    return (
        <View>
            <View style={styles.containerStyle}>
                <Input
                    containerStyle={styles.textStyle}
                    placeholder='Current Password'
                    leftIcon={{type: 'font-awesome', name: 'lock'}}
                    onChangeText={value => setCurrentPassword(value)}
                    secureTextEntry={true}
                />
                <Input
                    containerStyle={styles.textStyle}
                    placeholder='New Password(min 7 chars)'
                    leftIcon={{type: 'font-awesome', name: 'lock'}}
                    errorMessage={newPassword.length > 6 || !newPassword.length ? "" : "Password is under 7 chars"}
                    onChangeText={value => setNewPassword(value)}
                    secureTextEntry={true}
                />
                <Input
                    containerStyle={styles.textStyle}
                    placeholder='Confirm Password'
                    leftIcon={{type: 'font-awesome', name: 'lock'}}
                    errorMessage={newPassword === confPassword || !confPassword.length ? "" : "Passwords are not equals"}
                    onChangeText={value => setConfPassword(value)}
                    secureTextEntry={true}
                />
                <Button
                    title={'Change Password'}
                    containerStyle={styles.buttonStyle}
                    disabled={disabled}
                    //onPress={HandleSubmit}
                    //loading={isLoading}
                />
            </View>
        </View>
    )
}


const styles = StyleSheet.create({
    changePasswordText: {
        color:"blue",
        margin: 5
    },
    buttonStyle:{
        width: 200,
        marginHorizontal: 50,
        marginVertical: 10,
    },
    containerStyle:{
        alignItems: "center",
        display: "flex",
        marginTop: '10%'
    },
    textStyle:{
        width:280
    }
});



