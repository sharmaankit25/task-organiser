import Socket from "./Socket";
export default {
    userVideoConferenceReceived (user_id) {
        return Socket.join(`conference.${user_id}.user`)
    },
    groupVideoConferenceReceived (group_id) {
        return Socket.join(`conference.${group_id}.group`)
    },
    leaveConferenceGroup (group_id) {
        return Socket.leave(`conference.${group_id}.group`)
    }
}
