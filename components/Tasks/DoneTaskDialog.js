import React, { useCallback, useState } from 'react';
import { View, Text, StyleSheet } from 'react-native';
import Dialog from "react-native-dialog";

export default function DoneTaskDialog({ setIsVisible, handleOkPress, points }) {

  const onOkClick = useCallback(() => {
    handleOkPress();
    setIsVisible(false);
  }, [setIsVisible, handleOkPress]);

  return (
    <View style={styles.container}>
      <Dialog.Container visible={true}>
        <Dialog.Title>Done Task!</Dialog.Title>
        <Dialog.Description>
          You have earned {points} pts!
        </Dialog.Description>
        <Dialog.Button label="OK" onPress={onOkClick} />
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
