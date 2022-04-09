import React, {useState, useEffect} from 'react'
import {View, StyleSheet, Platform,} from 'react-native'
import {Text, Chip, CheckBox} from 'react-native-elements';
import DateTimePicker from '@react-native-community/datetimepicker';
import Icon from 'react-native-vector-icons/AntDesign';
import MaterialIcon from 'react-native-vector-icons/MaterialIcons';
import {Dropdown} from "react-native-element-dropdown/index";
import FontAwesome from "react-native-vector-icons/FontAwesome";

const data=[
    {type: 'Daily', value:'1'},
    {type: 'Weekly', value:'2'},
    {type: 'Monthly', value:'3'}

]

export default function TimeAndDate() {
    const [date, setDate] = useState(new Date());
    const [time, setTime] = useState(new Date());
    const [reoccurrence, setReoccurrence] = useState(false);
    const [value, setValue] = useState(null);
    const [isFocus, setIsFocus] = useState(false);
    const [showDate, setShowDate] = useState(false);
    const [showTime, setShowTime] = useState(false);

    const onSetDate = (event, selectedDate) => {
        if(selectedDate != null){
            const currentDate = selectedDate;
            setShowDate(false);
            setDate(currentDate);
        }
        setShowDate(false);
    };

    const onSetTime = (event, selectedTime) => {
        if(selectedTime != null){
            const currentDate = selectedTime;
            setShowTime(false);
            setTime(currentDate);
        }
        setShowTime(false);
    };

    const renderLabel = () => {
        if (reoccurrence && (value || isFocus)) {
            return (
                <Text style={[styles.label, isFocus && { color: 'blue' }]}>
                    Reoccurrence type
                </Text>
            );
        }
        return null;
    };

    return (
        <View>
            <View style={styles.row}>
                <CheckBox
                    containerStyle={{backgroundColor:'FFF1ED', borderWidth:0}}
                    title="Reoccurrence"
                    checked={reoccurrence}
                    onPress={() => setReoccurrence(!reoccurrence)}
                />
                <View >
                    {renderLabel()}
                    {reoccurrence && (
                        <Dropdown
                            style={[styles.dropdown, isFocus && { borderColor: 'blue' }]}
                            placeholderStyle={styles.placeholderStyle}
                            selectedTextStyle={styles.selectedTextStyle}
                            inputSearchStyle={styles.inputSearchStyle}
                            iconStyle={styles.iconStyle}
                            data={data}
                            maxHeight={300}
                            labelField="type"
                            valueField="value"
                            placeholder={!isFocus ? 'Select frequency' : '...'}
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
                    )}
                </View>
            </View>
            <View style={styles.container}>
                <View style={styles.row}>
                    <View>
                        <Text>Date</Text>
                        <View style={[styles.card, styles.boxShadow]}>
                            <Chip
                                title={date.toLocaleDateString()}
                                icon={{
                                    name: 'date-range',
                                    type: 'material',
                                    size: 20,
                                }}
                                iconRight
                                onPress={()=> {setShowDate(true)}}
                                buttonStyle={{
                                    backgroundColor: 'white',
                                    borderRadius: 10,
                                }}
                                titleStyle={{ color: 'black', marginHorizontal: 20 }}
                            />
                        </View>
                    </View>
                    {reoccurrence && (
                        <View style={styles.row}>
                            <Text style={{margin:10}}>To:</Text>
                            <View>
                                <Text>Date</Text>
                                <View style={[styles.card, styles.boxShadow]}>
                                    <Chip
                                        title={date.toLocaleDateString()}
                                        icon={{
                                            name: 'date-range',
                                            type: 'material',
                                            size: 20,
                                        }}
                                        iconRight
                                        onPress={()=> {setShowDate(true)}}
                                        buttonStyle={{
                                            backgroundColor: 'white',
                                            borderRadius: 10,
                                        }}
                                        titleStyle={{ color: 'black', marginHorizontal: 20 }}
                                    />
                                </View>
                            </View>
                        </View>
                    )}
                </View>
                <Text>Time</Text>
                <View style={[styles.card, styles.boxShadow]}>
                    <Chip
                        title={time.toLocaleTimeString()}
                        icon={{
                            name: 'access-time',
                            type: 'material',
                            size: 20,
                        }}
                        onPress={()=> {setShowTime(true)}}
                        iconRight
                        buttonStyle={{
                            backgroundColor: 'white',
                            borderRadius: 10,
                        }}
                        titleStyle={{ color: 'black', marginHorizontal: 20 }}
                    />
                </View>
                <View>
                    {showDate && (
                        <DateTimePicker
                            testID="dateTimePicker"
                            value={date}
                            mode='date'
                            is24Hour={true}
                            onChange={onSetDate}
                        />
                    )}
                    {showTime && (
                        <DateTimePicker
                            testID="dateTimePicker"
                            value={time}
                            mode='time'
                            is24Hour={true}
                            onChange={onSetTime}
                        />
                    )}
                </View>
            </View>
        </View>
    )
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'flex-start',
        alignItems: 'flex-start',
        paddingHorizontal: 20,
    },
    row:{
        alignItems: "center",
        display: "flex",
        flexDirection: "row",
    },
    label: {
        backgroundColor: '#FFF1ED',
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
        marginRight: 5
    },
    inputSearchStyle: {
        height: 40,
        fontSize: 16,
    },
    card: {
        backgroundColor: 'white',
        borderRadius: 8,
        marginBottom: 10,
    },
    shadowProp: {
        shadowColor: '#171717',
        shadowOffset: {width: 0, height: 3},
        shadowOpacity: 0.4,
        shadowRadius: 2,
    },
});

const generateBoxShadowStyle = (
    xOffset,
    yOffset,
    shadowColorIos,
    shadowOpacity,
    shadowRadius,
    elevation,
    shadowColorAndroid,
) => {
    if (Platform.OS === 'ios') {
        styles.boxShadow = {
            shadowColor: shadowColorIos,
            shadowOffset: {width: xOffset, height: yOffset},
            shadowOpacity,
            shadowRadius,
        };
    } else if (Platform.OS === 'android') {
        styles.boxShadow = {
            elevation,
            shadowColor: shadowColorAndroid,
        };
    }
};

generateBoxShadowStyle(-2, 4, '#171717', 0.2, 3, 4, '#171717');
