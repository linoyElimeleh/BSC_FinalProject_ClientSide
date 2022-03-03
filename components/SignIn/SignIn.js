import React, { useEffect, useState } from 'react';
import { StyleSheet, View, Pressable, ActivityIndicator, TextInput } from 'react-native';
import { Button, Text, Image, useTheme, Input } from 'react-native-elements';

export default function SignIn() {
    const { theme } = useTheme();
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");

    const ValidateEmail = () => {
        if (!email.length) return true
        const validCheck = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w\w+)+$/.test(email)
        return validCheck
    }


    return (
        <View style={{ alignItems: 'center', marginBottom: 16 }}>
            <Text
                h1
                h1Style={{ color: theme?.colors?.primary }}
            >
                Your Account
            </Text>
            <Input
                containerStyle={{ width: 250 }}
                placeholder='email@address.com'
                leftIcon={{ type: 'font-awesome', name: 'envelope' }}
                errorMessage={ValidateEmail() ? "" : "Email is invalid"}
                onChangeText={value => setEmail(value)}
            />
            <Input
                containerStyle={{ width: 250 }}
                placeholder='Password'
                leftIcon={{ type: 'font-awesome', name: 'lock' }}
                onChangeText={value => setPassword(value)}
            />
            <Button
                title={'Sign In'}
                containerStyle={{
                    width: 200,
                    marginHorizontal: 50,
                    marginVertical: 10,
                }}
            />
        </View>
    )
}

const styles = StyleSheet.create({
    input: {
        width: "100%"
    }
});


