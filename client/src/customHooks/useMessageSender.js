import { useDispatch } from "react-redux";
import socket from "../services/socket";
import { updateChatHistory } from "../redux/chat";


export const useMessageSender = () => {
    const dispatch = useDispatch();

    const sendMessage = ({sender, receiver, message})=>{
        socket.emit("private message", {content: message, to:receiver.id});
        dispatch(updateChatHistory({sender, receiver, message}));
    };

    return sendMessage;
}