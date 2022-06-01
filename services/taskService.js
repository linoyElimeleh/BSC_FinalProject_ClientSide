import {configData} from '../settings'
import taskUtil from "./utils/taskUtil";

export const handleTaskAction = async (task, groupId, action) => {
    const taskBody = taskUtil.createTask(task);
    const method = action === 'create' ? 'POST' : 'PUT';
    try {
        const response = await fetch(`${configData.SERVER_URL}/groups/${groupId}/task`,
            {
                method,
                body: JSON.stringify(taskBody)
            });
        const json = JSON.stringify(response);
        return json
    } catch (error) {
        console.error(JSON.stringify(error));
        return error
    }
};
