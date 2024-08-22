
const socket = io('http://localhost:3033');

socket.on("connect", () => {
    console.log("Connected to server");

})

socket.on("disconnect", () => {
    console.log("Disconnected from server");
})

socket.on("message", (data) => {
    console.log("Message recieved: " + data);
});

// instance of Peer Connection
const peerConnection = new RTCPeerConnection();
// Create offer and send to server
peerConnection.createOffer().then((offer) => {
    // send offer
    socket.emit('webrtc',offer);
});
// Handle answer from server
socket.on('webrtc', (data) => {
    if (data.type === 'answer') {
        // peerConnection.setRemoteDescription(new RTCSessionDescription({ type: 'answer', sdp: data.answer }));
        peerConnection.setRemoteDescription(data.answer);
    }
});
// Handle ICE candidates
peerConnection.addEventListener('icecandidate', (event) => {
    if (event.candidate) {
        socket.emit('webrtc', { type: 'icecandidate', candidate: event.candidate });
    }
});

// Handle answer from server
socket.on('stream', (data) => {
    console.log(data); 
});
// send data
socket.emit('sendData', { type: 'object', name: "Aliyu" });

// Add streams to peer connection
navigator.mediaDevices.getUserMedia({ video: true, audio: true }).then((stream) => {
	peerConnection.addStream(stream);
	const video = document.getElementById('myVideo');
	// Set video quality attributes
	stream.getVideoTracks()[0].applyConstraints({
		// width: { ideal: 1280, max: 1920 },
		// height: { ideal: 720, max: 1080 }
	});
    // Set audio quality attributes
	stream.getAudioTracks()[0].applyConstraints({
		echoCancellation: true,
		noiseSuppression: true
	});
	
	video.srcObject = stream;
	video.play();
    // Send the stream to the server using WebSockets
    socket.emit("stream", { clientId: 2, type: 'stream', stream });
}).catch(error => {
	console.error('Error handling video and audio quality:', error);
})
