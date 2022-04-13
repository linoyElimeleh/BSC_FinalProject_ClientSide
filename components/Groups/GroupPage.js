import React, { useEffect, useState, useFocusEffect } from 'react';
import { StyleSheet, View, Pressable, ActivityIndicator, TextInput } from 'react-native';
import { Button, Text, Image, useTheme, Input, Card, Icon, Divider, Avatar, ListItem, Switch, FAB, Header as HeaderRNE, HeaderProps } from 'react-native-elements';
import { Login } from '../../services/AuthServices'
import AsyncStorage from "@react-native-async-storage/async-storage";
import groupScreenStyles from "./groupScreenStyles";
import { GetGroupMembers, GetGroupTasks } from '../../services/groupsService'
import { GetMeDetails } from '../../services/userService'
import { TasksServices } from '../../services'
import BottomSheetGroups from './BottomSheet';
import {useIsFocused} from "@react-navigation/native";

export default function GroupPage({ route, navigation }) {
    const group = route.params.group
    const [members, setMembers] = useState();
    const [tasks, setTasks] = useState();
    const [isVisible, setIsVisible] = useState(false);
    const [isSwitchChecked, setIsSwitchChecked] = useState(false);
    const [isLoading, setIsLoading] = useState(true);
    const [currentTaskId, setCurrentTaskId] = useState();
    const [me, setMe] = useState();
    const isFocused = useIsFocused();

    useEffect(() => {
        const GroupMembers = async () => {
            let response = await GetGroupMembers(group.id);
            console.log(response)
            setMembers(response)
        }
        const Grouptasks = async () => {
            let response = await GetGroupTasks(group.id);
            console.log(response)
            setTasks(response)
        }
        const MeDetails = async () => {
            let response = await GetMeDetails();
            console.log(response)
            setMe(response)
        }
        GroupMembers()
        Grouptasks()
        MeDetails()
    }, [isFocused])

    useEffect(() => {
        members && tasks && me && setIsLoading(false)
    }, [members && tasks && me])

    useEffect(() => {
        console.log(isSwitchChecked)
    }, [isSwitchChecked])

    const UpdateGrouptasks = async () => {
        let response = await GetGroupTasks(group.id);
        console.log(response)
        setTasks(response)
    }

    const handleDelete = async () => {
        const idJson = {
            "taskId": currentTaskId
        }
        setIsLoading(true)
        let response = await TasksServices.DeleteTask(group.id, idJson);
        handleBottomSheetRequsts(response)
    }

    const handleAssign = async () => {
        const bodyJson = {
            "taskId": currentTaskId,
            "userId": me.id
        }
        setIsLoading(true)
        let response = await TasksServices.AssignTask(group.id, bodyJson);
        handleBottomSheetRequsts(response)
    }

    const handleDone = async () => {
        const bodyJson = {
            "taskId": currentTaskId,
            "status": true
        }
        setIsLoading(true)
        let response = await TasksServices.SetStatusTask(group.id, bodyJson);
        handleBottomSheetRequsts(response)
    }

    const handleEdit = () => {
        //navigation but the page will be ready only at the next time
    }
    const handleReject = () => {
        //navigation but the page will be ready only at the next time
    }

    const handleBottomSheetRequsts = (response) => {
        setIsVisible(false)
        if (response.status > 300) {
            //snackBar
        }
        else {
            setIsLoading(false)
            UpdateGrouptasks()
        }
    }

    return (
        <View style={{ display: 'flex', flexDirection: 'column' }}>
            {!isLoading &&
                <HeaderRNE
                    centerComponent={{ text: group.name + " - " + members.map(member => (member.display_name)), style: styles.heading }}
                />}
            <View style={{ display: "flex", flexDirection: "row", marginTop: "3%" }} >
                <Switch
                    value={isSwitchChecked}
                    onValueChange={(value) => setIsSwitchChecked(value)}
                />
                <Text style={{ marginTop: "1.5%" }}>Only My Tasks</Text>
            </View>
            <View style={{ display: "flex", flexDirection: "row", flexWrap: "wrap", height: "100%" }}>
                {!isLoading && tasks.map((task, i) => (
                (isSwitchChecked && (Number(task.user_id) == Number(me.id)) || !isSwitchChecked) &&
                    <Card containerStyle={{ width: 175, backgroundColor: task.done == true ? "#b0ffa473" : "white" }} key={i}>
                        <Card.Title style={{ display: "flex", flexDirection: "column" }}>
                            {<Icon name="menu" onPress={() => { setIsVisible(true), setCurrentTaskId(task.id) }} />}
                            <Text>
                                {task.title}
                            </Text>
                        </Card.Title>
                        <Card.Divider />
                        <Text style={{ marginBottom: 10 }} >
                            {task.description}
                        </Text>
                        <View>
                            <Avatar
                                size={64}
                                rounded
                                source={{ uri: 'https://awildgeographer.files.wordpress.com/2015/02/john_muir_glacier.jpg' }}
                            >
                                <Avatar.Accessory size={24} source={{ uri: 'https://awildgeographer.files.wordpress.com/2015/02/john_muir_glacier.jpg' }} />
                            </Avatar>
                        </View>

                    </Card>
                ))}

            </View>

            {isVisible && <BottomSheetGroups handleAssign={handleAssign} handleDelete={handleDelete}
                handleDone={handleDone} handleEdit={handleEdit} handleReject={handleReject} isVisible={isVisible} setIsVisible={setIsVisible}/>}

            <FAB
                icon={{ name: 'add', color: 'white' }}
                color="#00aced" style={{ bottom: 200, right: 30, position: 'absolute', zIndex: 200 }}
                onPress={() => {navigation.navigate('Create Task', group)}}
            />
        </View>
    )
}




const styles = StyleSheet.create({
    subHeader: {
        backgroundColor: "#2089dc",
        color: "white",
        textAlign: "center",
        paddingVertical: 5,
        marginBottom: 10
    },
    horizontal: {
        marginBottom: 10,
    },
    horizontalText: {
        textAlign: 'center',
        fontSize: 16,
        marginVertical: 10,
    },
    vertical: {
        marginBottom: 10,
        display: 'flex',
        flexDirection: 'row-reverse',

    }, headerContainer: {
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#397af8',
        marginBottom: 20,
        width: '100%',
        paddingVertical: 15,
    },
    heading: {
        color: 'white',
        fontSize: 22,
        fontWeight: 'bold',
        top: -30,
        paddingBottom: -20,
    },
    headerRight: {
        display: 'flex',
        flexDirection: 'row',
        marginTop: 5,
    },
    subheaderText: {
        color: 'white',
        fontSize: 16,
        fontWeight: 'bold'
    }

});
