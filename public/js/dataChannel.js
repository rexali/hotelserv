
// Create a new peer connection
const pc = new RTCPeerConnection();

// Create a new data channel
const dataChannel = pc.createDataChannel('myDataChannel');

// Send a message to the other peer
document.getElementById('send-btn').addEventListener('click', () => {
	dataChannel.send('Hello, world!');
});

// Receive messages from the other peer
dataChannel.onmessage = (event) => {
	console.log(`Received message: ${event.data}`);
	document.getElementById('messages').innerHTML += `<p>Received message: ${event.data}</p>`;
};

// Handle errors
dataChannel.onerror = (error) => {
	console.error('Data channel error:', error);
};

// Close the data channel when done
dataChannel.onclose = () => {
	console.log('Data channel closed');
};
