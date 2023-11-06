import React from "react"
import { useEffect, useState} from "react";
import { useSearchParams } from "react-router-dom";
import ChatArea from "../components/ChatArea";
import AsideSection from "../components/AsideSection";
import {socket, sendMessage} from "../services/socket";


const Chat = (props) => {
  const [searchParams] = useSearchParams();
  const [message, setMessage] = useState('') //
  const [count, setCount] = useState(0)
  const [chatHistory, setChatHistory] = useState({}); //tracking chat history
  const [usernameSent, setUsernameSent] = useState(false); // Track whether username has been sent
  const [activeUsers, setActiveUsers] = useState([]) // tracking active users
  const [userSelected, setUserSelected] = useState({isUserSelected: false, user: null})

  //network calls inside the useEffect
  useEffect(()=>{
    //send the username only when component mounts
    console.log(`I have been created ${count}`)
    sendUsernameOnce();

    // event listener for active users
    socket.on("activeUsers", (users)=>{
      setActiveUsers(users.filter((user)=>user.username !== searchParams.get('id')));
    })

    //listen for private messages
    socket.on("privateMessage", (data) => {
      const { from, message } = data;
  
      setChatHistory((prevChatHistory) => {
        const updatedChatHistory = { ...prevChatHistory };
  
        if (!updatedChatHistory[from.id]) {
          updatedChatHistory[from.id] = [];
        }
  
        updatedChatHistory[from.id].push({
          sender: from.username,
          text: message,
        });
  
        return updatedChatHistory;
      });
    });
  

    //do cleanup when the component unmounts
    return () => {
      setCount(preCount => preCount + 1);
      console.log(count)
      socket.off("activeUsers")
      socket.off("privateMessage")
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
  function handleSubmit(e) {
    e.preventDefault();

     //update chat history
     setChatHistory((prevChatHistory) => {
      // Create a copy of the previous chat history
      const updatedChatHistory = { ...prevChatHistory };

      if (!updatedChatHistory[userSelected.user.id]) {
        updatedChatHistory[userSelected.user.id] = [];
      }

      updatedChatHistory[userSelected.user.id].push({
        sender: searchParams.get("id"),
        text: message,
      });

      return updatedChatHistory;
    });

    //send message to the server
    const data = {
      to: userSelected.user.id,
      message
    }
    sendMessage("privateMessage", data)
    
    //clear the chat input
    setMessage("");
  }

  //handle select user
  function handleUserSelected(user){
      setUserSelected({ isUserSelected: true, user: user });
  }

  // Functon to render chat history for specific user
  const renderChatHistory = (userId) => {
    if (chatHistory[userId]) {
      return chatHistory[userId].map(({ sender, text }, index) => (
        <div
          key={index}
          className={sender === searchParams.get("id") ? "chat" : "chat other"}
        >
          <span className="text">{text}</span>
        </div>
      ));
    } else {
      return <div>No chat history with this user.</div>;
    }
  };
  return (
    <div className="container chat-dashboard">
      {/* aside section */}
      <AsideSection activeUsers={activeUsers} handleUserSelected={handleUserSelected} username={searchParams.get('id')} />
      {/* chat section */}
      {!userSelected.isUserSelected? <></> : <>
      <ChatArea chatHistory={renderChatHistory(userSelected.user.id)} userSelected={userSelected} message={message} handleChange={handleChange} handleSubmit={handleSubmit}/>
      </>}
    </div>
  );
};

export default Chat;
