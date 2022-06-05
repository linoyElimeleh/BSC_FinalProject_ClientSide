import {configData} from '../settings'

const DeleteTask = async (groupId,idJson) => {
    try {
        const response = await fetch(`${configData.SERVER_URL}/groups/${groupId}/task`,
            {
                method: 'DELETE',
                body: JSON.stringify(idJson)
            });
        const json = await response.json();
        return json
    } catch (error) {
        console.error(error);
        return (error)
    }
};


const AssignTask = async (groupID,taskUserJson) => {
    try {
        const response = await fetch(`${configData.SERVER_URL}/tasks/${groupID}/task/assign`,
            {
                method: 'PUT',
                body: JSON.stringify(taskUserJson)
            });
        return response.status
    } catch (error) {
        console.error(error);
        return (error)
    }
};


const SetStatusTask = async (groupID,statusJson) => {
    try {
        const response = await fetch(`${configData.SERVER_URL}/tasks/${groupID}/task/set_status`,
            {
                method: 'PUT',
                body: JSON.stringify(statusJson)
            });
           return response.status
    } catch (error) {
        console.error(error);
        return (error)
    }
};

export default {
    DeleteTask,
    AssignTask,
    SetStatusTask
};