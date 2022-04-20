import React, {useEffect, useLayoutEffect, useState} from 'react';
import { StyleSheet, View, Pressable, ActivityIndicator } from 'react-native';
import {Button, Text, Dialog, useTheme, Avatar, Input} from 'react-native-elements';
import Icon from "react-native-vector-icons/MaterialCommunityIcons";
import {removeData} from "../../utils/asyncStorageUtils";
import {GetMeDetails} from "../../services/userService";
import {useIsFocused} from "@react-navigation/native";


export default function Profile({navigation}) {
    const { theme } = useTheme();
    const [disabled,setDisabled] = useState(true);
    const [dialogOpen,setDialogOpen] = useState(false);
    const [initialUserName,setInitialUserName] = useState("");
    const [userName,setUserName] = useState("");
    const [email,setEmail] = useState("");
    const [birthDate,setBirthDate] = useState("");
    const isFocused = useIsFocused();

    useLayoutEffect(()=>{
        navigation.setOptions({
            headerRight: () =>
                <Icon.Button
                    name="logout"
                    backgroundColor={theme?.colors?.primary}
                    onPress={()=>setDialogOpen(true)}
                    size={28}
                />
        })
    })

    useEffect(async ()=>{
        let response = await GetMeDetails();
        setUserName(response.display_name);
        setEmail(response.email);
        setBirthDate(response.birth_date);
        setInitialUserName(response.display_name);
    },[isFocused]);

    const checkChange = () => {
        const userNameChanged = userName !== initialUserName;
        return !userNameChanged
    }

    const logout = () => {
        const removed = removeData("Access Token");
        if(removed){
            navigation.navigate('Welcome Page')
        }
        else {
            alert("cant logout!");
            setDialogOpen(false);
        }
    }

    return (
        <View>
            <Dialog
                isVisible={dialogOpen}
                onBackdropPress={()=>setDialogOpen(!dialogOpen)}>
                <Dialog.Title title="Logout"/>
                <Text>Are you sure you want to log out?</Text>
                <Dialog.Actions>
                    <Dialog.Button title="LOGOUT" onPress={logout}/>
                    <Dialog.Button title="cancel" onPress={() => setDialogOpen(false)}/>
                </Dialog.Actions>
            </Dialog>
            <View style={styles.containerStyle}>
                <Text
                    h1
                    h1Style={{color: theme?.colors?.primary}}
                >
                    My Profile
                </Text>
                <View style={{display: "flex", alignItems: "center", margin: '5%'}}>
                    <Avatar
                        size={64}
                        rounded
                        icon={{name: 'adb', type: 'material'}}
                        containerStyle={{backgroundColor: 'orange'}}
                    >
                        <Avatar.Accessory size={24}/>
                    </Avatar>
                </View>
                <Input
                    containerStyle={styles.textStyle}
                    leftIcon={{type: 'font-awesome', name: 'user'}}
                    onChangeText={value => { setUserName(value) }}
                    value={userName}
                />
                <Input
                    placeholder={email}
                    containerStyle={styles.textStyle}
                    leftIcon={{type: 'font-awesome', name: 'envelope'}}
                    disabled={true}
                />
                <Input
                    containerStyle={styles.textStyle}
                    placeholder={birthDate}
                    leftIcon={{type: 'font-awesome', name: 'calendar'}}
                    disabled={true}
                />
                <Button
                    title={'Edit'}
                    containerStyle={styles.buttonStyle}
                    disabled={checkChange()}
                    //onPress={HandleSubmit}
                    //loading={isLoading}
                />

            </View>
            <Text
                onPress={()=>{navigation.navigate("ChangePassword")}}
                style={styles.changePasswordText}
            >
                change password
            </Text>
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



