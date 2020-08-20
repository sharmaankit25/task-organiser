import Socket from "./Socket";
class TaskSocket {
    taskCreated = (user_id) => {
        return Socket.private(`tasks.${user_id}`)
    }

    taskUpdated = (user_id) => {
        return Socket.private(`tasks.updated.${user_id}`)
    }
}

export default TaskSocket;
