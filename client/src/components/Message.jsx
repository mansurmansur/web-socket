import React, { useEffect } from "react"
import "../styles/chatSection/message.css"

const Message = ({className, message}) => {
  useEffect(()=>{
    console.log("Message 1st creation")

    return()=>{
      console.log("Message destroyed")
    }
  },[])
  return (
    <div className={`message ${className}`}> 
      <div className="message-body">
        <p className="message">{message}</p>
      </div>
      <p className="time">{}</p>
    </div>
  )
};

export default Message;