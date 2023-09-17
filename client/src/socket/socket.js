const { io } = require("socket.io-client");
const socket = io("http://localhost:5000");

// send a message to the server
function sendMessage(messageType, message) {
    socket.emit(messageType, message);
}
export {socket, sendMessage};