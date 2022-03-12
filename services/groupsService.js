import {configData} from '../settings'

const createGroup = async (group, token) => {
    const {groupName, description, image} = group;

    const response = await fetch(`${configData.SERVER_URL}/groups`, {
        method: 'POST',
        headers: {
            'Authorization': 'Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MSwiZW1haWwiOiJ1c2VyQGVtYWlsLmNvbSIsImlhdCI6MTY0NzA4Mzg0MCwiZXhwIjoxNjQ3MDg3NDQwfQ.ncWQVfMj251W1-48ZEKk5ilFi-HocDFI3J1APXshX6g',
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