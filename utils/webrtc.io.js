const express = require('express');
const app = express();
const server = require('http').createServer(app);
const io = require('socket.io')(server);
const webrtc = require('webrtc');

app.use(express.static('public'));

io.on('connection', (socket) => {
  console.log('Client connected');

  // Handle WebRTC peer connection
  socket.on('webrtc', (data) => {
    // Create a new WebRTC peer connection
    const peerConnection = new webrtc.RTCPeerConnection();

    // Handle SDP offers and answers
    peerConnection.on('offer', (offer) => {
      socket.emit('webrtc', { type: 'offer', offer: offer });
    });

    peerConnection.on('answer', (answer) => {
      socket.emit('webrtc', { type: 'answer', answer: answer });
    });

    // Add streams to peer connection
    navigator.mediaDevices.getUserMedia({ audio: true, video: true })
      .then((stream) => {
        peerConnection.addStream(stream);
      });

    // Handle ICE candidates
    peerConnection.on('icecandidate', (event) => {
      if (event.candidate) {
        socket.emit('webrtc', { type: 'icecandidate', candidate: event.candidate });
      }
    });
  });
});

server.listen(3000, () => {
  console.log('Server listening on port 3000');
});
