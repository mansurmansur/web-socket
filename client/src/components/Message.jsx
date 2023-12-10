import React from "react"

const Message = ({className}) => {
  return (
    <div className={`message ${className}`}> 
      <div className="message-body">
        <p className="message">Hello, How are you?</p>
      </div>
      <p className="time">6:34 pm</p>
    </div>
  )
};

export default Message;