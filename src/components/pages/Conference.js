import React, { useState, createRef, useEffect } from 'react';
import ConferenceSocket from '../../sockets/ConferenceSocket'
import Peer from 'peerjs';

export default function Conference({ match:{params:{slug,id}} }) {
    const [video]=useState(createRef())

    // const [usersVideos] = useState(createRef())

    const [peers, setPeers] = useState({})
    const myPeer = new Peer()

    useEffect(() => {
        var myStream = null
        navigator.getUserMedia = navigator.getUserMedia || navigator.webkitGetUserMedia || navigator.mozGetUserMedia || navigator.msGetUserMedia || navigator.oGetUserMedia;
        if (navigator.getUserMedia) {
            navigator.getUserMedia({video: true, audio: true},
                (stream) => {
                myStream = stream
                try {
                    video.current.srcObject = myStream
                } catch (e) {
                    video.current.src = URL.createObjectURL(myStream)
                }
                subscribeToVideoConferenceChannel()

                myPeer.on('call', call => {
                    console.log('test')
                    call.answer(stream)

                    call.on('stream', userVideoStream => {
                        // addVideoStream(video, userVideoStream)
                    })
                })
            }, (error)=> {
                console.log("error",error);
            })
        }
        return () => {
            myStream.getTracks().forEach((track) => track.stop());
        }
    },[])

    const subscribeToVideoConferenceChannel = async () => {
        await new ConferenceSocket().groupVideoConferenceReceived(id)
        .listen("ConferenceEvent", (e) => {
            console.log(e)
         })
        .whisper('signal', {
            name: 'Ankit Sharma'
        })
        .listenForWhisper('signal', (signal) => {
            console.log(signal)
            let peer = peers[signal.user_id]
            if (peer === undefined) {
                setPeers({...peers, otherUserId: signal.user_id})
                peer = startPeer(signal.user_id)
            }
        })
        ;

        // whisper and get signal in call back

        // setPeers([...peers, signal.user_id])


    }

    const startPeer = (user_id, initiator) => {
        // const peer = new Peer({
        //     initiator,
        //     stream: 'stream'
        // })
    }

    return (
        <section className="section">
        <div className="columns is-multiline">
            <div className="column is-one-quarter">
                <video ref={video} autoPlay={true} />
            </div>
        </div>
        </section>
    )
}
