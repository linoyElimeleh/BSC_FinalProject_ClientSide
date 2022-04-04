import {configData} from '../settings'

const getUserGroups = async (token) => {
    try {
        const response = await fetch(`${configData.SERVER_URL}/users/me/groups`);
        const groups = await response.json();
        return groups;

    } catch (error) {
        console.error(error);
    }
};


export const GetMeDetails = async () => {
    try {
        const response = await fetch(`${configData.SERVER_URL}/users/me`,
            {
                method: 'GET',
            });
        const json = await response.json();
        return json;
    } catch (error) {
        console.error(error);
        return (error)
    }
};

export default {
    getUserGroups
};