import React, {useEffect, useLayoutEffect, useState} from 'react';
import { StyleSheet, View, TouchableOpacity, ActivityIndicator } from 'react-native';
import {Button, Text, Dialog, useTheme, Avatar, Image, Input} from 'react-native-elements';
import Icon from "react-native-vector-icons/MaterialCommunityIcons";
import {removeData} from "../../utils/asyncStorageUtils";
import {GetMeDetails} from "../../services/userService";
import {useIsFocused} from "@react-navigation/native";
import * as ImagePicker from 'expo-image-picker';

export default function EditProfile({navigation}) {
    const { theme } = useTheme();
    const [image, setImage] = useState(null);
    const [imageBase64, setImageBase64] = useState(null);
    const [dialogOpen,setDialogOpen] = useState(false);
    const [cameraDialogOpen,setCameraDialogOpen] = useState(false);
    const [initialUserName,setInitialUserName] = useState("");
    const [userName,setUserName] = useState("");
    const [email,setEmail] = useState("");
    const [birthDate,setBirthDate] = useState("");
    const [isLoading, setIsLoading] = useState(false);
    const isFocused = useIsFocused();

    useLayoutEffect(()=>{
        navigation.setOptions({
            headerRight: () =>
                <Icon.Button
                    name="logout"
                    backgroundColor={theme?.colors?.primary}
                    onPress={()=>setDialogOpen(true)}
                    size={28}
                />
        })
    })

    useEffect(async ()=>{
        let response = await GetMeDetails();
        setUserName(response.display_name);
        setEmail(response.email);
        setBirthDate(response.birth_date);
        setInitialUserName(response.display_name);
    },[isFocused]);

    const openCamera = async () => {
        setIsLoading(true);
        const permissionResult = await ImagePicker.requestCameraPermissionsAsync();
        if (permissionResult.granted === false) {
            alert("You've refused to allow this appp to access your camera!");
            return;
        }
        let result = await ImagePicker.launchCameraAsync({
            mediaTypes: ImagePicker.MediaTypeOptions.All,
            allowsEditing: true,
            presentationStyle: ImagePicker.UIImagePickerPresentationStyle.BlurOverFullScreen,
            quality: 1,
            base64: true
        });
        applyResult(result);
    }

    const pickImage = async () => {
        setIsLoading(true);
        let result = await ImagePicker.launchImageLibraryAsync({
            mediaTypes: ImagePicker.MediaTypeOptions.All,
            allowsEditing: true,
            presentationStyle: ImagePicker.UIImagePickerPresentationStyle.BlurOverFullScreen,
            quality: 1,
            base64: true
        });
        applyResult(result);

    };

    function applyResult(result) {
        if (!result.cancelled) {
            setImage(result.uri);
            setImageBase64(result.base64)
        }
        setIsLoading(false)
    }

    const checkChange = () => {
        const userNameChanged = userName !== initialUserName;
        return !userNameChanged
    }

    const logout = () => {
        const removed = removeData("Access Token");
        if(removed){
            navigation.navigate('Welcome Page')
        }
        else {
            alert("cant logout!");
            setDialogOpen(false);
        }
    }

    return (
        <View>
            <Dialog
                isVisible={cameraDialogOpen}
                onBackdropPress={() => setCameraDialogOpen(!cameraDialogOpen)}>
                <Dialog.Title title="Select Image"/>
                {["Take Photo...", "Select from Library..."].map((l, i) => (
                    <Button
                        key={i}
                        title={l}
                        style={{marginTop: 10}}
                        buttonStyle={{backgroundColor: "white", justifyContent: "flex-start"}}
                        titleStyle={{color: "black"}}
                        onPress={async () => {
                            switch (i) {
                                case 0:
                                    await openCamera()
                                    break
                                case 1:
                                    await pickImage();
                                    break
                            }
                            setCameraDialogOpen(false)
                        }}
                    >
                    </Button>
                ))}
            </Dialog>
            <View style={styles.containerStyle}>
                <Text
                    h1
                    h1Style={{color: theme?.colors?.primary}}
                >
                    My Profile
                </Text>
                <View style={{display: "flex", alignItems: "center", margin: '5%'}}>
                    {image?
                        <Image
                            source={{uri:image}}
                            PlaceholderContent={<ActivityIndicator />}
                            onPress={()=>setCameraDialogOpen(true)}
                            style={styles.image}/>
                        :
                        <Avatar
                            size={64}
                            rounded
                            icon={{name: 'adb', type: 'material'}}
                            containerStyle={{backgroundColor: 'orange'}}
                            onPress={()=>setCameraDialogOpen(true)}
                        >
                            <Avatar.Accessory size={24}/>
                        </Avatar>
                    }
                </View>
                <Input
                    containerStyle={styles.textStyle}
                    leftIcon={{type: 'font-awesome', name: 'user'}}
                    onChangeText={value => { setUserName(value) }}
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
                    title={'Edit'}
                    containerStyle={styles.buttonStyle}
                    disabled={checkChange()}
                    //onPress={HandleSubmit}
                    //loading={isLoading}
                />

            </View>
        </View>
    )
}


const styles = StyleSheet.create({
    changePasswordText: {
        color:"blue",
        margin: 5
    },
    buttonStyle:{
        width: 200,
        marginHorizontal: 50,
        marginVertical: 10,
    },
    containerStyle:{
        alignItems: "center",
        display: "flex",
        marginTop: '10%'
    },
    textStyle:{
        width:280
    },
    image:{
        width: 150,
        height: 150,
        borderRadius: 150 / 2,
        overflow: "hidden",
    }
});
