import React, {useState, useEffect} from 'react'
import {View, StyleSheet} from 'react-native'
import { Text, Input, Switch, CheckBox} from 'react-native-elements';
import {KeyboardAwareScrollView} from 'react-native-keyboard-aware-scroll-view';
import { Dropdown } from 'react-native-element-dropdown';
import { useIsFocused } from "@react-navigation/native";
import FontAwesome from "react-native-vector-icons/FontAwesome";
import TimeAndDate from "./TimeAndDate";
import {groupService} from '../../services'

const mockId = 88;

export default function CreateTask({}) {
    const [checked, setChecked] = useState(false);
    const [reoccurrence, setReoccurrence] = useState(false);
    const [value, setValue] = useState(null);
    const [isFocus, setIsFocus] = useState(false);
    const [users, setUsers] = useState([]);
    const isFocused = useIsFocused();

    useEffect(()=>{
        if(isFocused){
            const membersPromise = groupService.getGroupMembers(mockId);
            membersPromise.then(members =>{
                const names = members.map(({display_name,id}) => ({user:display_name,value:id}));
                setUsers(names);
            })
        }
    },[isFocused])

    const renderLabel = () => {
        if (value || isFocus) {
            return (
                <Text style={[styles.label, isFocus && { color: 'blue' }]}>
                    Task Owner
                </Text>
            );
        }
        return null;
    };

    return (
        <KeyboardAwareScrollView keyboardShouldPersistTaps={'always'}
                                 style={{flex: 1}}
                                 showsVerticalScrollIndicator={false}>
            <View style={styles.row}>
                <Input
                    leftIcon={{type: 'font-awesome', name: 'list-alt'}}
                    placeholder="Enter your description here"
                />
            </View>
            <View style={styles.container}>
                {renderLabel()}
                <Dropdown
                    style={[styles.dropdown, isFocus && { borderColor: 'blue' }]}
                    placeholderStyle={styles.placeholderStyle}
                    selectedTextStyle={styles.selectedTextStyle}
                    inputSearchStyle={styles.inputSearchStyle}
                    iconStyle={styles.iconStyle}
                    data={users}
                    search
                    maxHeight={300}
                    labelField="user"
                    valueField="value"
                    placeholder={!isFocus ? 'Select owner' : '...'}
                    searchPlaceholder="Search..."
                    value={value}
                    onFocus={() => setIsFocus(true)}
                    onBlur={() => setIsFocus(false)}
                    onChange={item => {
                        setValue(item.value);
                        setIsFocus(false);
                    }}
                    renderLeftIcon={() => (
                        <FontAwesome
                            style={styles.icon}
                            color={isFocus ? 'blue' : 'black'}
                            name="user"
                            size={20}
                        />
                    )}
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