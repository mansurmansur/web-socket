import React from "react"
import "../styles/forms/chatForm.css"
import { useSelector, useDispatch } from "react-redux";
import { updateChatHistory } from "../redux/chat";

const ChatForm = (props) => {
  const sender = useSelector(state => state.user)
  const to = useSelector(state => state.user.userSelected.user.id)
  const dispatch = useDispatch();

  // handle send
  function handleSend(e){
    e.preventDefault();

    //save the message first

    //data
    const data = {
      to,
      message: e.target[0].value
    }
    //send message

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
