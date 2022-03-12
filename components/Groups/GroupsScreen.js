import React from 'react';
import { View, StyleSheet } from 'react-native'
import { FAB } from 'react-native-elements';
import GroupsList from "./GroupsList";
import groupScreenStyles from "./groupScreenStyles";

export default function GroupsScreen({navigation}){
    return(
        <View style={groupScreenStyles.container}>
            <GroupsList/>
            <View>
                <FAB
                    icon={{ name: 'add', color: 'white' }}
                    color="#4366b6" style={groupScreenStyles.floatingButtonPlus}
                    onPress={() => { navigation.navigate("Create Group")}}
                />,
                <FAB
                    icon={{ name: 'link', color: 'white' }}
                    color="#4366b6" style={groupScreenStyles.floatingButtonLink}
                />
            </View>
        </View>
    );
};
