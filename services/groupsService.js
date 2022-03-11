const createGroup = async (group, token) => {
    const {groupName, description, image} = group;

    const response = await fetch('http://todobom.herokuapp.com/api/groups', {
        method: 'POST',
        headers: {
            'Authorization': 'Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MSwiZW1haWwiOiJ1c2VyQGVtYWlsLmNvbSIsImlhdCI6MTY0Njk5NDg0NiwiZXhwIjoxNjQ2OTk4NDQ2fQ.mPqiCrwXd_9KU5q8m37YPoUkRmMDFBBrSzQwm2-zAvI',
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