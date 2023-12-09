import React from "react"

const ChatForm = (props) => {
  return (
    <div className="chatFormSection">
      <form className="chatForm">
        <input
          type="text"
          name="message"
          id="message"
          placeholder="Type a message"
        />
        <button className="msg-send-btn">Send</button>
      </form>
    </div>
  );
};

export default ChatForm;
