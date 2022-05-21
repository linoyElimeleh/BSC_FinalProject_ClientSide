import React, { useEffect, useState, useRef, useFocusEffect } from 'react';
import { StyleSheet, View, ScrollView,Pressable,ActivityIndicator,TextInput} from 'react-native';
import { Text, Card, Icon, Avatar, Switch, FAB, Header as HeaderRNE,Button,Divider,ListItem,HeaderProps} from 'react-native-elements';
import { GetGroupMembers, GetGroupTasks } from '../../services/groupsService'
import { GetMeDetails } from '../../services/userService'
import { TasksServices } from '../../services'
import BottomSheetGroups from './BottomSheet';
import { useIsFocused } from "@react-navigation/native";
import DeleteTaskDialog from "../Tasks/DeleteTaskDialg"
import RejectTaskDialog from '../Tasks/RejectTask'
//import Dialog from "react-native-dialog";


export default function GroupPage({ route, navigation }) {
    const group = route.params.group;
    const groupId = group.group_id;
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
            let response = await GetGroupMembers(groupId);
            setMembers(response);
        };
        const Grouptasks = async () => {
            let response = await GetGroupTasks(groupId);
            setTasks(response);
        };
        const MeDetails = async () => {
            let response = await GetMeDetails();
            setMe(response);
        };
        GroupMembers();
        Grouptasks();
        MeDetails();
    }, [isFocused]);

    useEffect(()=> {
        //navigation.setOptions({title: route.params.name + members?.map((member) => member.display_name)})
    },[members])

    useEffect(() => {
        members && tasks && me && setIsLoading(false);
    }, [members && tasks && me]);

    useEffect(() => {}, [isSwitchChecked]);

    const UpdateGrouptasks = async () => {
        let response = await GetGroupTasks(groupId);
        setTasks(response);
    };

    const handleDelete = async () => {
        const idJson = {
            "taskId": currentTask.id
        }
        setIsLoading(true)
        let response = await TasksServices.DeleteTask(groupId, idJson);
        handleBottomSheetRequsts(response);
    };

    const handleAssign = async () => {
        const bodyJson = {
            "taskId": currentTask.id,
            "userId": me.id
        }
        setIsLoading(true)
        let response = await TasksServices.AssignTask(groupId, bodyJson);
        handleBottomSheetRequsts(response);
    };

    const handleDone = async () => {
        const bodyJson = {
            "taskId": currentTask.id,
            "status": true
        }
        setIsLoading(true)
        let response = await TasksServices.SetStatusTask(groupId, bodyJson);
        handleBottomSheetRequsts(response);
    };

    const handleEdit = () => {
        navigation.navigate('Create Task', { isEdit: true, task: currentTask })
        //navigation but the page will be ready only at the next time
    };
    const handleReject = () => {
        // const idJson = {
        //     "taskId": currentTask.id
        // }
        // setIsLoading(true)
        // let response = await TasksServices.DeleteTask(groupId, idJson);
        // handleBottomSheetRequsts(response)
    }

    const handleBottomSheetRequsts = (response) => {
        if (response.status > 300) {
            //snackBar
        } else {
            setIsLoading(false);
            UpdateGrouptasks();
        }
    }

    const handleA = () => {
        setIsDeleteDialogVisible(true)
        refRBSheet.current.close()
    }
    const handleB = () => {
        setIsRejectDialogVisible(true)
        refRBSheet.current.close()
    }
    return (
        <View style={{ display: "flex", flexDirection: "column" }}>

            <View
                style={{
                    display: "flex",
                    flexDirection: "row",
                    marginTop: "3%",
                }}
            >
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

           {/* {isDeleteDialogVisible &&
                <DeleteTaskDialog isVisible={isDeleteDialogVisible}
                    setIsVisible={setIsDeleteDialogVisible} handleDelete={handleDelete}/>
            }
*/}
            {/*{isRejectDialogVisible &&
                <RejectTaskDialog task={currentTask} isVisible={isRejectDialogVisible}
                    setIsVisible={setIsRejectDialogVisible} handleReject={handleReject}
                    me={me} groupID={groupId} />
            }*/}
        </View>
    );
}

const styles = StyleSheet.create({
    subHeader: {
        backgroundColor: "#2089dc",
        color: "white",
        textAlign: "center",
        paddingVertical: 5,
        marginBottom: 10,
    },
    horizontal: {
        marginBottom: 10,
    },
    horizontalText: {
        textAlign: "center",
        fontSize: 16,
        marginVertical: 10,
    },
    vertical: {
        marginBottom: 10,
        display: "flex",
        flexDirection: "row-reverse",
    },
    headerContainer: {
        justifyContent: "center",
        alignItems: "center",
        backgroundColor: "#397af8",
        marginBottom: 20,
        width: "100%",
        paddingVertical: 15,
    },
    heading: {
        color: "white",
        fontSize: 22,
        fontWeight: "bold",
        top: -30,
        paddingBottom: -20,
    },
    headerRight: {
        display: "flex",
        flexDirection: "row",
        marginTop: 5,
    },
    subheaderText: {
        color: "white",
        fontSize: 16,
        fontWeight: "bold",
    },
});
