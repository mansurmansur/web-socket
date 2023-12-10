import React from "react"
import { useRef, useEffect } from "react";
import Message from "./Message";


const ChatHistory = (props) => {
  const scrollRef = useRef()

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
  return (
    <div className="chatHistory" ref={scrollRef}>
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
