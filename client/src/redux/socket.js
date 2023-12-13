// In your action creator file (e.g., socketActions.js)
import socket from '../services/socket'; // Import the socket instance

// Async action to connect the socket
export const connectSocket = () => {
  return socket; // Return the socket instance
};

// send message
export const sendMessage = (type, data) => {
  if (socket) {
    socket.emit(type, data);
  }
};
