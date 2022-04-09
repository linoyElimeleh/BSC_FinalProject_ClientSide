import {configData} from '../settings'

const getUserGroups = async () => {
    try {
        const response = await fetch(`${configData.SERVER_URL}/users/me/groups`);
        const groups = await response.json();
        return groups;

    } catch (error) {
        console.error(error);
    }
};

export default {
    getUserGroups
};