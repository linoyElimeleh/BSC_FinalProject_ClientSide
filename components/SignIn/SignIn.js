import React, { useEffect, useState } from 'react';
import { StyleSheet, View, Pressable, ActivityIndicator, TextInput } from 'react-native';
import { Button, Text, Image, useTheme, Input } from 'react-native-elements';
import { Login } from '../../services/AuthServices'
import AsyncStorage from "@react-native-async-storage/async-storage";

export default function SignIn({ navigation }) {
    const { theme } = useTheme();
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [isDisable, setIsDisable] = useState(true);
    const [errorMessage, setErrorMessage] = useState("");
    const [isLoading, setIsLoading] = useState(false);

    useEffect(() => {
        ValidateEmail() && email.length && password.length ? setIsDisable(false) : setIsDisable(true)
    }, [email, password])

    const ValidateEmail = () => {
        if (!email.length) return true
        const validCheck = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w\w+)+$/.test(email)
        return validCheck
    }

    const storeData = async (key, value) => {
        try {
            await AsyncStorage.setItem(key, value)
        } catch (e) {
            console.log('AsyncStorage set error: ' + error.message);
        }
    }

    const HandleSubmit = async () => {
        setIsLoading(true)
        const loginRequest = {
            "email": email,
            "password": password,
        }
        let response = await Login(loginRequest)
        setIsLoading(false)
        if (response.error) {
            setErrorMessage(response.error)
        }
        else {
            setErrorMessage("")
            await storeData("Access Token", response.accessToken);
            await storeData("Refresh Access Token", response.refreshToken);
            navigation.navigate('Groups');
        }
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
            <Text
                h4
                h4Style={{ color: theme?.colors?.warning }}>
                {errorMessage}
            </Text>
            <Button
                title={'Sign In'}
                containerStyle={{
                    width: 200,
                    marginHorizontal: 50,
                    marginVertical: 20,
                }}
                onPress={HandleSubmit}
                disabled={isDisable}
                loading={isLoading}
            />
        </View>
    )
}

const styles = StyleSheet.create({
    input: {
        width: "100%"
    }
});


