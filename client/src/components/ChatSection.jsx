import React from "react"
import { useSelector } from "react-redux";
import ChatNavBar from "./ChatNavBar";
import ChatHistory from "./ChatHistory";
import ChatForm from "./ChatForm";

const ChatSection = (props) => {
  const userSelected = useSelector((state) => state.user.userSelected)
  return (
    <div className="chatSection">
      {userSelected.isUserSelected === true ? (
        <>
          <ChatNavBar />
          <ChatHistory />
          <ChatForm />
        </>
      ) : (
        null
      )}
    </div>
  );
};

export default ChatSection;
