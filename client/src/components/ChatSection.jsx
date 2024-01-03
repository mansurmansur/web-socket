import React from "react"
import { useEffect } from "react";
import "../styles/chatSection/chatSection.css"
import { useDispatch, useSelector } from "react-redux";
import socket from "../services/socket";
import { getUser } from "../redux/users";
import { updateChatHistory } from "../redux/chat";
import ChatNavBar from "./ChatNavBar";
import ChatHistory from "./ChatHistory";
import ChatForm from "./ChatForm";

const ChatSection = (props) => {
  const dispatch = useDispatch();
  const userSelected = useSelector((state) => state.user.userSelected)
  const user = useSelector(state => state.user);

  useEffect(()=>{
    //listening for private message
  
    socket.on("private message", ({content, from}) => {
      const sender = getUser(from);
      const receiver = user;
      dispatch(updateChatHistory({sender, receiver, message: content }))
    })
    return () => {
      socket.off("private message")
    }

  },[])
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
