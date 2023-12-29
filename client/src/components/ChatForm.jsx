import React from "react"
import "../styles/forms/chatForm.css"
import { useSelector, useDispatch } from "react-redux";
import socket from "../services/socket";
import { updateChatHistory } from "../redux/chat";

const ChatForm = (props) => {
  const sender = useSelector(state => state.user)
  const to = useSelector(state => state.user.userSelected.user)
  const dispatch = useDispatch();

  // handle send
  function handleSend(e){
    e.preventDefault();
    const message =  e.target[0].value;

    // Send message via socket
    socket.emit("private message", { content: message, to: to.id });
    dispatch(updateChatHistory({ sender, receiver: to, message }));

    //clear 
    e.target[0].value = ''
  }
  return (
    <div className="chatFormSection">
      <form className="chatForm" onSubmit={handleSend}>
        <input
          type="text"
          name="message"
          id="message"
          placeholder="Type a message"
        />
        <button className="msg-send-btn">Send</button>
      </form>
    </div>
  );
};

export default ChatForm;
