const {Server} = require('socket.io');

const server = new Server(5000, {
    cors: {
        origin: "*"
    }
});

// all active users
const activeUsers = [];

// broadcast the list of active users to all clients
function broadcastActiveUsers(){
    const users = activeUsers.map((user) => ({username: user.username, id: user.id}));
    server.emit("activeUsers", users);
}

//listening for connection
server.on("connection", (socket)=>{
    //listen for username
    socket.on("setUsername", (username) => {
        // Associate the username with the socket
        socket.username = username;

        //create an object for the user
        const user = {
            id: socket.id,
            username: socket.username
        }

        //Add the user to activeusers array if not in it
        const userIndex = activeUsers.findIndex((user) => user.id === socket.id);
        if(userIndex === -1){
            activeUsers.push(user);

            //update list of active users
            broadcastActiveUsers();
        }
    });

    // listen for private messages
    socket.on("privateMessage", (data) => {
        const {to, message} = data;
        const toSocket = activeUsers.find((user)=> user.id === to);
        if(toSocket){
            //send the private message only to the intended user
            socket.to(toSocket.id).emit("privateMessage",{from: {id: socket.id, username: socket.username},message })
        } else {
            // Handle the case when the recipient is not found
        }
    })
    // handle disconnection
    socket.on("disconnect", () => {
        // remove the user from the activeUsers array
        const userIndex = activeUsers.findIndex((user) => user.id === socket.id);
        if(userIndex !== -1) {
            activeUsers.splice(userIndex, 1);
            // broadcast the update list of active users
            broadcastActiveUsers();
        }

        // remove the privateMessage event listener for this socket
        socket.removeAllListeners("privateMessage")
    })
})



