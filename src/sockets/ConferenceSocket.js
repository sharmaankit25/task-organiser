import Socket from "./Socket";
class ConferenceSocket {
    userVideoConferenceReceived = (user_id) => {
        return Socket.join(`conference.${user_id}.user`)
    }

    groupVideoConferenceReceived = (group_id) => {
        return Socket.join(`conference.${group_id}.group`)
    }

    groupVideoConferenceDisconnected = (group_id) => {
        Socket.leave(`conference.${group_id}.group`)
        return Socket.join(`conference.${group_id}.group.disconnect`)
    }
}

export default ConferenceSocket;
