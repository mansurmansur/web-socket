import React, { useState } from "react"
import "../styles/chatSection/chatHistory.css"
import { useDispatch, useSelector } from "react-redux";
import { updateChatHistory } from "../redux/chat";
import { collection, onSnapshot, query, where } from "firebase/firestore";
import { db } from "../services/firebase";
import { useRef, useEffect } from "react";
import Message from "./Message";


const ChatHistory = (props) => {
  const scrollRef = useRef()
  const dispatch = useDispatch()
  const user = useSelector((state) => state.user.userSelected.user) 
  const userid = useSelector(state=> state.user.userid)
  const username = useSelector(state => state.user.username)
  const [chatHistory, setChatHistory] = useState([])

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

  useEffect(()=>{


    return () => {
    }

  },[])

  // convert time to human readable date or time
  const convertTimestamp = timestamp => {
    return new Date(timestamp.seconds * 1000 + timestamp.nanoseconds / 1000000)
  }

  // pull previous chat if it exist
  const renderChat = (chatHistory) => {
    const chatExist = chatHistory.some(element => element.participants.includes(user.id));
  
    console.log(chatExist)
    if (chatExist) {
      // Initialize an array to store mapped messages
      let mappedMessages = [];
  
      chatHistory.forEach(element => {
        const isAMember = element.participants.includes(user.id);
        if (isAMember) {
          // Map messages and push them to the mappedMessages array
          mappedMessages = [
            ...mappedMessages,
            ...element.messages.map(({ content, receiverID, senderID, timestamp }, index) => (
              <Message className={senderID === userid ? "" : "other"} message={content} key={index} date={convertTimestamp(timestamp)} />
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
