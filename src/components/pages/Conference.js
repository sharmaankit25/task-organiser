import React, { useState, createRef, useEffect } from 'react';
import { getDisplayStream, getCameraStream } from '../../config/media-access';
import ConferenceSocket from '../../sockets/ConferenceSocket'
import ConferenceApi from '../../apis/ConferenceApi'
import Peerjs from 'peerjs'
import { PeerConfig } from '../../config/peer'
import VideoItem from '../VideoItem'
import Message from '../messages/Messages'

export default function Conference({ match:{params:{slug,group_id}} }) {
    const [video]=useState(createRef())
    const [usersVideos, setUsersVideos] = useState({})
    const [localStream, setLocalStream] = useState(null)
    const [micState, setMicState] = useState(true)
    const [camState, setCamState] = useState(true)
    const [screenState, setScreenState] = useState(false)
    const [Peer, setPeer] = useState(null)

    const disconnectStream = async (id) => {
        await new ConferenceApi().disconnect(id, group_id)
    }

    const connectStream = async (id) => {
        await new ConferenceApi().connect(id, group_id)
    }

    const subscribeDisconnectConferenceChannel = () => {
        new ConferenceSocket().groupVideoConferenceDisconnected(group_id)
        .listen("ConferenceDisconnectEvent", ({ id }) => {
            if (Object.keys(usersVideos).length) {
                console.log('ConferenceDisconnectEvent', id)
                removeUserStream(id)
            }
        })

    }

    const subscribeConnectConferenceChannel = () => {
        new ConferenceSocket().groupVideoConferenceReceived(group_id)
        .here((users) => {
            console.log('Here ', users)
        })
        .joining((user) => { console.log('Joining', user) })
        .leaving((user)=> {
            console.log('Leaving ', user)
        })
        .listen("ConferenceEvent", ({ id }) => {
            console.log("ConferenceEvent", id)
            connectToRemoteUser(id)
        })
        .listenForWhisper('typing', () => {

        })

    }

    // const removeSocketsSubscriptions = () => {
    //     new ConferenceSocket().groupVideoConferenceReceived(group_id)
    // }

    const connectToRemoteUser = (otherUserPeerId) => {
        if (Peer && localStream) {
            console.log('Remote User Call')

            Peer.call(otherUserPeerId, localStream)
            Peer.on('stream', userVideoStream => {
                setUsersVideos({ ...usersVideos, [otherUserPeerId]: userVideoStream })
            })

            Peer.on('disconnected', () => {
                console.log("Remote Peer disconnected");
            });

            Peer.on('close', () => {
                console.log("Remote Peer closed remotely");
            });

            Peer.on('error', (error) => {
                console.log("peer error", error);
            });
        }
    }
    // Peer Effect
    useEffect(() => {
        if (!Peer) {
            setPeer(new Peerjs(undefined, PeerConfig ))
        } else {
            Peer.on('open', (id) => {
                connectStream(id)
                subscribeDisconnectConferenceChannel()
            })
        }
        return () => {
            if (Peer) {
                console.log('Clear Peer')
                disconnectStream(Peer.id)
                // Peer.disconnect()
                // Peer.destroy()
                setPeer(null)
            }
        }
    }, [Peer])

    // Stream Effect
    useEffect(() => {
        if (!localStream) {
            if (!screenState) {
                getUserMedia()
            } else {
                getDisplay()
            }
        } else {

        }



        return () => {
            if (localStream) {
                localStream.getTracks().forEach((track) => track.stop());
                setLocalStream(null)
                console.log('clear user videos')
                setUsersVideos({})
            }
        }
    }, [localStream, screenState])


    useEffect(() => {
        if (Peer && localStream) {
            Peer.on('call', (call) => {
                call.answer(localStream)
                call.on('stream', userVideoStream => {
                    console.log('On Call Stream', userVideoStream)
                    setUsersVideos({ ...usersVideos, [call.peer]: userVideoStream })
                })
                call.on('close', () => {
                    console.log("The call has ended");
                    removeUserStream(call.peer);
                });

                call.on('error', (error) => {
                    console.log(error);
                    removeUserStream(call.peer);
                });
            })

            Peer.on('disconnected', () => {
                console.log("My Peer disconnected");
            });

            Peer.on('close', () => {
                console.log("Peer closed remotely");
            });

            Peer.on('error', (error) => {
                console.log("peer error", error);
            });
            subscribeConnectConferenceChannel()
        }
    }, [localStream, Peer])


    const getUserMedia = async () => {
        try {
            const stream = await getCameraStream()
            setLocalStream(stream)
            setMyVideoObject (stream)
        } catch (err) {
            console.log(err)
            console.log('Not able to stream.')
        }
        if (screenState) {
            setScreenState(false)
        }
    }

    const getDisplay = async () => {
        try {
            const stream = await getDisplayStream()
            setLocalStream(stream)
            setMyVideoObject (stream)
            stream.oninactive = () => {
                getUserMedia()
            }
        } catch (err) {
            console.log('Not able to stream display.')
        }
        if (!screenState) {
            setScreenState(true)
        }
    }

    const removeUserStream = (userPeerId) => {
        const newUserVideosObj = Object.assign({}, usersVideos)
        delete newUserVideosObj[userPeerId]
        setUsersVideos(newUserVideosObj)
    }

    const setAudioLocal = () => {
        if (localStream) {
            if(localStream.getAudioTracks().length > 0){
                localStream.getAudioTracks().forEach(track => {
                  track.enabled=!track.enabled;
                });
            }
        }
        setMicState(!micState)
    }

    const setVideoLocal = () => {
        if (localStream) {
            if(localStream.getVideoTracks().length > 0){
                localStream.getVideoTracks().forEach(track => {
                  track.enabled=!track.enabled;
                });
            }
        }
        setCamState(!camState)
    }

    const setMyVideoObject = (stream) => {
        if (stream.active) {
            try {
                video.current.srcObject = stream
            } catch (e) {
                video.current.src = URL.createObjectURL(stream)
            }
        }
    }

    if (localStream) {
        return (
            <section className="section">
                <div className="columns is-multiline">
                    { Object.keys(usersVideos).length > 0 &&
                        <div className="column is-one-third">
                            <div className="card">
                            {
                                Object.keys(usersVideos).map(userId => (
                                    <VideoItem key={userId} stream={usersVideos[userId]} />
                                ))
                            }
                            </div>
                        </div>
                    }
                        <div className="column is-one-third">
                        <div className="card">
                        <video playsInline muted ref={video} autoPlay={true} />
                        <div className="columns is-vcentered">
                        <span className="column is-two-thirds">
                            <p style={{ padding: '0px 5px 0px 5px' }} className="subtitle">You</p>
                        </span>
                        <span className="column">
                        <div className="buttons are-small">
                            <button className="button is-secondary" onClick={() => setScreenState(!screenState)} >
                            <span className="icon">
                                <i className={`fas fa-desktop`} ></i>
                            </span>
                            </button>
                            <button className="button is-danger" onClick={setAudioLocal} >
                                <span className="icon">
                                    <i className={`fas ${micState ? 'fa-microphone' : 'fa-microphone-slash'}`} ></i>
                                </span>
                            </button>
                            <button className="button is-info" onClick={setVideoLocal} >
                                <span className="icon">
                                    <i className={`fas ${camState ? 'fa-video' : 'fa-video-slash'}`}></i>
                                </span>
                            </button>
                        </div>
                        </span>
                        </div>
                        </div>
                    </div>
                </div>
                <Message groupId={group_id} />
            </section>
        )
    } else {
        return (<div>Load Camera</div>)
    }

}
