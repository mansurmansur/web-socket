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
server.listen(5000, {
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
    const user = socket.handshake.auth.userInfo;
   if(user){
    socket.userID = user.id;
    socket.username = user.username
   }
    next();
})

//listening for connection
server.on("connection", (socket)=>{
    
    //TODO: listen for message

    //TO4DO: send message
    socket.on("private message", ({content, to}) => {
        console.log(`message to : ${to} , content: ${content}`)
        // socket.to(to).emit("private message", {content, from: socket.userID})
    })

    //TODO: listen for disconnection
})