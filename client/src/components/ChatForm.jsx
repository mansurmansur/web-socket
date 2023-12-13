import React from "react"
import { useSelector, useDispatch } from "react-redux";
import { updateChatHistory } from "../redux/chat";
import { sendMessage } from "../redux/socket";

const ChatForm = (props) => {
  const sender = useSelector(state => state.user)
  const to = useSelector(state => state.user.userSelected.user.id)
  const dispatch = useDispatch();

  // handle send
  function handleSend(e){
    e.preventDefault();

    //save the message first
    //update chat history
    dispatch(updateChatHistory({sender: {username: sender.username, id: sender.id}, message: e.target[0].value}));

    //data
    const data = {
      to,
      message: e.target[0].value
    }
    //send message
    dispatch(sendMessage({type: "privateMessage", data}));
  }
  return (
    <div className="chatFormSection">
      <form className="chatForm">
        <input
          type="text"
          name="message"
          id="message"
          placeholder="Type a message"
        />
        <button className="msg-send-btn" onClick={handleSend}>Send</button>
      </form>
    </div>
  );
};

export default ChatForm;
