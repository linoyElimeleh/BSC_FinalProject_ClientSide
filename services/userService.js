import {configData} from '../settings'

const getUserGroups = async () => {
    try {
        const response = await fetch(`${configData.SERVER_URL}/users/me/groups`,
            {
                method: 'GET',
                headers: {
                    Authorization: 'Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MjYxLCJlbWFpbCI6InlhbmFAZW1haWwuY29tIiwiaWF0IjoxNjQ3MDk5NTk5LCJleHAiOjE2NDcxMDMxOTl9.JdC9ARJq1iyBSgSLlAv77fICwhLHl0R7XX7MnIVdJis'
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