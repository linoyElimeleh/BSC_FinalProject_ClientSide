import {StyleSheet} from "react-native";

export default StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'space-between',
    },
    floatingButtonPlus: {
        position: 'absolute',
        zIndex: 200,
        bottom: 10,
        right: 10
    },
    floatingButtonLink: {
        position: 'absolute',
        zIndex: 200,
        bottom: 10,
        right: 80
    }
});