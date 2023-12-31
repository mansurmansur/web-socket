import React from "react"
import "../styles/sideNav/card.css"
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome'
import {faUser} from '@fortawesome/free-solid-svg-icons'
import { updateIsUserSelected } from "../redux/user";
import { useDispatch } from "react-redux";

const Card = ({user}) => {
  const dispatch = useDispatch();
  const handleClick = e => {
    dispatch(updateIsUserSelected({isUserSelected: true, user: {id: user.id, username: user.username}}))
    
  }
  return (
    <div className="card" onClick={handleClick}>
        <FontAwesomeIcon icon={faUser} className="profile-icon" />    
      <div className="user-info">
        <p className="user-name">{user.username}</p>
        <p className="lastMessage">Last message sent</p>
      </div>
    </div>
  )
};

export default Card;
