import Socket from "./Socket";
class TaskSocket extends Socket{

    taskCreated = (group_id) => {
        return this.echo.private(`tasks.${group_id}`)
    }
}

export default TaskSocket;