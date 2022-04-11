import React, {useState, useEffect} from 'react'
import {View, StyleSheet} from 'react-native'
import {Text, Input, Switch, Dialog, useTheme} from 'react-native-elements';
import {KeyboardAwareScrollView} from 'react-native-keyboard-aware-scroll-view';
import { useIsFocused } from "@react-navigation/native";
import TimeAndDate from "./TimeAndDate";
import {groupService,categoriesService} from '../../services'
import CustomDropdown from "./CustomDropdown";
import Icon from 'react-native-vector-icons/FontAwesome';


const mockId = 88;
const snoozeData = [
    {key:'4m', value:4},
    {key:'5m', value:5},
    {key:'6m', value:6},
    {key:'7m', value:7},
    {key:'8m', value:8},
    {key:'9m', value:9},
    {key:'10m', value:10},
    {key: 'no snooze', value: null}
]

export default function CreateTask({}) {
    const [checked, setChecked] = useState(false);
    const [users, setUsers] = useState([]);
    const [categories, setCategories] = useState([]);
    const [score,setScore] = useState(0);
    const [dialogOpen,setDialogOpen] = useState(false);
    const isFocused = useIsFocused();
    const {theme} = useTheme();


    useEffect(()=>{
        if(isFocused){
            const membersPromise = groupService.getGroupMembers(mockId);
            membersPromise.then(members =>{
                const names = members.map(({display_name,id}) => ({key:display_name,value:id}));
                setUsers(names);
            })
            const categoriesPromise = categoriesService.getCategories(mockId);
            categoriesPromise.then(categories =>{
                const names = categories.map(({title,id}) => ({key:title,value:id}));
                setCategories(names);
            })
        }
    },[isFocused]);

    const onUpdateScore = (value) => {
        setScore(value);
    }

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
            <View>
                <CustomDropdown
                    search={true}
                    data={categories}
                    placeholder='Select Category'
                    iconLabel='file'
                    labelText='Task Category'
                />
            </View>
            <View style={styles.row}>
                <Switch
                    style={styles.switch}
                    value={checked}
                    onValueChange={(value) => setChecked(value)}
                />
                <Text>Urgent</Text>
            </View>
            <TimeAndDate/>
            <View style={{width:'50%'}}>
                <CustomDropdown
                    search={false}
                    labelText='snooze'
                    iconLabel='hourglass-start'
                    placeholder='snooze'
                    data={snoozeData}
                />
            </View>
            <View style={{width:'50%'}}>
                <Input
                    leftIcon={{type: 'font-awesome', name: 'gamepad'}}
                    placeholder="score (1 to 100)"
                    onChangeText={onUpdateScore}
                />
            </View>
            <View style={styles.row}>
                <Text
                    style={{marginRight:5}}
                >
                    Rejection points: {score*0.25}
                </Text>
                <Icon.Button
                    style={{marginRight:5}}
                    backgroundColor='#ffffff'
                    color='black'
                    name='info-circle'
                    onPress={()=>setDialogOpen(true)}
                >
                    <Dialog
                        isVisible={dialogOpen}
                        onBackdropPress={() => setDialogOpen(!dialogOpen)}
                    >
                        <Dialog.Title title="Rejection points"/>
                        <Text>The amount of points you pay to cancel the task. 25% of score</Text>
                    </Dialog>

                </Icon.Button>
            </View>
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
        backgroundColor: '#ffffff',
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