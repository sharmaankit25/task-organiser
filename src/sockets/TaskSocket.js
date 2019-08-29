import Socket from "./Socket";
class TaskSocket extends Socket{

    taskCreated = (user_id) => {
        return this.echo.private(`tasks.${user_id}`)
    }

    taskUpdated = (user_id) => {
        return this.echo.private(`tasks.updated.${user_id}`)
    }
}

export default TaskSocket;