import React from "react";
import { useState } from "react";
import "../styles/forms/chatForm.css";
import { useSelector } from "react-redux";
import { useMessageSender } from "../customHooks/useMessageSender";

const ChatForm = (props) => {
  const sendMessage = useMessageSender();
  const sender = useSelector((state) => state.user);
  const to = useSelector((state) => state.user.userSelected.user);
  const [message, setMessage] = useState("");


  // handle submit
  function handleSend(e) {
    e.preventDefault();
    sendMessage({ sender, receiver: to, message });
    setMessage("");
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
          onChange={(e) => setMessage(e.target.value)}
        />
        <button type="submit" className="msg-send-btn" onClick={handleSend}>
          Send
        </button>
      </form>
    </div>
  );
};

export default ChatForm;
