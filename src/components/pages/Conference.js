import React, { useState, createRef, useEffect } from 'react';
import { getDisplayStream } from '../../config/media-access';
import ConferenceSocket from '../../sockets/ConferenceSocket'
import ConferenceApi from '../../apis/ConferenceApi'
import Peer from 'peerjs';
import VideoItem from '../VideoItem'
import Message from '../messages/Messages'

export default function Conference({ match:{params:{slug,group_id}} }) {
    const [video]=useState(createRef())
    const [usersVideos, setUserVideos] = useState({})
    const [localStream, setLocalStream] = useState(null)
    const [myPeer, setMyPeer] = useState(new Peer(undefined, {
        host: '/',
        secure: process.env.NODE_ENV !== 'development',
        port: '9000'
    }))


    const [myMediaStatus, setMyMediaStatus] = useState({ video: {
        width: { min: 160, ideal: 640, max: 640 },
        height: { min: 120, ideal: 360, max: 360 }
      }, audio: true })


    useEffect(() => {

        if (!localStream) {
            getUserMedia().then(async () => {
                if (myPeer.open) {
                    await new ConferenceApi().fetch(myPeer.id, group_id)
                }
            });
        }

        if (localStream) {
            myPeer.on('call', call => {
                call.answer(localStream)
                call.on('stream', userVideoStream => {
                    setUserVideos({ ...usersVideos, [call.peer]: userVideoStream })
                })
            })

            subscribeToVideoConferenceChannel(localStream)
        }

        return () => {
            if (localStream) {
                localStream.getTracks().forEach((track) => track.stop());
            }
        }
    },[localStream])

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
            myMediaStatus,
            stream => {
                setMyVideoObject (stream)
                setLocalStream(stream)
                resolve();
            },
            (error)=> {
                console.log("error",error);
                reject(error);
            }
          );
        });
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

    const subscribeToVideoConferenceChannel = async (stream) => {
        await new ConferenceSocket().groupVideoConferenceReceived(group_id)
        .listen("ConferenceEvent", ({ id }) => {
            connectToNewUser(id, stream)
         })
    }

    const connectToNewUser = (peerId, stream) => {
        const call = myPeer.call(peerId, stream)
        call.on('stream', userVideoStream => {
            // Attach stream to video
            setUserVideos({ ...usersVideos, [peerId]: userVideoStream })
        })
        call.on('close', () => {
            console.log('Remove Video')
        })
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
                Me
                <button onClick={getDisplay} >Share Screen</button>
                </div>
            </div>
        </div>
        <Message groupId={group_id} />
        </section>
    )
}
