import React, {useState} from 'react'
import {View, StyleSheet} from 'react-native'
import {Text,} from 'react-native-elements';
import {Dropdown} from 'react-native-element-dropdown';
import FontAwesome from "react-native-vector-icons/FontAwesome";

export default function CustomDropdown({data, placeholder, labelText, search, iconLabel}) {
    const [isFocus, setIsFocus] = useState(false)
    const [value, setValue] = useState(null);

    const renderLabel = () => {
        if (value || isFocus) {
            return (
                <Text style={[styles.label, isFocus && {color: 'blue'}]}>
                    {labelText}
                </Text>
            );
        }
        return null;
    };

    return (
        <View style={styles.container}>
            {renderLabel()}
            <Dropdown
                style={[styles.dropdown, isFocus && {borderColor: 'blue'}]}
                placeholderStyle={styles.placeholderStyle}
                selectedTextStyle={styles.selectedTextStyle}
                inputSearchStyle={styles.inputSearchStyle}
                iconStyle={styles.iconStyle}
                data={data}
                search={search}
                maxHeight={200}
                labelField="key"
                valueField="value"
                placeholder={!isFocus ? placeholder : '...'}
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
                        style={styles.elements}
                        color={isFocus ? 'blue' : 'black'}
                        name={iconLabel}
                        size={20}
                    />
                )}
            />
        </View>
    )
};

const styles = StyleSheet.create({
    container: {
        padding: 16,
    },
    elements: {
        marginRight: 5
    },
    dropdown: {
        height: 50,
        borderColor: 'gray',
        borderWidth: 0.5,
        borderRadius: 8,
        paddingHorizontal: 8,
    },
    row: {
        alignItems: "center",
        display: "flex",
        flexDirection: "row",
    },
    label: {
        backgroundColor: '#FFFFFF',
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
