import Socket from "./Socket";
class MessageSocket {

    userMessageReceived = (user_id) => {
        return Socket.private(`messages.${user_id}.user`)
    }

    groupMessageReceived = (group_id) => {
        return Socket.private(`messages.${group_id}.group`)
    }
}

export default MessageSocket;
