import { LineWeight } from '@material-ui/icons';
import React, { useEffect, useState } from 'react';
import { StyleSheet, View, Pressable, ActivityIndicator } from 'react-native';
import { Button, Text, Image, useTheme, Input, Avatar } from 'react-native-elements';

export default function SignUp() {
    const { theme } = useTheme();
    const LineWidth = 290
    const [name, setName] = useState("");
    const [date, setDate] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [confPassword, setConfPassword] = useState("");
    const [IsDisable, setIsDisable] = useState("");

    const ValidateEmail = () => {
        if (!email.length) return true
        const validCheck = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w\w+)+$/.test(email)
        setIsDisable(!validCheck? true:false) 
        return validCheck
    }

    const ValidateDate = () => {
            if (!date.length) return true
            // First check for the pattern
            if (!/^\d{1,2}\/\d{1,2}\/\d{4}$/.test(date))
                return false;
            // Parse the date parts to integers
            var parts = date.split("/");
            var day = parseInt(parts[1], 10);
            var month = parseInt(parts[0], 10);
            var year = parseInt(parts[2], 10);
            // Check the ranges of month and year
            if (year < 1000 || year > 3000 || month == 0 || month > 12)
                return false;
            var monthLength = [31, 28, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31];
            // Adjust for leap years
            if (year % 400 == 0 || (year % 100 != 0 && year % 4 == 0))
                monthLength[1] = 29;
            // Check the range of the day
            return day > 0 && day <= monthLength[month - 1];
        }


    return (
        <View style={{alignItems:"center",display:"flex"}}>
            <Text
                // style={styles.text}
                h1
                h1Style={{ color: theme?.colors?.primary }}
            >
                Create Account
            </Text>
            <View style={{ display: "flex", alignItems: "center", margin: "5" }}>
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
                onChangeText={value => setName(value)}
            />
            <Input
                containerStyle={{ width: LineWidth }}
                placeholder='mm/dd/yyy'
                leftIcon={{ type: 'font-awesome', name: 'calendar' }}
                errorMessage={ValidateDate() ? "" : "date is invalid"}
                onChangeText={value => setDate(value)}
            />
            <Input
                containerStyle={{ width: LineWidth }}
                placeholder='Email@address.com'
                leftIcon={{ type: 'font-awesome', name: 'envelope' }}
                errorMessage={ValidateEmail() ? "" : "Email is invalid"}
                onChangeText={value => setEmail(value)}
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
                errorMessage={password == confPassword || !confPassword.length? "" : "Passwords are not equals"}
                onChangeText={value => setConfPassword(value)}
            />
            <Button
                title={'Sign Up'}
                containerStyle={{
                    width: 200,
                    marginHorizontal: 50,
                    marginVertical: 10,
                }}
            />
        </View>
    )
}


