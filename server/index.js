const { Server } = require("socket.io");
const {admin, db} = require("./config/firebaseConfig");

const server = new Server();

//testing purposes only
const usersRef = db.collection("users");
usersRef.get().then((snapshot) => {
    snapshot.forEach((doc) => {
        console.log(doc.id, '=>', doc.data());
    });
}).catch((err) => console.log(err))

//
server.listen(3000, {
    cors: {
        origin: "*"
    }
})

/// TODO: 
// what does this meddile ware do?
// (check if the user has some messages in the queue sent when user was offline)
// (possible checks the user and then update online status)
server.use((socket, next) => {
    // get firebase userInfo
    console.log(socket.handshake.auth.user)
    next();
})

//listening for connection
server.on("connection", (socket)=>{
    //TODO: listen for message

    //TODO: send message

    //TODO: listen for disconnection
})