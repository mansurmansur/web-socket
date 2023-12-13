import React from "react"

const Message = ({className, message}) => {
  return (
    <div className={`message ${className}`}> 
      <div className="message-body">
        <p className="message">{message}</p>
      </div>
      <p className="time">6:34 pm</p>
    </div>
  )
};

export default Message;