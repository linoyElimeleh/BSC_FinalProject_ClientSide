import React, { useState } from 'react';
import { Dialog } from '@rneui/themed';
import { View, Text, StyleSheet } from 'react-native';

export default function BottomSheetGroups({task,setIsVisible,isVisible,handleReject}) {
    const userPoints = 200
    const arrayOfMemberPoints = [400, 200, 12, 99]

    arrayOfMemberPoints.sort(function (a, b) { return a - b });
    const userPosition = arrayOfMemberPoints.length - arrayOfMemberPoints.indexOf(userPoints) //+1 ?

    arrayOfMemberPoints.splice(userPosition, 1)
    arrayOfMemberPoints.push(userPoints - task.score/4)
    arrayOfMemberPoints.sort(function (a, b) { return a - b });
    const userPositionAfterReject = arrayOfMemberPoints.length - arrayOfMemberPoints.indexOf(userPoints - task.score/4) //+1 ?

    return (

        <Dialog
            isVisible={true}
            onBackdropPress={() => setIsVisible(!isVisible)}
        >
            <Dialog.Title title="Reject Task" />
            <Text>now you have {userPoints} points and your current rating is {userPosition}</Text>
            <Text>after the reject you will be in the {userPositionAfterReject} position with {userPoints - task.score/4} points</Text>
            <Text>Are you sure you want to reject the task?</Text>
            <Dialog.Actions>
                <Dialog.Button title="Yes" onPress={() => { handleReject(), setIsVisible(false) }} />
                <Dialog.Button title="No" onPress={() => setIsVisible(false)} />
            </Dialog.Actions>
        </Dialog>
    
    )
}
