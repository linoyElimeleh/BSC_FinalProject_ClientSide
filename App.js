import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View } from 'react-native';
import WelcomePage from './components/welcomePage/WelcomePage';
import SignIn from './components/SignIn/SignIn'
import SignUp from './components/SignUp/SignUp'
import { NavigationContainer, DefaultTheme } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

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
          name="Welcome"
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
      </Stack.Navigator>
      {/* <View style={styles.container}>
        <SignIn></SignIn>
        <WelcomePage navigation={Stack}></WelcomePage>
        <SignUp></SignUp>
        <StatusBar style="auto" />
      </View> */}
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
