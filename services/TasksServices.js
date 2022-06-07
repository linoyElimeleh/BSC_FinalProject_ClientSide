import {configData} from '../settings'

export const DeleteTask = async (groupId,idJson) => {
    try {
        const response = await fetch(`${configData.SERVER_URL}/groups/${groupId}/task`,
            {
                method: 'DELETE',
                body: JSON.stringify(idJson)
            });
        return response
    } catch (error) {
        console.error(JSON.stringify(error));
        return (error)
    }
};


export const AssignTask = async (groupID, taskUserJson) => {
    try {
        const response = await fetch(`${configData.SERVER_URL}/groups/${groupID}/task/assign`,
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


export const SetStatusTask = async (groupID,statusJson) => {
    try {
        const response = await fetch(`${configData.SERVER_URL}/groups/${groupID}/task/set_status`,
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


export const RejectTask = async (groupId, task) => {
    try {
        const response = await fetch(`${configData.SERVER_URL}/groups/${groupId}/task/reject`,
            {
                method: 'PUT',
                body: JSON.stringify({ task })
            });
        return response;
    } catch (error) {
        console.error(JSON.stringify(error));
        return (error)
    }
}