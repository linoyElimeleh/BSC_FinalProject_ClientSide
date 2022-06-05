const createTask = (task) => {
    const taskBody = {
        task: {
            id: task.id,
            title: task.title,
            description: task.description,
            category_id: task.category,
            due_date: task.dueDate,
            done: false,
            repeat: task.repeat,
            end_repeat: task.endDate,
            urgent: task.urgent,
            snooze_interval: task.snooze,
            level: task.level,
        },
        userId: task.taskOwner,
    };
    return taskBody;
};

export default {
    createTask,
};
