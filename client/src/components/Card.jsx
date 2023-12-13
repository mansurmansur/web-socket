import React from "react"
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome'
import {faUser} from '@fortawesome/free-solid-svg-icons'

const Card = ({username}) => {
  return (
    <div className="card">
        <FontAwesomeIcon icon={faUser} className="profile-icon" />    
      <div className="user-info">
        <p className="user-name">{username}</p>
        <p className="lastMessage">Last message sent</p>
      </div>
    </div>
  )
};

export default Card;
