import React from 'react';
import { View, StyleSheet } from 'react-native'
import { FAB, Icon } from 'react-native-elements';
import GroupsList from "./GroupsList";

export default function GroupsScreen({navigation}){
    return(
        <View style={styles.container}>
            <GroupsList/>
            <View>
                <FAB
                    icon={{ name: 'add', color: 'white' }}
                    color="#4366b6" style={styles.floatingButtonPlus}
                    onPress={() => { navigation.navigate("Create Group")}}
                />,
                <FAB
                    icon={{ name: 'link', color: 'white' }}
                    color="#4366b6" style={styles.floatingButtonLink}
                />
            </View>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'space-between',
    },
    floatingButtonPlus: {
        position: 'fixed',
        zIndex: 200,
        bottom: 10,
        right: 10
    },
    floatingButtonLink: {
        position: 'fixed',
        zIndex: 200,
        bottom: 10,
        right: 80
    },
});