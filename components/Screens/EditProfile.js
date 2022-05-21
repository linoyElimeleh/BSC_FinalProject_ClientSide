import React, {useEffect, useRef, useState} from 'react';
import {StyleSheet, View, TouchableOpacity, ActivityIndicator} from 'react-native';
import {Button, Text, Dialog, useTheme, Avatar, Image, Input, BottomSheet, ListItem} from 'react-native-elements';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import {GetMeDetails} from '../../services/userService';
import {useIsFocused} from '@react-navigation/native';
import {PhotoPickerWithMenu} from "../App";
import {createImageFormData, formatDate} from "../../utils/dateUtils";
import {editProfile} from "../../services/userService";
import {uploadImage} from "../../services/ImageUploadService";

export default function EditProfile({navigation}) {
    const {theme} = useTheme();
    const [image, setImage] = useState(null);
    const [imageBase64, setImageBase64] = useState(null);
    const [initialUserName, setInitialUserName] = useState("");
    const [userName, setUserName] = useState("");
    const [email, setEmail] = useState("");
    const [birthDate, setBirthDate] = useState("");
    const [isLoading, setIsLoading] = useState(false);
    const isFocused = useIsFocused();

    useEffect(async () => {
        let response = await GetMeDetails();
        setUserName(response.display_name);
        setEmail(response.email);
        setImage(response.image)
        const date = new Date(response.birth_date);
        const formattedDate = formatDate(date);
        setBirthDate(formattedDate);
        setInitialUserName(response.display_name);
    }, [isFocused]);

    const checkChange = () => {
        const userNameChanged = userName !== initialUserName;
        return !(userNameChanged || image != null)
    }

    const handleSubmit = async () =>{
        setIsLoading(true);
        const form = createImageFormData(image, imageBase64)
        const imageRes = await uploadImage(form);
        const imagePath = imageRes.path;
        const response = await editProfile(userName, imagePath, birthDate)
        setIsLoading(false);
        if(response.ok){
            navigation.navigate('Profile');
        }
    }

    return (
        <View>
            <View style={styles.containerStyle}>
                <Text
                    h1
                    h1Style={{color: theme?.colors?.primary}}
                >
                    My Profile
                </Text>
                <PhotoPickerWithMenu
                    avatarIcon='person'
                    image={image}
                    setImageBase64={setImageBase64}
                    setImage={setImage}/>
                <Input
                    containerStyle={styles.textStyle}
                    leftIcon={{type: 'font-awesome', name: 'user'}}
                    onChangeText={value => {
                        setUserName(value)
                    }}
                    value={userName}
                />
                <Input
                    placeholder={email}
                    containerStyle={styles.textStyle}
                    leftIcon={{type: 'font-awesome', name: 'envelope'}}
                    disabled={true}
                />
                <Input
                    containerStyle={styles.textStyle}
                    placeholder={birthDate}
                    leftIcon={{type: 'font-awesome', name: 'calendar'}}
                    disabled={true}
                />
                <Button
                    title={'Save'}
                    containerStyle={styles.buttonStyle}
                    disabled={checkChange()}
                    onPress={handleSubmit}
                    loading={isLoading}
                />
            </View>
        </View>
    )
}

const styles = StyleSheet.create({
    changePasswordText: {
        color: "blue",
        margin: 5
    },
    buttonStyle: {
        width: 200,
        marginHorizontal: 50,
        marginVertical: 10,
    },
    containerStyle: {
        alignItems: "center",
        display: "flex",
        marginTop: '10%'
    },
    textStyle: {
        width: 280
    },
    image: {
        width: 150,
        height: 150,
        borderRadius: 150 / 2,
        overflow: "hidden",
    },
    panel: {
        padding: 20,
        backgroundColor: '#FFFFFF',
        paddingTop: 20,
        // borderTopLeftRadius: 20,
        // borderTopRightRadius: 20,
        // shadowColor: '#000000',
        // shadowOffset: {width: 0, height: 0},
        // shadowRadius: 5,
        // shadowOpacity: 0.4,
    },
    header: {
        backgroundColor: '#FFFFFF',
        shadowColor: '#333333',
        shadowOffset: {width: -1, height: -3},
        shadowRadius: 2,
        shadowOpacity: 0.4,
        // elevation: 5,
        paddingTop: 20,
        borderTopLeftRadius: 20,
        borderTopRightRadius: 20,
    },
    panelHeader: {
        alignItems: 'center',
    },
    panelHandle: {
        width: 40,
        height: 8,
        borderRadius: 4,
        backgroundColor: '#00000040',
        marginBottom: 10,
    },
    panelTitle: {
        fontSize: 27,
        height: 35,
    },
    panelSubtitle: {
        fontSize: 14,
        color: 'gray',
        height: 30,
        marginBottom: 10,
    },
    panelButton: {
        padding: 13,
        borderRadius: 10,
        backgroundColor: '#2089dc',
        alignItems: 'center',
        marginVertical: 7,
    },
    panelButtonTitle: {
        fontSize: 17,
        fontWeight: 'bold',
        color: 'white',
    },
});
