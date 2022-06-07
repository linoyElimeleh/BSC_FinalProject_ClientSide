import React, { useEffect, useState, useRef, useCallback } from "react";
import { View, ScrollView } from "react-native";
import {
    Text,
    Card,
    Icon,
    Avatar,
    Switch,
    FAB,
    Header as HeaderRNE,
} from "react-native-elements";
import { GetGroupMembers, GetGroupTasks } from "../../services/groupsService";
import { GetMeDetails } from "../../services/userService";
import {
    DeleteTask,
    AssignTask,
    SetStatusTask,
    RejectTask,
} from "../../services/TasksServices";
import BottomSheetGroups from "./BottomSheet";
import { useIsFocused } from "@react-navigation/native";
import DeleteTaskDialog from "../Tasks/DeleteTaskDialg";
import RejectTaskDialog from "../Tasks/RejectTask";
import FontAwesome from "react-native-vector-icons/FontAwesome";
import placeholder from "../../utils/images/userPlaceholder.jpg";
import { categoryIdToImage } from "../categoriesMapper";
import DoneTaskDialog from "../Tasks/DoneTaskDialog";

export default function GroupPage({ route, navigation }) {
    const group = route.params.group;
    const groupId = group.group_id;
    const [members, setMembers] = useState([]);
    const [tasks, setTasks] = useState();
    const [isDeleteDialogVisible, setIsDeleteDialogVisible] = useState(false);
    const [isRejectDialogVisible, setIsRejectDialogVisible] = useState(false);
    const [isDoneDialogVisible, setIsDoneDialogVisible] = useState(false);
    const [isSwitchChecked, setIsSwitchChecked] = useState(false);
    const [isLoading, setIsLoading] = useState(true);
    const [currentTask, setCurrentTask] = useState();
    const [me, setMe] = useState();
    const isFocused = useIsFocused();
    const refRBSheet = useRef();

    const colors = { 1: "#B4FF9F", 2: "#F9FFA4", 3: "#FFD59E", 0: "#FFA1A1" };

    useEffect(() => {
        const GroupMembers = async () => {
            try {
                let response = groupId && await GetGroupMembers(groupId);
                response && setMembers(response);
            } catch (error) {
                // console.error(JSON.stringify(error));
            }
        };
        const MeDetails = async () => {
            try {
                let response = await GetMeDetails();
                setMe(response);
            } catch (e) {
                // console.error(JSON.stringify(error));
            }
        };
        GroupMembers();
        MeDetails();
    }, [isFocused]);

    useEffect(() => {
        const Grouptasks = async () => {
            try {
                let response = await GetGroupTasks(groupId);
                setTasks(response);
            } catch (error) {
                // console.error(JSON.stringify(error));
            }
        };
        Grouptasks();
        const willFocusSubscription = navigation.addListener("focus", () => {
            Grouptasks();
        });

        return willFocusSubscription;
    }, []);

    useEffect(() => {
        members && tasks && me && setIsLoading(false);
    }, [members && tasks && me]);

    useEffect(() => { }, [isSwitchChecked]);

    const UpdateGrouptasks = async () => {
        let response = await GetGroupTasks(groupId);
        setTasks(response);
    };

    const handleDelete = () => {
        const idJson = {
            task: {
                taskId: currentTask.id,
            },
        };
        setIsLoading(true);
        DeleteTask(groupId, idJson).then(response => {
            handleBottomSheetRequsts(response);
        });
    };

    const handleAssign = async () => {
        const bodyJson = {
            taskId: currentTask.id,
            userId: me.id,
        };
        setIsLoading(true);
        let response = await TasksServices.AssignTask(groupId, bodyJson);
        handleBottomSheetRequsts(response);
    };


    const handleDone = async () => {
        const bodyJson = {
            task: {
                taskId: currentTask.id,
                status: true,
            }
        };
        setIsLoading(true);
        let response = await SetStatusTask(groupId, bodyJson);
        handleBottomSheetRequsts(response);
    };

    const handleEdit = () => {
        navigation.navigate("Task", { isEdit: true, task: currentTask });
    };

    const handleBottomSheetRequsts = (response) => {
        if (response.status > 300) {
        }
        else {
            setIsLoading(false);
            UpdateGrouptasks();
        }
    };

    const handleReject = useCallback(
        async (task) => {
            setIsLoading(true);
            let response = await RejectTask(groupId, task);
            handleBottomSheetRequsts(response);
        },
        [handleBottomSheetRequsts, groupId]
    );

    const navigateToGoalsPage = () => {
        navigation.navigate("GroupLeaderboard", {
            groupId: groupId,
            name: group.name,
            image: group.image,
            group,
        });
    };

    const openDoneDialog = () => {
        setIsDoneDialogVisible(true);
        refRBSheet.current.close();
    };

    const openDeleteDialog = () => {
        setIsDeleteDialogVisible(true);
        refRBSheet.current.close();
    };
    const openRejectDialog = () => {
        setIsRejectDialogVisible(true);
        refRBSheet.current.close();
    };
    return (
    <View style={{ display: "flex", flexDirection: "column", height: "100%" }}>
      <View
        style={{
          display: "flex",
          flexDirection: "row",
          margin: 4,
          justifyContent: "space-between",
        }}
      >
        <View style={{ display: "flex", flexDirection: "row", margin: 4 }}>
          <Switch
            style={{ marginLeft: 5 }}
            value={isSwitchChecked}
            onValueChange={(value) => setIsSwitchChecked(value)}
          />
          <Text style={{ marginTop: "2%", fontWeight: "500", fontSize: 17 }}>
            Only mine
          </Text>
        </View>
        <FontAwesome
          color="#2089dc"
          size={30}
          name="trophy"
          onPress={navigateToGoalsPage}
        />
      </View>
      <ScrollView
        contentContainerStyle={{ flexDirection: "row", flexWrap: "wrap" }}
      >
        {!isLoading && tasks.length ? (
          tasks.map(
            (task, i) =>
              ((isSwitchChecked && Number(task.user_id) == Number(me.id)) ||
                !isSwitchChecked) && (
                <Card
                  containerStyle={{
                    borderRadius: 25,
                    backgroundColor: colors[i % 4],
                    width: i % 4 == 0 || i % 4 == 3 ? "48%" : "36%",
                  }}
                  key={i}
                >
                  <Card.Title
                    style={{
                      display: "flex",
                      flexDirection: "row",
                      paddingRight: "20%",
                      flexWrap: "wrap",
                    }}
                  >
                    <View style={{ display: "flex", flexDirection: "row" }}>
                      {!task.done && (
                        <Icon
                          name="more-vert"
                          onPress={() => {
                            setCurrentTask(task), refRBSheet.current.open();
                          }}
                        />
                      )}
                      <Text
                        style={{
                          marginTop: 5,
                          fontWeight: "bold",
                          fontSize: 16,
                          color: task.done ? "grey" : "black",
                          textDecorationLine: task.done
                            ? "line-through"
                            : "none",
                        }}
                      >
                        {task.title}
                      </Text>
                      {task.done && (
                        <FontAwesome name="check" color="green" size={25} />
                      )}
                    </View>
                  </Card.Title>
                  <Card.Divider />
                  <Text
                    style={{
                      marginBottom: 10,
                      color: task.done ? "grey" : "black",
                      display: "flex",
                    }}
                  >
                    {task.description}
                  </Text>
                  <View>
                    <Avatar
                      size={64}
                      rounded
                      source={members && members.find && members.find(member => 
                        member.id == task.user_id)?.image ? 
                        { uri: members && members.find && members.find(member => member.id == task.user_id)?.image } :
                         placeholder}
                      
                    >
                      <Avatar.Accessory
                        size={30}
                        backgroundColor={"white"}
                        source={categoryIdToImage[task.category_id]}
                        padding={15}
                      />
                    </Avatar>
                  </View>
                  <Text style={{
                                marginTop: 5,
                                marginLeft: "60%",
                                fontSize: 16,
                            }}>{task.score} pt</Text>
                            <Text style={{
                                marginTop: 5,
                                marginLeft: "60%",
                                fontSize: 16,
                            }}>{String(task.due_date).substring(5, 10).split("-").reverse().join(".")}</Text>
                </Card>
              )
          )
        ) : (
          <View
            style={{ display: "flex", alignItems: "center", width: "100%" }}
          >
            <Text style={{ marginTop: 100, fontSize: 25 }}>No Tasks Yet</Text>
            <Text style={{ marginTop: 10, fontSize: 15 }}>
              create some new tasks by the plus
            </Text>
          </View>
        )}
      </ScrollView>

      <BottomSheetGroups
        openDeleteDialog={openDeleteDialog}
        openRejectDialog={openRejectDialog}
        refRBSheet={refRBSheet}
        handleAssign={handleAssign}
        handleDone={openDoneDialog}
        handleEdit={handleEdit}
        userId={currentTask ? currentTask.user_id : null}
        meId={me?.id}
      />
      <FAB
        icon={{ name: "add", color: "white" }}
        color="#00aced"
        style={{ bottom: 50, right: 30, position: "absolute", zIndex: 200 }}
        onPress={() => {
          navigation.navigate("Task", group);
        }}
      />

      {
        isDeleteDialogVisible && (
            <DeleteTaskDialog
                isVisible={isDeleteDialogVisible}
                setIsVisible={setIsDeleteDialogVisible}
                handleDelete={handleDelete}
            />
        )
    }

    {
        isDoneDialogVisible && (
            <DoneTaskDialog
                setIsVisible={setIsDoneDialogVisible}
                handleOkPress={handleDone}
                points={currentTask.score}
            />
        )
    }

    {
        isRejectDialogVisible && (
            <RejectTaskDialog
                task={currentTask}
                isVisible={isRejectDialogVisible}
                setIsVisible={setIsRejectDialogVisible}
                handleReject={handleReject}
                me={me}
                groupID={groupId}
            />
        )
    }
    </View >
  );
}
