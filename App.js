import {StatusBar} from 'expo-status-bar';
import {StyleSheet, Text, View} from 'react-native';
import {NavigationContainer, DefaultTheme} from '@react-navigation/native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import WelcomePage from './components/welcomePage/WelcomePage';
import SignIn from './components/SignIn/SignIn';
import SignUp from './components/SignUp/SignUp';

import {GroupsScreen, AddGroup, GroupCreated} from './components/Groups'

const Stack = createNativeStackNavigator();
const MyTheme = {
    ...DefaultTheme,
    colors: {
        ...DefaultTheme.colors,
        background: 'white'
    },
}

export default function App() {
    return (
        <NavigationContainer theme={MyTheme}>
            <Stack.Navigator>
                <Stack.Screen
                    name="Groups"
                    component={GroupsScreen}
                />
                <Stack.Screen
                    name="Create Group"
                    component={AddGroup}
                />
                <Stack.Screen
                    name="Group Created"
                    component={GroupCreated}
                    options={
                        {headerLeft: () => null}
                    }
                />
                <Stack.Screen
                    name="Sign In"
                    component={SignIn}
                />
                <Stack.Screen
                    name="Sign Up"
                    component={SignUp}
                />
            </Stack.Navigator>
        </NavigationContainer>
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
