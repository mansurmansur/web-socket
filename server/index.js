const {Server} = require('socket.io');

console.log("Hi")

const server = new Server(5000, {
    cors: {
        origin: "*"
    }
});

// all active users
const activeUsers = [];

// broadcast the list of active users to all clients
function broadcastActiveUsers(){
    const usernames = activeUsers.map((user) => user.username);
    server.emit("activeUsers", usernames);
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

    // listen for incoming messages
    socket.on("msg", (msg) => {
        console.log(msg)
        socket.broadcast.emit("msg", msg)
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
    })
})



