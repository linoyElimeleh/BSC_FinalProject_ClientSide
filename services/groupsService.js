const createGroup = async (group, token) => {
    const {groupName, description, image} = group;

    const response = await fetch('http://todobom.herokuapp.com/api/groups', {
        method: 'POST',
        headers: {
            'Authorization': 'Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MSwiZW1haWwiOiJ1c2VyQGVtYWlsLmNvbSIsImlhdCI6MTY0NzAyMDU0MSwiZXhwIjoxNjQ3MDI0MTQxfQ.M0jOcdpMQ5rkMF7Kq1Bc7CCtW5JmcBK_IiRv5wJSjnU',
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