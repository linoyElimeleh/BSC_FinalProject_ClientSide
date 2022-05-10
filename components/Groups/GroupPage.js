import React, { useEffect, useState, useRef } from 'react';
import { StyleSheet, View, ScrollView } from 'react-native';
import { Text, Card, Icon, Avatar, Switch, FAB, Header as HeaderRNE } from 'react-native-elements';
import { GetGroupMembers, GetGroupTasks } from '../../services/groupsService'
import { GetMeDetails } from '../../services/userService'
import { TasksServices } from '../../services'
import BottomSheetGroups from './BottomSheet';
import { useIsFocused } from "@react-navigation/native";
import DeleteTaskDialog from "../Tasks/DeleteTaskDialg"
import RejectTaskDialog from '../Tasks/RejectTask'
import Dialog from "react-native-dialog";

export default function GroupPage({ route, navigation }) {
    const group = route.params.group
    const [members, setMembers] = useState();
    const [tasks, setTasks] = useState();
    const [isDeleteDialogVisible, setIsDeleteDialogVisible] = useState(false);
    const [isRejectDialogVisible, setIsRejectDialogVisible] = useState(false);
    const [isSwitchChecked, setIsSwitchChecked] = useState(false);
    const [isLoading, setIsLoading] = useState(true);
    const [currentTask, setCurrentTask] = useState();
    const [me, setMe] = useState();
    const isFocused = useIsFocused();
    const refRBSheet = useRef();

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

    const UpdateGrouptasks = async () => {
        let response = await GetGroupTasks(group.id);
        console.log(response)
        setTasks(response)
    }

    const handleDelete = async () => {
        const idJson = {
            "taskId": currentTask.id
        }
        setIsLoading(true)
        let response = await TasksServices.DeleteTask(group.id, idJson);
        handleBottomSheetRequsts(response)
    }

    const handleAssign = async () => {
        const bodyJson = {
            "taskId": currentTask.id,
            "userId": me.id
        }
        setIsLoading(true)
        let response = await TasksServices.AssignTask(group.id, bodyJson);
        handleBottomSheetRequsts(response)
    }

    const handleDone = async () => {
        const bodyJson = {
            "taskId": currentTask.id,
            "status": true
        }
        setIsLoading(true)
        let response = await TasksServices.SetStatusTask(group.id, bodyJson);
        handleBottomSheetRequsts(response)
    }

    const handleEdit = () => {
        navigation.navigate('Create Task', { isEdit: true, task: currentTask })
        //navigation but the page will be ready only at the next time
    }
    const handleReject = () => {
        // const idJson = {
        //     "taskId": currentTask.id
        // }
        // setIsLoading(true)
        // let response = await TasksServices.DeleteTask(group.id, idJson);
        // handleBottomSheetRequsts(response)
    }

    const handleBottomSheetRequsts = (response) => {
        if (response.status > 300) {
            //snackBar
        }
        else {
            setIsLoading(false)
            UpdateGrouptasks()
        }
    }
    useEffect(() => {
        console.log(isDeleteDialogVisible, 'momor')
        // setIsLoading(isLoading)
    }, [isDeleteDialogVisible])

    const handleA = () => {
        setIsDeleteDialogVisible(true)
        refRBSheet.current.close()
    }
    const handleB = () => {
        setIsRejectDialogVisible(true)
        refRBSheet.current.close()
    }
    return (
        <View style={{ display: 'flex', flexDirection: 'column' }}>
            {console.log("grouppage")}
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

            <ScrollView>

                <View style={{ display: "flex", flexDirection: "row", flexWrap: "wrap", paddingBottom: 160 }}>

                    {!isLoading && tasks.map((task, i) => (
                        (isSwitchChecked && (Number(task.user_id) == Number(me.id)) || !isSwitchChecked) &&
                        <Card containerStyle={{ width: 175, backgroundColor: task.done == true ? "#b0ffa473" : "white" }} key={i}>
                            <Card.Title style={{ display: "flex", flexDirection: "column" }}>
                                {<Icon name="menu" onPress={() => { setCurrentTask(task), refRBSheet.current.open() }} />}
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

            </ScrollView>

            <BottomSheetGroups handleA={handleA} handleB={handleB}
                refRBSheet={refRBSheet} handleAssign={handleAssign}
                handleDone={handleDone} handleEdit={handleEdit} />

            <FAB
                icon={{ name: 'add', color: 'white' }}
                color="#00aced" style={{ bottom: 50, right: 30, position: "absolute" , zIndex: 200 }}
                onPress={() => { navigation.navigate('Create Task', group) }}
            />

            {isDeleteDialogVisible &&
                <DeleteTaskDialog isVisible={isDeleteDialogVisible}
                    setIsVisible={setIsDeleteDialogVisible} handleDelete={handleDelete}/>
            }

            {isRejectDialogVisible &&
                <RejectTaskDialog task={currentTask} isVisible={isRejectDialogVisible}
                    setIsVisible={setIsRejectDialogVisible} handleReject={handleReject}
                    me={me} groupID={group.id} />
            }
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
