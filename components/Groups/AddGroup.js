import React, { useState } from 'react'
import { View } from 'react-native'
import { Image, Text, Input, Button } from 'react-native-elements';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';
import styles from './styles';

export default function AddGroup() {
    const [groupName, setGroupName] = useState('');
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');

    const onRegisterPress = () => {
    }

    return (
        <View style={styles.container}>
            <KeyboardAwareScrollView
                style={{ flex: 1, width: '100%' }}
                keyboardShouldPersistTaps="always">
                <Input
                    containerStyle={{ width: LineWidth }}
                    placeholder='Name'
                    leftIcon={{ type: 'font-awesome', name: 'groupName' }}
                    onChangeText={value => setGroupName(value)}
                />
                <Input
                    style={styles.input}
                    placeholderTextColor="#aaaaaa"
                    secureTextEntry
                    placeholder='Password'
                    onChangeText={(text) => setPassword(text)}
                    value={password}
                    underlineColorAndroid="transparent"
                    autoCapitalize="none"
                />
                <Input
                    style={styles.input}
                    placeholderTextColor="#aaaaaa"
                    secureTextEntry
                    placeholder='Confirm Password'
                    onChangeText={(text) => setConfirmPassword(text)}
                    value={confirmPassword}
                    underlineColorAndroid="transparent"
                    autoCapitalize="none"
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
                    errorMessage={password === confPassword || !confPassword.length? "" : "Passwords are not equals"}
                    onChangeText={value => setConfPassword(value)}
                />
            </KeyboardAwareScrollView>
        </View>
    )
}