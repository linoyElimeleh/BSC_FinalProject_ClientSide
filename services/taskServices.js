export const GetGroupMembers = async (registerJson) => {
    try {
        const response = await fetch('http://todobom.herokuapp.com/api/users/register',
            {
                method: 'POST',
                body: JSON.stringify(registerJson)
            });
        const json = await response.json();
        return json
    } catch (error) {
        console.error(error);
        return (error)
    }
};

export default {

}