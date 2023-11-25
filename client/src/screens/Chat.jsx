import React from "react"
import { useEffect, useState} from "react";
import { useDispatch, useSelector } from "react-redux";
import ChatArea from "../components/ChatArea";
import AsideSection from "../components/AsideSection";
import {socket, sendMessage} from "../services/socket";
import { updateChatHistory } from "../redux/chat";
import { updateIsUsernameSent, updateIsUserSelected } from "../redux/user";
import { updateActiveUsers } from "../redux/users";

const Chat = (props) => {
  const dispatch = useDispatch()
  const username = useSelector((state) => state.user.username)
  const [message, setMessage] = useState('') //
  const chatHistory = useSelector((state)=> state.chat.chatHistory); //tracking chat history
  const usernameSent = useSelector((state) => state.user.usernameSent); // Track whether username has been sent
  const activeUsers = useSelector((state)=> state.users.activeUsers)// tracking active users
  const userSelected= useSelector((state) => state.user.userSelected)

  //network calls inside the useEffect
  useEffect(()=>{
    //send the username only when component mounts
    sendUsernameOnce();

    // event listener for active users
    socket.on("activeUsers", (users)=>{
      dispatch(updateActiveUsers(users.filter((user)=>user.username !== username)))
    })

    //listen for private messages
    socket.on("privateMessage", (data) => {
  
      //set chat history
      dispatch(updateChatHistory(data));
    });
  

    //do cleanup when the component unmounts
    return () => {
      socket.off("activeUsers")
      socket.off("privateMessage")
    }
  },[])

  // Function to send the username only if it hasn't been sent yet
  function sendUsernameOnce() {
    if (!usernameSent) {
      sendMessage("setUsername", username);
      dispatch(updateIsUsernameSent(true)) // Mark the username as sent
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
     dispatch(updateChatHistory({sender: {username: username, id: socket.id}, message: message}));

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
      dispatch(updateIsUserSelected({ isUserSelected: true, user: user }));
  }

  // Functon to render chat history for specific user
  const renderChatHistory = (userId) => {
    const chat = chatHistory.find(element => element.member_ids.includes(userId));
    console.log(chat)
    if(chat){
       chat.chat.map(({ sender, text }, index) => (
        <div
          key={index}
          className={sender === username ? "chat" : "chat other"}
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
      <AsideSection activeUsers={activeUsers} handleUserSelected={handleUserSelected} username={username} />
      {/* chat section */}
      {!userSelected.isUserSelected? <></> : <>
      <ChatArea chatHistory={renderChatHistory(userSelected.user.id)} userSelected={userSelected} message={message} handleChange={handleChange} handleSubmit={handleSubmit}/>
      </>}
    </div>
  );
};

export default Chat;
