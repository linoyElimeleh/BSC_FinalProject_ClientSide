import React, {useState, useEffect} from 'react'
import {View, StyleSheet} from 'react-native'
import { Text, Input, Switch, CheckBox} from 'react-native-elements';
import {KeyboardAwareScrollView} from 'react-native-keyboard-aware-scroll-view';
import { Dropdown } from 'react-native-element-dropdown';
import { useIsFocused } from "@react-navigation/native";
import FontAwesome from "react-native-vector-icons/FontAwesome";
import TimeAndDate from "./TimeAndDate";
import {groupService} from '../../services'
import CustomDropdown from "./CustomDropdown";

const mockId = 88;

export default function CreateTask({}) {
    const [checked, setChecked] = useState(false);
    const [users, setUsers] = useState([]);
    const isFocused = useIsFocused();

    useEffect(()=>{
        if(isFocused){
            const membersPromise = groupService.getGroupMembers(mockId);
            membersPromise.then(members =>{
                const names = members.map(({display_name,id}) => ({key:display_name,value:id}));
                setUsers(names);
            })
        }
    },[isFocused])

    return (
        <KeyboardAwareScrollView keyboardShouldPersistTaps={'always'}
                                 style={{flex: 1}}
                                 showsVerticalScrollIndicator={false}>
            <Input
                leftIcon={{type: 'font-awesome', name: 'tasks'}}
                placeholder="Title"
            />
            <Input
                leftIcon={{type: 'font-awesome', name: 'list-alt'}}
                placeholder="Enter your description here"
            />
            <View>
                <CustomDropdown
                    search={true}
                    data={users}
                    placeholder='Select Owner'
                    iconLabel='user'
                    labelText='Task Owner'
                />
            </View>
            <View style={styles.row}>
                <Switch
                    style={styles.switch}
                    value={checked}
                    onValueChange={(value) => setChecked(value)}
                />
                <Text
                    h4
                >Urgent</Text>
            </View>

            <TimeAndDate/>
        </KeyboardAwareScrollView>
    )
};

const styles = StyleSheet.create({
    container: {
        padding: 16,
    },
    row:{
        alignItems: "center",
        display: "flex",
        flexDirection: "row",
    },
    dropdown: {
        height: 50,
        borderColor: 'gray',
        borderWidth: 0.5,
        borderRadius: 8,
        paddingHorizontal: 8,
    },
    icon: {
        marginRight: 5,
    },
    label: {
        position: 'absolute',
        backgroundColor: '#FFF1ED',
        left: 22,
        top: 8,
        zIndex: 999,
        paddingHorizontal: 8,
        fontSize: 14,
    },
    placeholderStyle: {
        fontSize: 16,
    },
    selectedTextStyle: {
        fontSize: 16,
    },
    iconStyle: {
        width: 20,
        height: 20,
    },
    inputSearchStyle: {
        height: 40,
        fontSize: 16,
    },
    switch :{
        margin: 5
    }
});