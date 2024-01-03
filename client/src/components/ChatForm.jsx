import React from "react"
import { useState, useEffect } from "react";
import "../styles/forms/chatForm.css"
import { useSelector, useDispatch} from "react-redux";
import socket from "../services/socket";
import { updateChatHistory } from "../redux/chat";

const ChatForm = (props) => {
  const sender = useSelector(state => state.user)
  const to = useSelector(state => state.user.userSelected.user)
  const [message, setMessage] = useState("")
  const dispatch = useDispatch();


  useEffect(()=>{
  }, [message])

      // handle submit
      function handleSend(e){
        e.preventDefault();
        socket.emit("private message", {content: message, to: to.id});
        dispatch(updateChatHistory({ sender, receiver: to, message }));
        setMessage('');
      }

  return (
    <div className="chatFormSection">
      <form className="chatForm">
        <input
          type="text"
          name="message"
          id="message"
          placeholder="Type a message"
          value={message}
          onChange={(e)=>setMessage(e.target.value)}
        />
        <button type="submit" className="msg-send-btn" onClick={handleSend}>Send</button>
      </form>
    </div>
  );
};

export default ChatForm;
