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

export default {
    createGroup,
    joinGroup
};