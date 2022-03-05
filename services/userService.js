const getUserGroups = async (user, token) => {
    try {
        const response = fetch('http://todobom.herokuapp.com/api/users/me/groups',
            {
                method: 'POST',
                headers: {
                    Authorization: 'Bearer ' + token,
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