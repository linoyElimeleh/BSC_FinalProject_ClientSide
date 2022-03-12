import {configData} from '../settings'

const createGroup = async (group, token) => {
    const {groupName, description, image} = group;

    const response = await fetch(`${configData.SERVER_URL}/groups`, {
        method: 'POST',
        headers: {
            'Authorization': 'Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MSwiZW1haWwiOiJ1c2VyQGVtYWlsLmNvbSIsImlhdCI6MTY0NzA3MzgwMiwiZXhwIjoxNjQ3MDc3NDAyfQ.j43D0diEOF2TF2Q0EzsZirv9c5s5xceLumU734ENaIs',
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

const joinGroup = async () => {

};

export default {
    createGroup,
    joinGroup
};