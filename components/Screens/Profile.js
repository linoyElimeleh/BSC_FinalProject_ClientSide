import React, {useLayoutEffect, useState} from 'react';
import { View} from 'react-native';
import {Text, Dialog, useTheme, ListItem} from 'react-native-elements';
import Icon from "react-native-vector-icons/MaterialCommunityIcons";
import {removeData} from "../../utils/asyncStorageUtils";

export default function Profile({navigation}) {
    const { theme } = useTheme();
    const [dialogOpen,setDialogOpen] = useState(false);

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
            {
                [{name:"Edit Profile",route:"EditProfile"},{name:"Change Password",route: "ChangePassword"}].map((l,i)=>(
                    <ListItem
                        key={i}
                        bottomDivider
                        onPress={()=>navigation.navigate(l.route)}
                    >
                        <ListItem.Content>
                            <ListItem.Title>{l.name}</ListItem.Title>
                        </ListItem.Content>
                        <ListItem.Chevron />
                    </ListItem>
                ))
            }
        </View>
    )
}
