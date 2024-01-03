const { Server } = require("socket.io");
const {admin, db} = require("./config/firebaseConfig");

const server = new Server();
const sockets = new Map ();

//testing purposes only
// const usersRef = db.collection("users");
// usersRef.get().then((snapshot) => {
//     snapshot.forEach((doc) => {
//         console.log(doc.id, '=>', doc.data());
//     });
// }).catch((err) => console.log(err))

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
    if(!sockets.has(user.id)){
        sockets.set(user.id, socket); // add the socket to the list
        console.log("hey")
    }
   }
    next();
})

//listening for connection
server.on("connection", (socket)=>{
    
    //TODO: listen for message

    //TO4DO: send message
    socket.on("private message", ({content, to}) => {
        console.log(`message to : ${to} , content: ${content}`)
        // find the socket first
        // socket.to(to).emit("private message", {content, from: socket.userID})
        
        try {
            const receiver = sockets.get(to);
            receiver.emit("private message", {content, from: socket.userID})
        } catch (error) {
            console.log(error)
        }
        
    })

  

    //TODO: listen for disconnection
    //on disconnection remove the socket from the socket list
    socket.on("disconnect", ()=> {
        if(socket.userID && sockets.has(socket.userID)){
            sockets.delete(socket.userID);
        }
    })
})