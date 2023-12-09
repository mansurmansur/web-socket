import React from "react"
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome'
import {faUser} from '@fortawesome/free-solid-svg-icons'

const Card = (props) => {
  return (
    <div className="card">
        <FontAwesomeIcon icon={faUser} className="profile-icon" />    
      <div className="user-info">
        <p className="user-name">Doe</p>
        <p className="lastMessage">Hello, How are you?</p>
      </div>
    </div>
  )
};

export default Card;
