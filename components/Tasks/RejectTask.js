import React, { useEffect, useState, useCallback, useMemo } from "react";
import Dialog from "react-native-dialog";
import { View, Text, StyleSheet } from "react-native";
import {
  UserScoreByGroup,
  UsersScoresByGroupID,
} from "../../services/ScoresServices";

export default function RejectTaskDialog({
  task,
  setIsVisible,
  handleReject,
  me,
  groupID,
}) {
  const [userPoints, setUserPoints] = useState(0);
  const rejectPoints = useMemo(() => task.score * 1.5, [task.score]);

  useEffect(async () => {
    let response = await UserScoreByGroup(groupID);
    setUserPoints(response?.score);
  }, []);

  const onReject = useCallback(async () => {
    await handleReject(task);
    setIsVisible(false);
  }, [handleReject]);

  if (userPoints < rejectPoints) {
    return (
      <View style={styles.container}>
        <Dialog.Container visible={true}>
          <Dialog.Title>Oh no, you don't have enough points!</Dialog.Title>
          <Dialog.Description>
            You now have {userPoints} points, and you need {rejectPoints} points
            to reject it.
          </Dialog.Description>
          <Dialog.Button
            label="Okay, got it!"
            onPress={() => setIsVisible(false)}
          />
        </Dialog.Container>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <Dialog.Container visible={true}>
        <Dialog.Title>Oh no, are you sure?</Dialog.Title>
        <Dialog.Description>
          You now have {userPoints} points! If you choose to reject the task,
          you will have only {userPoints - rejectPoints} points left! Proceed on
          your own accord.
        </Dialog.Description>
        <Dialog.Button label="Cancel" onPress={() => setIsVisible(false)} />
        <Dialog.Button
          label="Reject"
          onPress={onReject}
          disabled={userPoints < rejectPoints}
        />
      </Dialog.Container>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
  },
});
