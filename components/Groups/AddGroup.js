import React, { useState } from 'react'
import { View } from 'react-native'
import {Image, Text, Input, Button, useTheme, Avatar} from 'react-native-elements';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';
import styles from './styles';

export default function AddGroup() {
    const { theme } = useTheme();
    const LineWidth = 290
    const [groupName, setGroupName] = useState('');
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');

    const onRegisterPress = () => {
    }

    return (
        <KeyboardAwareScrollView keyboardShouldPersistTaps={'always'}
                                 style={{ flex: 1 }}
                                 showsVerticalScrollIndicator={false}>
        <View style={{alignItems:"center",display:"flex", marginTop:'10%'}}>
            <Text
                h1
                h1Style={{ color: theme?.colors?.primary }}
            >
                Create Group
            </Text>
            <View style={{ display: "flex", alignItems: "center", margin: '5%' }}>
                <Avatar
                    size={64}
                    rounded
                    icon={{ name: 'adb', type: 'material' }}
                    containerStyle={{ backgroundColor: 'orange' }}
                >
                    <Avatar.Accessory size={24} />
                </Avatar>
            </View>
                <Input
                    containerStyle={{ width: LineWidth }}
                    placeholder='Name'
                    leftIcon={{ type: 'font-awesome', name: 'user' }}
                    onChangeText={value => setGroupName(value)}
                />
                <Input
                    containerStyle={{ width: LineWidth }}
                    placeholder='Password(min 7 chars)'
                    leftIcon={{ type: 'font-awesome', name: 'lock' }}
                    errorMessage={password.length > 6 || !password.length? "" : "Password is under 7 chars"}
                    onChangeText={value => setPassword(value)}
                />
                <Input
                    containerStyle={{ width: LineWidth }}
                    placeholder='Confirm Password'
                    leftIcon={{ type: 'font-awesome', name: 'lock' }}
                    errorMessage={password === confirmPassword || !confirmPassword.length? "" : "Passwords are not equals"}
                    onChangeText={value => setConfirmPassword(value)}
                />
        </View>
        </KeyboardAwareScrollView>
    )
};