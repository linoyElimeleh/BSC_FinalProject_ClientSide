import React, { useState } from 'react'
import { View, Clipboard } from 'react-native'
import { Image, Text, Input, Button, useTheme, Avatar } from 'react-native-elements';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';
import Icon from 'react-native-vector-icons/FontAwesome';


export default function GroupCreated({ route }) {
    const { name, description, image, id, invite_code } = route.params;
    const { theme } = useTheme();

    const handleCopyClick = () => {
        Clipboard.setString(invite_code);
    }

    return (
        <KeyboardAwareScrollView keyboardShouldPersistTaps={'always'}
            style={{ flex: 1 }}
            showsVerticalScrollIndicator={false}>
            <View style={{ alignItems: "center", display: "flex", marginTop: '10%' }}>
                <Text
                    h1
                    h1Style={{ color: theme?.colors?.primary, textAlign: "center" }}
                >
                    Your group was created successfully!
                </Text>
                <View style={{ display: "flex", alignItems: "center", margin: '5%' }}>
                    <Avatar
                        size={150}
                        rounded
                        source={{uri:image}}
                    ></Avatar> 
                </View>
                <Text
                    style={{fontSize:30}}
                >{name}</Text>
                <Text
                    style={{marginTop:20}}
                >invite code: {invite_code} </Text>
                <Icon.Button
                    name="copy"
                    backgroundColor={theme?.colors?.primary}
                    onPress={handleCopyClick}
                >Copy code</Icon.Button>
            </View>
        </KeyboardAwareScrollView>
    )
};