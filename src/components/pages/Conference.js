import React, { useState, createRef, useEffect } from 'react';

export default function Conference(props) {
    const [video]=useState(createRef())

    useEffect(() => {
        navigator.getUserMedia = navigator.getUserMedia || navigator.webkitGetUserMedia || navigator.mozGetUserMedia || navigator.msGetUserMedia || navigator.oGetUserMedia;
        if (navigator.getUserMedia) {
            navigator.getUserMedia({video: true, audio: true},
            (stream) => {
                video.current.srcObject = stream
            }, (error)=> {
                console.log("error",error);
            })
        }
    }, [])

    return (
        <div>
            <video ref={video} autoPlay={true} />
        </div>
    )
}
