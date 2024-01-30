const { Server } = require("socket.io");
const {admin, db} = require("./config/firebaseConfig");
const {inMemoryMessageStore} = require('./messageStore')

const server = new Server();
const messageQueue = new inMemoryMessageStore();
const sockets = new Map ();
const users = new Map();

//testing purposes only
const usersRef = db.collection("users");
usersRef.get().then((snapshot) => {
    snapshot.forEach((doc) => {
        const user = doc.data();
        users.set(doc.id, {...doc.data(), lastActive: doc.data().lastActive.toDate().toString()})
    });
}).catch((err) => console.log(err))
//
server.listen(5000, {
    cors: {
        origin: "*"
    }
})

//broadcast active users
const broadcast = (socket) => {
    const activeUsers = Array.from(sockets.keys()).filter(id => id !== socket.userID); 
    socket.emit("active users", activeUsers);
}


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
        
        //update online status of the user
        let temp = users.get(user.id);

        //changing status
        if(temp){
            temp.isOnline = true;
            users.set(temp.id, temp)
            socket.emit("status online", temp.id)
        }

        //check if there pending messages waiting to be sent
        const messages = messageQueue.findMessageForUser(user.id);
        if(messages.length !== 0){
            messages.forEach(({content, to, from}) => {
                socket.emit("private message", {content, from})
            })
        }
    }

    //emit the list to the user
   if(users.size > 0){
    let list = Array.from(users.values()).filter(usr => usr.id !== user.id);

    socket.emit("users", list);
   }
   }
    next();
})

//listening for connection
server.on("connection", (socket)=>{


    //TO4DO: send message
    socket.on("private message", ({content, to}) => {
        // find the socket first
        const receiver = sockets.get(to);
        
        if(receiver !== null && receiver !== undefined){
            receiver.emit("private message", {content, from: {id: socket.userID, username: socket.username}})
        } else {
            //user not online
            messageQueue.saveMessage({content, to, from: {id: socket.userID, username: socket.username}})
        }
        
    })

  

    //TODO: listen for disconnection
    //on disconnection remove the socket from the socket list
    socket.on("disconnect", () => {
      if (socket.userID && sockets.has(socket.userID)) {
        sockets.delete(socket.userID); //remove from the socket list

        //update online status of the user
        let temp = users.get(socket.userID);

        //changing status
        if (temp) {
          temp.isOnline = false;
          users.set(temp.id, temp);
          socket.emit("status offline", temp.id);
        }
      }
    });
})