import React, { useState, createRef, useEffect } from 'react';
import ConferenceSocket from '../../sockets/ConferenceSocket'
import ConferenceApi from '../../apis/ConferenceApi'
import Peer from 'peerjs';

export default function Conference({ match:{params:{slug,group_id}} }) {
    const [video]=useState(createRef())

    // const [usersVideos] = useState(createRef())

    const [peers, setPeers] = useState({})
    const myPeer = new Peer()

    useEffect(() => {
        var myStream = null
        // Send my peer id to server to dispatch event that I am connected
        startPeer()

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
                    call.answer(stream)
                    call.on('stream', userVideoStream => {
                        console.log('My Video Stream')
                    })
                })

                // socket.on('user-connected', userId => {
                    // connectToNewUser(userId, stream)
                //   })
            }, (error)=> {
                console.log("error",error);
            })
        }


        return () => {
            myStream.getTracks().forEach((track) => track.stop());
        }
    },[])

    const subscribeToVideoConferenceChannel = async () => {
        await new ConferenceSocket().groupVideoConferenceReceived(group_id)
        .listen("ConferenceEvent", (e) => {
            console.log(e)
         })
        .whisper('signal', {
            name: 'Ankit Sharma'
        })
        .listenForWhisper('signal', (signal) => {
            console.log(signal)
            // let peer = peers[signal.user_id]
            // if (peer === undefined) {
            //     setPeers({...peers, otherUserId: signal.user_id})
            //     peer = startPeer(signal.user_id)
            // }
        })

        // whisper and get signal in call back

        // setPeers([...peers, signal.user_id])
    }

    const connectToNewUser = (userId, stream) => {
        const call = myPeer.call(userId, stream)
        // Create new video ref
        call.on('stream', userVideoStream => {
          console.log('User video Stream')
        })
        call.on('close', () => {
            console.log('Remove Video')
        })

        peers[userId] = call
    }

    const startPeer = async () => {
        myPeer.on('open', async id => {
            console.log('My Peer ID is', id)
            // Send userid and group id to server
            await new ConferenceApi().fetch(id, group_id)
        })
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
