import {configData} from '../settings'

const createGroup = async (group, token) => {
    const {groupName, description, image} = group;

    const response = await fetch(`${configData.SERVER_URL}/groups`, {
        method: 'POST',
        body: JSON.stringify({
            group_name: groupName,
            description: description,
            image: image
        })
    });

    const groupDetails = await response.json();
    return groupDetails;
};

export const GetGroupMembers = async (id) => {
    try {
        const response = await fetch(`${configData.SERVER_URL}/groups/${id}/members`,
            {
                method: 'GET',
            });
        const json = await response.json();
        return json
    } catch (error) {
        console.error(error);
        return (error)
    }
};
export const GetGroupTasks = async (id) => {
    try {
        const response = await fetch(`${configData.SERVER_URL}/groups/${id}/tasks`,
            {
                method: 'GET',
            });
        const json = await response.json();
        return json
    } catch (error) {
        console.error(error);
        return (error)
    }
};

const joinGroup = async (inviteCode, token) => {
    const response = await fetch(`${configData.SERVER_URL}/join`, {
        method: 'POST',
        body: JSON.stringify({
            invite_code: inviteCode
        })
    });

    const groupDetails = await response.json();
    return groupDetails;
};

export const getGroupMembers = async (groupId) => {
    try {
        const response = await fetch(`${configData.SERVER_URL}/groups/${groupId}/members`)
        const members = await response.json();
        return members
    } catch (error) {
        console.error(error);
        return (error)
    }
};

export default {
    createGroup,
    joinGroup,
    getGroupMembers
};