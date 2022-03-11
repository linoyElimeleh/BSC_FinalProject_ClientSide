import React, {useState} from 'react'
import {View} from 'react-native'
import {Image, Text, Input, Button, useTheme, Avatar} from 'react-native-elements';
import {KeyboardAwareScrollView} from 'react-native-keyboard-aware-scroll-view';
import {IconButton} from "@material-ui/core";
import {FontAwesomeIcon} from "@fortawesome/react-native-fontawesome"
import { faUserGroup } from '@fortawesome/free-solid-svg-icons'

export default function GroupCreated({route}) {
    const {name, description, image, id} = route.params;
    const {theme} = useTheme();

    return (
        <KeyboardAwareScrollView keyboardShouldPersistTaps={'always'}
                                 style={{flex: 1}}
                                 showsVerticalScrollIndicator={false}>
            <View style={{alignItems: "center", display: "flex", marginTop: '10%'}}>
                <Text
                    h1
                    h1Style={{color: theme?.colors?.primary}}
                >
                    Your group was created successfully!
                </Text>
                <View style={{display: "flex", alignItems: "center", margin: '5%'}}>
                    <Avatar
                        size={64}
                        rounded
                        icon={{type: 'font-awesome', name: 'users'}}
                        containerStyle={{backgroundColor: 'orange'}}
                    >
                        <Avatar.Accessory size={24}/>
                    </Avatar>
                </View>
                <Text
                    h5
                >{name}</Text>
                <Text
                    h5
                >invite code: {id} </Text>
            </View>
        </KeyboardAwareScrollView>
    )
};