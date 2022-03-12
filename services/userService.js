import {configData} from '../settings'

const getUserGroups = async (token) => {
    try {
        const response = await fetch(`${configData.SERVER_URL}/users/me/groups`,
            {
                method: 'GET',
                headers: {
                    Authorization: `Bearer ${token}`
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