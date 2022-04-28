import React,{useEffect, useRef} from 'react';
import { View , TouchableOpacity,StyleSheet,Text} from 'react-native';
import { Icon, BottomSheet, ListItem } from 'react-native-elements';
import RBSheet from 'react-native-raw-bottom-sheet';

export default function BottomSheetGroups({ route, navigation, handleAssign, handleDelete, handleDone, handleEdit, handleReject}) {
    const refRBSheet = useRef();
    useEffect(()=>{
        refRBSheet.current.open()
    })
    
    return (
        // <View style={{ display: 'flex', flexDirection: 'column' }}>
        //     <BottomSheet modalProps={{}} isVisible={isVisible}  >
        //         <ListItem
        //             key={1}
        //             containerStyle={{ backgroundColor: 'green' }}
        //             onPress={() => handleDone()}
        //         >
        //             <ListItem.Content >
        //                 <ListItem.Title >Done!</ListItem.Title>
        //             </ListItem.Content>
        //         </ListItem>
        //         <ListItem
        //             key={2}
        //             onPress={() => handleAssign()}
        //         >
        //             <ListItem.Content>
        //                 <ListItem.Title>Assign to me</ListItem.Title>
        //             </ListItem.Content>
        //         </ListItem>
        //         <ListItem
        //             key={3}
        //             onPress={() => handleEdit()}
        //         >
        //             <ListItem.Content>
        //                 <ListItem.Title>Assign to me Edit</ListItem.Title>
        //             </ListItem.Content>
        //         </ListItem>
        //         <ListItem
        //             key={4}
        //             onPress={() => handleDelete()}
        //         >
        //             <ListItem.Content>
        //                 <ListItem.Title >Assign to me Edit Delete</ListItem.Title>
        //             </ListItem.Content>
        //         </ListItem>
        //         <ListItem
        //             key={5}
        //             onPress={() => handleReject()}
        //         >
        //             <ListItem.Content>
        //                 <ListItem.Title >Assign to me Edit Delete Reject</ListItem.Title>
        //             </ListItem.Content>
        //         </ListItem>
        //         <ListItem
        //             key={6}
        //             onPress={() => setIsVisible(!isVisible)}
        //         >
        //             <ListItem.Content>
        //                 <ListItem.Title style={{ display: "flex", justifyContent: "center" }} >
        //                     close
        //                     <Icon name="close" />
        //                 </ListItem.Title>
        //             </ListItem.Content>
        //         </ListItem>
        //     </BottomSheet>
        // </View>



        <View>
            <RBSheet
                ref={refRBSheet}
                closeOnDragDown={true}
                closeOnPressMask={true}
                customStyles={{
                    wrapper: {
                        backgroundColor: "transparent"
                    },
                    draggableIcon: {
                        backgroundColor: "transparent"
                    }
                }}
                height={450}
            >
                <View style={styles.header}>
                    <View style={styles.panelHeader}>
                        <View style={styles.panelHandle} />
                    </View>
                </View>
                <View style={styles.panel}>
                    <View style={{ alignItems: 'center' }}>
                        <Text style={styles.panelTitle}>Task Actions</Text>
                    </View>
                    <TouchableOpacity style={styles.panelButton} onPress={handleDone} >
                        <Text style={styles.panelButtonTitle}>Done!</Text>
                    </TouchableOpacity>
                    <TouchableOpacity style={styles.panelButton} onPress={handleAssign}>
                        <Text style={styles.panelButtonTitle}>Assign to me</Text>
                    </TouchableOpacity>
                    <TouchableOpacity style={styles.panelButton} onPress={handleEdit}>
                        <Text style={styles.panelButtonTitle}>Edit</Text>
                    </TouchableOpacity>
                    <TouchableOpacity style={styles.panelButton} onPress={handleDelete}>
                        <Text style={styles.panelButtonTitle}> Delete</Text>
                    </TouchableOpacity>
                    <TouchableOpacity style={styles.panelButton} onPress={handleReject}>
                        <Text style={styles.panelButtonTitle}>Reject</Text>
                    </TouchableOpacity>
                </View>
            </RBSheet>

        </View>
    )
}

const styles = StyleSheet.create({
    changePasswordText: {
        color: "blue",
        margin: 5
    },
    buttonStyle: {
        width: 200,
        marginHorizontal: 50,
        marginVertical: 10,
    },
    containerStyle: {
        alignItems: "center",
        display: "flex",
        marginTop: '10%'
    },
    textStyle: {
        width: 280
    },
    image: {
        width: 150,
        height: 150,
        borderRadius: 150 / 2,
        overflow: "hidden",
    },
    panel: {
        padding: 20,
        backgroundColor: '#FFFFFF',
        paddingTop: 20
    },
    header: {
        backgroundColor: '#FFFFFF',
        shadowColor: '#333333',
        shadowOffset: {width: -1, height: -3},
        shadowRadius: 2,
        shadowOpacity: 0.4,
        // elevation: 5,
        paddingTop: 20,
        borderTopLeftRadius: 20,
        borderTopRightRadius: 20,
    },
    panelHeader: {
        alignItems: 'center',
    },
    panelHandle: {
        width: 40,
        height: 8,
        borderRadius: 4,
        backgroundColor: '#00000040',
        marginBottom: 10,
    },
    panelTitle: {
        fontSize: 27,
        height: 35,
    },
    panelSubtitle: {
        fontSize: 14,
        color: 'gray',
        height: 30,
        marginBottom: 10,
    },
    panelButton: {
        padding: 13,
        borderRadius: 10,
        backgroundColor: '#2089dc',
        alignItems: 'center',
        marginVertical: 7,
    },
    panelButtonTitle: {
        fontSize: 17,
        fontWeight: 'bold',
        color: 'white',
    },
});


