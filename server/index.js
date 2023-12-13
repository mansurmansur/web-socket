const {Server} = require('socket.io');

const server = new Server(5000, {
    cors: {
        origin: "*"
    }
});

console.log("Starting")

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
    socket.on("setUser", (user) => {
        const {username, id} = user;
        // Associate the username with the socket
        socket.username = username;
        socket.id = id;

        //create an object for the user
        const userInfo = {
            id: socket.id,
            username: socket.username
        }

        //Add the user to activeusers array if not in it
        const userIndex = activeUsers.findIndex((userInfo) => user.id === socket.id);
        if(userIndex === -1){
            activeUsers.push(userInfo);

            //update list of active users
            broadcastActiveUsers();
        }
    });

    // listen for private messages
    socket.on("privateMessage", (data) => {
        const {to, message} = data;
        const toSocket = activeUsers.find((user)=> user.id === to);
        if(socket.id !== to){
            if(toSocket){
                //send the private message only to the intended user
                socket.to(toSocket.id).emit("privateMessage",{sender: {id: socket.id, username: socket.username},message })
            } else {
                // Handle the case when the recipient is not found
            }
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



