import React, { useState } from "react"
import "../styles/chatSection/chatHistory.css"
import { useDispatch, useSelector } from "react-redux";
import { updateChatHistory} from "../redux/chat";
import { collection, onSnapshot, query, where } from "firebase/firestore";
import { db } from "../services/firebase";
import socket from "../services/socket";
import { useRef, useEffect } from "react";
import Message from "./Message";


const ChatHistory = (props) => {
  const scrollRef = useRef()
  const dispatch = useDispatch()
  const userSelected = useSelector((state) => state.user.userSelected.user) 
  const user = useSelector(state => state.user)
  const chatHistory = useSelector(state => state.chat.chatHistory)

  useEffect(() => {
    // scroll to bottom
    const scrollToBottom = () => {
      if(scrollRef.current){
        const {scrollHeight, clientHeight} = scrollRef.current;
        if(scrollHeight > clientHeight){
          scrollRef.current.scrollTop = scrollHeight - clientHeight;
        }
      }
    }

    // automatically scroll to bottom when content changes
    scrollToBottom();
  },[])




  // pull previous chat if it exist
  const renderChat = (chatHistory) => {
    const chatExist = chatHistory.some(element => element.member_ids?.includes(userSelected.id));
  
    console.log(chatExist)
    if (chatExist) {
      // Initialize an array to store mapped messages
      let mappedMessages = [];
  
      chatHistory.forEach(element => {
        const isAMember = element.member_ids.includes(userSelected.id);
        if (isAMember) {
          // Map messages and push them to the mappedMessages array
          mappedMessages = [
            ...mappedMessages,
            ...element.chat.map(({ sender, text }, index) => (
              <Message className={sender === user.username ? "" : "other"} message={text} key={index} />
            ))
          ];
        }
      });
  
      // Return the mapped messages
      console.log(mappedMessages)
      return mappedMessages.length > 0 ? mappedMessages : <div>No messages in the chat history.</div>;
    } else {
      return <div>No chat history with this user.</div>;
    }
  }
  return (
    <div className="chatHistory" ref={scrollRef}>
      {renderChat(chatHistory)}
    </div>
  )
};

export default ChatHistory;
