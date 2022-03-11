const getUserGroups = async () => {
    try {
        const response = await fetch('http://todobom.herokuapp.com/api/users/me/groups',
            {
                method: 'GET',
                headers: {
                    Authorization: 'Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MiwiZW1haWwiOiJ1c2VyQGVtYWlsLmNvbSIsImlhdCI6MTY0NjUwMzA2OSwiZXhwIjoxNjQ2NTA2NjY5fQ.le6N-QmCMb0CGBvMSE7gzV_ZhLf_8oEvo0oNKqgX5c8'
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