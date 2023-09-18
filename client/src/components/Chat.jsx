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
  const [chatHistory, setChatHistory] = useState([]); //tracking chat history
  const [usernameSent, setUsernameSent] = useState(false); // Track whether username has been sent
  const [activeUsers, setActiveUsers] = useState([]) // tracking active users


  //receive message from the server
  useEffect(()=>{
    // Send the username only when the component mounts
    sendUsernameOnce();

    // define a function to handle incoming messages
    const handleIncomingMessage = (text) => {
      setChatHistory((prevChatHistory) => [
        ...prevChatHistory,
        { sender: "server", text: text },
      ]);

      //scroll to he bottom when chat history updates
      // Check if chatHistorRef exists and has a scrollTop property
      if (
        chatHistorRef &&
        chatHistorRef.current
      ) {
        // Scroll to the bottom when chat history updates
        chatHistorRef.current.scrollTop = chatHistorRef.current.scrollHeight;
      } else {
        console.log(chatHistorRef);
        console.log(chatHistorRef.current);
        console.log(chatHistorRef.current.scrollTop);
      }
    }
    
    // add the event listener for incoming messages
    socket.on("msg",handleIncomingMessage);

    // add the event listener for active users
    socket.on("activeUsers", (usernames) => {
      usernames = usernames.filter((username)=> username !== searchParams.get("id"));

      setActiveUsers(usernames)
    })
    
    // Clean up the event listener when the component unmounts
    return () => {
      socket.off("msg", handleIncomingMessage)
      socket.off("activeUsers")
    }
  },[])

    // Function to send the username only if it hasn't been sent yet
    function sendUsernameOnce() {
      if (!usernameSent) {
        const username = searchParams.get("id"); // Replace with the user's actual username
        sendMessage("setUsername", username);
        setUsernameSent(true); // Mark the username as sent
      }
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
    setChatHistory((prevChatHistory) => prevChatHistory = [...prevChatHistory, {sender: searchParams.get('id'), text: message}])
    
    //send message to the server
    sendMessage("msg", message)

    //clear the chat input
    setMessage('')
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
           {activeUsers.map((username) => (<li key={username}>{username}</li>))}
         </ul>
        }
        </div>
      </div>
      
      {/* chat section */}
      <div className="chat-area">
        <div className="profile-info">
            <div className="profile">
            <FontAwesomeIcon icon={faUser} className="profile-icon"/>
            </div>
            <p className="username">{searchParams.get('id')}</p>
        </div>
        <div className="previous-chat" ref={chatHistorRef}>
          {
            chatHistory.map(({sender, text}) => 
              <div className={sender === searchParams.get('id')? "chat" : "chat other"}>
                <span className="text">
                  {text}
                </span>
              </div>
            )
          }
        </div>
        <div className="chat-form-container">
        <form className="chat-form" onSubmit={handleSubmit}>
          <input type="text" name="chat" id="chat"  onChange={handleChange} value={message}/>
          <button type="submit" className="send-btn"><FontAwesomeIcon icon={faPaperPlane} className="send-icon" /></button>
        </form>
        </div>
      </div>
    </div>
  )
};

export default Chat;
