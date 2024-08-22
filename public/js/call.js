
const wss = io('http://localhost:3033');

wss.on("connection", (socket) => {
    console.log("Connected to server");

    socket.on("disconnection", () => {
        console.log("Disconnected from server");
    })

    socket.on("message", (data) => {
        console.log("Message recieved: " + data);
    })

    const peerConnection = new RTCPeerConnection();

    // Create offer and send to server
    peerConnection.createOffer().then((offer) => {
        socket.emit('webrtc', { type: 'offer', offer: offer });
    });

    // Handle answer from server
    socket.on('webrtc', (data) => {
        if (data.type === 'answer') {
            peerConnection.setRemoteDescription(new RTCSessionDescription({ type: 'answer', sdp: data.answer }));
        }
    });

    socket.emit('sendData', { type: 'object', data: {} });

    // Add streams to peer connection
    navigator.mediaDevices.getUserMedia({ audio: true, video: true })
        .then((stream) => {
            peerConnection.addStream(stream);
        });

    // Handle ICE candidates
    peerConnection.addEventListener('icecandidate', (event) => {
        if (event.candidate) {
            socket.emit('webrtc', { type: 'icecandidate', candidate: event.candidate });
        }
    });

})
