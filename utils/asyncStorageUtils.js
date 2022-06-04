import AsyncStorage from "@react-native-async-storage/async-storage";

export const getData = async (key) => {
    try {
        const value = await AsyncStorage.getItem(key);
        if (value !== null) {
            return value;
        }
    } catch (e) {
        console.log("AsyncStorage get error: " + e.message);
    }
};

export const storeData = async (key, value) => {
    try {
        await AsyncStorage.setItem(key, value);
    } catch (e) {
        console.log("AsyncStorage set error: " + e.message);
    }
};

export const removeData = async (key) => {
    try {
        await AsyncStorage.removeItem(key);
        return true;
    } catch (e) {
        console.log("AsyncStorage remove error: " + e.message);
        return false;
    }
};
