import {StyleSheet, I18nManager ,Text, View} from 'react-native';
import {DefaultTheme} from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import {GroupsScreen, AddGroup, GroupCreated, JoinGroup, GroupPage} from './Groups'
import {Home, Goals, Profile} from "./Screens";


I18nManager.forceRTL(false);
I18nManager.allowRTL(false);

const Tab = createBottomTabNavigator();

const MyTheme = {
    ...DefaultTheme,
    colors: {
        ...DefaultTheme.colors,
        primary: '#FFFFFF',
        background: '#FFFFFF'
    },
}

export default function Tabs() {
    return (
        <Tab.Navigator
            screenOptions={{
                headerShown:false
            }}>
            <Tab.Screen name="Groups" component={Home} />
            <Tab.Screen name="Goals" component={Goals} />
            <Tab.Screen name="Me" component={Profile} />
        </Tab.Navigator>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff',
        alignItems: 'center',
        justifyContent: 'center',
    },
});
