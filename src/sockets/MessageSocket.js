import Socket from "./Socket";
class MessageSocket extends Socket{

    userMessageReceived = (user_id) => {
        return this.echo.private(`messages.${user_id}.user`)
    }

    groupMessageReceived = (group_id) => {
        return this.echo.private(`messages.${group_id}.group`)
    }
}

export default MessageSocket;
