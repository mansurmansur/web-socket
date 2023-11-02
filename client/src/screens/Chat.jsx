import React from "react"
import { useState} from "react";
import { useSearchParams } from "react-router-dom";
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome'
import {faUser} from '@fortawesome/free-solid-svg-icons'
import ChatArea from "../components/ChatArea";
// import {socket, sendMessage} from "../services/socket";


const Chat = (props) => {
  const [searchParams] = useSearchParams();
  const [message, setMessage] = useState('') //
  const [chatHistory, setChatHistory] = useState({}); //tracking chat history
  const [usernameSent, setUsernameSent] = useState(false); // Track whether username has been sent
  const [activeUsers, setActiveUsers] = useState([]) // tracking active users
  const [userSelected, setUserSelected] = useState({isUserSelected: true, user: {id: 12345, username: "Said"}})


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
    // const data = {
    //   to: userSelected.user.id,
    //   message
    // }
    // sendMessage("privateMessage", data)

    //clear the chat input
    setMessage("");
  }
  //testing purposes only
  const testData = [
    {sender: "other", text: "Hey, How are you?"}, {sender: searchParams.get('id'), text: "I am alright"},
    {sender: "other", text: "Where have you been?"}, {sender: searchParams.get('id'), text: "I moved to Canada but now am back"},
    {sender: "other", text: "Great to hear that."}, {sender: searchParams.get('id'), text: "Yeah"},
    {sender: "other", text: "Can we hung out sometimes ?"}, {sender: searchParams.get('id'), text: "sure"},
    {sender: "other", text: "How is Canada? "}, {sender: searchParams.get('id'), text: "It is a nice country but very expensive to live there"},
    {sender: "other", text: "you moved back to kenya? "}, {sender: searchParams.get('id'), text: "Not yet but am planning to"},
    {sender: "other", text: "ok."}, {sender: searchParams.get('id'), text: "what have you been up to?"},
    {sender: "other", text: "Nothing much, I am a pilot now"}, {sender: searchParams.get('id'), text: "That is awesome"},
    {sender: "other", text: "I fly most of the time within kenya but sometimes also to Somalia"}, {sender: searchParams.get('id'), text: "I am happy for you."},
    {sender: "other", text: "I have two kids now"}, {sender: searchParams.get('id'), text: "That is good. I also married recently."},
    {sender: "other", text: "I am heading out. let's catch up tomorrow"}, {sender: searchParams.get('id'), text: "sure"}
  ]
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
      <div className="aside-section">
        <div className="profile-info">
          <div className="profile">
            <FontAwesomeIcon icon={faUser} className="profile-icon" />
          </div>
          <p className="username">{searchParams.get("id")}</p>
        </div>

        <div className="users">
          <h3>Users</h3>
          {!activeUsers.length ? (
            <p>No user online</p>
          ) : (
            <ul>
              {activeUsers.map((user) => (
                <li
                  key={user.id}
                  onClick={() => {
                    setUserSelected({ isUserSelected: true, user: user });
                  }}
                >
                  <span className="user-icon-frame">
                    {" "}
                    <FontAwesomeIcon icon={faUser} className="user-icon" />
                  </span>
                  {user.username}
                </li>
              ))}
            </ul>
          )}
        </div>
      </div>

      {/* chat section */}
      <ChatArea chatHistory={testData.map(({ sender, text }, index) => (
        <div
          key={index}
          className={sender === searchParams.get("id") ? "chat" : "chat other"}
        >
          <span className="text">{text}</span>
        </div>
      ))} userSelected={userSelected} message={message} handleChange={handleChange} handleSubmit={handleSubmit}/>
    </div>
  );
};

export default Chat;
