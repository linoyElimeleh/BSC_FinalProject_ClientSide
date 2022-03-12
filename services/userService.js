import {configData} from '../settings'

const getUserGroups = async () => {
    try {
        const response = await fetch(`${configData.SERVER_URL}/users/me/groups`,
            {
                method: 'GET',
                headers: {
                    Authorization: 'Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MSwiZW1haWwiOiJ1c2VyQGVtYWlsLmNvbSIsImlhdCI6MTY0NzA4Mzg0MCwiZXhwIjoxNjQ3MDg3NDQwfQ.ncWQVfMj251W1-48ZEKk5ilFi-HocDFI3J1APXshX6g'
                }
            }
        );

        const groups = await response.json();
        return groups;

    } catch (error) {
        console.error(error);
    }
};

export default {
    getUserGroups
};