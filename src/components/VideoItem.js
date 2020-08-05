import React, { useEffect ,useState, createRef } from 'react'

export default ({ stream }) => {
    const [video]=useState(createRef())

    useEffect(() => {
        try {
            video.current.srcObject = stream
        } catch (e) {
            video.current.src = URL.createObjectURL(stream)
        }
    }, [])

    return (
        <video playsInline muted ref={video} autoPlay={true} />
    )
}

