const getUserGroups = async () => {
    try {
        const response = await fetch('http://todobom.herokuapp.com/api/users/me/groups',
            {
                method: 'GET',
                headers: {
                    Authorization: 'Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MSwiZW1haWwiOiJ1c2VyQGVtYWlsLmNvbSIsImlhdCI6MTY0NzAyNTkyOCwiZXhwIjoxNjQ3MDI5NTI4fQ.qZvNiyMEQZOlyPGYdCQPZE4LSzQiyDptF6yD8WPreZ4'
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