const createGroup = async (group, token) => {
    const {name, description, image} = group;

    const response = fetch('http://todobom.herokuapp.com/api/groups', {
        method: 'POST',
        headers: {
            Authorization: 'Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MiwiZW1haWwiOiJ1c2VyQGVtYWlsLmNvbSIsImlhdCI6MTY0NjQ4NjQ4NCwiZXhwIjoxNjQ2NDkwMDg0fQ.7bvh8Kc9w_Ps-EuQ5vFnuLZSl5ENITyBImjiZacBBHk',
        },
        body: JSON.stringify({
            group_name: name,
            description: description,
            image: image
        })
    });
};