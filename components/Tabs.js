import {StyleSheet, I18nManager ,Text, View} from 'react-native';
import {DefaultTheme} from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import {Home, Goals} from "./Screens";
import {ProfileStack} from "./Screens/Stacks";
import FontAwesome from "react-native-vector-icons/FontAwesome";

I18nManager.forceRTL(false);
I18nManager.allowRTL(false);

const Tab = createBottomTabNavigator();
export default function Tabs() {
    return (
        <Tab.Navigator
            screenOptions={{
                headerShown:false,
                tabBarActiveTintColor: '#2089dc',
                tabBarInactiveTintColor: 'lightgray',
            }}
        >
            <Tab.Screen
                name="Groups"
                component={Home}
                options={{
                    tabBarIcon:({color,size}) =>(
                        <FontAwesome name="group" color={color} size={size}/>
                    )
                }}
            />
            <Tab.Screen
                name="Me"
                component={ProfileStack}
                options={{
                    tabBarIcon:({color,size}) =>(
                        <FontAwesome name="user" color={color} size={size}/>
                    )
                }}
            />
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
