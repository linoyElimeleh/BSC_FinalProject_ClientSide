import React, { useEffect, useState } from 'react';
import { StyleSheet, View, Pressable, ActivityIndicator, TextInput } from 'react-native';
import { Button, Text, Image, useTheme, Input } from 'react-native-elements';
import { Login } from '../Services/AuthServices'

export default function SignIn() {
    const { theme } = useTheme();
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [isDisable, setIsDisable] = useState(true);

    useEffect(() => {
        console.log(ValidateEmail())
        console.log(email.length)
        console.log(password.length)
        ValidateEmail() && email.length && password.length ? setIsDisable(false) : setIsDisable(true)
    }, [email,password])

    const ValidateEmail = () => {
        if (!email.length) return true
        const validCheck = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w\w+)+$/.test(email)
        return validCheck
    }
    const HandleSubmit = async () => {
        const loginRequest = {
            "email": email,
            "password": password,
        }
        let a = await Login(loginRequest)
        console.log("@")
        console.log("1" + a)
        console.log("2" + a.status)
        console.log("3" + a.message)
    }

    return (
        <View style={{ alignItems: 'center', marginTop: '10%' }}>
            <Text
                h1
                h1Style={{ color: theme?.colors?.primary }}
            >
                Your Account
            </Text>
            <Input
                containerStyle={{ width: 250, marginTop: '10%' }}
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
                secureTextEntry={true}
            />
            <Button
                title={'Sign In'}
                containerStyle={{
                    width: 200,
                    marginHorizontal: 50,
                    marginVertical: 20,
                }}
                onPress={HandleSubmit}
                disabled={isDisable}
            />
        </View>
    )
}

const styles = StyleSheet.create({
    input: {
        width: "100%"
    }
});


