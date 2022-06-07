import React, { useCallback, useState } from 'react';
// import { Dialog } from '@rneui/themed';
import { View, Text, StyleSheet } from 'react-native';
import Dialog from "react-native-dialog";

export default function DeleteTaskDialog({setIsVisible, handleDelete }) {

  const onDelete = useCallback(() => {
    handleDelete();
    setIsVisible(false);
  }, [setIsVisible, handleDelete]);

  return (
    <View style={styles.container}>
      <Dialog.Container visible={true}>
        <Dialog.Title>Task Delete</Dialog.Title>
        <Dialog.Description>
          Do you want to delete this task? You cannot undo this action.
        </Dialog.Description>
        <Dialog.Button label="Cancel" onPress={() => setIsVisible(false)} />
        <Dialog.Button label="Delete" onPress={onDelete} />
      </Dialog.Container>
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
