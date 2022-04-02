import React, {useState, useEffect} from 'react'
import {View, StyleSheet} from 'react-native'
import {Image, Text, Input, Switch, Button, useTheme, Avatar} from 'react-native-elements';
import {KeyboardAwareScrollView} from 'react-native-keyboard-aware-scroll-view';
import { Dropdown } from 'react-native-element-dropdown';
import FontAwesome from "react-native-vector-icons/FontAwesome";
import DateTimePicker from '@react-native-community/datetimepicker';



const data = [
    { user: 'Mor', value: '1' },
    { user: 'Yana', value: '2' },
    { user: 'Yossi', value: '3' },
    { user: 'Shir', value: '4' },
    { user: 'Swagger', value: '5' },
];

export default function CreateTask({}) {
    const [checked, setChecked] = useState(false);
    const [value, setValue] = useState(null);
    const [isFocus, setIsFocus] = useState(false);
    const [date, setDate] = useState(new Date(1598051730000));
    const [mode, setMode] = useState('date');
    const [show, setShow] = useState(false);

    const onChange = (event, selectedDate) => {
        const currentDate = selectedDate;
        setShow(false);
        setDate(currentDate);
    };

    const showMode = (currentMode) => {
        setShow(true);
        setMode(currentMode);
    };

    const showDatepicker = () => {
        showMode('date');
    };

    const showTimepicker = () => {
        showMode('time');
    };

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
                    data={data}
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
                    value={checked}
                    onValueChange={(value) => setChecked(value)}
                />
                <Text
                    h4
                >Urgent</Text>
            </View>
            <View>
                <View>
                    <Button onPress={showDatepicker} title="Show date picker!" />
                </View>
                <View>
                    <Button onPress={showTimepicker} title="Show time picker!" />
                </View>
                <Text>selected: {date.toLocaleString()}</Text>
                {show && (
                    <DateTimePicker
                        testID="dateTimePicker"
                        value={date}
                        mode={mode}
                        is24Hour={true}
                        onChange={onChange}
                    />
                )}
            </View>
        </KeyboardAwareScrollView>
    )
};

const styles = StyleSheet.create({
    container: {
        backgroundColor: 'white',
        padding: 16,
    },
    row:{
        alignItems: "center",
        display: "flex",
        flexDirection: "row",
        marginTop: '10%'
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
        backgroundColor: 'white',
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
});