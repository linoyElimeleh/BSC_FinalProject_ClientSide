import React, {useEffect, useLayoutEffect, useState} from 'react';
import {ActivityIndicator, View} from 'react-native';
import {Text, useTheme, ListItem, Avatar, Image} from 'react-native-elements';
import Icon from "react-native-vector-icons/MaterialCommunityIcons";
import {removeData} from "../../utils/asyncStorageUtils";
import {GetMeDetails} from "../../services/userService";
import {useIsFocused} from "@react-navigation/native";
import Dialog from "react-native-dialog";

export default function Profile({navigation}) {
    const { theme } = useTheme();
    const [dialogOpen,setDialogOpen] = useState(false);
    const [imageUri, setImageUri] = useState(null);
    const [userName,setUserName] = useState("");
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
    });

    useEffect(async ()=>{
        let response = await GetMeDetails();
        setImageUri(response.image)
        setUserName(response.display_name);
    },[isFocused]);

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
            <Dialog.Container visible={dialogOpen}>
                <Dialog.Title title="Logout"/>
                <Dialog.Description>Are you sure you want to log out?</Dialog.Description>
                <Dialog.Button label="LOGOUT" onPress={logout} />
                <Dialog.Button label="cancel" onPress={() => setDialogOpen(false)} />
            </Dialog.Container>
            <View style={{display: "flex", alignItems: "center", margin: '5%'}}>
                {imageUri ?
                    <Image
                        PlaceholderContent={<ActivityIndicator/>}
                        style={{width: 100, height: 100, borderRadius:50}}
                        source={{uri: imageUri}}/>
                    :
                    <Avatar
                        size={64}
                        rounded
                        icon={{name: 'person', type: 'material'}}
                        containerStyle={{backgroundColor: 'orange'}}
                    >
                    </Avatar>
                }
                <Text>{userName}</Text>
            </View>
            {
                [{name:"Edit Profile",route:"EditProfile", icon:"account-edit-outline"},{name:"Change Password",route: "ChangePassword", icon:"lock"}].map((l,i)=>(
                    <ListItem
                        key={i}
                        bottomDivider
                        onPress={()=>navigation.navigate(l.route)}
                    >
                        <ListItem.Content>
                            <ListItem.Title>
                                <Icon name={l.icon} size={20} />
                                 <Text> {l.name}</Text>
                            </ListItem.Title>
                        </ListItem.Content>
                        <ListItem.Chevron/>
                    </ListItem>
                ))
            }
        </View>
    )
}
