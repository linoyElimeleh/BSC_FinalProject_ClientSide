const createTask = (task) => {
    const taskBody = {
        task: {
            title: task.title,
            description: task.title,
            category_id: task.category,
            due_date: task.fromDate+task.time,
            done: false,
            repeat: task.repeat,
            end_repeat: task.toDate,
            urgent: task.urgent,
            snooze_interval: task.snooze,
            score: task.score
        },
        userId: task.taskOwner
    }
    return taskBody;
};

export default {
    createTask
};