import React from "react"
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome'
import {faPaperPlane, faUser} from '@fortawesome/free-solid-svg-icons'
import { useEffect, useRef } from "react";

const ChatArea = ({chatHistory, userSelected, handleSubmit, handleChange, message}) => {
  const chatHistorRef = useRef();
  const chatAreaRef = useRef();

  useEffect(() => {
    //scroll to the bottom when chat history updates
    chatHistorRef.current.scrollTop = chatHistorRef.current.scrollHeight;

    //add scroll to chat area
     // Check and add scroll when height goes under the max height for chat-area
     if (chatAreaRef.current.clientHeight < chatAreaRef.current.scrollHeight - 10) {
        chatAreaRef.current.style.overflowY = "scroll";
      } else {
        chatAreaRef.current.style.overflowY = "hidden";
      }
  }, [chatHistory]);



  return (
    <div className="chat-area" ref={chatAreaRef}>
      {!userSelected.isUserSelected ? (
        <></>
      ) : (
        <>
          <div className="profile-info">
            <div className="profile">
              <FontAwesomeIcon icon={faUser} className="profile-icon" />
            </div>
            <p className="username">{userSelected.user.username}</p>
          </div>
          <div className="previous-chat" ref={chatHistorRef}>
            {chatHistory}
          </div>
          <div className="chat-form-container">
            <form className="chat-form" onSubmit={handleSubmit}>
              <input
                type="text"
                name="chat"
                id="chat"
                onChange={handleChange}
                value={message}
              />
              <button type="submit" className="send-btn">
                <FontAwesomeIcon icon={faPaperPlane} className="send-icon" />
              </button>
            </form>
          </div>
        </>
      )}
    </div>
  );
};

export default ChatArea;
