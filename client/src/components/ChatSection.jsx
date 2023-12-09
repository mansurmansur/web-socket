import React from "react"
import ChatNavBar from "./ChatNavBar";
import ChatHistory from "./ChatHistory";
import ChatForm from "./ChatForm";

const ChatSection = (props) => {
  return (
    <div className="chatSection">
      <ChatNavBar />
      <ChatHistory />
      <ChatForm />
    </div>
  )
};

export default ChatSection;
