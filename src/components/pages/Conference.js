import React, { useState, createRef, useRef, useEffect } from 'react';
import ConferenceSocket from '../../sockets/ConferenceSocket'
import ConferenceApi from '../../apis/ConferenceApi'
import Peer from 'peerjs';

export default function Conference({ match:{params:{slug,group_id}} }) {
    const [video]=useState(createRef())
    const [usersVideos, setUserVideos] = useState({})
    const [elementsRef, setElementsRef] = useState(createRef())

    // const [peers, setPeers] = useState({})

    const myPeer = new Peer()
    useEffect(() => {
        var myStream = null
        // Send my peer id to server to dispatch event that I am connected
        startPeer()

        navigator.getUserMedia = navigator.getUserMedia || navigator.webkitGetUserMedia || navigator.mozGetUserMedia || navigator.msGetUserMedia || navigator.oGetUserMedia;
        if (navigator.getUserMedia) {
            navigator.getUserMedia({video: true, audio: true},
                (stream) => {
                // Add video to stream
                myStream = stream
                try {
                    video.current.srcObject = myStream
                } catch (e) {
                    video.current.src = URL.createObjectURL(myStream)
                }

                myPeer.on('call', call => {
                    call.answer(stream)
                    call.on('stream', userVideoStream => {
                        try {
                            elementsRef.current.srcObject = userVideoStream
                        } catch (e) {
                            elementsRef.current.src = URL.createObjectURL(userVideoStream)
                        }
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

    const startPeer = async () => {
        myPeer.on('open', async id => {
            await new ConferenceApi().fetch(id, group_id)
        })
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
            try {
                elementsRef.current.srcObject = userVideoStream
            } catch (e) {
                elementsRef.current.src = URL.createObjectURL(userVideoStream)
            }
        })
        call.on('close', () => {
            console.log('Remove Video')
        })
    }

    return (
        <section className="section">
        <div className="columns is-multiline">
            <div className="column is-one-quarter">
                <div className="box">
                <video muted ref={video} autoPlay={true} />
                Me
                </div>
            </div>
            <div className="column is-one-quarter">
                <video muted ref={elementsRef} autoPlay={true} />
            </div>
        </div>
        </section>
    )
}
