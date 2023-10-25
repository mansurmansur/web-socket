import React from "react"
import { useState, useEffect, useRef } from "react";
import { useSearchParams } from "react-router-dom";
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome'
import {faPaperPlane, faUser} from '@fortawesome/free-solid-svg-icons'
import {socket, sendMessage} from "../services/socket";


const Chat = (props) => {
  const chatHistorRef = useRef();
  const [searchParams] = useSearchParams();
  const [message, setMessage] = useState('') //
  const [chatHistory, setChatHistory] = useState({}); //tracking chat history
  const [usernameSent, setUsernameSent] = useState(false); // Track whether username has been sent
  const [activeUsers, setActiveUsers] = useState([]) // tracking active users
  const [userSelected, setUserSelected] = useState({isUserSelected: false, user: null})


  //
  useEffect(()=>{
    // Send the username only when the component mounts
    sendUsernameOnce();

    // add the event listener for active users
    socket.on("activeUsers", (users) => {
      users = users.filter((user)=> user.username !== searchParams.get("id"));

      setActiveUsers(users)
    })
    
    return () => {
      // Clean up the event listener when the component unmounts
      socket.off("activeUsers");
    };

  },[])

  // this handles incoming private message
  useEffect(()=>{ 
    // add the event listener for incoming messages
    socket.on("privateMessage",handleIncomingMessage);

    return () => {
      // Clean up the event listener when the component unmounts
      socket.off("privateMessage", handleIncomingMessage);
    };
  },[]);


    // Function to send the username only if it hasn't been sent yet
    function sendUsernameOnce() {
      if (!usernameSent) {
        const username = searchParams.get("id"); // Replace with the user's actual username
        sendMessage("setUsername", username);
        setUsernameSent(true); // Mark the username as sent
      }
    }

   // define a function to handle incoming messages
   const handleIncomingMessage = (data) => {
    //update chat history for a specific user
    setChatHistory((prevChatHistory) => {
      //create a copy of the previous chat history
      const updatedChatHistory = { ...prevChatHistory };

      if (!updatedChatHistory[data.from.id]) {
        updatedChatHistory[data.from.id] = []; // Initialize chat history if it doesn't exist
      }

      updatedChatHistory[data.from.id].push({sender: data.from.username, text: data.message}); // Add the new message

      return updatedChatHistory;
    });
  }

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
    const data = {
      to: userSelected.user.id,
      message
    }
    
    sendMessage("privateMessage", data)
    
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
