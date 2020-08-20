import Peer from 'peerjs';

// export default new Peer(undefined, {
//     host: '/',
//     secure: process.env.NODE_ENV !== 'development',
//     port: '9000'
// })

export const PeerConfig = {
    host: '/',
    secure: process.env.NODE_ENV !== 'development',
    port: '9000'
}
