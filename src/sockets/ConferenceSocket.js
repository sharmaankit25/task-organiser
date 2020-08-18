import Socket from "./Socket";
class ConferenceSocket extends Socket{

    userVideoConferenceReceived = (user_id) => {
        return this.echo.join(`conference.${user_id}.user`)
    }

    groupVideoConferenceReceived = (group_id) => {
        return this.echo.join(`conference.${group_id}.group`)
    }

    groupVideoConferenceDisconnected = (group_id) => {
        return this.echo.join(`conference.${group_id}.group.disconnect`)
    }
}

export default ConferenceSocket;
