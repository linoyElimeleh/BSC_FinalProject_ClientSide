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

export const editProfile = async (displayName,image, email) => {
    try {
        const response = await fetch(`${configData.SERVER_URL}/users/updateProfile`,
            {
                method: 'PUT',
                body: JSON.stringify({displayName, image, email})
            });
        return response;
    } catch (error) {
        console.error(error);
        return (error)
    }
};

const getUserGroupsExtended = async () => {
    try {
        const response = await fetch(`${configData.SERVER_URL}/users/me/groupsCurrentTask`);
        const groups = await response.json();
        return groups;

    } catch (error) {
        console.error(error);
    }
};

export default {
    getUserGroups,
    getUserGroupsExtended
};