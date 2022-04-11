import {configData} from "../settings";

export const getCategories = async () => {
    try {
        const response = await fetch(`${configData.SERVER_URL}/categories`)
        const categories = await response.json();
        return categories
    } catch (error) {
        console.error(error);
        return (error)
    }
};

export default {
    getCategories
};