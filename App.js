import {StyleSheet, I18nManager, Text, View} from 'react-native';
import {NavigationContainer, DefaultTheme} from '@react-navigation/native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import WelcomePage from './components/welcomePage/WelcomePage';
import SignIn from './components/SignIn/SignIn';
import SignUp from './components/SignUp/SignUp';
import Tabs from "./components/Tabs";

I18nManager.forceRTL(false);
I18nManager.allowRTL(false);

const Stack = createNativeStackNavigator();

const MyTheme = {
    ...DefaultTheme,
    colors: {
        ...DefaultTheme.colors,
        primary: '#FFFFFF',
        background: '#FFFFFF'
    },
}

export default function App() {
    return (
        <NavigationContainer theme={MyTheme}>
            <Stack.Navigator screenOptions={{
                headerStyle: {
                    backgroundColor: '#2089dc'
                },
                headerTintColor: '#fff',
                headerTitleStyle: {
                    fontWeight: 'bold',
                },
            }}>
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
                    name="Tabs"
                    component={Tabs}
                    options={({}) =>
                        (
                            {
                                headerLeft: () => {
                                },
                                headerBackVisible: false,
                                headerShown: false
                            }
                        )
                    }
                />
            </Stack.Navigator>
        </NavigationContainer>
    );
}
StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff',
        alignItems: 'center',
        justifyContent: 'center',
    },
});
