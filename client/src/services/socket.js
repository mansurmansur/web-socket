import {io} from "socket.io-client";

const URL = "http://localhost:5000";
const socket = io(URL, {autoConnect: false});

// test purpose
socket.onAny(((args)=> {
    console.log(args)
}))

export default socket;