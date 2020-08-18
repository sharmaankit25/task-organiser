import React, { useState, createRef, useEffect } from 'react';
import { getDisplayStream } from '../../config/media-access';
import ConferenceSocket from '../../sockets/ConferenceSocket'
import ConferenceApi from '../../apis/ConferenceApi'
import Peer from 'peerjs';
import VideoItem from '../VideoItem'
import Message from '../messages/Messages'

export default function Conference({ match:{params:{slug,group_id}} }) {
    const [video]=useState(createRef())
    const [usersVideos, setUsersVideos] = useState({})
    const [localStream, setLocalStream] = useState(null)
    const [micState, setMicState] = useState(true)
    const [camState, setCamState] = useState(true)
    const [myPeer, setMyPeer] = useState(new Peer(undefined, {
            host: '/',
            secure: process.env.NODE_ENV !== 'development',
            port: '9000'
        }))

    useEffect(() => {
        if (!localStream) {
            getUserMedia()
        }

        if (myPeer) {
            myPeer.on('open', async (id) => {
                await new ConferenceApi().fetch(myPeer.id, group_id)
            }).on('call', (call) => {
                if (localStream) {
                    call.answer(localStream)
                    call.on('stream', userVideoStream => {
                        setUsersVideos({ ...usersVideos, [call.peer]: userVideoStream })
                        console.log(Object.keys(usersVideos).length, usersVideos)
                    })
                }

            })
        }

        if (localStream && localStream.active) {
            // console.log('LocalStream',localStream)
            subscribeToVideoConferenceChannel()
        }


        return () => {
            if (localStream) {
                localStream.getTracks().forEach((track) => track.stop());
            }
        }
    },[localStream, myPeer])


    const setMyVideoObject = (stream) => {
        try {
            video.current.srcObject = stream
        } catch (e) {
            video.current.src = URL.createObjectURL(stream)
        }
    }

    const getUserMedia = (cb) => {
        return new Promise((resolve, reject) => {
          navigator.getUserMedia = navigator.getUserMedia || navigator.webkitGetUserMedia || navigator.mozGetUserMedia || navigator.msGetUserMedia || navigator.oGetUserMedia;
          navigator.getUserMedia(
            { video: {
                width: { min: 160, ideal: 640, max: 640 },
                height: { min: 120, ideal: 360, max: 360 }
              }, audio: true },
            stream => {
                setLocalStream(stream)
                setMyVideoObject (stream)
                resolve();
            },
            (error)=> {
                reject(error);
            }
          );
        });
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

    const getDisplay = () => {
        getDisplayStream().then(stream => {
          stream.oninactive = () => {
            // this.state.peer.removeStream(this.state.localStream);
            getUserMedia().then(() => {
            //   this.state.peer.addStream(this.state.localStream);
            });
          };
          //   this.localVideo.srcObject = stream;
          //   this.state.peer.addStream(stream);
            setLocalStream(stream)
            setMyVideoObject (stream)
        });
    }

    const subscribeToVideoConferenceChannel = () => {
        new ConferenceSocket().groupVideoConferenceReceived(group_id)
        .listen("ConferenceEvent", ({ id }) => {
            // console.log('Other User Peer', id)
            connectToNewUser(id)
        })
    }

    const connectToNewUser = (otherUserPeerId) => {
        if (myPeer && localStream) {
            myPeer.call(otherUserPeerId, localStream)
            .on('stream', userVideoStream => {
                // Attach stream to video
                setUsersVideos({ ...usersVideos, [otherUserPeerId]: userVideoStream })
                console.log(usersVideos)
            })
            .on('close', () => {
                console.log('Remove Video')
            })
        }

    }

    return (
        <section className="section">
        <div className="columns is-multiline">
            <div className="column is-one-third">
                <div className="card">
                {
                    Object.keys(usersVideos).map(userId => (
                        <VideoItem key={userId} stream={usersVideos[userId]} />
                    ))
                }
                </div>
            </div>
            <div className="column is-one-third">
                <div className="card">
                <video playsInline muted ref={video} autoPlay={true} />
                <div className="columns is-vcentered">
                <span className="column is-two-thirds">
                    <p style={{ padding: '0px 5px 0px 5px' }} className="subtitle">You</p>
                </span>
                <span className="column">
                <div className="buttons are-small">
                    <button className="button is-secondary" onClick={getDisplay} >
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
}
