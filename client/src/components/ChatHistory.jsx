import React from "react"
import { useSelector } from "react-redux";
import { useRef, useEffect } from "react";
import Message from "./Message";


const ChatHistory = (props) => {
  const scrollRef = useRef()
  const user = useSelector((state) => state.user.userSelected.user) 
  const username = useSelector(state => state.user.username)
  const chatHistory = useSelector((state)=> state.chat.chatHistory)

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
    //checking if chat exist
    const chatExist = chatHistory.some(element => element.member_ids.includes(user.id));

    //does the chat exist
    if(chatExist){
      chatHistory.forEach(element => {
        const isAMember = element.member_ids.includes( user.id);
        if(isAMember){
          element.chat.map(({ sender, text }, index) => (
            <Message className={sender === username ? "" : "other"} message={text} key={index} />
          ));
        }
      });
    } else {
      <div>No chat history with this user.</div>
    }
  }
  return (
    <div className="chatHistory" ref={scrollRef}>
      {renderChat(chatHistory)}
    </div>
  )
};

export default ChatHistory;
