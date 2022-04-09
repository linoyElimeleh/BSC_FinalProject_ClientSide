import {StyleSheet, I18nManager ,Text, View} from 'react-native';
import {NavigationContainer, DefaultTheme} from '@react-navigation/native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import WelcomePage from './components/welcomePage/WelcomePage';
import { HeaderBackButton } from '@react-navigation/elements';
import SignIn from './components/SignIn/SignIn';
import SignUp from './components/SignUp/SignUp';
import {GroupsScreen, AddGroup, GroupCreated, JoinGroup} from './components/Groups'
import {CreateTask} from "./components/Tasks";

I18nManager.forceRTL(false);
I18nManager.allowRTL(false);

const Stack = createNativeStackNavigator();
const MyTheme = {
    ...DefaultTheme,
    colors: {
        ...DefaultTheme.colors,
        primary: '#FFF1ED',
        background: '#FFF1ED'
    },
}

export default function App() {
    return (
        <NavigationContainer theme={MyTheme}>
            <Stack.Navigator>
                <Stack.Screen
                    name="Create New Task"
                    component={CreateTask}
                />
                <Stack.Screen
                    name="Welcome Page"
                    component={WelcomePage}
                />

                <Stack.Screen
                    name="Sign In"
                    component={SignIn}
                />
                <Stack.Screen
                    name="Sign Up"
                    component={SignUp}
                />
                <Stack.Screen
                    name="Groups"
                    component={GroupsScreen}
                    options={({}) =>
                        (
                            {
                                headerLeft: () => {}
                            }
                        )
                    }
                />

                <Stack.Screen
                    name="Create Group"
                    component={AddGroup}
                />
                <Stack.Screen
                    name="Join Group"
                    component={JoinGroup}
                />
                <Stack.Screen
                    name="Group Created"
                    component={GroupCreated}
                    options={({navigation}) =>
                        (
                            {
                                headerLeft: () => (<HeaderBackButton onPress={()=> navigation.navigate('Groups')}/>)
                            }
                        )
                    }
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
