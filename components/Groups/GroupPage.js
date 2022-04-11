import React, { useEffect, useState, useFocusEffect } from 'react';
import { StyleSheet, View, Pressable, ActivityIndicator, TextInput } from 'react-native';
import { Button, Text, Image, useTheme, Input, Card, Icon, Divider, Avatar, BottomSheet, ListItem, Switch, FAB, Header as HeaderRNE, HeaderProps } from 'react-native-elements';
import { Login } from '../../services/AuthServices'
import AsyncStorage from "@react-native-async-storage/async-storage";
import groupScreenStyles from "./groupScreenStyles";
import { GetGroupMembers, GetGroupTasks } from '../../services/groupsService'
import { GetMeDetails } from '../../services/userService'
import { TasksServices } from '../../services'

export default function GroupPage({ route, navigation }) {
    const group = route.params.group
    const [members, setMembers] = useState();
    const [tasks, setTasks] = useState();
    const [isDisable, setIsDisable] = useState(true);
    const [errorMessage, setErrorMessage] = useState("");
    const [isVisible, setIsVisible] = useState(false);
    const [isSwitchChecked, setIsSwitchChecked] = useState(false);
    const [isLoading, setIsLoading] = useState(true);
    const [currentTaskId, setCurrentTaskId] = useState();
    const [me, setMe] = useState();

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
    }, [])


    const UpdateGrouptasks = async () => {
        let response = await GetGroupTasks(group.id);
        console.log(response)
        setTasks(response)
    }



    useEffect(() => {
        members && tasks && me && setIsLoading(false)
    }, [members && tasks && me])

    const handleDelete = async () => {
        // console.log(currentTaskId)
        const idJson = {
            "taskId": currentTaskId
        }
        setIsVisible(false)
        setIsLoading(true)
        let response = await TasksServices.DeleteTask(group.id, idJson);

        if (response.error) {
            //snackBar
        }
        else {
            setIsLoading(false)
            UpdateGrouptasks()
        }
    }

    const handleAssign = async () => {
        const bodyJson = {
            "taskId": currentTaskId,
            "userId": me.id
        }
        setIsVisible(false)
        setIsLoading(true)
        let response = await TasksServices.AssignTask(group.id, bodyJson);
        if (response.status>300) {
            //snackBar
        }
        else {
            setIsLoading(false)
            UpdateGrouptasks()
        }
    }

    const handleDone = async () => {
        const bodyJson = {
            "taskId": currentTaskId,
            "status": true
        }
        setIsVisible(false)
        setIsLoading(true)
        let response = await TasksServices.SetStatusTask(group.id, bodyJson);
        if (response.status>300) {
            //snackBar
        }
        else {
            setIsLoading(false)
            UpdateGrouptasks()
        }
    }

    const handleEdit = () => {
        //navigation
    }

    const handleReject = () => {
        //navigation but the page will be ready only at the next time
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
                    isSwitchChecked && task.user_id == me.id || !isSwitchChecked &&
                    <Card containerStyle={{ width: 175, backgroundColor: task.done == true ? "#b0ffa473" : "white" }} key={i}>
                        <Card.Title style={{ display: "flex", flexDirection: "column" }}>
                            {
                                // !task.done && 
                                <Icon name="menu" onPress={() => { setIsVisible(true), setCurrentTaskId(task.id) }} />}
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

            <BottomSheet modalProps={{}} isVisible={isVisible}  >
                <ListItem
                    key={1}
                    containerStyle={{ backgroundColor: 'green' }}
                    onPress={() => handleDone()}
                >
                    <ListItem.Content >
                        <ListItem.Title >Done!</ListItem.Title>
                    </ListItem.Content>
                </ListItem>
                <ListItem
                    key={2}
                    //containerStyle={l.containerStyle}
                    onPress={() => handleAssign()}
                >
                    <ListItem.Content>
                        <ListItem.Title>Assign to me</ListItem.Title>
                    </ListItem.Content>
                </ListItem>
                <ListItem
                    key={3}
                    //containerStyle={l.containerStyle}
                    onPress={() => handleEdit()}
                >
                    <ListItem.Content>
                        <ListItem.Title>Edit</ListItem.Title>
                    </ListItem.Content>
                </ListItem>
                <ListItem
                    key={4}
                    //containerStyle={l.containerStyle}
                    onPress={() => handleDelete()}
                >
                    <ListItem.Content>
                        <ListItem.Title >Delete</ListItem.Title>
                    </ListItem.Content>
                </ListItem>
                <ListItem
                    key={5}
                    //containerStyle={l.containerStyle}
                    onPress={() => handleReject()}
                >
                    <ListItem.Content>
                        <ListItem.Title >Reject</ListItem.Title>
                    </ListItem.Content>
                </ListItem>
                <ListItem
                    key={6}
                    //containerStyle={l.containerStyle}
                    onPress={() => setIsVisible(!isVisible)}
                >
                    <ListItem.Content>
                        <ListItem.Title style={{ display: "flex", justifyContent: "center" }} >
                            close
                            <Icon name="close" />
                        </ListItem.Title>
                    </ListItem.Content>
                </ListItem>
            </BottomSheet>




            {/* <View style={{bottom:-430,right:30,position:'absolute'}}> */}
            <FAB
                icon={{ name: 'add', color: 'white' }}
                color="#00aced" style={{ bottom: 200, right: 30, position: 'absolute', zIndex: 200 }}
                onPress={() => { }}
            />
            {/* </View> */}

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
