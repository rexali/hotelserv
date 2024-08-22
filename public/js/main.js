// Set up WebSocket connection
const clientId = window.location.href?.split("?")[1]?.split("=")[1]
let ws = new WebSocket("http://localhost:3030/websocket?clientId=" + clientId);

const messageInput = document.getElementById('message');
const sendButton = document.getElementById('send');
const messagesList = document.getElementById('messages');


ws.onopen = (event) => {
	console.log("Connection opened");
}
// Add event listeners for sending and receiving messages
sendButton.addEventListener('click', () => {
	const message = messageInput.value;
	ws.send(JSON.stringify({ clientId: 2, type: 'chat', message }));
	messageInput.value = '';
});

ws.onmessage = (event) => {
	const message = event.data;
	const messageListItem = document.createElement('li');
	messageListItem.textContent = message;
	messagesList.appendChild(messageListItem);
};


ws.onclose = (event) => {
	console.log("Connection closed")
}

ws.onerror = (event) => {
	console.warn("Error:")
};