import React from "react"
import "../styles/chatSection/message.css"

const Message = ({className, message, date}) => {
  return (
    <div className={`message ${className}`}> 
      <div className="message-body">
        <p className="message">{message}</p>
      </div>
      <p className="time">{date}</p>
    </div>
  )
};

export default Message;