import {Image, Text, View} from "react-native";

export default function LogoTitle({groupName}) {
    return (
        <View>
            <Image
                style={{ width: 50, height: 50 }}
                source={{
                    uri: 'https://reactnative.dev/img/tiny_logo.png',
                }}
            />
            <Text>{groupName}</Text>
        </View>
    );
}