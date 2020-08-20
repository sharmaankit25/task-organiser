import React, { useEffect ,useState, createRef } from 'react'

export default ({ stream }) => {
    const [userVideo]=useState(createRef())

    const setMyVideoObject = (stream) => {
        if (stream.active) {
            try {
                userVideo.current.srcObject = stream
            } catch (e) {
                userVideo.current.src = URL.createObjectURL(stream)
            }
        }
    }

    useEffect(() => {
        setMyVideoObject(stream)
    }, [])

    return (
        <video playsInline ref={userVideo} autoPlay={true} />
    )
}

