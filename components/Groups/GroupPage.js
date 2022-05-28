import React, { useEffect, useState, useRef} from 'react';
import { View, ScrollView } from 'react-native';
import { Text, Card, Icon, Avatar, Switch, FAB, Header as HeaderRNE } from 'react-native-elements';
import { GetGroupMembers, GetGroupTasks } from '../../services/groupsService'
import { GetMeDetails } from '../../services/userService'
import { TasksServices } from '../../services'
import BottomSheetGroups from './BottomSheet';
import { useIsFocused } from "@react-navigation/native";
import DeleteTaskDialog from "../Tasks/DeleteTaskDialg"
import RejectTaskDialog from '../Tasks/RejectTask'
import FontAwesome from "react-native-vector-icons/FontAwesome";
import placeholder from '../../utils/images/userPlaceholder.jpg'
import { categoryIdToImage } from "../categoriesMapper"

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

    const colors = { 1: "#B4FF9F", 2: "#F9FFA4", 3: "#FFD59E", 0: "#FFA1A1" }

    useEffect(() => {
        const GroupMembers = async () => {
            let response = await GetGroupMembers(groupId);
            console.log(response)
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

    useEffect(() => {
        console.log(currentTask)
    }, [currentTask])

    useEffect(() => {
        members && tasks && me && setIsLoading(false);
    }, [members && tasks && me]);

    useEffect(() => { }, [isSwitchChecked]);

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
       //its not works
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
            console.log("something get worng")
            //we can add snackBar
        } else {
            setIsLoading(false);
            UpdateGrouptasks();
        }
    }

    const openDeleteDialog = () => {
        setIsDeleteDialogVisible(true)
        refRBSheet.current.close()
    }
    const openRejectDialog = () => {
        setIsRejectDialogVisible(true)
        refRBSheet.current.close()
    }
    return (
        <View style={{ display: "flex", flexDirection: "column", height: "100%" }}>

            <View style={{ display: "flex", flexDirection: "row", margin: 4 }}>
                <Switch
                    style={{ marginLeft: 5 }}
                    value={isSwitchChecked}
                    onValueChange={(value) => setIsSwitchChecked(value)}
                />
                <Text style={{ marginTop: "2%", fontWeight: "500", fontSize: 17 }}>Only mine</Text>
            </View>
            <ScrollView contentContainerStyle={{ flexDirection: "row", flexWrap: "wrap" }}>

                {!isLoading &&
                    tasks.length ? tasks.map((task, i) => (
                        (isSwitchChecked && (Number(task.user_id) == Number(me.id)) || !isSwitchChecked) &&
                        <Card containerStyle={{
                            borderRadius: 25,
                            backgroundColor: colors[i % 4],
                            width: i % 4 == 0 || i % 4 == 3 ? "48%" : "36%"
                        }}
                            key={i}>
                            <Card.Title style={{ display: "flex", flexDirection: "row", paddingRight: "20%", flexWrap: "wrap" }}>
                                <View style={{ display: "flex", flexDirection: "row" }}>
                                    {!task.done && <Icon name="more-vert" onPress={() => { setCurrentTask(task), refRBSheet.current.open() }} />}
                                    <Text style={{
                                        marginTop: 5, fontWeight: "bold", fontSize: 16, color: task.done ? "grey" : "black",
                                        textDecorationLine: task.done && "line-through"
                                    }}>
                                        {task.title}
                                    </Text>
                                    {task.done && <FontAwesome name="check" color={"green"} size={"25px"} />}
                                </View>
                            </Card.Title>
                            <Card.Divider />
                            <Text style={{ marginBottom: 10, color: task.done ? "grey" : "black", display: "flex", }} >
                                {task.description}
                            </Text>
                            <View>
                                <Avatar
                                    size={64}
                                    rounded
                                    source={members.find(member => member.id == task.user_id)?.image ? { uri: me.image } : placeholder}
                                >
                                    <Avatar.Accessory size={30} backgroundColor={"white"} source={categoryIdToImage[task.category_id]} padding={15} />
                                </Avatar>
                            </View>

                        </Card>
                    )) :
                    <View style={{display:"flex",alignItems:"center",width:"100%"}}>
                        <Text style={{ marginTop: 100, fontSize: 25 }}>No Tasks Yet</Text>
                        <Text style={{ marginTop: 10, fontSize: 15}}>create some new tasks by the plus</Text>
                    </View>}
            </ScrollView>

            <BottomSheetGroups openDeleteDialog={openDeleteDialog} openRejectDialog={openRejectDialog}
                refRBSheet={refRBSheet} handleAssign={handleAssign}
                handleDone={handleDone} handleEdit={handleEdit} userId={currentTask ? currentTask.user_id : null} />
            <FAB
                icon={{ name: 'add', color: 'white' }}
                color="#00aced" style={{ bottom: 50, right: 30, position: "absolute", zIndex: 200 }}
                onPress={() => { navigation.navigate('Create Task', group) }}
            />

            {isDeleteDialogVisible &&
                <DeleteTaskDialog isVisible={isDeleteDialogVisible}
                    setIsVisible={setIsDeleteDialogVisible} handleDelete={handleDelete} />
            }

            {isRejectDialogVisible &&
                <RejectTaskDialog task={currentTask} isVisible={isRejectDialogVisible}
                    setIsVisible={setIsRejectDialogVisible} handleReject={handleReject}
                    me={me} groupID={groupId} />
            }
        </View>
    );
}
