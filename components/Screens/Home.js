import React from 'react';
import {AddGroup, GroupCreated, GroupPage, GroupsScreen, JoinGroup} from "../Groups";
import CreateTask from "../Tasks/CreateTask";
import {HeaderBackButton} from "@react-navigation/elements";
import {DefaultTheme, NavigationContainer} from "@react-navigation/native";
import {createNativeStackNavigator} from '@react-navigation/native-stack';

const Stack = createNativeStackNavigator();
const MyTheme = {
    ...DefaultTheme,
    colors: {
        ...DefaultTheme.colors,
        primary: '#FFFFFF',
        background: '#FFFFFF'
    },
}

export default function Home() {

    return (
        <Stack.Navigator
            screenOptions={{
                headerStyle: {
                    backgroundColor: '#2089dc',
                },
                headerTintColor: '#fff',
                headerTitleStyle: {
                    fontWeight: 'bold',
                },
            }}
        >
            <Stack.Screen
                name="Groups"
                component={GroupsScreen}
                options={({}) =>
                    (
                        {
                            headerLeft: ()=>{},
                            headerBackVisible:false,
                        }
                    )
                }

            />
            <Stack.Screen
                name="Group"
                component={GroupPage}
                options={({ route }) => ({ title: route.params.name })}
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
                name="Create Task"
                component={CreateTask}
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
    )
}
