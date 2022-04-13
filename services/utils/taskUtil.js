const createTask = (task) => {
    const taskBody = {
        task: {
            title: task.title,
            description: task.title,
            category_id: task.category,
            due_date: task.dueDate,
            done: false,
            repeat: task.repeat,
            end_repeat: task.endDate,
            urgent: task.urgent,
            snooze_interval: task.snooze,
            score: task.score
        },
        userId: task.taskOwner
    }
    console.log(JSON.stringify(taskBody));
    return taskBody;
};

export default {
    createTask
};