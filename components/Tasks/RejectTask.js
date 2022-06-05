import React, { useEffect, useState } from 'react';
import Dialog from "react-native-dialog";
import { View, Text, StyleSheet } from 'react-native';
import { UserTotalScore, UsersScoresByGroupID } from '../../services/ScoresServices'

export default function RejectTaskDialog({ task, setIsVisible, handleReject, me, groupID }) {
    // const [userPoints, setUserPoints] = useState()
    // const [arrayOfMemberPoints, setArrayOfMemberPoints] = useState()
    const [finish, setFinish] = useState(true)
    const [userPosition, setUserPosition] = useState(0)
    const [userPositionAfterReject, setUserPositionAfterReject] = useState(0)
    const userPoints = 200
    const arrayOfMemberPoints = [400, 200, 12, 99]

    // useEffect(() => {
    //     const myScore = async () => {
    //         let response = await UserTotalScore(me.id);
    //         console.log(response)
    //         setUserPoints(response.totalScores)
    //     }
    //     const groupMembersScores = async () => {
    //         let response = await UsersScoresByGroupID(groupID);
    //         console.log(response)
    //         response.map(userScore => setArrayOfMemberPoints([...arrayOfMemberPoints, userScore.score]))
    //     }
    //     myScore()
    //     groupMembersScores()
    // }, [])

    useEffect(() => {
        // 4 is 
        if (arrayOfMemberPoints && arrayOfMemberPoints.length) {
            arrayOfMemberPoints.sort(function (a, b) {
                return a - b
            });
            setUserPosition(arrayOfMemberPoints.length - arrayOfMemberPoints.indexOf(userPoints)) //+1 ?

            arrayOfMemberPoints.splice(userPosition, 1)
            arrayOfMemberPoints.push(userPoints - task.score / 4)
            arrayOfMemberPoints.sort(function (a, b) {
                return a - b
            });
            setUserPositionAfterReject(arrayOfMemberPoints.length - arrayOfMemberPoints.indexOf(userPoints - task.score / 4))//+1 ?
            setFinish(true)
        }
    }, [userPoints, arrayOfMemberPoints])

    return (
        <View style={styles.container}>
            {finish &&
                <Dialog.Container visible={true}>

                    <Dialog.Title>Reject Task</Dialog.Title>
                    <Dialog.Description>
                        now you have {userPoints} points and your current rating is {userPosition} ,
                        after the reject you will be in the {userPositionAfterReject} position
                        with {userPoints - task.score / 4} points.
                        Are you sure you want to reject the task?
                    </Dialog.Description>
                    <Dialog.Button label="Cancel" onPress={() => setIsVisible(false)}/>
                    <Dialog.Button label="Reject" onPress={() => setIsVisible(false)}/>
                </Dialog.Container>
            }
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: "#fff",
        alignItems: "center",
        justifyContent: "center",
    },
});