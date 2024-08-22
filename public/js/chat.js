
// Set up WebSocket connection
const clientId = window.location.href?.split("?")[1]?.split("=")[1]
let ws = new WebSocket("http://localhost:3030/webrtc?clientId=" + clientId);
// Create a new peer connection
const pc = new RTCPeerConnection();
// Get the input field, send button, and message list
const messageInput = document.getElementById('message');
const sendButton = document.getElementById('send');
const messagesList = document.getElementById('messages');


ws.onopen = (event) => {
	console.log("Connection opened");
	// Create an offer and set it as the local description
	pc.createOffer().then(offer => {
		pc.setLocalDescription(offer);
		ws.send(JSON.stringify({ clientId: 2, type: 'offer', offer: offer }));
	});
}

ws.onmessage = (event) => {
	const message = event.data;
	if (message.type === 'ice_candidate') {
		// Add the received ICE candidate to the peer connection
		pc.addIceCandidate(new RTCIceCandidate(message.candidate));
	} else  {
		console.log("received");
		const decoder = new VideoDecoder();
		const video = document.getElementById('myVideo2');
		video.srcObject = decoder.decode(message);
		console.log(new MediaStream(message))
		video.play();
	}
};

ws.onclose = (event) => {
	console.log("Connection closed")
}

ws.onerror = (event) => {
	console.warn("Error:")
};

const peerConnection = new RTCPeerConnection();


navigator.mediaDevices.getUserMedia({ video: true, audio: true }).then((stream) => {
	peerConnection.addStream(stream);
	const video = document.getElementById('myVideo');
	// Set video and audio quality attributes
	stream.getVideoTracks()[0].applyConstraints({
		// width: { ideal: 1280, max: 1920 },
		// height: { ideal: 720, max: 1080 }
	});

	stream.getAudioTracks()[0].applyConstraints({
		echoCancellation: true,
		noiseSuppression: true
	});
	// Send the stream to the server using WebSockets
	// ws.send(JSON.stringify({ clientId: 2, type: 'stream', stream }));
	ws.send({stream});
	video.srcObject = stream;
	video.play();

}).catch(error => {
	console.error('Error handling video and audio quality:', error);
})

// Add event listeners for sending and receiving messages
sendButton.addEventListener('click', () => {
	const message = messageInput.value;
	ws.send(JSON.stringify({ clientId: 2, type: 'chat', message }));
	messageInput.value = '';
});

pc.onmessage = (event) => {
	const message = event.data;
	const messageListItem = document.createElement('li');
	messageListItem.textContent = message;
	messagesList.appendChild(messageListItem);
};

// Create an offer and set it as the local description
pc.createOffer().then(offer => {
	pc.setLocalDescription(offer);
});

// Handle ICE candidates
pc.onicecandidate = (event) => {
	if (event.candidate) {
		// Send the ICE candidate to the other peer via WebSocket
		ws.send(JSON.stringify({
			type: 'ice_candidate',
			candidate: event.candidate
		}));
	}
};


