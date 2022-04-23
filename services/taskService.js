import {configData} from '../settings'
import taskUtil from "./utils/taskUtil";

export const createTask = async (task, groupId) => {
    const taskBody = taskUtil.createTask(task);
    try {
        const response = await fetch(`${configData.SERVER_URL}/groups/${groupId}/task`,
            {
                method: 'POST',
                body: JSON.stringify(taskBody)
            });
        const json = await response.json();
        return json
    } catch (error) {
        console.error(error);
        return (error)
    }
};

export default {
    createTask
};