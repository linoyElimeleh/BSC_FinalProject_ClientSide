import React from 'react';
import { View } from 'react-native';
import { Icon, BottomSheet, ListItem } from 'react-native-elements';

export default function BottomSheetGroups({ route, navigation, handleAssign, handleDelete, handleDone, handleEdit, handleReject, isVisible,setIsVisible}) {
    return (
        <View style={{ display: 'flex', flexDirection: 'column' }}>
            <BottomSheet modalProps={{}} isVisible={isVisible}  >
                <ListItem
                    key={1}
                    containerStyle={{ backgroundColor: 'green' }}
                    onPress={() => handleDone()}
                >
                    <ListItem.Content >
                        <ListItem.Title >Done!</ListItem.Title>
                    </ListItem.Content>
                </ListItem>
                <ListItem
                    key={2}
                    onPress={() => handleAssign()}
                >
                    <ListItem.Content>
                        <ListItem.Title>Assign to me</ListItem.Title>
                    </ListItem.Content>
                </ListItem>
                <ListItem
                    key={3}
                    onPress={() => handleEdit()}
                >
                    <ListItem.Content>
                        <ListItem.Title>Edit</ListItem.Title>
                    </ListItem.Content>
                </ListItem>
                <ListItem
                    key={4}
                    onPress={() => handleDelete()}
                >
                    <ListItem.Content>
                        <ListItem.Title >Delete</ListItem.Title>
                    </ListItem.Content>
                </ListItem>
                <ListItem
                    key={5}
                    onPress={() => handleReject()}
                >
                    <ListItem.Content>
                        <ListItem.Title >Reject</ListItem.Title>
                    </ListItem.Content>
                </ListItem>
                <ListItem
                    key={6}
                    onPress={() => setIsVisible(!isVisible)}
                >
                    <ListItem.Content>
                        <ListItem.Title style={{ display: "flex", justifyContent: "center" }} >
                            close
                            <Icon name="close" />
                        </ListItem.Title>
                    </ListItem.Content>
                </ListItem>
            </BottomSheet>
        </View>
    )
}

