export async function getDisplayStream(){
    return navigator.mediaDevices.getDisplayMedia();
}

export async function getCameraStream(){
    navigator.getUserMedia = navigator.getUserMedia || navigator.webkitGetUserMedia || navigator.mozGetUserMedia || navigator.msGetUserMedia || navigator.oGetUserMedia;

    return new Promise((resolve, reject) => {
        navigator.getUserMedia({
            video: {
                width: { min: 160, ideal: 640, max: 640 },
                height: { min: 120, ideal: 360, max: 360 }
            },
            audio: { echoCancellation: true, noiseSuppression: true }
        }, stream => {
            if (stream.active) {
                resolve(stream)
            }
        }, error => {
            reject(error)
        })
    })
}
