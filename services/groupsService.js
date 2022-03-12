import {configData} from '../settings'

const createGroup = async (group, token) => {
    const {groupName, description, image} = group;

    const response = await fetch(`${configData.SERVER_URL}/groups`, {
        method: 'POST',
        headers: {
            'Authorization': 'Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MjYxLCJlbWFpbCI6InlhbmFAZW1haWwuY29tIiwiaWF0IjoxNjQ3MTE5MjE3LCJleHAiOjE2NDcxMjI4MTd9.XbYXNunv-6XGLZU5F78mJEgqgfBOvAHJkaw1i7P-ZaA',
            'Accept': 'application/json',
            'Content-Type': 'application/json'
        },
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
        headers: {
            'Authorization': 'Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MjYxLCJlbWFpbCI6InlhbmFAZW1haWwuY29tIiwiaWF0IjoxNjQ3MTE5MjE3LCJleHAiOjE2NDcxMjI4MTd9.XbYXNunv-6XGLZU5F78mJEgqgfBOvAHJkaw1i7P-ZaA',
            'Accept': 'application/json',
            'Content-Type': 'application/json'
        },
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