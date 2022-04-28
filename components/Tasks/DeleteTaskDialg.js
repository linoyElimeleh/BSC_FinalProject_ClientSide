import React, { useState } from 'react';
import {Dialog} from '@rneui/themed';
import { View, Text, StyleSheet } from 'react-native';

export default function BottomSheetGroups({isVisible,setIsVisible,handleDelete}) {
    return (
        <Dialog
        isVisible={true}
        onBackdropPress={()=>setIsVisible(!isVisible)}
      >
        <Dialog.Title title="Delete"/>
        <Text>Are you sure you want to delete the task?</Text>
        <Dialog.Actions>
          <Dialog.Button title="Yes" onPress={() => {handleDelete(),setIsVisible(false)}}/>
          <Dialog.Button title="No" onPress={() => setIsVisible(false)}/>
        </Dialog.Actions>
      </Dialog>
    )
}
