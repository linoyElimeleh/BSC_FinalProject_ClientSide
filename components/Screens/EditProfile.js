import React, {useEffect, useLayoutEffect, useRef, useState} from 'react';
import {StyleSheet, View, TouchableOpacity, ActivityIndicator} from 'react-native';
import {Button, Text, Dialog, useTheme, Avatar, Image, Input, BottomSheet, ListItem} from 'react-native-elements';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import {GetMeDetails} from '../../services/userService';
import {useIsFocused} from '@react-navigation/native';
import * as ImagePicker from 'expo-image-picker';
import RBSheet from 'react-native-raw-bottom-sheet';

export default function EditProfile({navigation}) {
    const {theme} = useTheme();
    const [image, setImage] = useState(null);
    const [imageBase64, setImageBase64] = useState(null);
    const [initialUserName, setInitialUserName] = useState("");
    const [userName, setUserName] = useState("");
    const [email, setEmail] = useState("");
    const [birthDate, setBirthDate] = useState();
    const [isLoading, setIsLoading] = useState(false);
    const [isVisible, setIsVisible] = useState(false);
    const isFocused = useIsFocused();
    const refRBSheet = useRef();

    useEffect(async () => {
        let response = await GetMeDetails();
        setUserName(response.display_name);
        setEmail(response.email);
        setBirthDate(response.birth_date);
        setInitialUserName(response.display_name);
    }, [isFocused]);

    const openCamera = async () => {
        setIsLoading(true);
        const permissionResult = await ImagePicker.requestCameraPermissionsAsync();
        if (permissionResult.granted === false) {
            alert("You've refused to allow this app to access your camera!");
            return;
        }
        let result = await ImagePicker.launchCameraAsync({
            mediaTypes: ImagePicker.MediaTypeOptions.All,
            allowsEditing: true,
            presentationStyle: ImagePicker.UIImagePickerPresentationStyle.BlurOverFullScreen,
            quality: 1,
            base64: true
        });
        refRBSheet.current.close();
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
        refRBSheet.current.close();
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

    return (
        <View>
                <RBSheet
                    ref={refRBSheet}
                    closeOnDragDown={true}
                    closeOnPressMask={true}
                    customStyles={{
                        wrapper: {
                            backgroundColor: "transparent"
                        },
                        draggableIcon: {
                            backgroundColor: "transparent"
                        }
                    }}
                    height={360}
                >
                    <View style={styles.header}>
                        <View style={styles.panelHeader}>
                            <View style={styles.panelHandle}/>
                        </View>
                    </View>
                    <View style={styles.panel}>
                        <View style={{alignItems: 'center'}}>
                            <Text style={styles.panelTitle}>Upload Photo</Text>
                            <Text style={styles.panelSubtitle}>Choose Your Profile Picture</Text>
                        </View>
                        <TouchableOpacity style={styles.panelButton} onPress={openCamera}>
                            <Text style={styles.panelButtonTitle}>Take Photo</Text>
                        </TouchableOpacity>
                        <TouchableOpacity style={styles.panelButton} onPress={pickImage}>
                            <Text style={styles.panelButtonTitle}>Choose From Library</Text>
                        </TouchableOpacity>
                        <TouchableOpacity
                            style={styles.panelButton}
                            onPress={() => setIsVisible(false)}>
                            <Text style={styles.panelButtonTitle}>Cancel</Text>
                        </TouchableOpacity>
                    </View>
                </RBSheet>
            <BottomSheet
                isVisible={isVisible}
                containerStyle={{backgroundColor: 'rgba(0.5, 0.25, 0, 0.2)'}}
            >
                <View style={styles.header}>
                    <View style={styles.panelHeader}>
                        <View style={styles.panelHandle}/>
                    </View>
                </View>
                <View style={styles.panel}>
                    <View style={{alignItems: 'center'}}>
                        <Text style={styles.panelTitle}>Upload Photo</Text>
                        <Text style={styles.panelSubtitle}>Choose Your Profile Picture</Text>
                    </View>
                    <TouchableOpacity style={styles.panelButton} onPress={openCamera}>
                        <Text style={styles.panelButtonTitle}>Take Photo</Text>
                    </TouchableOpacity>
                    <TouchableOpacity style={styles.panelButton} onPress={pickImage}>
                        <Text style={styles.panelButtonTitle}>Choose From Library</Text>
                    </TouchableOpacity>
                    <TouchableOpacity
                        style={styles.panelButton}
                        onPress={() => setIsVisible(false)}>
                        <Text style={styles.panelButtonTitle}>Cancel</Text>
                    </TouchableOpacity>
                </View>
            </BottomSheet>
            <View style={styles.containerStyle}>
                <Text
                    h1
                    h1Style={{color: theme?.colors?.primary}}
                >
                    My Profile
                </Text>
                <View style={{display: "flex", alignItems: "center", margin: '5%'}}>
                    {image ?
                        <Image
                            source={{uri: image}}
                            PlaceholderContent={<ActivityIndicator/>}
                            onPress={() => refRBSheet.current.open()}
                            style={styles.image}/>
                        :
                        <Avatar
                            size={64}
                            rounded
                            icon={{name: 'adb', type: 'material'}}
                            containerStyle={{backgroundColor: 'orange'}}
                            onPress={() => refRBSheet.current.open()}
                        >
                            <Avatar.Accessory size={24}/>
                        </Avatar>
                    }
                </View>
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
