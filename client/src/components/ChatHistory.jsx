import React from "react"
import Message from "./Message";

const ChatHistory = (props) => {
  return (
    <div className="chatHistory">
      <Message />
      <Message className="other"/>
      <Message />
      <Message />
      <Message className="other"/>
      <Message />
      <Message />
      <Message className="other"/>
      <Message />
    </div>
  )
};

export default ChatHistory;
