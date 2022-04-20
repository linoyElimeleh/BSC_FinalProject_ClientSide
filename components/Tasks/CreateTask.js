import React, {useState, useEffect, useRef} from 'react'
import {View, StyleSheet, Platform} from 'react-native'
import {Text, Input, Switch, Dialog, useTheme, Button, ListItem, Icon, Slider} from 'react-native-elements';
import {KeyboardAwareScrollView} from 'react-native-keyboard-aware-scroll-view';
import {useIsFocused} from "@react-navigation/native";
import {groupService, categoriesService} from '../../services'
// import Icon from 'react-native-vector-icons/FontAwesome';
import DateTimePicker from "@react-native-community/datetimepicker";
import RNPickerSelect from "react-native-picker-select";
import {taskService} from "../../services";
import groupsService from "../../services/groupsService";
const mockId = 88;

const snoozeData = [
    {label: 'no snooze', value: null},
    {label: '4m', value: 4},
    {label: '5m', value: 5},
    {label: '6m', value: 6},
    {label: '7m', value: 7},
    {label: '8m', value: 8},
    {label: '9m', value: 9},
    {label: '10m', value: 10},
];

const repeatData = [
    {label: 'Never', value: -1},
    {label: 'Daily', value: 1},
    {label: 'Weekly', value: 2},
    {label: 'Monthly', value: 3},
];

const IOS_DISPLAY = Object.freeze({
    default: 'default',
    spinner: 'spinner',
    compact: 'compact',
    inline: 'inline',
});

const ANDROID_DISPLAY = Object.freeze({
    default: 'default',
    spinner: 'spinner',
    clock: 'clock',
    calendar: 'calendar',
});

const DISPLAY_VALUES = Platform.select({
    ios: Object.values(IOS_DISPLAY),
    android: Object.values(ANDROID_DISPLAY),
    windows: [],
});

export default function CreateTask({navigation, route}) {
    const group = route.params;
    const [title, setTitle] = useState('');
    const [description, setDescription] = useState('');
    const [taskOwner, setTaskOwner] = useState(null);
    const [category, setCategory] = useState(null);
    const [users, setUsers] = useState([]);
    const [categories, setCategories] = useState([]);
    const [score, setScore] = useState(0);
    const [isLoading, setIsLoading] = useState(false);
    const isFocused = useIsFocused();
    const [fromDate, setFromDate] = useState(new Date());
    const [toDate, setToDate] = useState(new Date());
    const [time, setTime] = useState(new Date());
    const [timeExpanded, setTimeExpanded] = useState(false);
    const [dateExpanded, setDateExpanded] = useState(false);
    const [endsExpanded, setEndsExpanded] = useState(false);
    const [display, setDisplay] = useState(DISPLAY_VALUES[1]);
    const [urgent, setUrgent] = useState(false);
    const [repeat, setRepeat] = useState(-1);
    const [snooze, setSnooze] = useState(null);
    const [showEnds, setShowEnds] = useState(false);

    const onSetFromDate = (event, selectedDate) => {
        if (selectedDate != null) {
            const currentDate = selectedDate;
            setFromDate(currentDate);
        }
    };

    const onSetTime = (event, selectedTime) => {
        if (selectedTime != null) {
            const currentDate = selectedTime;
            setTime(currentDate);
        }
    };

    const onSetToDate = (event, selectedDate) => {
        if (selectedDate != null) {
            const currentDate = selectedDate;
            setToDate(currentDate);
        }
    };

    const onRepeatChange = (value) => {
        if (value !== null) {
            setShowEnds(true)
        } else {
            setShowEnds(false);
        }
        setRepeat(value);
    }

    useEffect(() => {
        if (isFocused) {
            const membersPromise = groupService.getGroupMembers(group.id);

            membersPromise.then(members => {
                const notAssigned = [{label: 'not assigned', value: null}]
                const names = members.map(({display_name, id}) => ({label: display_name, value: id}));
                setUsers(notAssigned.concat(names));
            })

            const categoriesPromise = categoriesService.getCategories();

            categoriesPromise.then(categories => {
                const names = categories.map(({title, id}) => ({label: title, value: id}));
                setCategories(names);
            })
        }
    }, [isFocused]);

    const onUpdateScore = (value) => {
        setScore(value);
    }

    const handleSubmit = () => {
        setIsLoading(true);
        const dueDate = new Date(fromDate.setHours(time.getHours())).toISOString();
        const endDate = new Date(toDate).toISOString();
        const task = {title, description, taskOwner, category, dueDate, endDate, repeat, snooze, score, urgent};
        const promiseGroup = taskService.createTask(task,group.id);

        promiseGroup.then(result =>{
            navigation.navigate('Group', {group});
            setIsLoading(false);
        })
    };

    return (
        <KeyboardAwareScrollView keyboardShouldPersistTaps={'always'}
                                 style={{flex: 1}}
                                 showsVerticalScrollIndicator={false}>
            <Input
                leftIcon={{type: 'font-awesome', name: 'tasks'}}
                placeholder="Title"
                onChangeText={value => setTitle(value)}
            />
            <Input
                leftIcon={{type: 'font-awesome', name: 'list-alt'}}
                placeholder="Enter your description here"
                onChangeText={value => setDescription(value)}
            />
            <View style={styles.list}>
                <RNPickerSelect
                    onValueChange={(value) => setCategory(value)}
                    items={categories}
                    placeholder={{}}
                >
                    <ListItem bottomDivider>
                        <ListItem.Content>
                            <ListItem.Title>
                                {
                                    <Icon name="category" size={20}/>
                                }
                                Category
                            </ListItem.Title>
                               <ListItem.Subtitle
                                right>
                                {
                                    categories.find(categoryType => categoryType.value === category)?.label
                                }
                            </ListItem.Subtitle>
                        </ListItem.Content>
                    </ListItem>
                </RNPickerSelect>
                <RNPickerSelect
                    onValueChange={(value) => setTaskOwner(value)}
                    items={users}
                    placeholder={{}}
                >
                    <ListItem bottomDivider>
                        <ListItem.Content>
                            <ListItem.Title>
                                {
                                    <Icon name="person" size={20}/>
                                }
                                Task owner
                            </ListItem.Title>
                            <ListItem.Subtitle
                                right>
                                {
                                    users.find(userID => userID.value === taskOwner)?.label
                                }
                            </ListItem.Subtitle>
                        </ListItem.Content>
                    </ListItem>
                </RNPickerSelect>
                <ListItem bottomDivider>
                    <ListItem.Content>
                        <ListItem.Title>
                            {
                                <Icon name="warning" size={20}/>
                            }
                            Urgent {
                            <Switch
                                style={styles.switch}
                                value={urgent}
                                onValueChange={(value) => setUrgent(value)}
                            />
                        }</ListItem.Title>
                    </ListItem.Content>
                </ListItem>
                <ListItem.Accordion
                    content={
                        <>
                            <Icon name="date-range" size={20}/>
                            <ListItem.Content>
                                <ListItem.Title>Date</ListItem.Title>
                                <ListItem.Subtitle>{fromDate.toDateString()}</ListItem.Subtitle>
                            </ListItem.Content>
                        </>
                    }
                    isExpanded={dateExpanded}
                    onPress={() => {
                        setDateExpanded(!dateExpanded);
                    }}
                    bottomDivider
                >
                    <View>
                        {
                            <DateTimePicker
                                testID="dateTimePicker"
                                value={fromDate}
                                mode='date'
                                is24Hour={true}
                                onChange={onSetFromDate}
                                display={display}
                            />
                        }
                    </View>
                </ListItem.Accordion>
                <ListItem.Accordion bottomDivider
                                    content={
                                        <>
                                            <Icon name="access-time" size={20}/>
                                            <ListItem.Content>
                                                <ListItem.Title>Time</ListItem.Title>
                                                <ListItem.Subtitle>{time.toLocaleTimeString()}</ListItem.Subtitle>
                                            </ListItem.Content>
                                        </>
                                    }
                                    isExpanded={timeExpanded}
                                    onPress={() => {
                                        setTimeExpanded(!timeExpanded);
                                    }}
                >
                    <View>
                        {
                            <DateTimePicker
                                testID="dateTimePicker"
                                value={time}
                                mode='time'
                                is24Hour={true}
                                onChange={onSetTime}
                                display={display}
                            />
                        }
                    </View>
                </ListItem.Accordion>
                <RNPickerSelect
                    onValueChange={(value) => onRepeatChange(value)}
                    items={repeatData}
                    placeholder={{}}
                >
                    <ListItem bottomDivider>
                        <ListItem.Content>
                            <ListItem.Title>
                                {
                                    <Icon name="repeat" size={20}/>
                                }
                                Repeat
                            </ListItem.Title>
                            <ListItem.Subtitle
                                right>
                                {
                                    repeatData.find(repeatType => repeatType.value === repeat)?.label
                                }
                            </ListItem.Subtitle>
                        </ListItem.Content>
                    </ListItem>
                </RNPickerSelect>
                {showEnds &&
                    <ListItem.Accordion
                        content={
                            <>
                                <Icon name="date-range" size={20}/>
                                <ListItem.Content>
                                    <ListItem.Title>Ends</ListItem.Title>
                                    <ListItem.Subtitle>{toDate.toDateString()}</ListItem.Subtitle>
                                </ListItem.Content>
                            </>
                        }
                        isExpanded={endsExpanded}
                        onPress={() => {
                            setEndsExpanded(!endsExpanded);
                        }}
                        bottomDivider
                    >

                        <View>
                            {
                                <DateTimePicker
                                    testID="dateTimePicker"
                                    value={fromDate}
                                    mode='date'
                                    is24Hour={true}
                                    onChange={onSetToDate}
                                    display={display}
                                />
                            }
                        </View>
                    </ListItem.Accordion>}
                <RNPickerSelect
                    onValueChange={(value) => setSnooze(value)}
                    items={snoozeData}
                    placeholder={{}}
                >
                    <ListItem bottomDivider>
                        <ListItem.Content>
                            <ListItem.Title>
                                {
                                    <Icon name="snooze" size={20}/>
                                }
                                Snooze
                            </ListItem.Title>
                            <ListItem.Subtitle
                                right>
                                {
                                    snoozeData.find(snoozeType => snoozeType.value === snooze)?.label
                                }
                            </ListItem.Subtitle>
                        </ListItem.Content>
                    </ListItem>
                </RNPickerSelect>
            </View>
            <View style={{width: '50%'}}>
                <Input
                    leftIcon={{type: 'font-awesome', name: 'gamepad'}}
                    placeholder="score (1 to 100)"
                    onChangeText={onUpdateScore}
                />
            </View>
            <View style={styles.row}>
                <Text
                    style={{marginRight: 5}}
                >
                    Rejection points: {score * 0.25}
                </Text>
            </View>
            <View style={{ alignItems: 'center', marginTop: '10%' }}>
            <Button
                title={'Create Task'}
                containerStyle={{
                    width: 200,
                    marginHorizontal: 50,
                    marginVertical: 10,
                }}
                onPress={handleSubmit}
                loading={isLoading}
            />
            </View>
        </KeyboardAwareScrollView>
    )
};

const styles = StyleSheet.create({
    container: {
        padding: 16,
    },
    row: {
        alignItems: "center",
        display: "flex",
        flexDirection: "row",
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
    switch: {
        marginTop: -7,
    },
    datePicker: {
        width: 320,
        height: 260,
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'flex-start',
    },
    list: {
        marginTop: 20,
        borderTopWidth: 1,
        borderColor: '#6e6d6d'
    }
});