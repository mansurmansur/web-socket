import React from "react"
import { useSelector } from "react-redux";
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome'
import {faUser} from '@fortawesome/free-solid-svg-icons'

const ChatNavBar = (props) => {
  const user = useSelector((state) => state.user.userSelected.user) 
  return (
    <div className="navBar">
      <div className="profile-wrapper">
        <FontAwesomeIcon icon={faUser} className="profile-icon" />
        <span className="user-name">{user.username}</span>
      </div>
    </div>
  );
};

export default ChatNavBar;
