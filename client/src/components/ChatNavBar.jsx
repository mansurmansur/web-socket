import React from "react"
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome'
import {faUser} from '@fortawesome/free-solid-svg-icons'

const ChatNavBar = (props) => {
  return (
    <div className="navBar">
      <div className="profile-wrapper">
        <FontAwesomeIcon icon={faUser} className="profile-icon" />
        <span className="user-name">John</span>
      </div>
    </div>
  );
};

export default ChatNavBar;
