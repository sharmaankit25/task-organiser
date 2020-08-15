import React, { useState, createRef, useRef, useEffect } from 'react';
import ConferenceSocket from '../../sockets/ConferenceSocket'
import ConferenceApi from '../../apis/ConferenceApi'
import Peer from 'peerjs';
import VideoItem from '../VideoItem'
import Message from '../messages/Messages'

export default function Conference({ match:{params:{slug,group_id}} }) {
    const [video]=useState(createRef())
    const [usersVideos, setUserVideos] = useState({})
    const [localStream, setLocalStream] = useState(null)

    const [myMediaStatus, setMyMediaStatus] = useState({ video: {
        width: { min: 160, ideal: 640, max: 1280 },
        height: { min: 120, ideal: 360, max: 720 }
      }, audio: true })


    const myPeer = new Peer()
    useEffect(() => {
        var myStream = null
        // Send my peer id to server to dispatch event that I am connected
        var myPeerID = null
        myPeer.on('open', async id => {
            myPeerID = id
            await new ConferenceApi().fetch(id, group_id)
        })

        navigator.getUserMedia = navigator.getUserMedia || navigator.webkitGetUserMedia || navigator.mozGetUserMedia || navigator.msGetUserMedia || navigator.oGetUserMedia;
        if (navigator.getUserMedia) {
            navigator.getUserMedia(myMediaStatus,
                (stream) => {
                myStream = stream
                setLocalStream(stream)
                try {
                    video.current.srcObject = myStream
                } catch (e) {
                    video.current.src = URL.createObjectURL(myStream)
                }

                myPeer.on('call', call => {
                    call.answer(stream)
                    call.on('stream', userVideoStream => {
                        setUserVideos({ ...usersVideos, [call.peer]: userVideoStream })
                    })
                })

                subscribeToVideoConferenceChannel(myStream)

            }, (error)=> {
                console.log("error",error);
            })
        }


        return () => {
            myStream.getTracks().forEach((track) => track.stop());
        }
    },[])

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

    const shareScreen = () => {
        setMyMediaStatus({ video: !myMediaStatus.video, audio: !myMediaStatus.audio })
    }

    console.log(usersVideos)
    return (
        <section className="section">
        <div className="columns is-multiline">
            <div className="column is-one-third">
                <div className="box">
                <video playsInline muted ref={video} autoPlay={true} />
                Me
                <button onClick={shareScreen} >Share Screen</button>
                </div>
            </div>
            <div className="column is-one-third">
            <div className="box">
            {
                Object.keys(usersVideos).map(userId => (
                    <VideoItem key={userId} stream={usersVideos[userId]} />
                ))
            }
            </div>
            </div>
        </div>
        <Message groupId={group_id} />
        </section>
    )
}
