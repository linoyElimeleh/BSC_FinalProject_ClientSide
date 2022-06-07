import React, { useEffect, useState } from "react";
import { View } from "react-native";
import { Button, Text, useTheme, Input, Avatar } from "react-native-elements";
import { RegisterUser } from "../../services/AuthServices";
import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { PhotoPickerWithMenu } from "../App";
import {uploadImage} from "../../services/ImageUploadService";
import {createImageFormData} from "../../utils/dateUtils";

export default function SignUp({ navigation, route }) {
    const { theme } = useTheme();
    const LineWidth = 290;
    const [image, setImage] = useState("");
    const [name, setName] = useState("");
    const [date, setDate] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [confPassword, setConfPassword] = useState("");
    const [isDisable, setIsDisable] = useState("");
    const [errorMessage, setErrorMessage] = useState("");
    const [isLoading, setIsLoading] = useState(false);
    const [imageBase64, setImageBase64] = useState(null);

    const { pushToken } = route.params;

    useEffect(() => {
        ValidateDate() &&
        ValidateEmail() &&
        password.length > 6 &&
        password.length &&
        password == confPassword
            ? setIsDisable(false)
            : setIsDisable(true);
    }, [name, date, email, password, confPassword]);

    const storeData = async (key, value) => {
        try {
            await AsyncStorage.setItem(key, value);
        } catch (e) {
            console.log("AsyncStorage set error: " + e.message);
        }
    };

    const HandleSubmit = async () => {
        setIsLoading(true);
        let imagePath;
        if(image != ""){
            const form = createImageFormData(image, imageBase64)
            const imageRes = await uploadImage(form);
            imagePath = imageRes.path;
        }
        const registerRequest = {
            email: email,
            password: password,
            display_name: name,
            birth_date: date,
            image: imagePath
        };
        const token = pushToken ? { notification_token: pushToken } : {};
        let response = await RegisterUser({...registerRequest, ...token});
        setIsLoading(false);
        if (response.error) {
            setErrorMessage(response.error);
        } else {
            setErrorMessage("");
            response?.accessToken && await storeData("Access Token", response.accessToken);
            response?.refreshToken && await storeData("Refresh Access Token", response.refreshToken);
            navigation.navigate("Tabs");
        }
    };

    const ValidateEmail = () => {
        if (!email.length) return true;
        const validCheck = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w\w+)+$/.test(
            email
        );
        return validCheck;
    };

    const ValidateDate = () => {
        if (!date.length) return true;
        // First check for the pattern
        if (!/^\d{1,2}\/\d{1,2}\/\d{4}$/.test(date)) return false;
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
    };

    return (
        <KeyboardAwareScrollView
            keyboardShouldPersistTaps={"always"}
            style={{ flex: 1 }}
            showsVerticalScrollIndicator={false}
        >
            <View
                style={{
                    alignItems: "center",
                    display: "flex",
                    marginTop: "10%",
                }}
            >
                <Text h1 h1Style={{ color: theme?.colors?.primary }}>
                    Create Account
                </Text>
                <PhotoPickerWithMenu
                    avatarIcon="person"
                    image={image}
                    setImageBase64={setImageBase64}
                    setImage={setImage}
                />
                <Input
                    containerStyle={{ width: LineWidth }}
                    placeholder="Name"
                    leftIcon={{ type: "font-awesome", name: "user" }}
                    onChangeText={(value) => setName(value)}
                />
                <Input
                    containerStyle={{ width: LineWidth }}
                    placeholder="mm/dd/yyy"
                    leftIcon={{ type: "font-awesome", name: "calendar" }}
                    errorMessage={ValidateDate() ? "" : "date is invalid"}
                    onChangeText={(value) => setDate(value)}
                />
                <Input
                    containerStyle={{ width: LineWidth }}
                    placeholder="Email@address.com"
                    leftIcon={{ type: "font-awesome", name: "envelope" }}
                    errorMessage={ValidateEmail() ? "" : "Email is invalid"}
                    onChangeText={(value) => setEmail(value)}
                />
                <Input
                    containerStyle={{ width: LineWidth }}
                    placeholder="Password(min 7 chars)"
                    leftIcon={{ type: "font-awesome", name: "lock" }}
                    errorMessage={
                        password.length > 6 || !password.length
                            ? ""
                            : "Password is under 7 chars"
                    }
                    onChangeText={(value) => setPassword(value)}
                    secureTextEntry={true}
                />
                <Input
                    containerStyle={{ width: LineWidth }}
                    placeholder="Confirm Password"
                    leftIcon={{ type: "font-awesome", name: "lock" }}
                    errorMessage={
                        password == confPassword || !confPassword.length
                            ? ""
                            : "Passwords are not equals"
                    }
                    onChangeText={(value) => setConfPassword(value)}
                    secureTextEntry={true}
                />
                <Text h4 h4Style={{ color: theme?.colors?.warning }}>
                    {errorMessage}
                </Text>
                <Button
                    title={"Sign Up"}
                    containerStyle={{
                        width: 200,
                        marginHorizontal: 50,
                        marginVertical: 10,
                    }}
                    disabled={isDisable}
                    onPress={HandleSubmit}
                    loading={isLoading}
                />
            </View>
        </KeyboardAwareScrollView>
    );
}
