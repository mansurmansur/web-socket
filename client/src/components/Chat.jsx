import React from "react"
import { useState, useEffect, useRef } from "react";
import { useSearchParams } from "react-router-dom";
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome'
import {faPaperPlane, faUser} from '@fortawesome/free-solid-svg-icons'
// import {socket, sendMessage} from "../services/socket";


const Chat = (props) => {
  const chatHistorRef = useRef();
  const [searchParams] = useSearchParams();
  const [message, setMessage] = useState('') //
  const [chatHistory, setChatHistory] = useState({}); //tracking chat history
  const [usernameSent, setUsernameSent] = useState(false); // Track whether username has been sent
  const [activeUsers, setActiveUsers] = useState([]) // tracking active users
  const [userSelected, setUserSelected] = useState({isUserSelected: false, user: null})


  //handle change
  function handleChange(e) {
    if(e.target.value !== ''){
      setMessage(e.target.value)
    }
  }
  //handle subtmit
  function handleSubmit(e){
    e.preventDefault();

    //update chat history
    setChatHistory((prevChatHistory) => {
      // Create a copy of the previous chat history
      const updatedChatHistory = {...prevChatHistory};

      if(!updatedChatHistory[userSelected.user.id]){
        updatedChatHistory[userSelected.user.id] = []
      }

      updatedChatHistory[userSelected.user.id].push({sender: searchParams.get('id'), text: message});

      return updatedChatHistory;
    });
    
    //send message to the server
    // const data = {
    //   to: userSelected.user.id,
    //   message
    // }
    // sendMessage("privateMessage", data)
    
    //clear the chat input
    setMessage('')
  }

  // Functon to render chat history for specific user
  const renderChatHistory = (userId) => {
    if(chatHistory[userId]) {
      return chatHistory[userId].map(({sender, text}, index) => (
        <div key={index} className={sender === searchParams.get('id')? "chat" : "chat other"}>
        <span className="text">
          {text}
        </span>
      </div>
      ))
    } else{
      return <div>No chat history with this user.</div>;
    }
  }

  return (
    <div className="container chat-dashboard">
      <div className="aside-section">
        <div className="profile-info">
            <div className="profile">
            <FontAwesomeIcon icon={faUser} className="profile-icon"/>
            </div>
            <p className="username">{searchParams.get('id')}</p>
        </div>
        
        <div className="users">
          <h3>Users</h3>
        {!activeUsers.length ? <p>No user online</p> : 
         <ul>
           {activeUsers.map((user) => (<li key={user.id} onClick={()=>{setUserSelected({isUserSelected: true, user: user})}}><span className="user-icon-frame"> <FontAwesomeIcon icon={faUser} className="user-icon"/></span>{user.username}</li>))}
         </ul>
        }
        </div>
      </div>
      
      {/* chat section */}
      <div className="chat-area">
        {!userSelected.isUserSelected? <></>: 
          <>
            <div className="profile-info">
            <div className="profile">
            <FontAwesomeIcon icon={faUser} className="profile-icon"/>
            </div>
            <p className="username">{userSelected.user.username}</p>
        </div>
        <div className="previous-chat" ref={chatHistorRef}>
          {
            renderChatHistory(userSelected.user.id)
          }
        </div>
        <div className="chat-form-container">
        <form className="chat-form" onSubmit={handleSubmit}>
          <input type="text" name="chat" id="chat"  onChange={handleChange} value={message}/>
          <button type="submit" className="send-btn"><FontAwesomeIcon icon={faPaperPlane} className="send-icon" /></button>
        </form>
        </div>
          </>
        }
      </div>
    </div>
  )
};

export default Chat;
